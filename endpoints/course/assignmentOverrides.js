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
        path: '/api/v1/courses/' + cg.options.courseId + '/assignments/'
          + cg.options.assignmentId + '/overrides',
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
        path: '/api/v1/courses/' + cg.options.courseId + '/assignments/'
          + cg.options.assignmentId + '/overrides',
        method: 'GET',
      });
    },
  },

  /**
   * Create student override // TODO: continue writing endpoints
   * @param {number} courseId - Canvas course id
   * @param {number} assignmentId - Canvas assignment id
   * @param {array} studentIDs - List of Canvas student IDs to override
   * @param {number} groupId - Group to override (must be a group assignment)
   * @param {number} sectionId - Section to override
   * @param {string} title - Title of the override (default: "Override for
   *   student <studentID> in assignment <assignmentID>" if only one student or
   *   "Override for X students in assignment <assignmentID>" if many students)
   * @param {string} dueAt - New due date for student (default: current value)
   * @param {string} unlockAt - New unlock date for student (default: current
   *   value)
   * @param {string} lockAt - New lock date for student (default: current value)
   * @return AssignmentOverride (see: https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride)
   */
  {
    name: 'createAssignmentOverride',
    action: 'get a list of assignment overrides for a specific assignment in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/assignments/'
          + cg.options.assignmentId + '/overrides',
        method: 'GET',
      });
    },
  },

];
