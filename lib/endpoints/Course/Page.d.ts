/**
 * Functions for interacting with pages within courses
 * @namespace api.course.page
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasPage from '../../types/CanvasPage';
declare class Page extends EndpointCategory {
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
    list(opts: {
        courseId: number;
    }, config?: APIConfig): Promise<CanvasPage[]>;
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
    get(opts: {
        courseId: number;
        pageURL: string;
    }, config?: APIConfig): Promise<CanvasPage>;
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
    update(opts: {
        courseId: number;
        pageURL: string;
        notifyOfUpdate?: boolean;
        title?: string;
        body?: string;
        editingRoles?: string;
        published?: boolean;
        frontPage?: boolean;
    }, config?: APIConfig): Promise<CanvasPage>;
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
    create(opts: {
        courseId: number;
        title?: string;
        body?: string;
        editingRoles?: string;
        notifyOfUpdate?: boolean;
        published?: boolean;
        frontPage?: boolean;
    }, config?: APIConfig): Promise<CanvasPage>;
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
    delete(opts: {
        courseId: number;
        pageURL: string;
    }, config?: APIConfig): Promise<CanvasPage>;
}
export default Page;
