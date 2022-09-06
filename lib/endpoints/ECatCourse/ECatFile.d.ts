/**
 * Functions for interacting with files within courses
 * @namespace api.course.file
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasFile from '../../types/CanvasFile';
declare class ECatFile extends EndpointCategory {
    /**
     * Lists the files in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.file
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasFile>} A Canvas File {@link https://canvas.instructure.com/doc/api/files.html}
     */
    list(opts?: {
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasFile>;
}
export default ECatFile;
