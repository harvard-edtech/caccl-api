/**
 * Functions for interacting with pages within courses
 * @namespace api.course.page
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasPage from '../../types/CanvasPage';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatPage extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                             Page Endpoints                             */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of pages in a course
   * @author Gabe Abrams
   * @method list
   * @memberof api.course.page
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasPage[]>} list of Canvas Pages {@link https://canvas.instructure.com/doc/api/pages.html#Page}
   */
  public async list(
    opts: {
      courseId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasPage[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of pages in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/pages`,
      method: 'GET',
    });
  }

  /**
   * Get info on a specific page in a course
   * @author Gabe Abrams
   * @method get
   * @memberof api.course.page
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {string} opts.pageURL - Canvas page url (just the last part of
   *   path)
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasPage>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
   */
  public async get(
    opts: {
      courseId: number,
      pageURL: string,
    },
    config?: APIConfig,
  ): Promise<CanvasPage> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific page in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/pages/${opts.pageURL}`,
      method: 'GET',
    });
  }

  /**
   * Updates a Canvas page
   * @author Gabe Abrams
   * @method update
   * @memberof api.course.page
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course ID holding the page to
   *   update
   * @param {string} opts.pageURL - Canvas page url (just the last part of
   *   path)
   * @param {boolean} [opts.notifyOfUpdate] - if true, send notification
   * @param {string} [opts.title=current value] - New title of the page
   * @param {string} [opts.body=current value] - New html body of the page
   * @param {string} [opts.editingRoles=current value] - New usertype(s) who
   *   can edit
   * @param {boolean} [opts.published=current value] - New publish status of
   *   page
   * @param {boolean} [opts.frontPage=current value] - New front page status of
   *   page
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasPage>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
   */
  public async update(
    opts: {
      courseId: number,
      pageURL: string,
      notifyOfUpdate?: boolean,
      title?: string,
      body?: string,
      editingRoles?: string,
      published?: boolean,
      frontPage?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasPage> {
    return this.visitEndpoint({
      config,
      action: 'update a specific page in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/pages/${opts.pageURL}`,
      method: 'PUT',
      params: {
        'wiki_page[title]': utils.includeIfTruthy(opts.title),
        'wiki_page[body]': utils.includeIfTruthy(opts.body),
        'wiki_page[editing_roles]': (
          utils.includeIfTruthy(opts.editingRoles)
        ),
        'wiki_page[notify_of_update]': (
          utils.includeIfTruthy(opts.notifyOfUpdate)
        ),
        'wiki_page[published]': utils.includeIfBoolean(opts.published),
        'wiki_page[front_page]': utils.includeIfBoolean(opts.frontPage),
      },
    });
  }

  /**
   * Creates a new page in a course
   * @author Gabe Abrams
   * @method create
   * @memberof api.course.page
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {string} [opts.title=Untitled Page] - The title of the page
   * @param {string} [opts.body=null] - html body of the page
   * @param {string} [opts.editingRoles=teachers] - usertype(s) who can edit
   * @param {boolean} [opts.notifyOfUpdate] - if true, sends notification
   * @param {boolean} [opts.published] - if true, publishes page upon
   *   creation
   * @param {boolean} [opts.frontPage] - if true, sets page as front page
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasPage>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
   */
  public async create(
    opts: {
      courseId: number,
      title?: string,
      body?: string,
      editingRoles?: string,
      notifyOfUpdate?: boolean,
      published?: boolean,
      frontPage?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasPage> {
    return this.visitEndpoint({
      config,
      action: 'create a new page in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/pages`,
      method: 'POST',
      params: {
        'wiki_page[title]': (opts.title || 'Untitled Page'),
        'wiki_page[body]': (opts.body || ''),
        'wiki_page[editing_roles]': (opts.editingRoles || 'teachers'),
        'wiki_page[notify_of_update]':
          utils.isTruthy(opts.notifyOfUpdate),
        'wiki_page[published]': utils.isTruthy(opts.published),
        'wiki_page[front_page]': utils.isTruthy(opts.frontPage),
      },
    });
  }

  /**
   * Deletes a page from a course
   * @author Gabe Abrams
   * @method delete
   * @memberof api.course.page
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {string} opts.pageURL - Page url to delete (just last part of path)
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasPage>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
   */
  public async delete(
    opts: {
      courseId: number,
      pageURL: string,
    },
    config?: APIConfig,
  ): Promise<CanvasPage> {
    return this.visitEndpoint({
      config,
      action: 'delete a page from a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/pages/${opts.pageURL}`,
      method: 'DELETE',
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatPage;
