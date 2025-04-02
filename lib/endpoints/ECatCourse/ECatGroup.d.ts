/**
 * Functions for interacting with student groups within courses
 * @namespace api.course.group
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasUser from '../../types/CanvasUser';
import CanvasGroup from '../../types/CanvasGroup';
declare class ECatGroup extends EndpointCategory {
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
    get(opts: {
        groupId: number;
        includeUsers?: boolean;
    }, config?: APIConfig): Promise<CanvasGroup>;
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
    create(opts: {
        groupSetId: number;
        name?: string;
        description?: string;
        isPublic?: boolean;
    }, config?: APIConfig): Promise<CanvasGroup>;
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
    delete(opts: {
        groupId: number;
    }, config?: APIConfig): Promise<CanvasGroup>;
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
    listUsers(opts: {
        groupId: number;
    }, config?: APIConfig): Promise<CanvasUser[]>;
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
    updateMembers(opts: {
        groupId: number;
        members?: number[];
    }, config?: APIConfig): Promise<CanvasGroup>;
}
export default ECatGroup;
