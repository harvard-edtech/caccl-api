/**
 * Functions for interacting with student groups within courses
 * @namespace api.course.group
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');

class Group extends EndpointCategory {
  constructor(config) {
    super(config, Group);
  }
}

/*------------------------------------------------------------------------*/
/*                           Table of Contents:                           */
/*                           - Group                                      */
/*                           - Group Members                              */
/*------------------------------------------------------------------------*/

/*------------------------------------------------------------------------*/
/*                             Group Endpoints                            */
/*------------------------------------------------------------------------*/

/**
 * Gets info on a specific group in a course
 * @author Gabe Abrams
 * @method get
 * @memberof api.course.group
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.groupId - Canvas group Id
 * @return {Group} Canvas group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
Group.get = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/groups/${options.groupId}`,
    method: 'GET',
  });
};
Group.get.action = 'get info on a specific group in a course';
Group.get.requiredParams = ['groupId'];
Group.get.scopes = [
  'url:GET|/api/v1/groups/:group_id',
];

// NOTE: to create or delete a group, see endpoints in groupSets

/*------------------------------------------------------------------------*/
/*                         Group Member Endpoints                         */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of members in a group
 * @author Gabe Abrams
 * @method listMembers
 * @memberof api.course.group
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.groupId - Canvas group Id
 * @return {User[]} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
 */
Group.listMembers = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/groups/${options.groupId}/users`,
    method: 'GET',
  });
};
Group.listMembers.action = 'get the list of members in a specific group';
Group.listMembers.requiredParams = ['groupId'];
Group.listMembers.scopes = [
  'url:GET|/api/v1/groups/:group_id/users',
];

/**
 * Gets the list of members in a group
 * @author Gabe Abrams
 * @method updateMembers
 * @memberof api.course.group
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.groupId - Canvas group Id
 * @param {array} [options.members=[]] - The list of user objects/user Ids that
 *   should be in the group
 * @return {Group} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
Group.updateMembers = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/groups/${options.groupId}`,
    method: 'PUT',
    params: {
      members: utils.extractIdsIfApplicable(options.members),
    },
  })
    .then((response) => {
      return this.uncache([
        // Uncache the list of group members
        `${prefix.v1}/groups/${options.groupId}/users`,
      ], response);
    });
};
Group.updateMembers.action = 'update the list of members in a group';
Group.updateMembers.requiredParams = ['groupId'];
Group.updateMembers.scopes = [
  'url:PUT|/api/v1/groups/:group_id',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Group;
