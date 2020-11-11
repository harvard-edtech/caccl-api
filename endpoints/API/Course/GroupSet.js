/**
 * Functions for interacting with group sets/categories within courses
 * @namespace api.course.groupSet
 */

const async = require('async');

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');

class GroupSet extends EndpointCategory {
  constructor(config) {
    super(config, GroupSet);
  }
}

/*------------------------------------------------------------------------*/
/*                           Table of Contents:                           */
/*                           - Group Sets                                 */
/*                           - Groups in Group Sets                       */
/*------------------------------------------------------------------------*/

// NOTE: Canvas uses inconsistent language. What are referred to as
// "group sets" in the front-end are called "group categories" in the API.

/*------------------------------------------------------------------------*/
/*                           Group Set Endpoints                          */
/*------------------------------------------------------------------------*/

/**
 * Lists the group sets in the course
 * @author Gabe Abrams
 * @method list
 * @memberof api.course.groupSet
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @return {GroupCategory[]} list of Canvas GroupCategories {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
 */
GroupSet.list = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/group_categories`,
    method: 'GET',
  });
};
GroupSet.list.action = 'get the list of group sets in a course';
GroupSet.list.requiredParams = ['courseId'];
GroupSet.list.scopes = [
  'url:GET|/api/v1/courses/:course_id/group_categories',
];

/**
 * Gets info on a specific group set
 * @author Gabe Abrams
 * @method get
 * @memberof api.course.groupSet
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.groupSetId - Canvas group set Id
 * @return {GroupCategory} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
 */
GroupSet.get = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/group_categories/${options.groupSetId}`,
    method: 'GET',
  });
};
GroupSet.get.action = 'get info on a specific group set in a course';
GroupSet.get.requiredParams = ['groupSetId'];
GroupSet.get.scopes = [
  'url:GET|/api/v1/group_categories/:group_category_id',
];

/**
 * Create a group set in a course
 * @author Gabe Abrams
 * @method create
 * @memberof api.course.groupSet
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to create a group set in
 * @param {string} options.name - The name of the new group set
 * @return {GroupCategory} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
 */
GroupSet.create = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/group_categories`,
    method: 'POST',
    params: {
      name: options.name || 'Unnamed Group Set',
    },
  })
    .then((response) => {
      return this.uncache([
        // Uncache specific group set (in case it was already hit)
        `${prefix.v1}/group_categories/${response.id}`,
      ], response);
    });
};
GroupSet.create.action = 'create a new group set in a course';
GroupSet.create.requiredParams = ['courseId', 'name'];
GroupSet.create.scopes = [
  'url:POST|/api/v1/courses/:course_id/group_categories',
];

/**
 * Deletes a group set
 * @author Gabe Abrams
 * @method delete
 * @memberof api.course.groupSet
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.groupSetId - Canvas group set Id
 * @return {GroupCategory} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
 */
GroupSet.delete = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/group_categories/${options.groupSetId}`,
    method: 'DELETE',
  })
    .then((response) => {
      return this.uncache([
        // Uncache list of group sets
        `${prefix.v1}/courses/${options.courseId}/group_categories`,
      ], response);
    });
};
GroupSet.delete.action = 'delete a specific group set from a course';
GroupSet.delete.requiredParams = ['courseId', 'groupSetId'];
GroupSet.delete.scopes = [
  'url:DELETE|/api/v1/group_categories/:group_category_id',
];

/*------------------------------------------------------------------------*/
/*                   Endpoints for Groups in Group Sets                   */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of groups in a group set
 * @author Gabe Abrams
 * @method listGroups
 * @memberof api.course.groupSet
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.groupSetId - Canvas group set Id to query
 * @param {boolean} [options.includeMembers] - if true, after getting the list
 *   of groups, CACCL requests each group's member list individually and adds
 *   each array to the group as groups[i].members (an array of Canvas user
 *   objects)
 * @param {number} [options.parallelLimit=1] - the number of group membership
 *   arrays to request in parallel (if 1 or undefined, memberships will be
 *   requested serially). Only relevant if including members
 * @return {Group[]} list of Canvas Groups {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
GroupSet.listGroups = function (options) {
  // Get the list of groups
  const listGroupsPromise = this.visitEndpoint({
    path: `${prefix.v1}/group_categories/${options.groupSetId}/groups`,
    method: 'GET',
  });

  // Finish if not requesting members
  if (!options.includeMembers) {
    return listGroupsPromise;
  }

  // Individually request each group's members
  const parallelLimit = (options.parallelLimit || 1);

  /**
   * Helper function that processes one group
   * @author Gabe Abrams
   * @param {object} group - a Canvas group
   * @param {function} next - function to call when done
   * @return {object} group with group.members added
   */
  const _addMembers = (group, next) => {
    this.api.course.group.listMembers({
      groupId: group.id,
    })
      // We got the list of members properly
      .then((members) => {
        // Add the members
        const newGroup = group;
        newGroup.members = members || [];

        // Return the response
        return next(null, newGroup);
      })
      // An error occurred
      .catch((err) => {
        return next(err);
      });
  };

  // Run in parallel after getting the list of groups
  return listGroupsPromise.then((groups) => {
    return new Promise((resolve, reject) => {
      async.mapLimit(
        groups,
        parallelLimit,
        _addMembers,
        (err, groupsWithMembers) => {
          // Handle errors
          if (err) {
            return reject(err);
          }

          // Handle success
          return resolve(groupsWithMembers);
        }
      );
    });
  });
};
GroupSet.listGroups.action = 'get the list of groups in a group set';
GroupSet.listGroups.requiredParams = ['groupSetId'];
GroupSet.listGroups.scopes = [
  'url:GET|/api/v1/group_categories/:group_category_id/groups',
  // Also required for requesting members:
  'url:GET|/api/v1/groups/:group_id/users',
];

/**
 * Gets info on a specific group in a group set (alias to
 *   groups.js/getGroup)
 * @author Gabe Abrams
 * @method getGroup
 * @memberof api.course.groupSet
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.groupId - Canvas group Id
 * @return {Group} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
GroupSet.getGroup = function (options) {
  return this.api.course.group.get(options);
};
GroupSet.getGroup.action = 'get info on a specific group in a group set';
GroupSet.getGroup.requiredParams = ['groupId'];
GroupSet.getGroup.scopes = [
  'url:GET|/api/v1/groups/:group_id',
];

/**
 * Creates a new group in a group set
 * @author Gabe Abrams
 * @method createGroup
 * @memberof api.course.groupSet
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.groupSetId - Canvas group set Id to query
 * @param {string} [options.name=Unnamed Group] - Name of the new group
 * @param {string} [options.description=null] - Description of the new group
 * @param {boolean} [options.isPublic=false] - If truthy, group is public
 * @return {Group} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
GroupSet.createGroup = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/group_categories/${options.groupSetId}/groups`,
    method: 'POST',
    params: {
      name: options.name || 'Unnamed Group',
      description: options.description || '',
      is_public: utils.isTruthy(options.isPublic),
    },
  })
    .then((response) => {
      return this.uncache([
        // Uncache group set list
        `${prefix.v1}/courses/${options.courseId}/group_categories`,
        // Uncache group set
        `${prefix.v1}/group_categories/${options.groupSetId}`,
      ], response);
    });
};
GroupSet.createGroup.action = 'create a new group in a group set';
GroupSet.createGroup.requiredParams = ['courseId', 'groupSetId'];
GroupSet.createGroup.scopes = [
  'url:POST|/api/v1/group_categories/:group_category_id/groups',
];

/**
 * Deletes a specific group from a group set
 * @author Gabe Abrams
 * @method deleteGroup
 * @memberof api.course.groupSet
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.groupSetId - Canvas group set Id
 * @param {number} options.groupId - Canvas group Id to delete
 * @return {Group} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
GroupSet.deleteGroup = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/groups/${options.groupId}`,
    method: 'DELETE',
  })
    .then((response) => {
      return this.uncache([
        // Uncache group set list of group
        `${prefix.v1}/group_categories/${options.groupSetId}/groups`,
      ], response);
    });
};
GroupSet.deleteGroup.action = 'delete a specific group from a group set';
GroupSet.deleteGroup.requiredParams = ['groupSetId', 'groupId'];
GroupSet.deleteGroup.scopes = [
  'url:DELETE|/api/v1/groups/:group_id',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = GroupSet;
