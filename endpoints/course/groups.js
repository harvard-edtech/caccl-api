const utils = require('../helpers/utils.js');

module.exports = () => {
  return [

    /*------------------------------------------------------------------------*/
    /*                                 Groups                                 */
    /*------------------------------------------------------------------------*/

    /**
     * Gets info on a specific group in a course
     * @param {number} groupId - Canvas group Id
     * @return Group (see: https://canvas.instructure.com/doc/api/groups.html#Group)
     */
    {
      name: 'getGroup',
      action: 'get info on a specific group in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/groups/' + options.groupId,
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
     * @param {number} groupId - Canvas group Id
     * @return list of Users (see: https://canvas.instructure.com/doc/api/users.html#User)
     */
    {
      name: 'listGroupMembers',
      action: 'get the list of members in a specific group',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/groups/' + options.groupId + '/users',
          method: 'GET',
        });
      },
    },

    /**
     * Gets the list of members in a group
     * @param {number} groupId - Canvas group Id
     * @param {array} users - The list of user objects/user Ids that should be
     *   in the group (default: empty list)
     * @return list of Users (see: https://canvas.instructure.com/doc/api/users.html#User)
     */
    {
      name: 'updateGroupMembers',
      action: 'update the list of members in a group',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/groups/' + options.groupId,
          method: 'GET',
          params: {
            members: utils.extractIdsIfApplicable(options.users),
          },
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache the list of group members
              '/api/v1/groups/' + options.groupId + '/users',
            ],
          };
        });
      },
    },

  ];
};