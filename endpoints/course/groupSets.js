const utils = require('../helpers/utils.js');

module.exports = (self) => {
  return [

    // NOTE: Canvas uses inconsistent language. What are referred to as
    // "group sets" in the front-end are called "group categories" in the API.

    /*------------------------------------------------------------------------*/
    /*                            Group Set Objects                           */
    /*------------------------------------------------------------------------*/

    /**
     * Lists the group sets in the course
     * @param {number} courseId - Canvas course Id
     * @return list of GroupCategories (see: https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)
     */
    {
      name: 'listGroupSets',
      action: 'get the list of group sets in a course',
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/courses/' + cg.options.courseId + '/group_categories',
          method: 'GET',
        });
      },
    },

    /**
     * Gets info on a specific group set
     * @param {number} groupSetId - Canvas group set Id
     * @return GroupCategory (see: https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)
     */
    {
      name: 'getGroupSet',
      action: 'get info on a specific group set in a course',
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/group_categories/' + cg.options.groupSetId,
          method: 'GET',
        });
      },
    },

    /**
     * Create a group set in a course
     * @param {number} courseId - Canvas course Id to create a group set in
     * @param {string} name - The name of the new group set
     * @return GroupCategory (see: https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)
     */
    {
      name: 'createGroupSet',
      action: 'create a new group set in a course',
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/courses/' + cg.options.courseId + '/group_categories',
          method: 'POST',
          params: {
            name: cg.options.name || 'Unnamed Group Set',
          },
        }).then((response) => {
          cg.uncache([
            // Uncache list of group sets
            '/api/v1/courses/' + cg.options.courseId + '/group_categories',
            // Uncache specific group set (in case it was already hit)
            '/api/v1/group_categories/' + response.id,
          ]);
          return Promise.resolve(response);
        });
      },
    },

    /**
     * Deletes a group set
     * @param {number} courseId - Canvas course Id
     * @param {number} groupSetId - Canvas group set Id
     * @return GroupCategory (see: https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)
     */
    {
      name: 'deleteGroupSet',
      action: 'delete a specific group set from a course',
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/group_categories/' + cg.options.groupSetId,
          method: 'DELETE',
        }).then((response) => {
          cg.uncache([
            // Uncache list of group sets
            '/api/v1/courses/' + cg.options.courseId + '/group_categories',
            // Uncache specific group set
            '/api/v1/group_categories/' + cg.options.groupSetId,
          ]);
          return Promise.resolve(response);
        });
      },
    },

    /*------------------------------------------------------------------------*/
    /*                          Groups in Group Sets                          */
    /*------------------------------------------------------------------------*/

    /**
     * Gets the list of groups in a group set
     * @param {number} groupSetId - Canvas group set Id to query
     * @return list of Groups (see: https://canvas.instructure.com/doc/api/groups.html#Group)
     */
    {
      name: 'listGroupSetGroups',
      action: 'get the list of groups in a group set',
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/group_categories/' + cg.options.groupSetId + '/groups',
          method: 'GET',
        });
      },
    },

    /**
     * Gets info on a specific group in a group set (alias to
     *   groups.js/getGroup)
     * @param {number} groupSetId - Canvas group set Id to query
     * @return Group (see: https://canvas.instructure.com/doc/api/groups.html#Group)
     */
    {
      name: 'getGroupSetGroup',
      action: 'get info on a specific group in a group set',
      run: (cg) => {
        return self.getGroup(cg.options);
      },
    },

    /**
     * Creates a new group in a group set
     * @param {number} courseId - Canvas course Id
     * @param {number} groupSetId - Canvas group set Id to query
     * @param {string} name - Name of the new group (default: Unnamed Group)
     * @param {string} description - Description of the new group
     *   (default: none)
     * @param {boolean} isPublic - If true, group is public (default: false)
     * @return Group (see: https://canvas.instructure.com/doc/api/groups.html#Group)
     */
    {
      name: 'createGroupSetGroup',
      action: 'create a new group in a group set',
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/group_categories/' + cg.options.groupSetId + '/groups',
          method: 'POST',
          params: {
            name: cg.options.name || 'Unnamed Group',
            description: cg.options.description || '',
            is_public: utils.isTruthy(cg.options.isPublic),
          },
        }).then((response) => {
          cg.uncache([
            // Uncache group set list
            '/api/v1/courses/' + cg.options.courseId + '/group_categories',
            // Uncache group set
            '/api/v1/group_categories/' + cg.options.groupSetId,
          ]);
          return Promise.resolve(response);
        });
      },
    },


    /**
     * Deletes a specific group from a group set
     * @param {number} groupSetId - Canvas group set Id
     * @param {number} groupId - Canvas group Id to delete
     * @return Group (see: https://canvas.instructure.com/doc/api/groups.html#Group)
     */
    {
      name: 'deleteGroupSetGroup',
      action: 'delete a specific group from a group set',
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/groups/' + cg.options.groupId,
          method: 'DELETE',
        }).then((response) => {
          cg.uncache([
            // Uncache group
            '/api/v1/groups/' + cg.options.groupId,
            // Uncache group set list of group
            '/api/v1/group_categories/' + cg.options.groupSetId + '/groups',
          ]);
          return Promise.resolve(response);
        });
      },
    },

  ];
};
