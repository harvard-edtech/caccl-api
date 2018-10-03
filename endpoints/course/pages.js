const utils = require('../helpers/utils.js');

module.exports = () => {
  return [

    /**
     * Gets the list of pages in a course
     * @param {number} courseId - Canvas course Id to query
     * @return list of Pages (see: https://canvas.instructure.com/doc/api/pages.html#Page)
     */
    {
      name: 'listPages',
      action: 'get the list of pages in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/pages',
          method: 'GET',
        });
      },
    },

    /**
     * Get info on a specific page in a course
     * @param {number} courseId - Canvas course Id to query
     * @param {string} pageURL - Canvas page url (just the last part of path)
     * @return Page (see: https://canvas.instructure.com/doc/api/pages.html#Page)
     */
    {
      name: 'getPage',
      action: 'get info on a specific page in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/pages/'
            + options.pageURL,
          method: 'GET',
        });
      },
    },

    /**
     * Updates a Canvas page
     * @param {number} courseID - Canvas course ID holding the page to update
     * @param {string} pageURL - Canvas page url (just the last part of path)
     * @param {string} title - New title of the page (default: unchanged)
     * @param {string} body - New html body of the page (default: unchanged)
     * @param {string} editingRoles - New usertype(s) who can edit
     *   (default: unchanged)
     * @param {boolean} notifyOfUpdate - if true, send notification
     * @param {boolean} published - New publish status of page. Must be a
     *   boolean (default: unchanged)
     * @param {boolean} frontPage - New front page status of page. Must be a
     *   boolean (defulat: unchanged)
     * @return Page (see: https://canvas.instructure.com/doc/api/pages.html#Page)
     */
    {
      name: 'updatePage',
      action: 'update a specific page in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/pages/'
            + options.pageURL,
          method: 'PUT',
          params: {
            'wiki_page[title]': utils.includeIfTruthy(options.title),
            'wiki_page[body]': utils.includeIfTruthy(options.body),
            'wiki_page[editing_roles]':
               utils.includeIfTruthy(options.editingRoles),
            'wiki_page[notify_of_update]':
               utils.includeIfTruthy(options.notify_of_update),
            'wiki_page[published]': utils.includeIfBoolean(options.published),
            'wiki_page[front_page]': utils.includeIfBoolean(options.frontPage),
          },
        });
      },
    },

    /**
     * Creates a new page in a course
     * @param {number} courseId - Canvas course Id to query
     * @param {string} title - The title of the page (default: Untitled Page)
     * @param {string} body - html body of the page (default: none)
     * @param {string} editingRoles - usertype(s) who can edit
     *   (default: teachers)
     * @param {boolean} notifyOfUpdate - if true, sends notification
     * @param {boolean} published - if true, publishes page upon creation
     * @param {boolean} frontPage - if true, sets page as front page
     * @return Page (see: https://canvas.instructure.com/doc/api/pages.html#Page)
     */
    {
      name: 'createPage',
      action: 'create a new page in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/pages',
          method: 'POST',
          params: {
            'wiki_page[title]': (options.title || 'Untitled Page'),
            'wiki_page[body]': (options.body || ''),
            'wiki_page[editing_roles]': (options.editingRoles || 'teachers'),
            'wiki_page[notify_of_update]':
              utils.isTruthy(options.notifyOfUpdate),
            'wiki_page[published]': utils.isTruthy(options.published),
            'wiki_page[front_page]': utils.isTruthy(options.frontPage),
          },
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache list of pages
              '/api/v1/courses/' + options.courseId + '/pages',
              // Uncache this specific page (in case someone pinged it before)
              '/api/v1/courses/' + options.courseId + '/pages/'
                + response.url,
            ],
          };
        });
      },
    },

    /**
     * Deletes a page from a course
     * @param {number} courseId - Canvas course Id to query
     * @param {string} pageURL - Page url to delete (just last part of path)
     * @return Page (see: https://canvas.instructure.com/doc/api/pages.html#Page)
     */
    {
      name: 'deletePage',
      action: 'delete a page from a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/pages/'
            + options.pageURL,
          method: 'DELETE',
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache list of pages
              '/api/v1/courses/' + options.courseId + '/pages',
              // Uncache this specific page
              '/api/v1/courses/' + options.courseId + '/pages/'
                + options.pageURL,
            ],
          };
        });
      },
    },

  ];
};
