/**
 * Functions for interacting with course navigation menu items
 * @namespace api.course.navMenu
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');
const CACCLError = require('caccl-error');
const errorCodes = require('../../../errorCodes');

class NavMenuItem extends EndpointCategory {
  constructor(config) {
    super(config, NavMenuItem);
  }
}

/*------------------------------------------------------------------------*/
/*                            Nav Menu Endpoints                          */
/*------------------------------------------------------------------------*/

/**
 * Lists the nav menu items in the course
 * @author Gabe Abrams
 * @method list
 * @memberof api.course.navMenuItem
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @return {Tab[]} list of Canvas Tabs {@link https://canvas.instructure.com/doc/api/tabs.html#method.tabs.index}
 */
NavMenuItem.list = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/tabs`,
    method: 'GET',
  });
};
NavMenuItem.list.action = 'get the list of nav menu items in a course';
NavMenuItem.list.requiredParams = ['courseId'];
NavMenuItem.list.scopes = [
  'url:GET|/api/v1/courses/:course_id/tabs',
];

/**
 * Update a nav menu item
 * @author Gabe Abrams
 * @method update
 * @memberof api.course.navMenuItem
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {string} [options.url] - a url string identifying the item
 *   to move to the top of the menu. The url must either be a full url or
 *   a path.
 *   At least one of url, label, or id must
 *   be included. Case insensitive
 * @param {string} [options.label] - a text label identifying the item
 *   to move to the top of the menu. At least one of url, label, or id must
 *   be included. Case insensitive.
 * @param {string} [options.id] - the id of the item to move to the top of
 *   the menu. At least one of url, label, or id must be included. Case
 *   sensitive.
 * @param {boolean} [options.moveToTop] - if true, position is set to 1
 * @param {number} [options.position] - the new position of the item (starts
 *   at 1)
 * @param {boolean} [options.hidden=false] - if true, menu item is hidden.
 *   if false, menu item is made visible. if excluded, visibility is unchanged.
 * @return {Tab} Canvas Tab {@link https://canvas.instructure.com/doc/api/tabs.html#method.tabs.index}
 */
NavMenuItem.update = function (options) {
  // Create the update object
  const params = {};
  // > Add position
  if (options.moveToTop) {
    params.position = 1;
  } else if (options.position) {
    params.position = options.position;
  }
  // > Add hidden
  if (options.hidden !== undefined) {
    params.hidden = !!options.hidden;
  }

  // Just return if no updates to be made
  if (Object.keys(params).length === 0) {
    return;
  }

  // Get the list of nav menu items
  return this.api.course.navMenuItem.list({ courseId: options.courseId })
    .then((items) => {
      // Find the item we are looking for
      let item;
      for (let i = 0; i < items.length; i++) {
        // Match based on id
        if (
          options.id
          && (
            String(items[i].id).trim()
            === String(options.id).trim()
          )
        ) {
          item = items[i];
          break;
        }
        // Match based on url
        if (
          options.url
          && (
            [
              items[i].html_url.toLowerCase(),
              items[i].full_url.toLowerCase(),
            ].indexOf(options.url.toLowerCase()) >= 0
          )
        ) {
          item = items[i];
          break;
        }
        // Match based on label
        if (
          options.label
          && (
            String(items[i].label)
              .trim()
              .toLowerCase()
            === String(options.label)
              .trim()
              .toLowerCase()
          )
        ) {
          item = items[i];
          break;
        }
      }

      // Error if no menu item found
      if (!item) {
        throw new CACCLError({
          message: 'We could not find the menu item of interest.',
          code: errorCodes.navItemNotFound,
        });
      }

      // Keep same value for hidden field if unchanged
      if (params.hidden === undefined) {
        params.hidden = !!item.hidden;
      }

      // Update the item
      return this.visitEndpoint({
        params,
        path: `${prefix.v1}/courses/${options.courseId}/tabs/${item.id}`,
        method: 'PUT',
      });
    });
};
NavMenuItem.update.action = 'update a nav menu item in a course';
NavMenuItem.update.requiredParams = ['courseId'];
NavMenuItem.update.scopes = [
  NavMenuItem.list,
  'url:GET|/api/v1/courses/:course_id/tabs',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = NavMenuItem;
