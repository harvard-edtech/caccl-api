/**
 * Assignment endpoints module
 * @module endpoints/course/assignments
 * @see module: endpoints/course/assignments
 */
const utils = require('../common/utils.js');
const prefix = require('../common/prefix.js');

module.exports = [

  /**
   * Lists the assignments in a course
   * @param {number} courseId - Canvas course Id to query
   * @return {Promise.<Object[]>} list of Canvas Assignments {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
   */
  {
    name: 'listAssignments',
    action: 'get the list of assignments in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/assignments`,
        method: 'GET',
      });
    },
  },

  /**
   * Get info on a specific assignment in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} assignmentId - Canvas assignment Id
   * @return {Promise.<Object>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
   */
  {
    name: 'getAssignment',
    action: 'get info on a specific assignment in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}`,
        method: 'GET',
      });
    },
  },

  /**
   * Updates a Canvas assignment
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
  {
    name: 'updateAssignment',
    action: 'updates an assignment in a course',
    run(config) {
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
    },
  },

  /**
   * Creates a Canvas assignment
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
  {
    name: 'createAssignment',
    action: 'create a new assignment in a course',
    run(config) {
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
    },
  },

  /**
   * Delete an assignment
   * @param {number} courseId - Canvas course Id
   * @param {number} assignmentId - Canvas assignment Id
   * @return {Promise.<Object>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
   */
  {
    name: 'deleteAssignment',
    action: 'deletes an assignment from a course',
    run(config) {
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
    },
  },

];
