/**
 * Functions for interacting with course navigation menu items
 * @namespace api.course.navMenu
 */
// Import caccl libs
import CACCLError from 'caccl-error';

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasTab from '../../types/CanvasTab';
import ErrorCode from '../../shared/types/ErrorCode';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatNavMenuItem extends EndpointCategory {
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
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasTab[]>} list of Canvas Tabs {@link https://canvas.instructure.com/doc/api/tabs.html#method.tabs.index}
   */
  public async list(
    opts: {
      courseId: Number,
    },
    config?: APIConfig,
  ): Promise<CanvasTab[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of nav menu items in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/tabs`,
      method: 'GET',
    });
  }

  /**
   * Update a nav menu item
   * @author Gabe Abrams
   * @method update
   * @memberof api.course.navMenuItem
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id
   * @param {string} [opts.url] - a url string identifying the item
   *   to move to the top of the menu. The url must either be a full url or
   *   a path.
   *   At least one of url, label, or id must
   *   be included. Case insensitive
   * @param {string} [opts.label] - a text label identifying the item
   *   to move to the top of the menu. At least one of url, label, or id must
   *   be included. Case insensitive.
   * @param {string} [opts.id] - the id of the item to move to the top of
   *   the menu. At least one of url, label, or id must be included. Case
   *   sensitive.
   * @param {boolean} [opts.moveToTop] - if true, moves the given nav menu
   *   item as high up in the nav menu as allowed by Canvas. At best, the position
   *   will be set to 2 because position 1 is reserved for the "Home" item.
   * @param {number} [opts.position] - the new position of the item (starts
   *   at 1)
   * @param {boolean} [opts.hidden] - if true, menu item is hidden.
   *   if false, menu item is made visible. if excluded, visibility is unchanged.
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasTab>} Canvas Tab {@link https://canvas.instructure.com/doc/api/tabs.html#method.tabs.index}
   */
  public async update(
    opts: {
      courseId: number,
      url?: string,
      label?: string,
      id?: string,
      moveToTop?: boolean,
      position?: number,
      hidden?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasTab> {
    // Create the update object
    const params: { [k: string]: any } = {};
    // > Add position
    if (opts.moveToTop) {
      params.position = 2;
    } else if (opts.position) {
      params.position = opts.position;
    }
    // > Add hidden
    if (opts.hidden !== undefined) {
      params.hidden = !!opts.hidden;
    }

    // Just return if no updates to be made
    if (Object.keys(params).length === 0) {
      return;
    }

    // Get the list of nav menu items
    const tabs = await this.api.course.navMenuItem.list({
      courseId: opts.courseId,
    });

    // Find the item we are looking for
    let tab: CanvasTab;
    for (let i = 0; i < tabs.length; i++) {
      // Match based on id
      if (
        opts.id
        && (
          String(tabs[i].id).trim()
          === String(opts.id).trim()
        )
      ) {
        tab = tabs[i];
        break;
      }
      // Match based on url
      if (
        opts.url
        && (
          tabs[i].html_url.toLowerCase()
          === opts.url.toLowerCase()
        )
      ) {
        tab = tabs[i];
        break;
      }
      // Match based on label
      if (
        opts.label
        && (
          String(tabs[i].label).trim().toLowerCase()
          === String(opts.label).trim().toLowerCase()
        )
      ) {
        tab = tabs[i];
        break;
      }
    }

    // Error if no menu item found
    if (!tab) {
      throw new CACCLError({
        message: 'We could not find the menu item of interest.',
        code: ErrorCode.NavItemNotFound,
      });
    }

    // Keep same value for hidden field if unchanged
    if (params.hidden === undefined) {
      params.hidden = !!tab.hidden;
    }

    /**
     * Attempt to modify tab
     * @author Gabe Abrams
     */
    const makeAttempt = async (): Promise<CanvasTab> => {
      // Update the item
      try {
        const results = await this.visitEndpoint({
          config,
          action: 'update a nav menu item in a course',
          params,
          path: `${API_PREFIX}/courses/${opts.courseId}/tabs/${tab.id}`,
          method: 'PUT',
        });

        return results;
      } catch (err) {
        // Check for invalid location errors we can fix
        if (
          err.code === ErrorCode.InvalidTabLocation
          && opts.moveToTop
        ) {
          // Keep trying larger numbered positions
          if (params.position >= tabs.length) {
            // Already at the max position
            throw new CACCLError({
              message: 'In an attempt to move a nav item to the top of the menu, we tried every position and Canvas denied the change.',
              code: ErrorCode.TriedAllTabLocations,
            });
          }

          // We can still try the next position
          // > Increment the position
          params.position += 1;
          // > Make another attempt
          return makeAttempt();
        }

        // Other error. Rethrow it
        throw err;
      }
    };

    // Start attempts
    return makeAttempt();
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatNavMenuItem;
