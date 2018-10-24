/**
 * Page endpoints module
 * @module endpoints/course/pages
 * @see module: endpoints/course/pages
 */
const utils = require('../common/utils.js');
const prefix = require('../common/prefix.js');

module.exports = [

  /**
   * Gets the list of pages in a course
   * @method listPages
   * @param {number} courseId - Canvas course Id to query
   * @return {Promise.<Object[]>} list of Canvas Pages {@link https://canvas.instructure.com/doc/api/pages.html#Page}
   */
  {
    name: 'listPages',
    action: 'get the list of pages in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/pages`,
        method: 'GET',
      });
    },
  },

  /**
   * Get info on a specific page in a course
   * @method getPage
   * @param {number} courseId - Canvas course Id to query
   * @param {string} pageURL - Canvas page url (just the last part of path)
   * @return {Promise.<Object>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
   */
  {
    name: 'getPage',
    action: 'get info on a specific page in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/pages/${config.options.pageURL}`,
        method: 'GET',
      });
    },
  },

  /**
   * Updates a Canvas page
   * @method updatePage
   * @param {number} courseID - Canvas course ID holding the page to update
   * @param {string} pageURL - Canvas page url (just the last part of path)
   * @param {boolean} [notifyOfUpdate=false] - if true, send notification
   * @param {string} [title=current value] - New title of the page
   * @param {string} [body=current value] - New html body of the page
   * @param {string} [editingRoles=current value] - New usertype(s) who can edit
   * @param {boolean} [published=current value] - New publish status of page
   *   Must be a boolean
   * @param {boolean} [frontPage=current value] - New front page status of page.
   *   Must be a boolean
   * @return {Promise.<Object>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
   */
  {
    name: 'updatePage',
    action: 'update a specific page in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/pages/${config.options.pageURL}`,
        method: 'PUT',
        params: {
          'wiki_page[title]': utils.includeIfTruthy(config.options.title),
          'wiki_page[body]': utils.includeIfTruthy(config.options.body),
          'wiki_page[editing_roles]':
             utils.includeIfTruthy(config.options.editingRoles),
          'wiki_page[notify_of_update]':
             utils.includeIfTruthy(config.options.notify_of_update),
          'wiki_page[published]': utils.includeIfBoolean(config.options.published),
          'wiki_page[front_page]': utils.includeIfBoolean(config.options.frontPage),
        },
      }).then((response) => {
        return config.uncache([
          // Uncache list of pages
          `${prefix.v1}/courses/${config.options.courseId}/pages`,
          // Uncache this specific page (in case someone pinged it before)
          `${prefix.v1}/courses/${config.options.courseId}/pages/${config.options.pageURL}`,
        ], response);
      });
    },
  },

  /**
   * Creates a new page in a course
   * @method createPage
   * @param {number} courseId - Canvas course Id to query
   * @param {string} [title=Untitled Page] - The title of the page
   * @param {string} [body=null] - html body of the page
   * @param {string} [editingRoles=teachers] - usertype(s) who can edit
   * @param {boolean} [notifyOfUpdate=false] - if true, sends notification
   * @param {boolean} [published=false] - if true, publishes page upon creation
   * @param {boolean} [frontPage=false] - if true, sets page as front page
   * @return {Promise.<Object>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
   */
  {
    name: 'createPage',
    action: 'create a new page in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/pages`,
        method: 'POST',
        params: {
          'wiki_page[title]': (config.options.title || 'Untitled Page'),
          'wiki_page[body]': (config.options.body || ''),
          'wiki_page[editing_roles]': (config.options.editingRoles || 'teachers'),
          'wiki_page[notify_of_update]':
            utils.isTruthy(config.options.notifyOfUpdate),
          'wiki_page[published]': utils.isTruthy(config.options.published),
          'wiki_page[front_page]': utils.isTruthy(config.options.frontPage),
        },
      }).then((response) => {
        return config.uncache([
          // Uncache list of pages
          `${prefix.v1}/courses/${config.options.courseId}/pages`,
          // Uncache this specific page (in case someone pinged it before)
          `${prefix.v1}/courses/${config.options.courseId}/pages/${response.url}`,
        ], response);
      });
    },
  },

  /**
   * Deletes a page from a course
   * @method deletePage
   * @param {number} courseId - Canvas course Id to query
   * @param {string} pageURL - Page url to delete (just last part of path)
   * @return {Promise.<Object>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
   */
  {
    name: 'deletePage',
    action: 'delete a page from a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/pages/${config.options.pageURL}`,
        method: 'DELETE',
      }).then((response) => {
        return config.uncache([
          // Uncache list of pages
          `${prefix.v1}/courses/${config.options.courseId}/pages`,
          // Uncache this specific page
          `${prefix.v1}/courses/${config.options.courseId}/pages/${config.options.pageURL}`,
        ], response);
      });
    },
  },

];
