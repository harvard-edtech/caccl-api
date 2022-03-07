/**
 * Functions for interacting with rubrics within courses
 * @namespace api.course.rubric
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasRubric from '../../types/CanvasRubric';
declare class ECatRubric extends EndpointCategory {
    /**
     * Lists the set of rubrics in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.rubric
     * @instance
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to add
     *   the rubric to
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasRubric[]>} list of Canvas Rubrics {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
     */
    list(opts?: {
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasRubric[]>;
    /**
     * Gets info on a specific rubric in a course
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.rubric
     * @instance
     * @param {object} opts object containing all arguments
     * @param {number} opts.rubricId Canvas course Id to add the rubric to
     * @param {number} [opts.courseId=default course id] Canvas course Id to add
     *   the rubric to
     * @param {string} [opts.include] Allowed values: ['assessments',
     *   'graded_assessments', 'peer_assessments']. If excluded, no assessments
     *   will be included (default: none)
     * @param {string} [opts.assessmentStyle=both omitted] Allowed values:
     *   ['full','comments_only']
     *   (full = entire assessment, comments_only = only comment part of
     *   assessment). Only valid if including assessments
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasRubric>} Canvas Rubric {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
     */
    get(opts: {
        rubricId: number;
        courseId?: number;
        include?: ('assessments' | 'graded_assessments' | 'peer_assessments');
        assessmentStyle?: ('full' | 'comments_only');
    }, config?: APIConfig): Promise<CanvasRubric>;
    /**
     * Creates a new rubric for grading with free form comments enabled and add it
     *   to an assignment in a course.
     * @author Gabe Abrams
     * @method createFreeFormGradingRubricInAssignment
     * @memberof api.course.rubric
     * @instance
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas course Id to add the rubric to
     * @param {Array} opts.rubricItems List of rubric item objects:
     *   [{description, points, [longDescription]}, ...]
     * @param {number} [opts.courseId=default course id] Canvas course Id to add the rubric to
     * @param {string} [opts.title=generated title] Title of the new rubric
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasRubric>} Canvas Rubric {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
     */
    createFreeFormGradingRubricInAssignment(opts: {
        assignmentId: number;
        rubricItems: ({
            description: string;
            points: number;
            longDescription?: string;
        })[];
        courseId?: number;
        title?: string;
    }, config?: APIConfig): Promise<CanvasRubric>;
}
export default ECatRubric;
