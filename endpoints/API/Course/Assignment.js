const fs = require('fs');
const path = require('path');
const request = require('request');
const urlLib = require('url');
const async = require('async');

const CACCLError = require('../../../../caccl-error/index.js'); // TODO: use actual library
const EndpointCategory = require('../../../classes/EndpointCategory.js');
const errorCodes = require('../../../errorCodes.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');
const waitForCompletion = require('../../common/waitForCompletion.js');

class Assignment extends EndpointCategory {
  constructor(config) {
    super(config, Assignment);
  }
}


/*------------------------------------------------------------------------*/
/*                          Assignment Endpoints                          */
/*------------------------------------------------------------------------*/

/**
 * Lists the assignments in a course
 * @method list
 * @param {number} courseId - Canvas course Id to query
 * @return {Promise.<Object[]>} list of Canvas Assignments {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
 */
Assignment.list = (config) => {
  // @action: get the list of assignments in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments`,
    method: 'GET',
  });
};

/**
 * Get info on a specific assignment in a course
 * @method get
 * @param {number} courseId - Canvas course Id to query
 * @param {number} assignmentId - Canvas assignment Id
 * @return {Promise.<Object>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
 */
Assignment.get = (config) => {
  // @action: get info on a specific assignment in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}`,
    method: 'GET',
  });
};

/**
 * Updates a Canvas assignment
 * @method update
 * @param {number} courseId - Canvas course Id to query
 * @param {number} assignmentId - Canvas assignment Id to update
 * @param {string} [name=current value] - The name of the assignment
 * @param {number} [pointsPossible=current value] - Points possible
 * @param {date} [dueAt=current value] - Due at datetime
 * @param {date} [lockAt=current value] - Due at datetime
 * @param {date} [unlockAt=current value] - Due at datetime
 * @param {string} [description=current value] - html description of
 *   the assignment
 * @param {string} [submissionTypes=current value] - Submission type(s)
 * @param {string} [allowedExtensions=current value] - List of allowed file
 *   extensions (exclude period). Online upload must be enabled
 * @param {string} [gradingType=current value] - Grading type
 * @param {number} [position=current value] - Position in assignment list
 * @param {boolean} [published=current value] - If true, publish page upon
 *   creation. Must be a boolean
 * @param {boolean} [muted=current value] - If true, assignment is muted. Must
 *   be a boolean
 * @param {number} [groupSetId=current value] - Student group set Id
 * @param {number} [assignmentGroupId=current value] - Assignment group Id
 * @param {boolean} [peerReviewsEnabled=current value] - If true, users asked
 *   to submit peer reviews. Must be a boolean
 * @param {boolean} [automaticPeerReviewsEnabled=current value] - If true,
 *   Canvas will automatically assign peer reviews. Must be a boolean
 * @param {boolean} [omitFromFinalGrade=current value] - If true, assignment
 *   is omitted from the final grade. Must be a boolean
 * @param {boolean} [gradeGroupStudentsIndividually=current value] - If true,
 *   students in groups can be given separate grades and when one student in a
 *   group gets a grade, other students do not get graded. Must be a boolean
 * @return {Promise.<Object>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
 */
Assignment.update = (config) => {
  // @action: updates an assignment in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}`,
    method: 'PUT',
    params: {
      'assignment[name]': utils.includeIfTruthy(config.options.name),
      'assignment[submission_types]':
        utils.includeIfTruthy(config.options.submissionTypes),
      'assignment[grading_type]':
        utils.includeIfTruthy(config.options.gradingType),
      position: utils.includeIfTruthy(config.options.position),
      'assignment[peer_reviews]':
        utils.includeIfBoolean(config.options.peerReviewsEnabled),
      'assignment[automatic_peer_reviews]':
        utils.includeIfBoolean(config.options.automaticPeerReviewsEnabled),
      'assignment[grade_group_students_individually]':
        utils.includeIfBoolean(
          config.options.gradeGroupStudentsIndividually
        ),
      'assignment[description]':
        utils.includeIfTruthy(config.options.description),
      'assignment[allowed_extensions]':
        utils.includeIfTruthy(config.options.allowedExtensions),
      'assignment[group_category_id]':
        utils.includeIfTruthy(config.options.groupSetId),
      'assignment[points_possible]':
        utils.includeIfNumber(config.options.pointsPossible),
      'assignment[due_at]': utils.includeIfDate(config.options.dueAt),
      'assignment[lock_at]': utils.includeIfDate(config.options.lockAt),
      'assignment[unlock_at]': utils.includeIfDate(config.options.unlockAt),
      'assignment[published]':
        utils.includeIfBoolean(config.options.published),
      'assignment[assignment_group_id]':
        utils.includeIfNumber(config.options.assignmentGroupId),
      'assignment[omit_from_final_grade]':
        utils.includeIfBoolean(config.options.omitFromFinalGrade),
      'assignment[muted]': utils.includeIfBoolean(config.options.muted),
    },
  }).then((response) => {
    return config.uncache([
      // Uncache assignment and sub-endpoints
      `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}*`,
      // Uncache assignment list
      `${prefix.v1}/courses/${config.options.courseId}/assignments`,
    ], response);
  });
};

/**
 * Creates a Canvas assignment
 * @method create
 * @param {number} courseId - Canvas course Id to create an assignment in
 * @param {string} name - The name of the assignment
 *   (default: Unnamed Assignment)
 * @param {number} [pointsPossible=null] - Points possible
 * @param {date} [dueAt=null] - Due at datetime
 * @param {date} [lockAt=null] - Due at datetime
 * @param {date} [unlockAt=null] - Due at datetime
 * @param {string} [description=null] - html description of
 *   the assignment
 * @param {string} [submissionTypes=null] - Submission type(s)
 * @param {string} [allowedExtensions=any] - List of allowed file extensions
 *   (exclude period). Online upload must be enabled
 * @param {string} [gradingType=points] - Grading type
 * @param {number} [position=last] - Position in assignment list
 * @param {boolean} [published=false] - If true, publish page upon
 *   creation
 * @param {boolean} [muted=false] - If true, assignment is muted
 * @param {number} [groupSetId=null] - Student group set Id
 * @param {number} [assignmentGroupId=top assignment group] - Assignment group
 *   Id
 * @param {boolean} [peerReviewsEnabled=false] - If true, users asked to
 *   submit peer reviews
 * @param {boolean} [automaticPeerReviewsEnabled=false] - If true, Canvas will
 *   automatically assign peer reviews
 * @param {boolean} [omitFromFinalGrade=false] - If true, assignment is
 *   omitted from the final grade
 * @param {boolean} [gradeGroupStudentsIndividually=false] - If true, students
 *   in groups can be given separate grades and when one student in a group
 *   gets a grade, other students do not get graded
 * @return {Promise.<Object>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
 */
Assignment.create = (config) => {
  // @action: create a new assignment in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments`,
    method: 'POST',
    params: {
      'assignment[name]': config.options.name || 'Unnamed Assignment',
      'assignment[submission_types]': config.options.submissionTypes || ['none'],
      'assignment[grading_type]': config.options.gradingType || 'points',
      position: utils.includeIfTruthy(config.options.position),
      'assignment[peer_reviews]':
        utils.isTruthy(config.options.peerReviewsEnabled),
      'assignment[automatic_peer_reviews]':
        utils.isTruthy(config.options.automaticPeerReviewsEnabled),
      'assignment[grade_group_students_individually]':
        utils.isTruthy(config.options.gradeGroupStudentsIndividually),
      'assignment[description]':
        utils.includeIfTruthy(config.options.description),
      'assignment[allowed_extensions]':
        utils.includeIfTruthy(config.options.allowedExtensions),
      'assignment[group_category_id]':
        utils.includeIfTruthy(config.options.groupSetId),
      'assignment[points_possible]':
        utils.includeIfNumber(config.options.pointsPossible),
      'assignment[due_at]': utils.includeIfDate(config.options.dueAt),
      'assignment[lock_at]': utils.includeIfDate(config.options.lockAt),
      'assignment[unlock_at]': utils.includeIfDate(config.options.unlockAt),
      'assignment[published]':
        utils.isTruthy(config.options.published),
      'assignment[assignment_group_id]':
        utils.includeIfNumber(config.options.assignmentGroupId),
      'assignment[omit_from_final_grade]':
        utils.isTruthy(config.options.omitFromFinalGrade),
      'assignment[muted]': utils.isTruthy(config.options.muted),
    },
  }).then((response) => {
    return config.uncache([
      // Uncache assignment and sub-endpoints
      `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}*`,
      // Uncache assignment list
      `${prefix.v1}/courses/${config.options.courseId}/assignments`,
    ], response);
  });
};

/**
 * Delete an assignment
 * @method delete
 * @param {number} courseId - Canvas course Id
 * @param {number} assignmentId - Canvas assignment Id
 * @return {Promise.<Object>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
 */
Assignment.delete = (config) => {
  // @action: delete an assignment from a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}`,
    method: 'DELETE',
  }).then((response) => {
    return config.uncache([
      // Uncache assignment and sub-endpoints
      `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}*`,
      // Uncache assignment list
      `${prefix.v1}/courses/${config.options.courseId}/assignments`,
    ], response);
  });
};

/*------------------------------------------------------------------------*/
/*                            Grading Endpoints                           */
/*------------------------------------------------------------------------*/

/**
 * List gradeable students for a specific assignment
 * @method listGradeableStudents
 * @param {number} courseId - Canvas course Id to query
 * @param {number} assignmentId - Canvas assignment Id to query
 * @return {Promise.<Object[]>} list of Canvas users {@link https://canvas.instructure.com/doc/api/users.html#User}
 */
Assignment.listGradeableStudents = (config) => {
  // @action: get the list of students who are gradeable in a specific assignment in a course
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
};

/**
 * Adds a comment to a submission
 * @method createSubmissionComment
 * @param {number} courseId - Canvas course Id
 * @param {number} assignmentId - Canvas course Id
 * @param {number} studentId - Canvas student Id of the sub to comment on
 * @param {string} comment - The text of the comment
 * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.createSubmissionComment = (config) => {
  // @action: create a new comment on a submission
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
};

/**
 * Batch updates grades and/or comments. Also supports updating rubric items
 * @method updateGrades
 * @param {number} courseId - Canvas course Id
 * @param {number} assignmentId - Canvas course Id
 * @param {array} gradeItems - List of grade items to upload to Canvas:
 *   [{
 *     studentId: <student id>,
 *     points: <optional, points to overwrite with>,
 *     comment: <optional, comment to append (or overwrite if rubric comment)>,
 *     rubricId: <optional, rubric item (overrall grade/comment if excluded)>
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
Assignment.updateGrades = (config) => {
  // @action: update student grades, comments, and/or rubric assessments for a specific assignment in a course

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
    promiseChain = config.api.course.assignment.get({
      courseId: config.options.courseId,
      assignmentId: config.options.assignmentId,
    }).then((assignment) => {
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
      config.options.gradeItems.forEach((gradeItem) => {
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
        config.api.course.assignment.getSubmission({
          studentId,
          courseId: config.options.courseId,
          assignmentId: config.options.assignmentId,
          includeRubricAssessment: true,
          excludeUser: true, // Save request space
        }).then((response) => {
          return next(null, response);
        }).catch((err) => {
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
            config.options.gradeItems.forEach((gradeItem) => {
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
              `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions*`,
            ], response);
          }).then((response) => {
            return resolve(response);
          }).catch((updateGradesErr) => {
            return reject(updateGradesErr);
          });
        } catch (mergeError) {
          return reject(mergeError);
        }
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
};

/*------------------------------------------------------------------------*/
/*                      Assignment Override Endpoints                     */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of overrides for an assignment
 * @method listOverrides
 * @param {number} courseId - Canvas course id to query
 * @param {number} assignmentId - Canvas assignment id to look up
 * @return {Promise.<Object[]>} list of Canvas AssignmentOverrides {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
 */
Assignment.listOverrides = (config) => {
  // @action: get a list of assignment overrides for a specific assignment in a course',
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/overrides`,
    method: 'GET',
  });
};

/**
 * Get a specific override on an assignment in a course
 * @method getOverride
 * @param {number} courseId - Canvas course id to query
 * @param {number} assignmentId - Canvas assignment id to query
 * @param {number} overrideId - Canvas override id to look up
 * @return {Promise.<Object>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
 */
Assignment.getOverride = (config) => {
  // @action: get a list of assignment overrides for a specific assignment in a course',
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/overrides/${config.options.overrideId}`,
    method: 'GET',
  });
};

/**
 * Create assignment override.
 * @method createOverride
 * @param {number} courseId - Canvas course id
 * @param {number} assignmentId - Canvas assignment id
 * @param {array} studentIds - List of Canvas student IDs to override (Note:
 *   either studentIds, groupId, or sectionId must be included)
 * @param {number} groupId - Group to override, must be a group assignment
 *   (Note: either studentIds, groupId, or sectionId must be included)
 * @param {number} sectionId - Section to override (Note: either studentIds,
 *   groupId, or sectionId must be included)
 * @param {string} [title=Override for X students] - Title of the override
 * @param {date} [dueAt=current value] - New due date or null to remove due
 *   date
 * @param {date} [unlockAt=current value] - New unlock date or null to remove
 *   unlock date
 * @param {date} [lockAt=current value] - New lock date or null to remove lock
 *   date
 * @return {Promise.<Object>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
 */
Assignment.createOverride = (config) => {
  // @action: create a new override for a specific assignment in a course',
  let { title } = config.options;
  if (!title) {
    title = `Override for ${config.options.studentIds.length} student${utils.sIfPlural(config.options.studentIds.length)}`;
  }
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/overrides`,
    method: 'POST',
    params: {
      'assignment_override[title]': utils.includeIfTruthy(title),
      'assignment_override[student_ids]':
        utils.includeIfTruthy(config.options.studentIds),
      'assignment_override[group_id]':
        utils.includeIfTruthy(config.options.groupId),
      'assignment_override[course_section_id]':
        utils.includeIfTruthy(config.options.sectionId),
      'assignment_override[due_at]':
        utils.includeIfDate(config.options.dueAt),
      'assignment_override[unlock_at]':
        utils.includeIfDate(config.options.unlockAt),
      'assignment_override[lock_at]':
        utils.includeIfDate(config.options.lockAt),
    },
  }).then((response) => {
    return config.uncache([
      // Uncache list of overrides
      `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/overrides`,
      // Uncache specific override id
      `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/overrides/${response.id}`,
      // Uncache batch override list
      `${prefix.v1}/courses/${config.options.courseId}/assignments/overrides`,
    ], response);
  });
};

/**
 * Deletes an assignment override
 * @method deleteOverride
 * @param {number} courseId - Canvas course id to query
 * @param {number} assignmentId - Canvas assignment id to query
 * @param {number} overrideId - Canvas override id to look up
 * @return {Promise.<Object>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
 */
Assignment.deleteOverride = (config) => {
  // @action: delete an override for a specific assignment in a course',
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/overrides/${config.options.overrideId}`,
    method: 'DELETE',
  }).then((response) => {
    return config.uncache([
      // Uncache list of overrides
      `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/overrides`,
      // Uncache specific override id
      `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/overrides/${config.options.overrideId}`,
      // Uncache batch override list
      `${prefix.v1}/courses/${config.options.courseId}/assignments/overrides`,
    ], response);
  });
};

/*------------------------------------------------------------------------*/
/*                     Assignment Submission Endpoints                    */
/*------------------------------------------------------------------------*/

// Helpers

/**
 * Passes through or retrieves the current user's Canvas id
 * @param {function} visitEndpoint - The visitEndpoint function to use to send
 *   a getCurrentUser request with
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
 * @method listSubmissions
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
Assignment.listSubmissions = (config) => {
  // @action: list the submissions to a specific assignment in a course

  // Fetch the user info if we're not excluding user info OR if we're
  // filtering out the test student (we need user info to filter)
  const fetchUser = (
    !config.options.includeTestStudent
    || !config.options.excludeUser
  );

  const fetchPromise = config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions`,
    method: 'GET',
    params: {
      include: utils.genIncludesList({
        submission_comments: config.options.includeComments,
        rubric_assessment: config.options.includeRubricAssessment,
        user: fetchUser,
      }),
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
};

/**
 * Gets a single submission for an assignment
 * @method getSubmission
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
Assignment.getSubmission = (config) => {
  // @action: Gets a specific submission to an assignment in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/submissions/${config.options.studentId}`,
    method: 'GET',
    params: {
      include: utils.genIncludesList({
        submission_comments: config.options.includeComments,
        rubric_assessment: config.options.includeRubricAssessment,
        user: !config.options.excludeUser,
      }),
    },
  });
};

/**
 * Creates a text submission on behalf of the current user
 * @method createTextSubmission
 * @param {number} courseId - Canvas course Id
 * @param {number} assignmentId - The Canvas assignment Id
 * @param {string} text - The text body of the submission
 * @param {number} [currentUserId] - The current user's Canvas Id.
 *   If not included, we call the current user endpoint
 * @param {string} [comment] - A text student comment to include
 * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.createTextSubmission = (config) => {
  // @action: create a text submission to a specific assignment in a course on behalf of the current user
  let submitterId;
  return getCurrentUserId(
    config.api,
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
          'submission[body]': config.options.text,
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
};

/**
 * Creates a url submission on behalf of the current user
 * @method createURLSubmission
 * @param {number} courseId - Canvas course Id
 * @param {number} assignmentId - The Canvas assignment Id
 * @param {string} url - The url of the submission
 * @param {number} [currentUserId] - The current user's Canvas Id.
 *   If not included, we call the current user endpoint
 * @param {string} [comment] - A text student comment to include
 * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.createURLSubmission = (config) => {
  // @action: create a url submission to a specific assignment in a course on behalf of the current user
  let submitterId;
  return getCurrentUserId(
    config.api,
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
          'submission[url]': config.options.url,
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
};

/**
 * Creates a file submission on behalf of the current user
 * @method createFileSubmission
 * @param {number} courseId - Canvas course Id
 * @param {number} assignmentId - The Canvas assignment Id
 * @param {string} filenames - The filenames to upload to the submission
 * @param {number} [currentUserId] - The current user's Canvas Id.
 *   If not included, we call the current user endpoint
 * @param {string} [comment] - A text student comment to include
 * @return {Promise.<Object>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
 */
Assignment.createFileSubmission = (config) => {
  // @action: create a file submission to a specific assignment in a course on behalf of the current user
  let submitterId;
  return getCurrentUserId(
    config.api,
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
};


/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Assignment;
