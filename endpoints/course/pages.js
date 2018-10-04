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
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/courses/' + cg.options.courseId + '/pages',
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
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/courses/' + cg.options.courseId + '/pages/'
            + cg.options.pageURL,
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
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/courses/' + cg.options.courseId + '/pages/'
            + cg.options.pageURL,
          method: 'PUT',
          params: {
            'wiki_page[title]': utils.includeIfTruthy(cg.options.title),
            'wiki_page[body]': utils.includeIfTruthy(cg.options.body),
            'wiki_page[editing_roles]':
               utils.includeIfTruthy(cg.options.editingRoles),
            'wiki_page[notify_of_update]':
               utils.includeIfTruthy(cg.options.notify_of_update),
            'wiki_page[published]': utils.includeIfBoolean(cg.options.published),
            'wiki_page[front_page]': utils.includeIfBoolean(cg.options.frontPage),
          },
        }).then((response) => {
          cg.uncache([
            // Uncache list of pages
            '/api/v1/courses/' + cg.options.courseId + '/pages',
            // Uncache this specific page (in case someone pinged it before)
            '/api/v1/courses/' + cg.options.courseId + '/pages/'
              + cg.options.pageURL,
          ]);
          return Promise.resolve(response);
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
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/courses/' + cg.options.courseId + '/pages',
          method: 'POST',
          params: {
            'wiki_page[title]': (cg.options.title || 'Untitled Page'),
            'wiki_page[body]': (cg.options.body || ''),
            'wiki_page[editing_roles]': (cg.options.editingRoles || 'teachers'),
            'wiki_page[notify_of_update]':
              utils.isTruthy(cg.options.notifyOfUpdate),
            'wiki_page[published]': utils.isTruthy(cg.options.published),
            'wiki_page[front_page]': utils.isTruthy(cg.options.frontPage),
          },
        }).then((response) => {
          cg.uncache([
            // Uncache list of pages
            '/api/v1/courses/' + cg.options.courseId + '/pages',
            // Uncache this specific page (in case someone pinged it before)
            '/api/v1/courses/' + cg.options.courseId + '/pages/'
              + response.url,
          ]);
          return Promise.resolve(response);
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
      run: (cg) => {
        return cg.visitEndpoint({
          path: '/api/v1/courses/' + cg.options.courseId + '/pages/'
            + cg.options.pageURL,
          method: 'DELETE',
        }).then((response) => {
          cg.uncache([
            // Uncache list of pages
            '/api/v1/courses/' + cg.options.courseId + '/pages',
            // Uncache this specific page
            '/api/v1/courses/' + cg.options.courseId + '/pages/'
              + cg.options.pageURL,
          ]);
          return Promise.resolve(response);
        });
      },
    },

  ];
};
