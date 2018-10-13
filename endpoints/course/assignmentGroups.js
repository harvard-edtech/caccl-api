const utils = require('../helpers/utils.js');

module.exports = [

  /**
   * Lists assignment groups in a course
   * @param {number} courseId - Canvas course Id to query
   * @return list of AssignmentGroups (see: https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)
   */
  {
    name: 'listAssignmentGroups',
    action: 'list the assignment groups in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/assignment_groups',
        method: 'GET',
      });
    },
  },

  /**
   * Gets info on a specific assignment group in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} assignmentGroupId - Assignment group to get
   * @param {number} courseId - Canvas course Id to query
   * @return AssignmentGroup (see: https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)
   */
  {
    name: 'getAssignmentGroup',
    action: 'get info on a specific assignment group in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/assignment_groups/' + cg.options.assignmentGroupId,
        method: 'GET',
      });
    },
  },

  /**
   * Updates an assignment group in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} assignmentGroupId - Assignment group to update
   * @param {string} name - New assignment group name (default: current value)
   * @param {number} weight - New weight (default: current value)
   * @return AssignmentGroup (see: https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)
   */
  {
    name: 'updateAssignmentGroup',
    action: 'update an assignment group in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/assignment_groups/' + cg.options.assignmentGroupId,
        method: 'PUT',
        params: {
          name: utils.includeIfTruthy(cg.options.name),
          group_weight: utils.includeIfNumber(cg.options.weight),
        },
      }).then((response) => {
        return cg.uncache([
          // Uncache list of assignment groups
          '/api/v1/courses/' + cg.options.courseId + '/assignment_groups',
          // Uncache specific assignment group
          '/api/v1/courses/' + cg.options.courseId + '/assignment_groups/' + cg.options.assignmentGroupId + '*',
        ], response);
      });
    },
  },

  /**
   * Create a new assignment group in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {string} name - New assignment group name
   * @param {number} weight - Optional. New weight (default: 0)
   * @return AssignmentGroup (see: https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)
   */
  {
    name: 'createAssignmentGroup',
    action: 'create a new assignment group in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/assignment_groups',
        method: 'POST',
        params: {
          name: utils.includeIfTruthy(cg.options.name),
          group_weight: utils.includeIfNumber(cg.options.weight),
        },
      }).then((response) => {
        return cg.uncache([
          // Uncache list of assignment groups
          '/api/v1/courses/' + cg.options.courseId + '/assignment_groups',
          // Uncache specific assignment group
          '/api/v1/courses/' + cg.options.courseId + '/assignment_groups/' + response.id + '*',
        ], response);
      });
    },
  },

  /**
   * Deletes an assignment group from a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} assignmentGroupId - Assignment group to delete
   * @param {integer} moveAssignmentsTo - Optional. Assignment group to move
   *   assignments to. If this parameter isn't included, assignments in the
   *   assignment group will be deleted.
   * @return AssignmentGroup (see: https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)
   */
  {
    name: 'deleteAssignmentGroup',
    action: 'delete an assignment group from a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/assignment_groups/' + cg.options.assignmentGroupId,
        method: 'DELETE',
        params: {
          move_assignments_to:
            utils.includeIfNumber(cg.options.moveAssignmentsTo),
        },
      }).then((response) => {
        const uncachePaths = [
          // Uncache list of assignment groups
          '/api/v1/courses/' + cg.options.courseId + '/assignment_groups',
          // Uncache deleted assignment group
          '/api/v1/courses/' + cg.options.courseId + '/assignment_groups/' + cg.options.assignmentGroupId + '*',
        ];
        // Uncache destination assignment group if applicable
        if (cg.options.moveAssignmentsTo) {
          // Uncache the destination assignment group
          uncachePaths.push('/api/v1/courses/' + cg.options.courseId + '/assignment_groups/' + cg.options.moveAssignmentsTo + '*');
        }
        return cg.uncache(uncachePaths, response);
      });
    },
  },

];
