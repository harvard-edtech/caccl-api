/**
 * Groups endpoints module
 * @module endpoints/course/groups
 * @see module: endpoints/course/groups
 */
const utils = require('../common/utils.js');
const prefix = require('../common/prefix.js');

module.exports = [

  /*------------------------------------------------------------------------*/
  /*                                 Groups                                 */
  /*------------------------------------------------------------------------*/

  /**
   * Gets info on a specific group in a course
   * @method getGroup
   * @param {number} groupId - Canvas group Id
   * @return Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  {
    name: 'getGroup',
    action: 'get info on a specific group in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/groups/${config.options.groupId}`,
        method: 'GET',
      });
    },
  },

  // NOTE: to create or delete a group, see endpoints in groupSets.js

  /*------------------------------------------------------------------------*/
  /*                                 Members                                */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of members in a group
   * @method listGroupMembers
   * @param {number} groupId - Canvas group Id
   * @return {Promise.<Object[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
   */
  {
    name: 'listGroupMembers',
    action: 'get the list of members in a specific group',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/groups/${config.options.groupId}/users`,
        method: 'GET',
      });
    },
  },

  /**
   * Gets the list of members in a group
   * @method updateGroupMembers
   * @param {number} groupId - Canvas group Id
   * @param {array} [members=[]] - The list of user objects/user Ids that should
   *   be in the group
   * @return {Promise.<Object>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  {
    name: 'updateGroupMembers',
    action: 'update the list of members in a group',
    run(config) {
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
    },
  },

];
