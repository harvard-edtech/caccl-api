const utils = require('../helpers/utils.js');

module.exports = [

  /**
   * Gets the list of overrides for an assignment
   * @param {number} courseId - Canvas course id to query
   * @param {number} assignmentId - Canvas assignment id to look up
   * @return list of AssignmentOverrides (see: https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride)
   */
  {
    name: 'listAssignmentOverrides',
    action: 'get a list of assignment overrides for a specific assignment in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/assignments/' + cg.options.assignmentId + '/overrides',
        method: 'GET',
      });
    },
  },

  /**
   * Get a specific override on an assignment in a course
   * @param {number} courseId - Canvas course id to query
   * @param {number} assignmentId - Canvas assignment id to query
   * @param {number} overrideId - Canvas override id to look up
   * @return AssignmentOverride (see: https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride)
   */
  {
    name: 'getAssignmentOverride',
    action: 'get a list of assignment overrides for a specific assignment in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/assignments/' + cg.options.assignmentId + '/overrides/' + cg.options.overrideId,
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
   * @param {string} title - Title of the override (default: "Override for X
   *   students", if studentIds is included)
   * @param {date} dueAt - New due date or null to remove due date (default:
   *   current value)
   * @param {date} unlockAt - New unlock date or null to remove unlock date
   *   (default: current value)
   * @param {date} lockAt - New lock date or null to remove lock date
   *   (default: current value)
   * @return AssignmentOverride (see: https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride)
   */
  {
    name: 'createAssignmentOverride',
    action: 'create a new override for a specific assignment in a course',
    run: (cg) => {
      const title = (
        cg.options.title
        || (
          cg.options.studentIds
            ? 'Override for ' + cg.options.studentIds.length + ' student' + (cg.options.studentIds.length === 1 ? '' : 's')
            : null
        )
      );
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/assignments/' + cg.options.assignmentId + '/overrides',
        method: 'POST',
        params: {
          'assignment_override[title]': utils.includeIfTruthy(title),
          'assignment_override[student_ids]':
            utils.includeIfTruthy(cg.options.studentIds),
          'assignment_override[group_id]':
            utils.includeIfTruthy(cg.options.groupId),
          'assignment_override[course_section_id]':
            utils.includeIfTruthy(cg.options.sectionId),
          'assignment_override[due_at]':
            utils.includeIfDate(cg.options.dueAt),
          'assignment_override[unlock_at]':
            utils.includeIfDate(cg.options.unlockAt),
          'assignment_override[lock_at]':
            utils.includeIfDate(cg.options.lockAt),
        },
      }).then((response) => {
        return cg.uncache([
          // Uncache list of overrides
          '/api/v1/courses/' + cg.options.courseId + '/assignments/' + cg.options.assignmentId + '/overrides',
          // Uncache specific override id
          '/api/v1/courses/' + cg.options.courseId + '/assignments/' + cg.options.assignmentId + '/overrides/' + response.id,
          // Uncache batch override list
          '/api/v1/courses/' + cg.options.courseId + '/assignments/overrides',
        ], response);
      });
    },
  },

  /**
   * Deletes an assignment override
   * @param {number} courseId - Canvas course id to query
   * @param {number} assignmentId - Canvas assignment id to query
   * @param {number} overrideId - Canvas override id to look up
   * @return AssignmentOverride (see: https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride)
   */
  {
    name: 'deleteAssignmentOverride',
    action: 'delete an override for a specific assignment in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/assignments/' + cg.options.assignmentId + '/overrides/' + cg.options.overrideId,
        method: 'DELETE',
      }).then((response) => {
        return cg.uncache([
          // Uncache list of overrides
          '/api/v1/courses/' + cg.options.courseId + '/assignments/' + cg.options.assignmentId + '/overrides',
          // Uncache specific override id
          '/api/v1/courses/' + cg.options.courseId + '/assignments/' + cg.options.assignmentId + '/overrides/' + cg.options.overrideId,
          // Uncache batch override list
          '/api/v1/courses/' + cg.options.courseId + '/assignments/overrides',
        ], response);
      });
    },
  },

];
