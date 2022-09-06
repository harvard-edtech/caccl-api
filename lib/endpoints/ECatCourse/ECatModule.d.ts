/**
 * Functions for interacting with modules within courses
 * @namespace api.course.module
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasModule from '../../types/CanvasModule';
declare class ECatModule extends EndpointCategory {
    /**
     * Lists the modules in a course
     * @author Yuen Ler Chow
     * @method list
     * @memberof api.course.module
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasModule>} A Canvas Module {@link https://canvas.instructure.com/doc/api/modules.html}
     */
    list(opts?: {
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasModule>;
}
export default ECatModule;
