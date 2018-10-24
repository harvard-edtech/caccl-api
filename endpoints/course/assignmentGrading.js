/**
 * Assignment grading endpoints module
 * @module endpoints/course/assignmentGrading
 * @see module: endpoints/course/assignmentGrading
 */
const async = require('async');

const prefix = require('../common/prefix.js');
const errorCodes = require('../../errorCodes.js');
const waitForCompletion = require('../common/waitForCompletion.js');

module.exports = [

  /*------------------------------------------------------------------------*/
  /*                                 Grading                                */
  /*------------------------------------------------------------------------*/

  /**
   * List gradeable students for a specific assignment
   * @param {number} courseId - Canvas course Id to query
   * @param {number} assignmentId - Canvas assignment Id to query
   * @return {Promise.<Object[]>} list of Canvas users {@link https://canvas.instructure.com/doc/api/users.html#User}
   */
  {
    name: 'listGradeableStudents',
    action: 'get the list of students who are gradeable in a specific assignment in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/gradeable_students`,
        method: 'GET',
      }).then((students) => {
        return Promise.resolve(
          students.filter((s) => {
            return !s.fake_student;
          })
        );
      });
    },
  },

  /**
   * Adds a comment to a submission
   * @param {number} courseId - Canvas course Id
   * @param {number} assignmentId - Canvas course Id
   * @param {number} studentId - Canvas student Id of the sub to comment on
   * @param {string} comment - The text of the comment
   * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  {
    name: 'createAssignmentSubmissionComment',
    action: 'create a new comment on a submission',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions/${config.options.studentId}`,
        method: 'PUT',
        params: {
          'comment[text_comment]': config.options.comment,
        },
      }).then((response) => {
        return config.uncache([
          // Uncache submission
          `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions/${config.options.studentId}`,
          // Uncache list of submissions
          `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions`,
        ], response);
      });
    },
  },

  /**
   * Batch updates grades and/or comments. Also supports updating rubric items
   * @param {number} courseId - Canvas course Id
   * @param {number} assignmentId - Canvas course Id
   * @param {array} gradeItems - List of grade items to upload to Canvas:
   *   [{
   *     studentId: <student id>,
   *     points: <optional, points to overwrite with>,
   *     comment: <optional, comment to append>,
   *     rubricId: <optional, rubric item to upload to>
   *   },...]
   * @param {boolean} [waitForCompletion=false] - If true, promise won't resolve
   *   until Canvas has finished updating the grades, instead of resolving once
   *   the grade changes have been queued
   * @param {number} [waitForCompletionTimeout=2] - The number of minutes to
   *   wait before timing out the grade update job
   * @param {boolean} [dontMergeRubricItemUpdates=false] - When uploading grades
   *   to a rubric item, we intelligently merge rubric item updates with
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
  {
    name: 'updateAssignmentGrades',
    action: 'update student grades, comments, and/or rubric assessments for a specific assignment in a course',
    run(config) {
      // Create a promise chain so we can queue promises
      let promiseChain;

      /* --- 1. Check if we need to merge --- */

      // Check if we need to merge rubric item updates
      const studentsToMerge = [];
      // Check if merge is necessary
      // > not necessary if no rubric item updates
      let performRubricItemMerge = false;
      if (!config.options.dontMergeRubricItemUpdates) {
        performRubricItemMerge = config.options.gradeItems.some((item) => {
          return item.rubricId;
        });
      }

      // Pull assignment so we can get rubric information
      if (performRubricItemMerge) {
        promiseChain = config.self.getAssignment({
          courseId: config.options.courseId,
          assignmentId: config.options.assignmentId,
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
          const studentToRubricItemsIncluded = new Map();
          // ^ {studentId => { rubricId => true if being updated }}
          config.options.gradeItems.forEach((gradeItem) => {
            const { rubricId, studentId } = gradeItem;

            // Skip if this item isn't a (real) rubric item
            if (!rubricId || !isRealRubricItemId[rubricId]) {
              return;
            }

            // Keep track of rubric items that are found
            if (!studentToRubricItemsIncluded.has(studentId)) {
              // Initialize student map
              studentToRubricItemsIncluded.set(studentId, new Set());
            }
            studentToRubricItemsIncluded.get(studentId).add(rubricId);
          });
          // > Find students that need to be merged
          studentToRubricItemsIncluded.forEach((studentId, rubricIdSet) => {
            const numIncludedRubricItems = rubricIdSet.size;

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
            config.self.getAssignmentSubmission({
              courseId: config.options.courseId,
              assignmentId: config.options.assignmentId,
              studentId: config.options.studentId,
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
              config.options.gradeItem.forEach((gradeItem) => {
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
            config.options.gradeItems.forEach((gradeItem) => {
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
            config.visitEndpoint({
              params,
              path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions/update_grades`,
              method: 'POST',
            }).then((response) => {
              return config.uncache([
                // Uncache submissions endpoint
                `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions`,
              ], response);
            }).then((response) => {
              return resolve(response);
            }).catch((updateGradesErr) => {
              return reject(updateGradesErr);
            });
          });
        });
      });

      /* --- 3. Wait for completion (if applicable) --- */
      if (config.options.waitForCompletion) {
        promiseChain = promiseChain.then((progress) => {
          return waitForCompletion({
            progress,
            visitEndpoint: config.visitEndpoint,
            timeout: config.options.waitForCompletionTimeout,
          });
        });
      }

      return promiseChain;
    },
  },

];
