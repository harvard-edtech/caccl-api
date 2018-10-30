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
 * @method get
 * @param {number} groupId - Canvas group Id
 * @return Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
Group.get = (config) => {
  // @action: get info on a specific group in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/groups/${config.options.groupId}`,
    method: 'GET',
  });
};

// NOTE: to create or delete a group, see endpoints in groupSets.js

/*------------------------------------------------------------------------*/
/*                         Group Member Endpoints                         */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of members in a group
 * @method listMembers
 * @param {number} groupId - Canvas group Id
 * @return {Promise.<Object[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
 */
Group.listMembers = (config) => {
  // @action: get the list of members in a specific group
  return config.visitEndpoint({
    path: `${prefix.v1}/groups/${config.options.groupId}/users`,
    method: 'GET',
  });
};

/**
 * Gets the list of members in a group
 * @method updateMembers
 * @param {number} groupId - Canvas group Id
 * @param {array} [members=[]] - The list of user objects/user Ids that should
 *   be in the group
 * @return {Promise.<Object>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
Group.updateMembers = (config) => {
  // @action: update the list of members in a group
  return config.visitEndpoint({
    path: `${prefix.v1}/groups/${config.options.groupId}`,
    method: 'PUT',
    params: {
      members: utils.extractIdsIfApplicable(config.options.members),
    },
  }).then((response) => {
    return config.uncache([
      // Uncache the list of group members
      `${prefix.v1}/groups/${config.options.groupId}/users`,
    ], response);
  });
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Group;
