/**
 * Assignment submission endpoints module
 * @module endpoints/course/assignmentSubmissions
 * @see module: endpoints/course/assignmentSubmissions
 */
const fs = require('fs');
const path = require('path');
const request = require('request');
const urlLib = require('url');
const async = require('async');

const utils = require('../common/utils.js');
const prefix = require('../common/prefix.js');
const errorCodes = require('../../errorCodes.js');
const CACCLError = require('../../../caccl-error/index.js'); // TODO: use actual library

/*------------------------------------------------------------------------*/
/*                                 Helpers                                */
/*------------------------------------------------------------------------*/

/**
 * Passes through or retrieves the current user's Canvas id
 * @param {function} visitEndpoint – The visitEndpoint function to use to send
 *   a getCurrentUser request with
 * @param {number} [userId] - The Canvas Id of the current user. Passed through
 *   by default if we already know it
 * @return {Promise.<number>} Canvas Id of the current user
 */
const getCurrentUserId = (visitEndpoint, userId) => {
  // Resolve if we already have the user's id
  if (userId) {
    return Promise.resolve(userId);
  }
  // Pull the user's id from Canvas
  return visitEndpoint({
    path: `${prefix.v1}/users/self/profile`,
    method: 'GET',
  }).then((response) => {
    return Promise.resolve(response.id);
  });
};

/*------------------------------------------------------------------------*/
/*                                Endpoints                               */
/*------------------------------------------------------------------------*/

module.exports = [

  /**
   * Lists the submissions to a specific assignment in a course
   * @param {number} courseId - Canvas course Id
   * @param {number} assignmentId - The Canvas assignment Id to query
   * @param {boolean} [includeComments=false] - If truthy, includes all comments
   *   on submissions
   * @param {boolean} [includeRubricAssessment=false] - If truthy, includes
   *   rubric assessments: breakdown of score for each rubric item
   * @param {boolean} [excludeUser=false] - If truthy, excludes
   *   submission[i].user value with the submission's user information
   * @param {boolean} [includeTestStudent=true] - If truthy, includes dummy
   *   submission by test student (student view) if there is one
   * @return {Promise.<Object[]>} list of Canvas submissions {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  {
    name: 'listAssignmentSubmissions',
    action: 'list the submissions to a specific assignment in a course',
    run(config) {
      // Fetch the user info if we're not excluding user info OR if we're
      // filtering out the test student (we need user info to filter)
      const fetchUser = (
        !config.options.includeTestStudent
        || !config.options.excludeUser
      );

      const fetchPromise = config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/assignments${config.options.assignmentId}/submissions`,
        method: 'GET',
        params: {
          include: utils.includeTruthyElementsExcludeIfEmpty([
            (config.options.includeComments ? 'submission_comments' : null),
            (config.options.includeRubricAssessment ? 'rubric_assessment' : null),
            (fetchUser ? 'user' : null),
          ]),
        },
      });

      // Filter test student if applicable
      if (!config.options.includeTestStudent) {
        return fetchPromise.then((response) => {
          // Filter out test student
          const realSubs = response.filter((sub) => {
            return sub.user.name !== 'Test Student';
          });

          if (config.options.excludeUser) {
            // We had to request users just to filter out the test student but
            // we the caller wanted to exclude users (remove them now)
            return Promise.resolve(realSubs.map((sub) => {
              const newSub = sub;
              delete newSub.user;
              return newSub;
            }));
          }

          return Promise.resolve(realSubs);
        });
      }

      // Not filtering out test student. Just return fetchPromise
      return fetchPromise;
    },
  },

  /**
   * Gets a single submission for an assignment
   * @param {number} courseId - Canvas course Id
   * @param {number} assignmentId - The Canvas assignment Id
   * @param {number} studentId - The Canvas student Id
   * @param {boolean} [includeComments=false] - If truthy, includes all comments
   *   on submissions
   * @param {boolean} [includeRubricAssessment=false] - If truthy, includes
   *   rubric assessments: breakdown of score for each rubric item
   * @param {boolean} [excludeUser=false] - If truthy, excludes
   *   submission[i].user value with the submission's user information
   * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  {
    name: 'getAssignmentSubmission',
    action: 'Gets a specific submission to an assignment in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions/${config.options.studentId}`,
        method: 'GET',
        params: {
          include: utils.includeTruthyElementsExcludeIfEmpty([
            (config.options.includeComments ? 'submission_comments' : null),
            (config.options.includeRubricAssessment ? 'rubric_assessment' : null),
            (!config.options.excludeUser ? 'user' : null),
          ]),
        },
      });
    },
  },

  /**
   * Creates a text submission on behalf of the current user
   * @param {number} courseId - Canvas course Id
   * @param {number} assignmentId - The Canvas assignment Id
   * @param {string} text - The text body of the submission
   * @param {number} [currentUserId] - The current user's Canvas Id.
   *   If not included, we call the current user endpoint
   * @param {string} [comment] - A text student comment to include
   * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  {
    name: 'createAssignmentTextSubmission',
    action: 'create a text submission to a specific assignment in a course on behalf of the current user',
    run(config) {
      let submitterId;
      return getCurrentUserId(
        config.visitEndpoint,
        config.options.currentUserId
      )
        .then((currentUserId) => {
          submitterId = currentUserId;
          return config.visitEndpoint({
            path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions`,
            method: 'POST',
            params: {
              'comment[text_comment]':
                utils.includeIfTruthy(config.options.comment),
              'submission[body]': config.options.body,
              'submission[submission_type]': 'online_text_entry',
            },
          });
        })
        .then((response) => {
          // Submission created. Now, create response and uncache paths
          return config.uncache([
            // Uncache list of submissions
            `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions`,
            // Uncache this person's submission
            `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions/${submitterId}`,
          ], response);
        });
    },
  },

  /**
   * Creates a url submission on behalf of the current user
   * @param {number} courseId - Canvas course Id
   * @param {number} assignmentId - The Canvas assignment Id
   * @param {string} url - The url of the submission
   * @param {number} [currentUserId] - The current user's Canvas Id.
   *   If not included, we call the current user endpoint
   * @param {string} [comment] - A text student comment to include
   * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  {
    name: 'createAssignmentURLSubmission',
    action: 'create a url submission to a specific assignment in a course on behalf of the current user',
    run(config) {
      let submitterId;
      return getCurrentUserId(
        config.visitEndpoint,
        config.options.currentUserId
      )
        .then((currentUserId) => {
          submitterId = currentUserId;
          return config.visitEndpoint({
            path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions`,
            method: 'POST',
            params: {
              'comment[text_comment]':
                utils.includeIfTruthy(config.options.comment),
              'submission[url]': config.options.body,
              'submission[submission_type]': 'online_url',
            },
          });
        })
        .then((response) => {
          // Submission created. Now, create response and uncache paths
          return config.uncache([
            // Uncache list of submissions
            `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions`,
            // Uncache this person's submission
            `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions/${submitterId}`,
          ], response);
        });
    },
  },

  /**
   * Creates a file submission on behalf of the current user
   * @param {number} courseId - Canvas course Id
   * @param {number} assignmentId - The Canvas assignment Id
   * @param {string} filenames - The filenames to upload to the submission
   * @param {number} [currentUserId] - The current user's Canvas Id.
   *   If not included, we call the current user endpoint
   * @param {string} [comment] - A text student comment to include
   * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  {
    name: 'createAssignmentFileSubmission',
    action: 'create a file submission to a specific assignment in a course on behalf of the current user',
    run(config) {
      let submitterId;
      return getCurrentUserId(
        config.visitEndpoint,
        config.options.currentUserId
      )
        .then((currentUserId) => {
          submitterId = currentUserId;

          // Throw error if no files were included
          if (config.options.filenames.length === 0) {
            throw new CACCLError({
              message: 'Could not make a file submission because no files were included.',
              code: errorCodes.noSubmissionFiles,
            });
          }


          // Function that uploads an individual file
          const uploadFile = (filename, next) => {
            // 1. Prepare the file upload (create a slot to upload into)
            config.visitEndpoint({
              path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions/self/files`,
              method: 'POST',
              params: {
                name: path.basename(filename),
              },
            }).then((response) => {
              // 2. Upload the file
              const uploadUrl = response.upload_url;
              const formData = response.upload_params;

              // Add file
              formData.file = fs.createReadStream(filename);

              // Send file to Canvas
              return new Promise((uploadResolve, uploadReject) => {
                // Use normal request library because we don't want to
                // pre/post-process the request or add an access token
                request.post({
                  formData,
                  url: uploadUrl,
                }, (err, res) => {
                  // Detect upload error
                  if (
                    err
                    || !res
                    || !res.headers
                    || !res.headers.location
                  ) {
                    return uploadReject(new CACCLError({
                      message: `We could not upload the submission file to Canvas because an error occurred: "${err.message}". If this isn't expected, please contact an admin.`,
                      code: errorCodes.submissionFileUploadFailed,
                    }));
                  }

                  // Send POST request to activate the file
                  const parsed = urlLib.parse(res.headers.location);
                  config.visitEndpoint({
                    host: parsed.hostname,
                    path: parsed.path,
                    method: 'POST',
                  }).then((verifyResponse) => {
                    // File verified! Continue with file id
                    return next(null, verifyResponse.id);
                  }).catch((verifyError) => {
                    return next(new CACCLError({
                      message: `We could not activate a submission file after it was uploaded because we ran into an error: "${verifyError.message}". If this isn't expected, please contact an admin.`,
                      code: errorCodes.submissionFileActivateFailed,
                    }));
                  });
                });
              });
            });
          };

          return new Promise((resolve, reject) => {
            // Now that we have a function to upload one file,
            // upload all files in parallel (3 at a time max)
            async.mapLimit(
              config.options.filenames,
              3,
              uploadFile,
              (err, fileIds) => {
                if (err) {
                  // At least one file failed
                  return reject(err);
                }

                // All files succeeded! Continue and submit the assignment
                config.visitEndpoint({
                  path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions`,
                  method: 'POST',
                  params: {
                    'submission[submission_type]': 'online_upload',
                    'submission[file_ids]': fileIds,
                    'comment[text_comment]':
                      utils.includeIfTruthy(config.options.comment),
                  },
                }).then((response) => {
                  // Resolve the sendSubmissionPromise now that actual
                  // submission was made
                  return resolve(response);
                }).catch((submitError) => {
                  return reject(submitError);
                });
              }
            );
          }).catch((prepError) => {
            throw new CACCLError({
              message: `We could not prep Canvas to accept a new submission file because we ran into an error: "${prepError.message}". If you think this isn't expected, please contact an admin.`,
              code: errorCodes.submissionFilePrepFailed,
            });
          });
        })
        .then((response) => {
          // Submission created. Now, create response and uncache paths
          return config.uncache([
            // Uncache list of submissions
            `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions`,
            // Uncache this person's submission
            `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions/${submitterId}`,
          ], response);
        });
    },
  },

];
