/**
 * Functions for interacting with folders within courses
 * @namespace api.course.folder
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasFolder from '../../types/CanvasFolder';
declare class ECatFolder extends EndpointCategory {
    /**
     * Lists the folders in a course
     * @author Yuen Ler Chow
     * @method list
     * @memberof api.course.folder
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasFolder>} A Canvas Folder {@link https://canvas.instructure.com/doc/api/folders.html}
     */
    list(opts?: {
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasFolder>;
}
export default ECatFolder;
