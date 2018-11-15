const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');

/* Endpoints for group set */
class GroupSet extends EndpointCategory {
  constructor(config) {
    super(config, GroupSet);
  }
}

// NOTE: Canvas uses inconsistent language. What are referred to as
// "group sets" in the front-end are called "group categories" in the API.

/*------------------------------------------------------------------------*/
/*                           Group Set Endpoints                          */
/*------------------------------------------------------------------------*/

/**
 * Lists the group sets in the course
 * @author Gabriel Abrams
 * @method list
 * @param {number} courseId - Canvas course Id
 * @return {Promise.<Object[]>} list of Canvas GroupCategories {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
 */
GroupSet.list = (config) => {
  // @action: get the list of group sets in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/group_categories`,
    method: 'GET',
  });
};

/**
 * Gets info on a specific group set
 * @author Gabriel Abrams
 * @method get
 * @param {number} groupSetId - Canvas group set Id
 * @return {Promise.<Object>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
 */
GroupSet.get = (config) => {
  // @action: get info on a specific group set in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/group_categories/${config.options.groupSetId}`,
    method: 'GET',
  });
};

/**
 * Create a group set in a course
 * @author Gabriel Abrams
 * @method create
 * @param {number} courseId - Canvas course Id to create a group set in
 * @param {string} name - The name of the new group set
 * @return {Promise.<Object>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
 */
GroupSet.create = (config) => {
  // @action: create a new group set in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/group_categories`,
    method: 'POST',
    params: {
      name: config.options.name || 'Unnamed Group Set',
    },
  })
    .then((response) => {
      return config.uncache([
        // Uncache list of group sets
        `${prefix.v1}/courses/${config.options.courseId}/group_categories`,
        // Uncache specific group set (in case it was already hit)
        `${prefix.v1}/group_categories/${response.id}`,
      ], response);
    });
};

/**
 * Deletes a group set
 * @author Gabriel Abrams
 * @method delete
 * @param {number} courseId - Canvas course Id
 * @param {number} groupSetId - Canvas group set Id
 * @return {Promise.<Object>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
 */
GroupSet.delete = (config) => {
  // @action: delete a specific group set from a course
  return config.visitEndpoint({
    path: `${prefix.v1}/group_categories/${config.options.groupSetId}`,
    method: 'DELETE',
  })
    .then((response) => {
      return config.uncache([
        // Uncache list of group sets
        `${prefix.v1}/courses/${config.options.courseId}/group_categories`,
        // Uncache specific group set
        `${prefix.v1}/group_categories/${config.options.groupSetId}`,
      ], response);
    });
};

/*------------------------------------------------------------------------*/
/*                   Endpoints for Groups in Group Sets                   */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of groups in a group set
 * @author Gabriel Abrams
 * @method listGroups
 * @param {number} groupSetId - Canvas group set Id to query
 * @return {Promise.<Object[]>} list of Canvas Groups {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
GroupSet.listGroups = (config) => {
  // @action: get the list of groups in a group set
  return config.visitEndpoint({
    path: `${prefix.v1}/group_categories/${config.options.groupSetId}/groups`,
    method: 'GET',
  });
};

/**
 * Gets info on a specific group in a group set (alias to
 *   groups.js/getGroup)
 * @author Gabriel Abrams
 * @method getGroup
 * @param {number} groupId - Canvas group Id
 * @return {Promise.<Object>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
GroupSet.getGroup = (config) => {
  // @action: get info on a specific group in a group set
  return config.api.course.group.get(config.options);
};

/**
 * Creates a new group in a group set
 * @author Gabriel Abrams
 * @method createGroup
 * @param {number} courseId - Canvas course Id
 * @param {number} groupSetId - Canvas group set Id to query
 * @param {string} [name=Unnamed Group] - Name of the new group
 * @param {string} [description=null] - Description of the new group
 * @param {boolean} [isPublic=false] - If truthy, group is public
 * @return {Promise.<Object>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
GroupSet.createGroup = (config) => {
  // @action: create a new group in a group set
  return config.visitEndpoint({
    path: `${prefix.v1}/group_categories/${config.options.groupSetId}/groups`,
    method: 'POST',
    params: {
      name: config.options.name || 'Unnamed Group',
      description: config.options.description || '',
      is_public: utils.isTruthy(config.options.isPublic),
    },
  })
    .then((response) => {
      return config.uncache([
        // Uncache group set list
        `${prefix.v1}/courses/${config.options.courseId}/group_categories`,
        // Uncache group set
        `${prefix.v1}/group_categories/${config.options.groupSetId}`,
      ], response);
    });
};


/**
 * Deletes a specific group from a group set
 * @author Gabriel Abrams
 * @method deleteGroup
 * @param {number} groupSetId - Canvas group set Id
 * @param {number} groupId - Canvas group Id to delete
 * @return {Promise.<Object>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
 */
GroupSet.deleteGroup = (config) => {
  // @action: delete a specific group from a group set
  return config.visitEndpoint({
    path: `${prefix.v1}/groups/${config.options.groupId}`,
    method: 'DELETE',
  })
    .then((response) => {
      return config.uncache([
        // Uncache group
        `${prefix.v1}/groups/${config.options.groupId}`,
        // Uncache group set list of group
        `${prefix.v1}/group_categories/${config.options.groupSetId}/groups`,
      ], response);
    });
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = GroupSet;
