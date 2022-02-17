/**
 * Functions for interacting with group sets/categories within courses
 * @namespace api.course.groupSet
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';

// Import shared helpers
import parallelLimit from '../../shared/helpers/parallelLimit';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';
import CanvasGroup from '../../types/CanvasGroup';
import CanvasGroupCategory from '../../types/CanvasGroupCategory';

// Endpoint category
class GroupSet extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                           Table of Contents:                           */
  /*                           - Group Sets                                 */
  /*                           - Groups in Group Sets                       */
  /*------------------------------------------------------------------------*/

  // NOTE: Canvas uses inconsistent language. What are referred to as
  // "group sets" in the front-end are called "group categories" in the API.

  /*------------------------------------------------------------------------*/
  /*                           Group Set Endpoints                          */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the group sets in the course
   * @author Gabe Abrams
   * @method list
   * @memberof api.course.groupSet
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @return {Promise<CanvasGroupCategory[]>} list of Canvas GroupCategories {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
   */
  public async list(
    opts: {
      courseId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasGroupCategory[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of group sets in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/group_categories`,
      method: 'GET',
    });
  }

  /**
   * Gets info on a specific group set
   * @author Gabe Abrams
   * @method get
   * @memberof api.course.groupSet
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.groupSetId - Canvas group set Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @return {Promise<CanvasGroupCategory>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
   */
  public async get(
    opts: {
      groupSetId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasGroupCategory> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific group set in a course',
      path: `${API_PREFIX}/group_categories/${opts.groupSetId}`,
      method: 'GET',
    });
  }

  /**
   * Create a group set in a course
   * @author Gabe Abrams
   * @method create
   * @memberof api.course.groupSet
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to create a group set in
   * @param {string} opts.name - The name of the new group set
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @return {Promise<CanvasGroupCategory>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
   */
  public async create(
    opts: {
      courseId: number,
      name: string,
    },
    config?: APIConfig,
  ): Promise<CanvasGroupCategory> {
    return this.visitEndpoint({
      config,
      action: 'create a new group set in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/group_categories`,
      method: 'POST',
      params: {
        name: opts.name || 'Unnamed Group Set',
      },
    });
  }

  /**
   * Deletes a group set
   * @author Gabe Abrams
   * @method delete
   * @memberof api.course.groupSet
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id
   * @param {number} opts.groupSetId - Canvas group set Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @return {Promise<CanvasGroupCategory>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
   */
  public async delete(
    opts: {
      courseId: number,
      groupSetId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasGroupCategory> {
    return this.visitEndpoint({
      config,
      action: 'delete a specific group set from a course',
      path: `${API_PREFIX}/group_categories/${opts.groupSetId}`,
      method: 'DELETE',
    });
  };

  /*------------------------------------------------------------------------*/
  /*                   Endpoints for Groups in Group Sets                   */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of groups in a group set
   * @author Gabe Abrams
   * @method listGroups
   * @memberof api.course.groupSet
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.groupSetId - Canvas group set Id to query
   * @param {boolean} [opts.includeUsers] - if true, after getting the list
   *   of groups, CACCL requests each group's member list individually and adds
   *   each array to the group as groups[i].users (an array of Canvas user
   *   objects)
   * @param {number} [opts.parallelLimit=1] - the number of group membership
   *   arrays to request in parallel (if 1 or undefined, memberships will be
   *   requested serially). Only relevant if including users
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @return {Promise<CanvasGroup[]>} list of Canvas Groups {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  public async listGroups(
    opts: {
      groupSetId: number,
      includeMembers?: boolean,
      parallelLimit?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasGroup[]> {
    // Get the list of groups
    const groups: CanvasGroup[] = await this.visitEndpoint({
      config,
      action: 'get the list of groups in a course',
      path: `${API_PREFIX}/group_categories/${opts.groupSetId}/groups`,
      method: 'GET',
    });

    // Finish if not requesting members
    if (!opts.includeMembers) {
      return groups;
    }

    // Add members in parallel
    return await parallelLimit(
      groups.map((group) => {
        return async () => {
          if (group.users) {
            // Users already defined. Return
            return group;
          }

          // Fetch users
          const users = await this.api.course.group.listUsers({
            groupId: group.id,
          });

          return {
            ...group,
            users,
          };
        };
      }),
      (opts.parallelLimit || 1),
    );
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default GroupSet;
