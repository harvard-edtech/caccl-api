/**
 * Functions for interacting with student groups within courses
 * @namespace api.course.group
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasUser from '../../types/CanvasUser';
import CanvasGroup from '../../types/CanvasGroup';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatGroup extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                           Table of Contents:                           */
  /*                           - Group                                      */
  /*                           - Group Members                              */
  /*------------------------------------------------------------------------*/

  /*------------------------------------------------------------------------*/
  /*                             Group Endpoints                            */
  /*------------------------------------------------------------------------*/

  /**
   * Gets info on a specific group in a course
   * @author Gabe Abrams
   * @method get
   * @memberof api.course.group
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.groupId - Canvas group Id
   * @param {boolean} [opts.includeUsers] if true, include users as group.users
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @return {Promise<CanvasGroup>} Canvas group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  public async get(
    opts: {
      groupId: number,
      includeUsers?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasGroup> {
    const group = await this.visitEndpoint({
      config,
      action: 'get info on a specific group in a course',
      path: `${API_PREFIX}/groups/${opts.groupId}`,
      method: 'GET',
    });

    if (!opts.includeUsers || group.users) {
      // Return group as-is
      return group;
    }

    // Augment with users
    const users = await this.listUsers(
      {
        groupId: opts.groupId,
      },
      config,
    );

    return {
      ...group,
      users,
    };
  }

  /**
   * Create a new group in a group set
   * @author Gabe Abrams
   * @method create
   * @memberof api.course.group
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.groupSetId - Canvas group set Id to put the group into
   * @param {string} [opts.name=Unnamed Group] - Name of the new group
   * @param {string} [opts.description] - Description of the new group
   * @param {boolean} [opts.isPublic] - If truthy, group is public
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @return {Promise<CanvasGroup>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  public async create(
    opts: {
      groupSetId: number,
      name?: string,
      description?: string,
      isPublic?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasGroup> {
    return this.visitEndpoint({
      config,
      action: 'create a new group in a group set',
      path: `${API_PREFIX}/group_categories/${opts.groupSetId}/groups`,
      method: 'POST',
      params: {
        name: (opts.name || 'Unnamed Group'),
        description: (opts.description || ''),
        is_public: utils.isTruthy(opts.isPublic),
      },
    });
  }

  /**
   * Delete a specific group from a group set
   * @author Gabe Abrams
   * @method delete
   * @memberof api.course.group
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.groupId - Canvas group Id to delete
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @return {Promise<CanvasGroup>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  public async delete(
    opts: {
      groupId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasGroup> {
    return this.visitEndpoint({
      config,
      action: 'delete a specific group from a group set',
      path: `${API_PREFIX}/groups/${opts.groupId}`,
      method: 'DELETE',
    });
  }

  // NOTE: to create or delete a group, see endpoints in groupSets

  /*------------------------------------------------------------------------*/
  /*                         Group Member Endpoints                         */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of users in a group
   * @author Gabe Abrams
   * @method listUsers
   * @memberof api.course.group
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.groupId - Canvas group Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @return {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
   */
  public async listUsers(
    opts: {
      groupId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasUser[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of members in a specific group',
      path: `${API_PREFIX}/groups/${opts.groupId}/users`,
      method: 'GET',
    });
  }

  /**
   * Gets the list of members in a group
   * @author Gabe Abrams
   * @method updateMembers
   * @memberof api.course.group
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.groupId - Canvas group Id
   * @param {number[]} [opts.members=[]] - The list of user objects/user Ids that
   *   should be in the group
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @return {Promise<CanvasGroup>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
   */
  public async updateMembers(
    opts: {
      groupId: number,
      members?: number[],
    },
    config?: APIConfig,
  ): Promise<CanvasGroup> {
    return this.visitEndpoint({
      config,
      action: 'update the list of members in a group',
      path: `${API_PREFIX}/groups/${opts.groupId}`,
      method: 'PUT',
      params: {
        members: utils.extractIdsIfApplicable(opts.members),
      },
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatGroup;
