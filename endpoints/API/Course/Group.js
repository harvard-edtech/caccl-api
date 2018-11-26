const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');

class Group extends EndpointCategory {
  constructor(config) {
    super(config, Group);
  }
}

/*------------------------------------------------------------------------*/
/*                             Group Endpoints                            */
/*------------------------------------------------------------------------*/

/**
 * Gets info on a specific group in a course
 * @author Gabriel Abrams
 * @method get
 * @param {number} groupId - Canvas group Id
 * @return Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
Group.get = function (options) {
  // @action: get info on a specific group in a course
  return this.visitEndpoint({
    path: `${prefix.v1}/groups/${options.groupId}`,
    method: 'GET',
  });
};

// NOTE: to create or delete a group, see endpoints in groupSets.js

/*------------------------------------------------------------------------*/
/*                         Group Member Endpoints                         */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of members in a group
 * @author Gabriel Abrams
 * @method listMembers
 * @param {number} groupId - Canvas group Id
 * @return {Promise.<Object[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
 */
Group.listMembers = function (options) {
  // @action: get the list of members in a specific group
  return this.visitEndpoint({
    path: `${prefix.v1}/groups/${options.groupId}/users`,
    method: 'GET',
  });
};

/**
 * Gets the list of members in a group
 * @author Gabriel Abrams
 * @method updateMembers
 * @param {number} groupId - Canvas group Id
 * @param {array} [members=[]] - The list of user objects/user Ids that should
 *   be in the group
 * @return {Promise.<Object>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
Group.updateMembers = function (options) {
  // @action: update the list of members in a group
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

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Group;
