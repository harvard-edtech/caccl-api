import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasTab from '../../types/CanvasTab';
declare class ECatNavMenuItem extends EndpointCategory {
    /**
     * Lists the nav menu items in the course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.navMenuItem
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId] Canvas course Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasTab[]>} list of Canvas Tabs {@link https://canvas.instructure.com/doc/api/tabs.html#method.tabs.index}
     */
    list(opts?: {
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasTab[]>;
    /**
     * Update a nav menu item
     * @author Gabe Abrams
     * @method update
     * @memberof api.course.navMenuItem
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {string} [opts.url] a url string identifying the item
     *   to move to the top of the menu. The url must either be a full url or
     *   a path.
     *   At least one of url, label, or id must
     *   be included. Case insensitive
     * @param {string} [opts.label] a text label identifying the item
     *   to move to the top of the menu. At least one of url, label, or id must
     *   be included. Case insensitive.
     * @param {string} [opts.id] the id of the item to move to the top of
     *   the menu. At least one of url, label, or id must be included. Case
     *   sensitive.
     * @param {boolean} [opts.moveToTop] if true, moves the given nav menu
     *   item as high up in the nav menu as allowed by Canvas. At best, the position
     *   will be set to 2 because position 1 is reserved for the "Home" item.
     * @param {number} [opts.position] the new position of the item (starts
     *   at 1)
     * @param {boolean} [opts.hidden] if true, menu item is hidden.
     *   if false, menu item is made visible. if excluded, visibility is unchanged.
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasTab>} Canvas Tab {@link https://canvas.instructure.com/doc/api/tabs.html#method.tabs.index}
     */
    update(opts?: {
        courseId?: number;
        url?: string;
        label?: string;
        id?: string;
        moveToTop?: boolean;
        position?: number;
        hidden?: boolean;
    }, config?: APIConfig): Promise<CanvasTab>;
}
export default ECatNavMenuItem;
