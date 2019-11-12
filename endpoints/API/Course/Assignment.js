/**
 * Functions for interacting with assignments within courses
 * @class api.course.assignment
 */

const fs = require('fs');
const path = require('path');
const request = require('request');
const urlLib = require('url');
const async = require('async');
const CACCLError = require('caccl-error');

const EndpointCategory = require('../../../classes/EndpointCategory');
const errorCodes = require('../../../errorCodes');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');
const waitForCompletion = require('../../common/waitForCompletion');
const EXCLUDED_PARAM = require('../../../classes/instantiateEndpoint/helpers/valueThatsExcluded');

class Assignment extends EndpointCategory {
  constructor(config) {
    super(config, Assignment);
  }
}

/*------------------------------------------------------------------------*/
/*                           Table of Contents:                           */
/*                           - Assignments                                */
/*                           - Grading                                    */
/*                           - Overrides                                  */
/*                           - Submissions                                */
/*------------------------------------------------------------------------*/

/*------------------------------------------------------------------------*/
/*                          Assignment Endpoints                          */
/*------------------------------------------------------------------------*/

/**
 * Lists the assignments in a course
 * @author Gabriel Abrams
 * @method list
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {boolean} [options.ignoreOverridesForDates] - if true, assignment
 *   dates are taken from the default dates instead of from the ones in
 *   overrides
 * @return {Promise.<Object[]>} list of Canvas Assignments {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
 */
Assignment.list = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments`,
    method: 'GET',
    params: {
      override_assignment_dates: !options.ignoreOverridesForDates,
    },
  });
};
Assignment.list.action = 'get the list of assignments in a course';

/**
 * Get info on a specific assignment in a course
 * @author Gabriel Abrams
 * @method get
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.assignmentId - Canvas assignment Id
 * @param {boolean} [options.ignoreOverridesForDates] - if true, assignment
 *   dates are taken from the default dates instead of from the ones in
 *   overrides
 * @return {Promise.<Object>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
 */
Assignment.get = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}`,
    method: 'GET',
    params: {
      override_assignment_dates: !options.ignoreOverridesForDates,
    },
  });
};
Assignment.get.action = 'get info on a specific assignment in a course';
Assignment.get.requiredParams = ['courseId', 'assignmentId'];

/**
 * Updates a Canvas assignment
 * @author Gabriel Abrams
 * @method update
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.assignmentId - Canvas assignment Id to update
 * @param {string} [options.name=current value] - The name of the assignment
 * @param {number} [options.pointsPossible=current value] - Points possible
 * @param {date} [options.dueAt=current value] - Due at datetime
 * @param {date} [options.lockAt=current value] - Due at datetime
 * @param {date} [options.unlockAt=current value] - Due at datetime
 * @param {string} [options.description=current value] - html description of
 *   the assignment
 * @param {string} [options.submissionTypes=current value] - Submission type(s)
 * @param {string} [options.allowedExtensions=current value] - List of allowed
 *   file extensions (exclude period). Online upload must be enabled
 * @param {string} [options.gradingType=current value] - Grading type
 * @param {number} [options.position=current value] - Position in assignment
 *   list
 * @param {boolean} [options.published=current value] - If true, publish page
 *   upon creation. Must be a boolean
 * @param {boolean} [options.muted=current value] - If true, assignment is
 *   muted. Must be a boolean
 * @param {number} [options.groupSetId=current value] - Student group set Id
 * @param {number} [options.assignmentGroupId=current value] - Assignment group
 *   Id
 * @param {boolean} [options.peerReviewsEnabled=current value] - If true, users
 *   asked to submit peer reviews. Must be a boolean
 * @param {boolean} [options.automaticPeerReviewsEnabled=current value] - If
 *   true, Canvas will automatically assign peer reviews. Must be a boolean
 * @param {boolean} [options.omitFromFinalGrade=current value] - If true,
 *   assignment is omitted from the final grade. Must be a boolean
 * @param {boolean} [options.gradeGroupStudentsIndividually=current value] - If
 *   true, students in groups can be given separate grades and when one student
 *   in a group gets a grade, other students do not get graded. Must be a
 *   boolean
 * @return {Promise.<Object>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
 */
Assignment.update = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}`,
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
        utils.includeIfBoolean(
          options.gradeGroupStudentsIndividually
        ),
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
  });
};
Assignment.update.action = 'update an assignment in a course';
Assignment.update.requiredParams = ['courseId', 'assignmentId'];

/**
 * Creates a Canvas assignment
 * @author Gabriel Abrams
 * @method create
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to create an assignment
 *   in
 * @param {string} [options.name=Unnamed Assignment] - The name of the
 *   assignment
 * @param {number} [options.pointsPossible=null] - Points possible
 * @param {date} [options.dueAt=null] - Due at datetime
 * @param {date} [options.lockAt=null] - Due at datetime
 * @param {date} [options.unlockAt=null] - Due at datetime
 * @param {string} [options.description=null] - html description of
 *   the assignment
 * @param {string} [options.submissionTypes=null] - Submission type(s)
 * @param {string} [options.allowedExtensions=any] - List of allowed file
 *   extensions (exclude period). Online upload must be enabled
 * @param {string} [options.gradingType=points] - Grading type
 * @param {number} [options.position=last] - Position in assignment list
 * @param {boolean} [options.published=false] - If true, publish page upon
 *   creation
 * @param {boolean} [options.muted=false] - If true, assignment is muted
 * @param {number} [options.groupSetId=null] - Student group set Id
 * @param {number} [options.assignmentGroupId=top assignment group] - Assignment
 *   group Id
 * @param {boolean} [options.peerReviewsEnabled=false] - If true, users asked to
 *   submit peer reviews
 * @param {boolean} [options.automaticPeerReviewsEnabled=false] - If true,
 *   Canvas will automatically assign peer reviews
 * @param {boolean} [options.omitFromFinalGrade=false] - If true, assignment is
 *   omitted from the final grade
 * @param {boolean} [options.gradeGroupStudentsIndividually=false] - If true,
 *   students in groups can be given separate grades and when one student in a
 *   group gets a grade, other students do not get graded
 * @param {string} [options.assignmentAppId=null] - If defined, the external
 *   tool that matches this id will be used for submissions. Also, the
 *   submission types will be overwritten with ['external_tool'] and the student
 *   will be redirected via LTI to the assignmentAppURL when they launch the
 *   assignment
 * @param {string} [options.assignmentAppURL=tool launch url] - The launch URL
 *   of the external tool. If not included and assignmentAppId is defined, we
 *   will first request info on the external tool to get its launchURL and will
 *   use that value here. Only relevant if assignmentAppId is defined.
 * @param {boolean} [options.assignmentAppNewTab=false] - Only relevant if
 *   assignmentAppId is defined. If true, when a student clicks the assignment,
 *   their LTI session with the external tool will be opened in a new tab
 * @return {Promise.<Object>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
 */
Assignment.create = function (options) {
  // Create params
  const params = {
    'assignment[name]': options.name || 'Unnamed Assignment',
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
  };

  // Prep for external tool
  let step1 = Promise.resolve();
  if (options.assignmentAppId) {
    // Using an external tool
    params['assignment[external_tool_tag_attributes][new_tab]'] = (
      !!options.assignmentAppNewTab
    );
    params['assignment[external_tool_tag_attributes][content_type]'] = (
      'context_external_tool'
    );
    params['assignment[external_tool_tag_attributes][content_id]'] = (
      options.assignmentAppId
    );
    params['assignment[submission_types]'] = ['external_tool'];

    if (options.assignmentAppURL) {
      // No need to fetch the launchURL
      params['assignment[external_tool_tag_attributes][url]'] = (
        options.assignmentAppURL
      );
    } else {
      // Need to fetch the launchURL
      step1 = (
        this.api.course.app.get({
          courseId: options.courseId,
          appId: options.assignmentAppId,
        })
          .then((app) => {
            params['assignment[external_tool_tag_attributes][url]'] = app.url;
          })
      );
    }
  } else {
    params['assignment[submission_types]'] = (
      options.submissionTypes || ['none']
    );
  }

  return step1.then(() => {
    return this.visitEndpoint({
      params,
      path: `${prefix.v1}/courses/${options.courseId}/assignments`,
      method: 'POST',
    });
  });
};
Assignment.create.action = 'create a new assignment in a course';
Assignment.create.requiredParams = ['courseId'];

/**
 * Delete an assignment
 * @author Gabriel Abrams
 * @method delete
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.assignmentId - Canvas assignment Id
 * @return {Promise.<Object>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
 */
Assignment.delete = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}`,
    method: 'DELETE',
  });
};
Assignment.delete.action = 'delete an assignment from a course';
Assignment.delete.requiredParams = ['courseId', 'assignmentId'];

/*------------------------------------------------------------------------*/
/*                            Grading Endpoints                           */
/*------------------------------------------------------------------------*/

/**
 * List gradeable students for a specific assignment
 * @author Gabriel Abrams
 * @method listGradeableStudents
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.assignmentId - Canvas assignment Id to query
 * @return {Promise.<Object[]>} list of Canvas users {@link https://canvas.instructure.com/doc/api/users.html#User}
 */
Assignment.listGradeableStudents = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/gradeable_students`,
    method: 'GET',
  })
    .then((students) => {
      return Promise.resolve(
        students.filter((s) => {
          return !s.fake_student;
        })
      );
    });
};
Assignment.listGradeableStudents.action = 'get the list of students who are gradeable in a specific assignment in a course';
Assignment.listGradeableStudents.requiredParams = ['courseId', 'assignmentId'];

/**
 * Adds a comment to a submission
 * @author Gabriel Abrams
 * @method createSubmissionComment
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.assignmentId - Canvas course Id
 * @param {number} options.studentId - Canvas student Id of the sub to comment
 *   on
 * @param {string} options.comment - The text of the comment
 * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.createSubmissionComment = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions/${options.studentId}`,
    method: 'PUT',
    params: {
      'comment[text_comment]': options.comment,
    },
  });
};
Assignment.createSubmissionComment.action = 'create a new comment on a submission';
Assignment.createSubmissionComment.requiredParams = [
  'courseId',
  'assignmentId',
  'studentId',
];

/**
 * Updates a student's grade and/or comment
 * @author Gabriel Abrams
 * @method updateGrade
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course id
 * @param {number} options.assignmentId - Canvas assignment id
 * @param {number} options.studentId - Canvas student id
 * @param {number} [options.points] - the overall points to assign to the
 *   student
 * @param {string} [options.comment] - the grader comment to leave on the
 *   submission
 * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.updateGrade = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions/${options.studentId}`,
    method: 'PUT',
    params: {
      'comment[text_comment]': utils.includeIfTruthy(options.comment),
      'submission[posted_grade]': utils.includeIfNumber(options.points),
    },
  });
};
Assignment.updateGrade.action = 'update student grade and/or comments for a specific assignment in a course';
Assignment.updateGrade.requiredParams = [
  'courseId',
  'assignmentId',
  'studentId',
];

/**
 * Batch updates grades and/or comments. Also supports updating rubric items
 * @author Gabriel Abrams
 * @method updateGrades
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.assignmentId - Canvas assignment Id
 * @param {array} options.gradeItems - List of grade items to upload to Canvas:
 *   [{
 *     studentId: <student id>,
 *     points: <optional, points to overwrite with>,
 *     comment: <optional, comment to append (or overwrite if rubric comment)>,
 *     rubricId: <optional, rubric item (overrall grade/comment if excluded)>
 *   },...]
 * @param {boolean} [options.waitForCompletion=false] - If true, promise won't
 *   resolve until Canvas has finished updating the grades, instead of resolving
 *   once the grade changes have been queued
 * @param {number} [options.waitForCompletionTimeout=2] - The number of minutes
 *   to wait before timing out the grade update job
 * @param {boolean} [options.dontMergeRubricItemUpdates=false] - When uploading
 *   grades to a rubric item, we intelligently merge rubric item updates with
 *   previous rubric assessments. For instance, if the assignment's rubric is:
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
 * @return {Promise.<Object>} Canvas Progress object {@link https://canvas.instructure.com/doc/api/progress.html#Progress}
 */
Assignment.updateGrades = function (options) {
  // Create a promise chain so we can queue promises
  let promiseChain;

  /* --- 1. Check if we need to merge --- */

  // Check if we need to merge rubric item updates
  const studentsToMerge = [];
  // Check if merge is necessary
  // > not necessary if no rubric item updates
  let performRubricItemMerge = false;
  if (!options.dontMergeRubricItemUpdates) {
    performRubricItemMerge = options.gradeItems.some((item) => {
      return item.rubricId;
    });
  }

  // Pull assignment so we can get rubric information
  if (performRubricItemMerge) {
    promiseChain = this.api.course.assignment.get({
      courseId: options.courseId,
      assignmentId: options.assignmentId,
    })
      .then((assignment) => {
        if (!assignment.rubric) {
          // This assignment doesn't have a rubric
          throw new CACCLError({
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
        const studentToRubricItemsOverwritten = new Map();
        const allStudentsWithRubricItems = new Set();
        // ^ {studentId => { Set of rubric ids being uploaded }}
        options.gradeItems.forEach((gradeItem) => {
          const { rubricId, studentId } = gradeItem;
          allStudentsWithRubricItems.add(studentId);

          // Skip if this item isn't a (real) rubric item
          if (!rubricId || !isRealRubricItemId[rubricId]) {
            return;
          }

          // Only mark this rubric item as being overwritten if both points and
          // comments are being overwritten
          if (
            gradeItem.points === undefined
            || gradeItem.points === null
            || !gradeItem.comment
          ) {
            // Not completely overwriting
            return;
          }

          // Keep track of rubric items that are found
          if (!studentToRubricItemsOverwritten.has(studentId)) {
            // Initialize student map
            studentToRubricItemsOverwritten.set(studentId, new Set());
          }
          studentToRubricItemsOverwritten.get(studentId).add(rubricId);
        });

        // > Find students that need to be merged (has some rubric items but not
        // completely overwriting all of them)
        allStudentsWithRubricItems.forEach((studentId) => {
          const numOverwrittenItems = (
            (studentToRubricItemsOverwritten[studentId] || { size: 0 }).size
          );

          if (numOverwrittenItems < numRubricItems) {
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
      const _fetchSub = (studentId, next) => {
        this.api.course.assignment.getSubmission({
          studentId,
          courseId: options.courseId,
          assignmentId: options.assignmentId,
          includeRubricAssessment: true,
          excludeUser: true, // Save request space
        })
          .then((response) => {
            return next(null, response);
          })
          .catch((err) => {
            return next(err);
          });
      };

      // Pull all student submissions, 20 at a time
      async.mapLimit(studentsToMerge, 10, _fetchSub, (err, subs) => {
        if (err) {
          return reject(err);
        }

        try {
          // Prep for merge (if applicable)
          const params = {};

          if (subs.length > 0) {
            // Keep track of which items are being overwritten
            const overwritingMap = {};
            // ^ {studentId => rubricId => {
            //      points: true/false, is being overwritten,
            //      comment: true/false, is being overwritten
            //    }}
            options.gradeItems.forEach((gradeItem) => {
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
              if (!sub.rubric_assessment) {
                // No need to merge: submission has no rubric content yet
                return;
              }
              const sid = sub.user_id;
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
                  params[`grade_data[${sid}][rubric_assessment][${rubricId}][points]`] = oldPoints;
                }
                if (oldComment && !overwriteComment) {
                  // We have an old comment and we're not overwriting it
                  // (include the old comment)
                  params[`grade_data[${sid}][rubric_assessment][${rubricId}][comments]`] = oldComment;
                }
              });
            });
          }

          // Add rest of grade item updates to params
          options.gradeItems.forEach((gradeItem) => {
            if (gradeItem.rubricId) {
              if (gradeItem.points !== undefined) {
                params[`grade_data[${gradeItem.studentId}][rubric_assessment][${gradeItem.rubricId}][points]`] = gradeItem.points;
              }
              if (gradeItem.comment) {
                params[`grade_data[${gradeItem.studentId}][rubric_assessment][${gradeItem.rubricId}][comments]`] = gradeItem.comment;
              }
            } else {
              if (gradeItem.points !== undefined) {
                params[`grade_data[${gradeItem.studentId}][posted_grade]`] = gradeItem.points;
              }
              if (gradeItem.comment) {
                params[`grade_data[${gradeItem.studentId}][text_comment]`] = gradeItem.comment;
              }
            }
          });

          // Send request
          this.visitEndpoint({
            params,
            path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions/update_grades`,
            method: 'POST',
          })
            .then((response) => {
              return resolve(response);
            })
            .catch((updateGradesErr) => {
              return reject(updateGradesErr);
            });
        } catch (mergeError) {
          return reject(mergeError);
        }
      });
    });
  });

  /* --- 3. Wait for completion (if applicable) --- */
  if (options.waitForCompletion) {
    promiseChain = promiseChain.then((progress) => {
      return waitForCompletion({
        progress,
        visitEndpoint: this.visitEndpoint,
        timeout: options.waitForCompletionTimeout,
      });
    });
  }

  return promiseChain;
};
Assignment.updateGrades.action = 'update student grades, comments, and/or rubric assessments for a specific assignment in a course';
Assignment.updateGrades.requiredParams = [
  'courseId',
  'assignmentId',
  'gradeItems',
];

/*------------------------------------------------------------------------*/
/*                      Assignment Override Endpoints                     */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of overrides for an assignment
 * @author Gabriel Abrams
 * @method listOverrides
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course id to query
 * @param {number} options.assignmentId - Canvas assignment id to look up
 * @return {Promise.<Object[]>} list of Canvas AssignmentOverrides {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
 */
Assignment.listOverrides = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/overrides`,
    method: 'GET',
  });
};
Assignment.listOverrides.action = 'get a list of assignment overrides for a specific assignment in a course';
Assignment.listOverrides.requiredParams = ['courseId', 'assignmentId'];

/**
 * Get a specific override on an assignment in a course
 * @author Gabriel Abrams
 * @method getOverride
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course id to query
 * @param {number} options.assignmentId - Canvas assignment id to query
 * @param {number} options.overrideId - Canvas override id to look up
 * @return {Promise.<Object>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
 */
Assignment.getOverride = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/overrides/${options.overrideId}`,
    method: 'GET',
  });
};
Assignment.getOverride.action = 'get a list of assignment overrides for a specific assignment in a course';
Assignment.getOverride.requiredParams = ['courseId', 'assignmentId'];

/**
 * Create assignment override. Note that if any dates (dueAt, unlockAt, or
 *   lockAt) are left out, they will be set to "none" for the target(s) of this
 *   override. If dueAt is omitted, the target(s) will have no deadline. If
 *   unlockAt is omitted, the target(s) will immediately be able to see the
 *   assignment (even if everyone else has to wait until the unlockAt date). If
 *   lockAt is omitted, the target(s) will be able to submit at any
 *   time in the future (even if everyone else can't submit because their lock
 *   date has passed). In short, it is not recommended to omit dates that are
 *   defined in the assignment.
 * @author Gabriel Abrams
 * @method createOverride
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course id
 * @param {number} options.assignmentId - Canvas assignment id
 * @param {array} options.studentIds - List of Canvas student IDs to override
 *   (Note: either studentIds, groupId, or sectionId must be included)
 * @param {number} options.groupId - Group to override, must be a group
 *   assignment (Note: either studentIds, groupId, or sectionId must be
 *   included)
 * @param {number} options.sectionId - Section to override (Note: either
 *   studentIds, groupId, or sectionId must be included)
 * @param {string} [options.title=Override for X students] - Title of the
 *   override
 * @param {date} [options.dueAt=no due date] - New due date. If excluded, the
 *   target(s) of this override have no due date (they can submit whenever they
 *   want without being marked as late)
 * @param {date} [options.unlockAt=no unlock date] - New unlock date. If
 *   excluded, the target(s) of this override can immediately see the assignment
 *   (their unlock date is the beginning of time)
 * @param {date} [options.lockAt=no lock date] - New lock date. If excluded,
 *   the target(s) of this override can see and submit the assignment at
 *   any point in the future (their lock date is the end of time)
 * @return {Promise.<Object>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
 */
Assignment.createOverride = function (options) {
  let { title } = options;
  if (!title) {
    title = `Override for ${options.studentIds.length} student${utils.sIfPlural(options.studentIds.length)}`;
  }

  // Pre-process dates
  let dueAt = utils.includeIfDate(options.dueAt);
  if (!dueAt || dueAt === EXCLUDED_PARAM) {
    dueAt = null;
  }
  let unlockAt = utils.includeIfDate(options.unlockAt);
  if (!unlockAt || unlockAt === EXCLUDED_PARAM) {
    unlockAt = null;
  }
  let lockAt = utils.includeIfDate(options.lockAt);
  if (!lockAt || lockAt === EXCLUDED_PARAM) {
    lockAt = null;
  }

  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/overrides`,
    method: 'POST',
    params: {
      'assignment_override[title]': utils.includeIfTruthy(title),
      'assignment_override[student_ids]':
        utils.includeIfTruthy(options.studentIds),
      'assignment_override[group_id]':
        utils.includeIfTruthy(options.groupId),
      'assignment_override[course_section_id]':
        utils.includeIfTruthy(options.sectionId),
      'assignment_override[due_at]': dueAt,
      'assignment_override[unlock_at]': unlockAt,
      'assignment_override[lock_at]': lockAt,
    },
  })
    .then((response) => {
      return this.uncache([
        // Uncache batch override list
        `${prefix.v1}/courses/${options.courseId}/assignments/overrides`,
      ], response);
    });
};
Assignment.createOverride.action = 'create a new override for a specific assignment in a course';
Assignment.createOverride.requiredParams = [
  'courseId',
  'assignmentId',
];

/**
 * Update an assignment override. Note: target can only be updated if the
 *   override is a student override (if this is a group or section override,
 *   the target remains unchanged).
 *   Also, note that if any dates (dueAt, unlockAt, or lockAt) are omitted,
 *   their previous override values will be changed to "none." For instance,
 *   if the previous override has a dueAt and the update does not, the updated
 *   override will have no dueAt date (the target(s) of the override will have
 *   no deadline).
 * @author Gabriel Abrams
 * @method updateOverride
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course id
 * @param {number} options.assignmentId - Canvas assignment id
 * @param {number} options.overrideId - the override id to update
 * @param {array} options.studentIds - List of Canvas student IDs to override
 *   (Note: either studentIds, groupId, or sectionId must be included)
 * @param {string} [options.title=current value] - New title of the
 *   override
 * @param {date} [options.dueAt=no due date] - New due date. If excluded, the
 *   target(s) of this override have no due date (they can submit whenever they
 *   want without being marked as late)
 * @param {date} [options.unlockAt=no unlock date] - New unlock date. If
 *   excluded, the target(s) of this override can immediately see the assignment
 *   (their unlock date is the beginning of time)
 * @param {date} [options.lockAt=no lock date] - New lock date. If excluded,
 *   the target(s) of this override can see and submit the assignment at
 *   any point in the future (their lock date is the end of time)
 * @return {Promise.<Object>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
 */
Assignment.updateOverride = function (options) {
  // Pre-process dates
  let dueAt = utils.includeIfDate(options.dueAt);
  if (!dueAt || dueAt === EXCLUDED_PARAM) {
    dueAt = null;
  }
  let unlockAt = utils.includeIfDate(options.unlockAt);
  if (!unlockAt || unlockAt === EXCLUDED_PARAM) {
    unlockAt = null;
  }
  let lockAt = utils.includeIfDate(options.lockAt);
  if (!lockAt || lockAt === EXCLUDED_PARAM) {
    lockAt = null;
  }

  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/overrides/${options.overrideId}`,
    method: 'PUT',
    params: {
      'assignment_override[title]': utils.includeIfTruthy(options.title),
      'assignment_override[student_ids]':
        utils.includeIfTruthy(options.studentIds),
      'assignment_override[due_at]': dueAt,
      'assignment_override[unlock_at]': unlockAt,
      'assignment_override[lock_at]': lockAt,
    },
  })
    .then((response) => {
      return this.uncache([
        // Uncache batch override list
        `${prefix.v1}/courses/${options.courseId}/assignments/overrides`,
      ], response);
    });
};
Assignment.updateOverride.action = 'update an override for a specific assignment in a course';
Assignment.updateOverride.requiredParams = [
  'courseId',
  'assignmentId',
  'overrideId',
];

/**
 * Deletes an assignment override
 * @author Gabriel Abrams
 * @method deleteOverride
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course id to query
 * @param {number} options.assignmentId - Canvas assignment id to query
 * @param {number} options.overrideId - Canvas override id to look up
 * @return {Promise.<Object>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
 */
Assignment.deleteOverride = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/overrides/${options.overrideId}`,
    method: 'DELETE',
  })
    .then((response) => {
      return this.uncache([
        // Uncache batch override list
        `${prefix.v1}/courses/${options.courseId}/assignments/overrides`,
      ], response);
    });
};
Assignment.deleteOverride.action = 'delete an override for a specific assignment in a course';
Assignment.deleteOverride.requiredParams = [
  'courseId',
  'assignmentId',
  'overrideId',
];

/*------------------------------------------------------------------------*/
/*                     Assignment Submission Endpoints                    */
/*------------------------------------------------------------------------*/

// Helpers

/**
 * Passes through or retrieves the current user's Canvas id
 * @param {API} api - Instance of caccl-api
 * @param {number} [userId] - The Canvas Id of the current user. Passed through
 *   by default if we already know it
 * @return {Promise.<number>} Canvas Id of the current user
 */
const getCurrentUserId = (api, userId) => {
  // Resolve if we already have the user's id
  if (userId) {
    return Promise.resolve(userId);
  }
  return api.user.self.getProfile()
    .then((profile) => {
      return Promise.resolve(profile.id);
    });
};

// Endpoints

/**
 * Lists the submissions to a specific assignment in a course
 * @author Gabriel Abrams
 * @method listSubmissions
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.assignmentId - The Canvas assignment Id to query
 * @param {boolean} [options.includeComments=false] - If truthy, includes all
 *   comments on submissions
 * @param {boolean} [options.includeRubricAssessment=false] - If truthy,
 *   includes rubric assessments: breakdown of score for each rubric item
 * @param {boolean} [options.excludeUser=false] - If truthy, excludes
 *   submission[i].user value with the submission's user information
 * @param {boolean} [options.includeTestStudent=true] - If truthy, includes
 *   dummy submission by test student (student view) if there is one
 * @return {Promise.<Object[]>} list of Canvas submissions {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.listSubmissions = function (options) {
  // Fetch the user info if we're not excluding user info OR if we're
  // filtering out the test student (we need user info to filter)
  const fetchUser = (
    !options.includeTestStudent
    || !options.excludeUser
  );

  const fetchPromise = this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions`,
    method: 'GET',
    params: {
      include: utils.genIncludesList({
        submission_comments: options.includeComments,
        rubric_assessment: options.includeRubricAssessment,
        user: fetchUser,
      }),
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
};
Assignment.listSubmissions.action = 'list the submissions to a specific assignment in a course';
Assignment.listSubmissions.requiredParams = ['courseId', 'assignmentId'];

/**
 * Gets a single submission for an assignment
 * @author Gabriel Abrams
 * @method getSubmission
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.assignmentId - The Canvas assignment Id
 * @param {number} options.studentId - The Canvas student Id
 * @param {boolean} [options.includeComments=false] - If truthy, includes all
 *   comments on submissions
 * @param {boolean} [options.includeRubricAssessment=false] - If truthy,
 *   includes rubric assessments: breakdown of score for each rubric item
 * @param {boolean} [options.excludeUser=false] - If truthy, excludes
 *   submission[i].user value with the submission's user information
 * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.getSubmission = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions/${options.studentId}`,
    method: 'GET',
    params: {
      include: utils.genIncludesList({
        submission_comments: options.includeComments,
        rubric_assessment: options.includeRubricAssessment,
        user: !options.excludeUser,
      }),
    },
  });
};
Assignment.getSubmission.action = 'get a specific submission to an assignment in a course';
Assignment.getSubmission.requiredParams = [
  'courseId',
  'assignmentId',
  'studentId',
];

/**
 * Creates a text submission on behalf of the current user
 * @author Gabriel Abrams
 * @method createTextSubmission
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.assignmentId - The Canvas assignment Id
 * @param {string} options.text - The text body of the submission
 * @param {number} [options.currentUserId] - The current user's Canvas Id.
 *   If not included, we call the current user endpoint
 * @param {string} [options.comment] - A text student comment to include
 * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.createTextSubmission = function (options) {
  let submitterId;
  return getCurrentUserId(
    this.api,
    options.currentUserId
  )
    .then((currentUserId) => {
      submitterId = currentUserId;
      return this.visitEndpoint({
        path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions`,
        method: 'POST',
        params: {
          'comment[text_comment]':
            utils.includeIfTruthy(options.comment),
          'submission[body]': options.text,
          'submission[submission_type]': 'online_text_entry',
        },
      });
    })
    .then((response) => {
      // TODO: if submitterId is the same as response.id, remove this whole
      // uncache block

      // Submission created. Now, create response and uncache paths
      return this.uncache([
        // Uncache this person's submission
        `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions/${submitterId}`,
      ], response);
    });
};
Assignment.createTextSubmission.action = 'create a text submission to a specific assignment in a course on behalf of the current user';
Assignment.createTextSubmission.requiredParams = [
  'courseId',
  'assignmentId',
  'text',
];

/**
 * Creates a url submission on behalf of the current user
 * @author Gabriel Abrams
 * @method createURLSubmission
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.assignmentId - The Canvas assignment Id
 * @param {string} options.url - The url of the submission
 * @param {number} [options.currentUserId] - The current user's Canvas Id.
 *   If not included, we call the current user endpoint
 * @param {string} [options.comment] - A text student comment to include
 * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.createURLSubmission = function (options) {
  let submitterId;
  return getCurrentUserId(
    this.api,
    options.currentUserId
  )
    .then((currentUserId) => {
      submitterId = currentUserId;
      return this.visitEndpoint({
        path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions`,
        method: 'POST',
        params: {
          'comment[text_comment]':
            utils.includeIfTruthy(options.comment),
          'submission[url]': options.url,
          'submission[submission_type]': 'online_url',
        },
      });
    })
    .then((response) => {
      // TODO: if submitterId is the same as response.id, remove this whole
      // uncache block

      // Submission created. Now, create response and uncache paths
      return this.uncache([
        // Uncache this person's submission
        `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions/${submitterId}`,
      ], response);
    });
};
Assignment.createURLSubmission.action = 'create a url submission to a specific assignment in a course on behalf of the current user';
Assignment.createURLSubmission.requiredParams = [
  'courseId',
  'assignmentId',
  'url',
];

/**
 * Creates a file submission on behalf of the current user
 * @author Gabriel Abrams
 * @method createFileSubmission
 * @memberof api.course.assignment
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.assignmentId - The Canvas assignment Id
 * @param {string} options.filenames - The filenames to upload to the submission
 * @param {number} [options.currentUserId] - The current user's Canvas Id.
 *   If not included, we call the current user endpoint
 * @param {string} [options.comment] - A text student comment to include
 * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.createFileSubmission = function (options) {
  let submitterId;
  return getCurrentUserId(
    this.api,
    options.currentUserId
  )
    .then((currentUserId) => {
      submitterId = currentUserId;

      // Throw error if no files were included
      if (options.filenames.length === 0) {
        throw new CACCLError({
          message: 'Could not make a file submission because no files were included.',
          code: errorCodes.noSubmissionFiles,
        });
      }


      // Function that uploads an individual file
      const uploadFile = (filename, next) => {
        // 1. Prepare the file upload (create a slot to upload into)
        this.visitEndpoint({
          path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions/self/files`,
          method: 'POST',
          params: {
            name: path.basename(filename),
          },
        })
          .then((response) => {
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
                this.visitEndpoint({
                  host: parsed.hostname,
                  path: parsed.path,
                  method: 'POST',
                })
                  .then((verifyResponse) => {
                    // File verified! Continue with file id
                    return next(null, verifyResponse.id);
                  })
                  .catch((verifyError) => {
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
        // Now that we have a function  upload one file,
        // upload all files in parallel (3 at a time max)
        async.mapLimit(
          options.filenames,
          3,
          uploadFile,
          (err, fileIds) => {
            if (err) {
              // At least one file failed
              return reject(err);
            }

            // All files succeeded! Continue and submit the assignment
            this.visitEndpoint({
              path: `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions`,
              method: 'POST',
              params: {
                'submission[submission_type]': 'online_upload',
                'submission[file_ids]': fileIds,
                'comment[text_comment]':
                  utils.includeIfTruthy(options.comment),
              },
            })
              .then((response) => {
                // Resolve the sendSubmissionPromise now that actual
                // submission was made
                return resolve(response);
              })
              .catch((submitError) => {
                return reject(submitError);
              });
          }
        );
      })
        .catch((prepError) => {
          throw new CACCLError({
            message: `We could not prep Canvas to accept a new submission file because we ran into an error: "${prepError.message}". If you think this isn't expected, please contact an admin.`,
            code: errorCodes.submissionFilePrepFailed,
          });
        });
    })
    .then((response) => {
      // TODO: if submitterId is the same as response.id, remove this whole
      // uncache block

      // Submission created. Now, create response and uncache paths
      return this.uncache([
        // Uncache this person's submission
        `${prefix.v1}/courses/${options.courseId}/assignments/${options.assignmentId}/submissions/${submitterId}`,
      ], response);
    });
};
Assignment.createFileSubmission.action = 'create a file submission to a specific assignment in a course on behalf of the current user';
Assignment.createFileSubmission.requiredParams = [
  'courseId',
  'assignmentId',
  'filenames',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Assignment;
