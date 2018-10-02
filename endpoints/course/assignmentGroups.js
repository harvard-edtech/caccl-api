const utils = require('../helpers/utils.js');

module.exports = () => {
  return [

    /**
     * Lists assignment groups in a course
     * @param {number} courseId - Canvas course Id to query
     */
    {
      name: 'listAssignmentGroups',
      action: 'list the assignment groups in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignment_groups',
          method: 'GET',
        });
      },
    },

    /**
     * Gets info on a specific assignment group in a course
     * @param {number} courseId - Canvas course Id to query
     * @param {number} assignmentGroupId - Assignment group to get
     * @param {number} courseId - Canvas course Id to query
     */
    {
      name: 'getAssignmentGroup',
      action: 'get info on a specific assignment group in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignment_groups/'
            + options.assignmentGroupId,
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
     */
    {
      name: 'updateAssignmentGroup',
      action: 'update an assignment group in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignment_groups/'
            + options.assignmentGroupId,
          method: 'PUT',
          params: {
            name: utils.includeIfTruthy(options.name),
            group_weight: utils.includeIfNumber(options.weight),
          },
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache list of assignment groups
              '/api/v1/courses/' + options.courseId + '/assignment_groups',
              // Uncache specific assignment group
              '/api/v1/courses/' + options.courseId + '/assignment_groups/'
                + options.assignmentGroupId + '*',
            ],
          };
        });
      },
    },

    /**
     * Create a new assignment group in a course
     * @param {number} courseId - Canvas course Id to query
     * @param {string} name - New assignment group name
     * @param {number} weight - Optional. New weight (default: 0)
     */
    {
      name: 'createAssignmentGroup',
      action: 'create a new assignment group in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignment_groups',
          method: 'POST',
          params: {
            name: utils.includeIfTruthy(options.name),
            group_weight: utils.includeIfNumber(options.weight),
          },
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache list of assignment groups
              '/api/v1/courses/' + options.courseId + '/assignment_groups',
              // Uncache specific assignment group
              '/api/v1/courses/' + options.courseId + '/assignment_groups/'
                + response.id + '*',
            ],
          };
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
     */
    {
      name: 'deleteAssignmentGroup',
      action: 'delete an assignment group from a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignment_groups/'
            + options.assignmentGroupId,
          method: 'DELETE',
          params: {
            move_assignments_to:
              utils.includeIfNumber(options.moveAssignmentsTo),
          },
        }).then((response) => {
          const uncache = [
            // Uncache list of assignment groups
            '/api/v1/courses/' + options.courseId + '/assignment_groups',
            // Uncache deleted assignment group
            '/api/v1/courses/' + options.courseId + '/assignment_groups/'
              + options.assignmentGroupId + '*',
          ];
          // Uncache destination assignment group if applicable
          if (options.moveAssignmentsTo) {
            // Uncache the destination assignment group
            uncache.push('/api/v1/courses/' + options.courseId
              + '/assignment_groups/' + options.moveAssignmentsTo + '*');
          }
          return {
            response,
            uncache,
          };
        });
      },
    },


  ];
};
