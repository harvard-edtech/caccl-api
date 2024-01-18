/**
 * Functions for interacting with group sets/categories within courses
 * @namespace api.course.groupSet
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasGroupCategory from '../../types/CanvasGroupCategory';
import CanvasGroup from '../../types/CanvasGroup';
declare class ECatGroupSet extends EndpointCategory {
    /**
     * Lists the group sets in the course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.groupSet
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroupCategory[]>} list of Canvas GroupCategories {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
     */
    list(opts?: {
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasGroupCategory[]>;
    /**
     * Gets info on a specific group set
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.groupSet
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.groupSetId Canvas group set Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroupCategory>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
     */
    get(opts: {
        groupSetId: number;
    }, config?: APIConfig): Promise<CanvasGroupCategory>;
    /**
     * Create a group set in a course
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.groupSet
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {string} opts.name The name of the new group set
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   create a group set in
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroupCategory>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
     */
    create(opts: {
        name: string;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasGroupCategory>;
    /**
     * Deletes a group set
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.groupSet
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.groupSetId Canvas group set Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroupCategory>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
     */
    delete(opts: {
        groupSetId: number;
    }, config?: APIConfig): Promise<CanvasGroupCategory>;
    /**
     * Gets the list of groups in a group set
     * @author Gabe Abrams
     * @method listGroups
     * @memberof api.course.groupSet
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.groupSetId Canvas group set Id to query
     * @param {boolean} [opts.includeUsers] if true, after getting the list
     *   of groups, CACCL requests each group's member list individually and adds
     *   each array to the group as groups[i].users (an array of Canvas user
     *   objects)
     * @param {number} [opts.parallelLimit=1] the number of group membership
     *   arrays to request in parallel (if 1 or undefined, memberships will be
     *   requested serially). Only relevant if including users
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroup[]>} list of Canvas Groups {@link https://canvas.instructure.com/doc/api/groups.html#Group}
     */
    listGroups(opts: {
        groupSetId: number;
        includeMembers?: boolean;
        parallelLimit?: number;
    }, config?: APIConfig): Promise<CanvasGroup[]>;
}
export default ECatGroupSet;
