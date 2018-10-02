const fs = require('fs');
const path = require('path');
const request = require('request');
const urlLib = require('url');
const async = require('async');

const utils = require('../helpers/utils.js');
const errorCodes = require('../../errorCodes.js');
const CACCLError = require('../../../caccl-error/index.js'); // TODO: use actual library

module.exports = (self) => {
  return [

    /*------------------------------------------------------------------------*/
    /*                               Assignments                              */
    /*------------------------------------------------------------------------*/

    /**
     * Lists the quizzes in a course
     * @param {number} courseId - Canvas course Id to query
     */
    {
      name: 'listAssignments',
      action: 'get the list of assignments in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments',
          method: 'GET',
        });
      },
    },

    /**
     * Get info on a specific assignment in a course
     * @param {number} courseId - Canvas course Id to query
     * @param {number} assignmentId - Canvas assignment Id
     */
    {
      name: 'getAssignment',
      action: 'get info on a specific assignment in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments/'
            + options.assignmentId,
          method: 'GET',
        });
      },
    },

    /**
     * Updates a Canvas assignment
     * @param {number} courseId - Canvas course Id to query
     * @param {number} assignmentId - Canvas assignment Id to update
     * @param {string} name - The name of the assignment
     * @param {number} pointsPossible - Points possible (default: unchanged)
     * @param {string} dueAt - Due at datetime (default: unchanged)
     * @param {string} lockAt - Due at datetime (default: unchanged)
     * @param {string} unlockAt - Due at datetime (default: unchanged)
     * @param {string} description - html description of
     *   the assignment (default: unchanged)
     * @param {string} submissionTypes - Submission type(s) (default: unchanged)
     * @param {string} allowedExtensions - List of allowed file extensions
     *   (exclude period). Online upload must be enabled (default: unchanged)
     * @param {string} gradingType - Grading type (default: unchanged)
     * @param {number} position - Position in assignment list
     *   (default: unchanged)
     * @param {boolean} published - If true, publish page upon
     *   creation. Must be a boolean (default: unchanged)
     * @param {boolean} muted - If true, assignment is muted. Must be a boolean
     *   (default: unchanged)
     * @param {number} groupSetId - Student group set Id (default: unchanged)
     * @param {number} assignmentGroupId - Assignment group Id
     *   (default: unchanged)
     * @param {boolean} peerReviewsEnabled - If true, users asked to submit
     *   peer reviews. Must be a boolean (default: unchanged)
     * @param {boolean} automaticPeerReviewsEnabled - If true, Canvas will
     *   automatically assign peer reviews. Must be a boolean
     *   (default: unchanged)
     * @param {boolean} omitFromFinalGrade - If true, assignment is omitted from
     *   the final grade. Must be a boolean (default: unchanged)
     * @param {boolean} gradeGroupStudentsIndividually - If true, students in
     *   groups can be given separate grades and when one student in a group
     *   gets a grade, other students do not get graded. Must be a boolean
     *   (default: unchanged)
     */
    {
      name: 'updateAssignment',
      action: 'updates an assignment in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments/'
            + options.assignmentId,
          method: 'PUT',
          params: {
            'assignment[name]': utils.includeIfTruthy(options.name),
            'assignment[submission_types]':
              utils.includeIfTruthy(options.submissionTypes),
            'assignment[grading_type]':
              utils.includeIfTruthy(options.gradingType),
            position: utils.includeIfTruthy(options.position),
            'assignment[peer_reviews]':
              utils.includeIfBoolean(options.peerReviewsEnabled),
            'assignment[automatic_peer_reviews]':
              utils.includeIfBoolean(options.automaticPeerReviewsEnabled),
            'assignment[grade_group_students_individually]':
              utils.includeIfBoolean(options.gradeGroupStudentsIndividually),
            'assignment[description]':
              utils.includeIfTruthy(options.description),
            'assignment[allowed_extensions]':
              utils.includeIfTruthy(options.allowedExtensions),
            'assignment[group_category_id]':
              utils.includeIfTruthy(options.groupSetId),
            'assignment[points_possible]':
              utils.includeIfNumber(options.pointsPossible),
            'assignment[due_at]': utils.includeIfDate(options.dueAt),
            'assignment[lock_at]': utils.includeIfDate(options.lockAt),
            'assignment[unlock_at]': utils.includeIfDate(options.unlockAt),
            'assignment[published]':
              utils.includeIfBoolean(options.published),
            'assignment[assignment_group_id]':
              utils.includeIfNumber(options.assignmentGroupId),
            'assignment[omit_from_final_grade]':
              utils.includeIfBoolean(options.omitFromFinalGrade),
            'assignment[muted]': utils.includeIfBoolean(options.muted),
          },
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache assignment and sub-endpoints
              '/api/v1/courses/' + options.courseId + '/assignments/'
                + options.assignmentId + '*',
              // Uncache assignment list
              '/api/v1/courses/' + options.courseId + '/assignments',
            ],
          };
        });
      },
    },

    /**
     * Creates a Canvas assignment
     * @param {number} courseId - Canvas course Id to create an assignment in
     * @param {string} name - The name of the assignment
     *   (default: Unnamed Assignment)
     * @param {number} pointsPossible - Points possible (default: null)
     * @param {string} dueAt - Due at datetime (default: none)
     * @param {string} lockAt - Due at datetime (default: none)
     * @param {string} unlockAt - Due at datetime (default: none)
     * @param {string} description - html description of
     *   the assignment (default: none)
     * @param {string} submissionTypes - Submission type(s) (default: none)
     * @param {string} allowedExtensions - List of allowed file extensions
     *   (exclude period). Online upload must be enabled (default: any)
     * @param {string} gradingType - Grading type (default: points)
     * @param {number} position - Position in assignment list (default: last)
     * @param {boolean} published - If true, publish page upon
     *   creation (default: false)
     * @param {boolean} muted - If true, assignment is muted (default: false)
     * @param {number} groupSetId - Student group set Id
     *   (default: none/singleton)
     * @param {number} assignmentGroupId - Assignment group Id (default: top
     *   assignment group in the course)
     * @param {boolean} peerReviewsEnabled - If true, users asked to submit
     *   peer reviews (default: false)
     * @param {boolean} automaticPeerReviewsEnabled - If true, Canvas will
     *   automatically assign peer reviews (default: false)
     * @param {boolean} omitFromFinalGrade - If true, assignment is omitted from
     *   the final grade (default: false)
     * @param {boolean} gradeGroupStudentsIndividually - If true, students in
     *   groups can be given separate grades and when one student in a group
     *   gets a grade, other students do not get graded (default: false)
     */
    {
      name: 'createAssignment',
      action: 'create a new assignment in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments',
          method: 'POST',
          params: {
            'assignment[name]': options.name || 'Unnamed Assignment',
            'assignment[submission_types]': options.submissionTypes || ['none'],
            'assignment[grading_type]': options.gradingType || 'points',
            position: utils.includeIfTruthy(options.position),
            'assignment[peer_reviews]':
              utils.isTruthy(options.peerReviewsEnabled),
            'assignment[automatic_peer_reviews]':
              utils.isTruthy(options.automaticPeerReviewsEnabled),
            'assignment[grade_group_students_individually]':
              utils.isTruthy(options.gradeGroupStudentsIndividually),
            'assignment[description]':
              utils.includeIfTruthy(options.description),
            'assignment[allowed_extensions]':
              utils.includeIfTruthy(options.allowedExtensions),
            'assignment[group_category_id]':
              utils.includeIfTruthy(options.groupSetId),
            'assignment[points_possible]':
              utils.includeIfNumber(options.pointsPossible),
            'assignment[due_at]': utils.includeIfDate(options.dueAt),
            'assignment[lock_at]': utils.includeIfDate(options.lockAt),
            'assignment[unlock_at]': utils.includeIfDate(options.unlockAt),
            'assignment[published]':
              utils.isTruthy(options.published),
            'assignment[assignment_group_id]':
              utils.includeIfNumber(options.assignmentGroupId),
            'assignment[omit_from_final_grade]':
              utils.isTruthy(options.omitFromFinalGrade),
            'assignment[muted]': utils.isTruthy(options.muted),
          },
        });
      },
    },

    /**
     * Delete an assignment
     * @param {number} courseId - Canvas course Id
     * @param {number} assignmentId - Canvas assignment Id
     */
    {
      name: 'deleteAssignment',
      action: 'deletes an assignment from a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments/'
            + options.assignmentId,
          method: 'DELETE',
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache assignment and sub-endpoints
              '/api/v1/courses/' + options.courseId + '/assignments/'
                + options.assignmentId + '*',
              // Uncache assignment list
              '/api/v1/courses/' + options.courseId + '/assignments',
            ],
          };
        });
      },
    },

    /*------------------------------------------------------------------------*/
    /*                               Submissions                              */
    /*------------------------------------------------------------------------*/

    /**
     * Lists the submissions to a specific assignment in a course
     * @param {number} courseId - Canvas course Id
     * @param {number} assignmentId - The Canvas assignment Id to query
     * @param {boolean} includeComments - If true, includes all comments on
     *   submissions (default: false)
     * @param {boolean} includeRubricAssessment - If true, includes rubric
     *   assessments: breakdown of score for each rubric item (default: false)
     * @param {boolean} excludeUser - If false, includes a submission[i].user
     *   value with the submission's user information
     * @param {boolean} includeTestStudent - If true, includes dummy submission
     *   by test student (student view) if there is one (default: false)
     */
    {
      name: 'listAssignmentSubmissions',
      action: 'list the submissions to a specific assignment in a course',
      run: (options, visitEndpoint) => {
        // Fetch the user info if we're not excluding user info OR if we're
        // filtering out the test student (we need user info to filter)
        const fetchUser = !options.includeTestStudent || !options.excludeUser;

        const fetchPromise = visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments/'
            + options.assignmentId + '/submissions',
          method: 'GET',
          params: {
            include: utils.includeTruthyElementsExcludeIfEmpty([
              (options.includeComments ? 'submission_comments' : null),
              (options.includeRubricAssessment ? 'rubric_assessment' : null),
              (fetchUser ? 'user' : null),
            ]),
          },
        });

        // Filter test student if applicable
        if (!options.includeTestStudent) {
          return fetchPromise.then((response) => {
            // Filter out test student
            const realSubs = response.filter((sub) => {
              return sub.user.name !== 'Test Student';
            });

            if (options.excludeUser) {
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
     * @param {boolean} includeComments - If true, includes all comments on
     *   submissions (default: false)
     * @param {boolean} includeRubricAssessment - If true, includes rubric
     *   assessments: breakdown of score for each rubric item (default: false)
     * @param {boolean} excludeUser - If false, includes a submission[i].user
     *   value with the submission's user information (default: false)
     */
    {
      name: 'getAssignmentSubmission',
      action: 'Gets a specific submission to an assignment in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments/'
            + options.assignmentId + '/submissions/' + options.studentId,
          method: 'GET',
          params: {
            include: utils.includeTruthyElementsExcludeIfEmpty([
              (options.includeComments ? 'submission_comments' : null),
              (options.includeRubricAssessment ? 'rubric_assessment' : null),
              (!options.excludeUser ? 'user' : null),
            ]),
          },
        });
      },
    },

    /**
     * Submits assignment on behalf of the current user
     * @param {number} courseId - Canvas course Id
     * @param {number} assignmentId - The Canvas assignment Id
     * @param {number} currentUserId - Optional. The current user's Canvas Id.
     *   If not included, we call the current user endpoint
     * @param {string} submissionType - Currently supported types:
     *   text - html/plain text submission (body must be string)
     *   url - web url (body must be string)
     *   files - upload file(s) to the submission (body must be filename array)
     * @param {object} body - The body of the submission.
     *   Depends on submissionType (see above)
     * @param {string} comment - Optional. A text comment to include
     */
    {
      name: 'createAssignmentSubmission',
      action: 'create a submission to a specific assignment in a course on behalf of the current user',
      run: (options, visitEndpoint) => {
        // Create a promise that resolves with the submitter/current user's id
        let getSubmitterIdPromise;
        if (options.currentUserId) {
          //  included!
          getSubmitterIdPromise = Promise.resolve(options.currentUserId);
        } else {
          // Not included
          getSubmitterIdPromise = visitEndpoint({
            path: '/api/v1/users/self/profile',
            method: 'GET',
          }).then((response) => {
            return Promise.resolve(response.id);
          });
        }

        // Create submission request
        return getSubmitterIdPromise.then((submitterId) => {
          // Create variable for submission request
          let sendSubmissionPromise;

          // Text or Url submissions
          if (
            options.submissionType === 'text'
            || options.submissionType === 'url'
          ) {
            // Detect submission type
            let submissionType = 'online_text_entry';
            if (options.submissionType) {
              submissionType = 'online_url';
            }
            sendSubmissionPromise = visitEndpoint({
              'submission[submission_type]': submissionType,
              'submission[body]': options.body || '',
              'comment[text_comment]':
                utils.includeIfTruthy(options.comment),
            });
          } else if (options.submissionType === 'upload') {
            // File submission

            // Get list of filenames
            const body = options.body || {};
            const filenames = body.filenames || [];

            sendSubmissionPromise = new Promise((resolve, reject) => {
              // Function that uploads an individual file
              const uploadFile = (filename, next) => {
                // 1. Prepare the file upload (create a slot to upload into)
                visitEndpoint({
                  path: '/api/v1/courses/' + options.courseId + '/assignments/'
                    + options.assignmentId + '/submissions/self/files',
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
                          message: 'We could not upload the submission file to Canvas because an error occurred: "' + err.message + '". If this isn\'t expected, please contact an admin.',
                          code: errorCodes.submissionFileUploadFailed,
                        }));
                      }

                      // Activate file if needed
                      if (res.statusCode >= 300 && res.statusCode < 400) {
                        // Need to send POST request to activate the file
                        const parsed = urlLib.parse(res.headers.location);
                        visitEndpoint({
                          host: parsed.hostname,
                          path: parsed.path,
                          method: 'POST',
                        }).then((verifyResponse) => {
                          // File verified! Continue with file id
                          return next(null, verifyResponse.id);
                        }).catch((verifyError) => {
                          return next(new CACCLError({
                            message: 'We could not activate a submission file after it was uploaded because we ran into an error: "' + verifyError.message + '". If this isn\'t expected, please contact an admin.',
                            code: errorCodes.submissionFileActivateFailed,
                          }));
                        });
                      } else {
                        // File is already activated. Just request info
                        request.get(
                          { url: res.headers.location },
                          (getFileError) => {
                            if (getFileError) {
                              return next(new CACCLError({
                                message: 'We could not check a submission file after it was uploaded because we ran into an error: "' + getFileError.message + '". If this isn\'t expected, please contact an admin.',
                                code: errorCodes.submissionFileCheckFailed,
                              }));
                            }

                            // Try to get the file id out of the body
                            try {
                              return next(null, JSON.parse(body).id);
                            } catch (parseErr) {
                              return next(new CACCLError({
                                message: 'We could not check a submission file after it was uploaded because we could not understand Canvas\' response when we tried to verify the upload. If this isn\'t expected, please contact an admin.',
                                code: errorCodes.submissionFileCheckParseFailed,
                              }));
                            }
                          }
                        );
                      }
                    });
                  });
                }).catch((prepError) => {
                  return next(new CACCLError({
                    message: 'We could not prep Canvas to accept a new submission file because we ran into an error: "' + prepError.message + '". If you think this isn\'t expected, please contact an admin.',
                    code: errorCodes.submissionFilePrepFailed,
                  }));
                });
              };

              // Now that we have a function to upload one file,
              // upload all files in parallel
              async.map(filenames, uploadFile, (err, fileIds) => {
                if (err) {
                  // At least one file failed
                  return reject(err);
                }

                // All files succeeded! Continue and submit the assignment
                visitEndpoint({
                  path: '/api/v1/courses/' + options.courseId + '/assignments/'
                    + options.assignmentId + '/submissions',
                  method: 'POST',
                  params: {
                    'submission[submission_type]': 'online_upload',
                    'submission[file_ids]': fileIds,
                    'comment[text_comment]':
                      utils.includeIfTruthy(options.comment),
                  },
                }).then((response) => {
                  // Resolve the sendSubmissionPromise now that actual
                  // submission was made
                  return resolve(response);
                });
              });
            });
          } else {
            // Invalid submissionType
            return Promise.reject(new CACCLError({
              message: 'We could not create a submission to an assignment because the submission type was invalid: "' + options.submissionType + '". Please contact an admin.',
              code: errorCodes.invalidSubmissionType,
            }));
          }

          // Submission created. Now, create response and uncache paths
          return sendSubmissionPromise.then((response) => {
            return {
              response,
              uncache: [
                // Uncache list of submissions
                '/api/v1/courses/' + options.courseId + '/assignments/'
                  + options.assignmentId + '/submissions',
                // Uncache this person's submission
                '/api/v1/courses/' + options.courseId + '/assignments/'
                  + options.assignmentId + '/submissions/' + submitterId,
              ],
            };
          });
        });
      },
    },

    /*------------------------------------------------------------------------*/
    /*                                 Grading                                */
    /*------------------------------------------------------------------------*/

    /**
     * List gradeable students for a specific assignment
     * @param {number} courseId - Canvas course Id to query
     * @param {number} assignmentId - Canvas assignment Id to query
     */
    {
      name: 'listGradeableStudents',
      action: 'get the list of students who are gradeable in a specific assignment in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments/'
            + options.assignmentId + '/gradeable_students',
          method: 'GET',
        });
      },
    },

    /**
     * Adds a comment to a submission
     * @param {number} courseId - Canvas course Id
     * @param {number} assignmentId - Canvas course Id
     * @param {number} studentId - Canvas student Id of the sub to comment on
     * @param {string} comment - The text of the comment
     */
    {
      name: 'createAssignmentSubmissionComment',
      action: 'create a new comment on a submission',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments/'
            + options.assignmentId + '/submissions/' + options.studentId,
          method: 'PUT',
          params: {
            'comment[text_comment]': options.comment,
          },
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache submission
              '/api/v1/courses/' + options.courseId + '/assignments/'
                + options.assignmentId + '/submissions/' + options.studentId,
              // Uncache list of submissions
              '/api/v1/courses/' + options.courseId + '/assignments/'
                + options.assignmentId + '/submissions',
            ],
          };
        });
      },
    },

    /**
     * Adds a comment to a submission
     * @param {number} courseId - Canvas course Id
     * @param {number} assignmentId - Canvas course Id
     * @param {number} studentId - Canvas student Id of the sub to comment on
     * @param {string} comment - The text of the comment
     */
    {
      name: 'createAssignmentSubmissionComment',
      action: 'create a new comment on a submission',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments/'
            + options.assignmentId + '/submissions/' + options.studentId,
          method: 'PUT',
          params: {
            'comment[text_comment]': options.comment,
          },
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache submission
              '/api/v1/courses/' + options.courseId + '/assignments/'
                + options.assignmentId + '/submissions/' + options.studentId,
              // Uncache list of submissions
              '/api/v1/courses/' + options.courseId + '/assignments/'
                + options.assignmentId + '/submissions',
            ],
          };
        });
      },
    },

    /**
     * Batch updates grades and/or comments. Also supports updating rubric items
     * @param {number} courseId - Canvas course Id
     * @param {number} assignmentId - Canvas course Id
     * @param {number} gradeItems - List of grade items to upload to Canvas:
     *   [{
     *     studentId: <student id>,
     *     points: <optional, points to overwrite with>,
     *     comment: <optional, comment to append>,
     *     rubricId: <optional, rubric item to upload to>
     *   },...]
     * @param {boolean} waitForCompletion - If true, promise won't resolve until
     *   Canvas has finished updating the grades, instead of resolving once the
     *   grade changes have been queued (default: false)
     * @param {number} waitForCompletionTimeout - The number of minutes to
     *   wait before timing out the grade update job (default: 2 mins)
     * @param {boolean} dontMergeRubricItemUpdates - When uploading grades to a
     *   rubric item, we intelligently merge rubric item updates with previous
     *   rubric assessments. For instance, if the assignment's rubric is:
     *     { grammar, argument, formatting }
     *   And the student of interest has the following rubric assessment so far:
     *     { grammar: 10/10, argument: 8/10, formatting: ungraded }
     *   When we upload a new gradeItem (9/10 points) to the student's
     *   formatting rubric item, the result is:
     *     { grammar: 10/10, argument: 8/10, formatting: 9/10 }
     *   However, if dontMergeRubricItemUpdates=true, the result is:
     *     { grammar: ungraded, argument: ungraded, formatting: 9/10 }
     *   Note: merging is an added feature. By default, the Canvas API does not
     *   merge rubric assessments.
     */
    {
      name: 'updateAssignmentGrades',
      action: 'update student grades, comments, and/or rubric assessments for a specific assignment in a course',
      run: (options, visitEndpoint) => {
        // Create a promise chain so we can queue promises
        let promiseChain;

        /* --- 1. Check if we need to merge --- */

        // Check if we need to merge rubric item updates
        let performRubricItemMerge = !options.dontMergeRubricItemUpdates;
        const studentsToMerge = [];
        // Check if merge is necessary
        // > not necessary if no rubric item updates
        if (performRubricItemMerge) {
          performRubricItemMerge = false;
          for (let i = 0; i < options.gradeItems.length; i++) {
            if (options.gradeItems[i].rubricId) {
              // Found one rubric item. We may need to merge.
              performRubricItemMerge = true;
              break;
            }
          }
        }

        // Pull assignment so we can get rubric information
        if (performRubricItemMerge) {
          promiseChain = self.getAssignment({
            courseId: options.courseId,
            assignmentId: options.assignmentId,
          }).then((assignment) => {
            if (!assignment.rubric) {
              // This assignment doesn't have a rubric
              throw new Error({
                message: 'We could not upload grades because the rubric we were trying to upload to didn\'t exist.',
                code: errorCodes.noRubricOnBatchGradeUpload,
              });
            }

            // Only merge students who don't have all the rubric items defined
            // (if all the rubric items are being uploaded, no merge needed)
            // > Get data on rubric
            const isRealRubricItemId = {};
            const numRubricItems = assignment.rubric.length;
            assignment.rubric.forEach((rubricItem) => {
              isRealRubricItemId[rubricItem.id] = true;
            });
            // > Figure out which students have which rubric items
            const studentToRubricItemsIncluded = {};
            // ^ {studentId => { rubricId => true if being updated }}
            options.gradeItem.forEach((gradeItem) => {
              const { rubricId, studentId } = gradeItem;

              // Skip if this item isn't a (real) rubric item
              if (!rubricId || !isRealRubricItemId[rubricId]) {
                return;
              }

              // Keep track of rubric items that are found
              if (!studentToRubricItemsIncluded[studentId]) {
                // Initialize student map
                studentToRubricItemsIncluded[studentId] = {};
              }
              studentToRubricItemsIncluded[studentId][rubricId] = true;
            });
            // > Find students that need to be merged
            Object.keys(studentToRubricItemsIncluded).forEach((studentId) => {
              const numIncludedRubricItems = Object.keys(
                studentToRubricItemsIncluded[studentId]
              ).length;

              if (numIncludedRubricItems < numRubricItems) {
                // Need to merge this student
                studentsToMerge.push(studentId);
              }
            });
          });
        } else {
          // No action necessary (no merging or assignment lookup)
          promiseChain = Promise.resolve();
        }

        /* --- 2. Perform Merge --- */
        promiseChain = promiseChain.then(() => {
          return new Promise((resolve, reject) => {
            // Pull student submissions that need to be merged
            const fetchSub = (studentId, next) => {
              self.getAssignmentSubmission({
                courseId: options.courseId,
                assignmentId: options.assignmentId,
                studentId: options.studentId,
                includeRubricAssessment: true,
                excludeUser: true, // Save request space
              }).then((response) => {
                return next(null, response);
              }).catch((err) => {
                return next(err);
              });
            };

            // Pull all student submissions, 20 at a time
            async.mapLimit(studentsToMerge, 20, fetchSub, (err, subs) => {
              if (err) {
                return reject(err);
              }

              // Prep for merge (if applicable)
              const params = {};

              if (subs.length > 0) {
                // Keep track of which items are being overwritten
                const overwritingMap = {};
                // ^ {studentId => rubricId => {
                //      points: true/false, is being overwritten,
                //      comment: true/false, is being overwritten
                //    }}
                options.gradeItem.forEach((gradeItem) => {
                  if (!gradeItem.rubricId) {
                    // No need to keep track of non-rubric item updates
                    // (these are not being merged)
                    return;
                  }
                  const sid = gradeItem.studentId;
                  const rid = gradeItem.rubricId;
                  // Initialize map if needed
                  if (!overwritingMap[sid]) {
                    overwritingMap[sid] = {};
                  }
                  if (!overwritingMap[sid][rid]) {
                    overwritingMap[sid][rid] = {};
                  }
                  // Save points and comments
                  if (gradeItem.points !== undefined) {
                    overwritingMap[sid][rid].points = true;
                  }
                  if (gradeItem.comment !== undefined) {
                    overwritingMap[sid][rid].comment = true;
                  }
                });

                // Perform actual merge
                subs.forEach((sub) => {
                  const sid = sub.user_id;
                  if (!sub.rubric_assessment) {
                    // No need to merge: submission has no rubric content yet
                    return;
                  }
                  // Loop through rubric items and merge
                  Object.keys(sub.rubric_assessment).forEach((rubricId) => {
                    // Get previous values
                    const oldPoints = sub.rubric_assessment[rubricId].points;
                    const oldComment = sub.rubric_assessment[rubricId].comments;

                    // Check if we're overwriting these values
                    let overwritePoints;
                    let overwriteComment;
                    if (overwritingMap[sid] && overwritingMap[sid][rubricId]) {
                      overwritePoints = overwritingMap[sid][rubricId].points;
                      overwriteComment = overwritingMap[sid][rubricId].comment;
                    }

                    // Add old value
                    if (
                      oldPoints !== undefined
                      && oldPoints !== null
                      && !overwritePoints
                    ) {
                      // We have an old points val and we're not overwriting it
                      // (include the old points value)
                      params['grade_data[' + sid + '][rubric_assessment]['
                        + rubricId + '][points]'] = oldPoints;
                    }
                    if (oldComment && !overwriteComment) {
                      // We have an old comment and we're not overwriting it
                      // (include the old comment)
                      params['grade_data[' + sid + '][rubric_assessment]['
                        + rubricId + '][comments]'] = oldComment;
                    }
                  });
                });
              }

              // Add rest of grade item updates to params
              options.gradeItems.forEach((gradeItem) => {
                if (gradeItem.rubricId) {
                  if (gradeItem.points !== undefined) {
                    params['grade_data[' + gradeItem.studentId
                      + '][rubric_assessment][' + gradeItem.rubricId
                      + '][points]'] = gradeItem.points;
                  }
                  if (gradeItem.comment) {
                    params['grade_data[' + gradeItem.studentId
                      + '][rubric_assessment][' + gradeItem.rubricId
                      + '][comments]'] = gradeItem.comment;
                  }
                } else {
                  if (gradeItem.points !== undefined) {
                    params['grade_data[' + gradeItem.studentId
                      + '][posted_grade]'] = gradeItem.points;
                  }
                  if (gradeItem.comment) {
                    params['grade_data[' + gradeItem.studentId
                      + '][text_comment]'] = gradeItem.comment;
                  }
                }
              });

              // Send request
              visitEndpoint({
                params,
                path: '/api/v1/courses/' + options.courseId + '/assignments/'
                  + options.assignmentId + '/submissions/update_grades',
                method: 'POST',
              }).then((response) => {
                return resolve({
                  response,
                  uncache: [
                    // Uncache submissions endpoint
                    '/api/v1/courses/' + options.courseId + '/assignments/'
                      + options.assignmentId + '/submissions',
                  ],
                });
              }).catch((updateGradesErr) => {
                return reject(updateGradesErr);
              });
            });
          });
        });

        /* --- 3. Wait for completion (if applicable) --- */
        if (options.waitForCompletion) {
          promiseChain = promiseChain.then((response) => {
            return new Promise((resolve, reject) => {
              // Prep for timeout
              const timeout = (60000 * (options.waitForCompletionTimeout || 2));
              const stopTime = new Date().getTime() + timeout;
              // Prep to check
              const checkPath = urlLib.parse(response.url).path;
              const checkStatus = () => {
                visitEndpoint({
                  path: checkPath,
                  params: {
                    ignoreCache: true,
                    dontCache: true,
                  },
                }).then((statusResponse) => {
                  if (statusResponse.workflow_state !== 'completed') {
                    // Not yet completed. Try again
                    if (new Date().getTime() > stopTime) {
                      // Timed out
                      return reject(new CACCLError({
                        message: 'Grade and/or comment upload timed out. This does not mean that grades did not upload, just that the queued grade and/or comment updates did not finish within our timeout window.',
                        code: errorCodes.gradeUploadTimeout,
                      }));
                    }
                    // We can try again
                    // > Try every 1/4 second
                    return setTimeout(checkStatus, 250);
                  }

                  // Success!
                  return resolve(statusResponse);
                }).catch((err) => {
                  // Error while checking status
                  return reject(new CACCLError({
                    message: 'We encountered an error while checking the status of queued grade and/or comment changes: "' + err.message + '"',
                    code: errorCodes.gradeUploadStatusError,
                  }));
                });
              };
              // Kick off check process
              checkStatus();
            });
          });
        }

        return promiseChain;
      },
    },

  ];
};