/**
 * Group set endpoints module
 * @module endpoints/course/groupSets
 * @see module: endpoints/course/groupSets
 */
const utils = require('../common/utils.js');
const prefix = require('../common/prefix.js');

module.exports = [

  // NOTE: Canvas uses inconsistent language. What are referred to as
  // "group sets" in the front-end are called "group categories" in the API.

  /*------------------------------------------------------------------------*/
  /*                            Group Set Objects                           */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the group sets in the course
   * @param {number} courseId - Canvas course Id
   * @return {Promise.<Object[]>} list of Canvas GroupCategories {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
   */
  {
    name: 'listGroupSets',
    action: 'get the list of group sets in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/group_categories`,
        method: 'GET',
      });
    },
  },

  /**
   * Gets info on a specific group set
   * @param {number} groupSetId - Canvas group set Id
   * @return {Promise.<Object>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
   */
  {
    name: 'getGroupSet',
    action: 'get info on a specific group set in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/group_categories/${config.options.groupSetId}`,
        method: 'GET',
      });
    },
  },

  /**
   * Create a group set in a course
   * @param {number} courseId - Canvas course Id to create a group set in
   * @param {string} name - The name of the new group set
   * @return {Promise.<Object>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
   */
  {
    name: 'createGroupSet',
    action: 'create a new group set in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/group_categories`,
        method: 'POST',
        params: {
          name: config.options.name || 'Unnamed Group Set',
        },
      }).then((response) => {
        return config.uncache([
          // Uncache list of group sets
          `${prefix.v1}/courses/${config.options.courseId}/group_categories`,
          // Uncache specific group set (in case it was already hit)
          `${prefix.v1}/group_categories/${response.id}`,
        ], response);
      });
    },
  },

  /**
   * Deletes a group set
   * @param {number} courseId - Canvas course Id
   * @param {number} groupSetId - Canvas group set Id
   * @return {Promise.<Object>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
   */
  {
    name: 'deleteGroupSet',
    action: 'delete a specific group set from a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/group_categories/${config.options.groupSetId}`,
        method: 'DELETE',
      }).then((response) => {
        return config.uncache([
          // Uncache list of group sets
          `${prefix.v1}/courses/${config.options.courseId}/group_categories`,
          // Uncache specific group set
          `${prefix.v1}/group_categories/${config.options.groupSetId}`,
        ], response);
      });
    },
  },

  /*------------------------------------------------------------------------*/
  /*                          Groups in Group Sets                          */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of groups in a group set
   * @param {number} groupSetId - Canvas group set Id to query
   * @return {Promise.<Object[]>} list of Canvas Groups {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  {
    name: 'listGroupSetGroups',
    action: 'get the list of groups in a group set',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/group_categories/${config.options.groupSetId}/groups`,
        method: 'GET',
      });
    },
  },

  /**
   * Gets info on a specific group in a group set (alias to
   *   groups.js/getGroup)
   * @param {number} groupId - Canvas group Id
   * @return {Promise.<Object>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  {
    name: 'getGroupSetGroup',
    action: 'get info on a specific group in a group set',
    run(config) {
      return config.self.getGroup(config.options);
    },
  },

  /**
   * Creates a new group in a group set
   * @param {number} courseId - Canvas course Id
   * @param {number} groupSetId - Canvas group set Id to query
   * @param {string} [name=Unnamed Group] - Name of the new group
   * @param {string} [description=null] - Description of the new group
   * @param {boolean} [isPublic=false] - If truthy, group is public
   * @return {Promise.<Object>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  {
    name: 'createGroupSetGroup',
    action: 'create a new group in a group set',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/group_categories/${config.options.groupSetId}/groups`,
        method: 'POST',
        params: {
          name: config.options.name || 'Unnamed Group',
          description: config.options.description || '',
          is_public: utils.isTruthy(config.options.isPublic),
        },
      }).then((response) => {
        return config.uncache([
          // Uncache group set list
          `${prefix.v1}/courses/${config.options.courseId}/group_categories`,
          // Uncache group set
          `${prefix.v1}/group_categories/${config.options.groupSetId}`,
        ], response);
      });
    },
  },


  /**
   * Deletes a specific group from a group set
   * @param {number} groupSetId - Canvas group set Id
   * @param {number} groupId - Canvas group Id to delete
   * @return {Promise.<Object>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  {
    name: 'deleteGroupSetGroup',
    action: 'delete a specific group from a group set',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/groups/${config.options.groupId}`,
        method: 'DELETE',
      }).then((response) => {
        return config.uncache([
          // Uncache group
          `${prefix.v1}/groups/${config.options.groupId}`,
          // Uncache group set list of group
          `${prefix.v1}/group_categories/${config.options.groupSetId}/groups`,
        ], response);
      });
    },
  },

];
