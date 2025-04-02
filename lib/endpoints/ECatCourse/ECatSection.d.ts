/**
 * Functions for interacting with sections within courses
 * @namespace api.course.section
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasSection from '../../types/CanvasSection';
declare class ECatSection extends EndpointCategory {
    /**
     * Gets the list of sections in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.section
     * @instance
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {boolean} [opts.includeStudents] if true, the list of students
     *   from each section are included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSection[]>} list of Canvas Sections {@link https://canvas.instructure.com/doc/api/sections.html#Section}
     */
    list(opts?: {
        courseId?: number;
        includeStudents?: boolean;
    }, config?: APIConfig): Promise<CanvasSection[]>;
    /**
     * Gets info on a specific section
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.section
     * @instance
     * @param {object} opts object containing all arguments
     * @param {number} opts.sectionId Section Id to retrieve
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {boolean} [opts.includeStudents] if true, the list of students
     *   in the section are included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSection>} Canvas Section {@link https://canvas.instructure.com/doc/api/sections.html#Section}
     */
    get(opts: {
        sectionId: number;
        courseId?: number;
        includeStudents?: boolean;
    }, config?: APIConfig): Promise<CanvasSection>;
}
export default ECatSection;
