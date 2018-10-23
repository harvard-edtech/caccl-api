/**
 * Assignment overrides endpoints module
 * @module endpoints/course/assignmentOverrides
 * @see module: endpoints/course/assignmentOverrides
 */
const utils = require('../helpers/utils.js');
const prefix = require('../helpers/prefix.js');

module.exports = [

  /**
   * Gets the list of overrides for an assignment
   * @param {number} courseId - Canvas course id to query
   * @param {number} assignmentId - Canvas assignment id to look up
   * @return {Promise.<Object[]>} list of Canvas AssignmentOverrides {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
   */
  {
    name: 'listAssignmentOverrides',
    action: 'get a list of assignment overrides for a specific assignment in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/overrides`,
        method: 'GET',
      });
    },
  },

  /**
   * Get a specific override on an assignment in a course
   * @param {number} courseId - Canvas course id to query
   * @param {number} assignmentId - Canvas assignment id to query
   * @param {number} overrideId - Canvas override id to look up
   * @return {Promise.<Object>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
   */
  {
    name: 'getAssignmentOverride',
    action: 'get a list of assignment overrides for a specific assignment in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/assignments/${config.options.assignmentId}/overrides/${config.options.overrideId}`,
        method: 'GET',
      });
    },
  },

  /**
   * Create assignment override.
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
  {
    name: 'createAssignmentOverride',
    action: 'create a new override for a specific assignment in a course',
    run(config) {
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
    },
  },

  /**
   * Deletes an assignment override
   * @param {number} courseId - Canvas course id to query
   * @param {number} assignmentId - Canvas assignment id to query
   * @param {number} overrideId - Canvas override id to look up
   * @return {Promise.<Object>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
   */
  {
    name: 'deleteAssignmentOverride',
    action: 'delete an override for a specific assignment in a course',
    run(config) {
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
    },
  },

];
