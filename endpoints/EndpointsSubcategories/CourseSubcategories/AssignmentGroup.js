const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');

class AssignmentGroup extends EndpointCategory {
  constructor(config) {
    super(config, AssignmentGroup);
  }
}


/*------------------------------------------------------------------------*/
/*                          Assignment Endpoints                          */
/*------------------------------------------------------------------------*/

/**
 * Lists assignment groups in a course
 * @method listAssignmentGroups
 * @param {number} courseId - Canvas course Id to query
 * @return {Promise.<Object[]>} list of Canvas AssignmentGroups {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
 */
AssignmentGroup.listAssignmentGroups = (config) => {
  // @action: list the assignment groups in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignment_groups`,
    method: 'GET',
  });
};

/**
 * Gets info on a specific assignment group in a course
 * @method getAssignmentGroup
 * @param {number} courseId - Canvas course Id to query
 * @param {number} assignmentGroupId - Assignment group to get
 * @param {number} courseId - Canvas course Id to query
 * @return {Promise.<Object>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
 */
AssignmentGroup.getAssignmentGroup = (config) => {
  // @action: get info on a specific assignment group in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignment_groups/${config.options.assignmentGroupId}`,
    method: 'GET',
  });
};

/**
 * Updates an assignment group in a course
 * @param {number} courseId - Canvas course Id to query
 * @param {number} assignmentGroupId - Assignment group to update
 * @param {string} [name=current value] - New assignment group name
 * @param {number} [weight=current value] - New weight
 * @return {Promise.<Object>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
 */
AssignmentGroup.updateAssignmentGroup = (config) => {
  // @action: update an assignment group in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignment_groups/${config.options.assignmentGroupId}`,
    method: 'PUT',
    params: {
      name: utils.includeIfTruthy(config.options.name),
      group_weight: utils.includeIfNumber(config.options.weight),
    },
  }).then((response) => {
    return config.uncache([
      // Uncache list of assignment groups
      `${prefix.v1}/courses/${config.options.courseId}/assignment_groups`,
      // Uncache specific assignment group
      `${prefix.v1}/courses/${config.options.courseId}/assignment_groups/${config.options.assignmentGroupId}*`,
    ], response);
  });
};

/**
 * Create a new assignment group in a course
 * @param {number} courseId - Canvas course Id to query
 * @param {string} name - New assignment group name
 * @param {number} [weight=0] - Assignment group weight
 * @return {Promise.<Object>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
 */
AssignmentGroup.createAssignmentGroup = (config) => {
  // @action: create a new assignment group in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignment_groups`,
    method: 'POST',
    params: {
      name: utils.includeIfTruthy(config.options.name),
      group_weight: utils.includeIfNumber(config.options.weight),
    },
  }).then((response) => {
    return config.uncache([
      // Uncache list of assignment groups
      `${prefix.v1}/courses/${config.options.courseId}/assignment_groups`,
      // Uncache specific assignment group
      `${prefix.v1}/courses/${config.options.courseId}/assignment_groups/${response.id}*`,
    ], response);
  });
};

/**
 * Deletes an assignment group from a course
 * @param {number} courseId - Canvas course Id to query
 * @param {number} assignmentGroupId - Assignment group to delete
 * @param {number} [moveAssignmentsTo] - Assignment group to move
 *   assignments to. If this parameter isn't included, assignments in the
 *   assignment group will be deleted.
 * @return {Promise.<Object>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
 */
AssignmentGroup.deleteAssignmentGroup = (config) => {
  // @action: delete an assignment group from a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/assignment_groups/${config.options.assignmentGroupId}`,
    method: 'DELETE',
    params: {
      move_assignments_to:
        utils.includeIfNumber(config.options.moveAssignmentsTo),
    },
  }).then((response) => {
    const uncachePaths = [
      // Uncache list of assignment groups
      `${prefix.v1}/courses/${config.options.courseId}/assignment_groups`,
      // Uncache deleted assignment group
      `${prefix.v1}/courses/${config.options.courseId}/assignment_groups/${config.options.assignmentGroupId}*`,
    ];
    // Uncache destination assignment group if applicable
    if (config.options.moveAssignmentsTo) {
      // Uncache the destination assignment group
      uncachePaths.push(`${prefix.v1}/courses/${config.options.courseId}/assignment_groups/${config.options.moveAssignmentsTo}*`);
    }
    return config.uncache(uncachePaths, response);
  });
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = AssignmentGroup;
