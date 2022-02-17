/**
 * Functions for interacting with assignment groups within courses
 * @namespace api.course.assignmentGroup
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasAssignmentGroup from '../../types/CanvasAssignmentGroup';
declare class AssignmentGroup extends EndpointCategory {
    /**
     * Lists assignment groups in a course
     * @author Gabe Abrams
     * @memberof api.course.assignmentGroup
     * @instance
     * @async
     * @method list
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<AssignmentGroup[]>} list of Canvas AssignmentGroups {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
     */
    list(opts: {
        courseId: number;
    }, config?: APIConfig): Promise<AssignmentGroup[]>;
    /**
     * Gets info on a specific assignment group in a course
     * @author Gabe Abrams
     * @memberof api.course.assignmentGroup
     * @instance
     * @async
     * @method get
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.assignmentGroupId - Assignment group to get
     * @param {boolean} [opts.includeAssignments] - if true, the list of
     *   assignments inside the group is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
     */
    get(opts: {
        courseId: number;
        assignmentGroupId: number;
        includeAssignments?: boolean;
    }, config?: APIConfig): Promise<CanvasAssignmentGroup>;
    /**
     * Updates an assignment group in a course
     * @author Gabe Abrams
     * @memberof api.course.assignmentGroup
     * @instance
     * @async
     * @method update
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.assignmentGroupId - Assignment group to update
     * @param {string} [opts.name=current value] - New assignment group name
     * @param {number} [opts.weight=current value] - New weight
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
     */
    update(opts: {
        courseId: number;
        assignmentGroupId: number;
        name?: string;
        weight?: number;
    }, config?: APIConfig): Promise<CanvasAssignmentGroup>;
    /**
     * Create a new assignment group in a course
     * @author Gabe Abrams
     * @memberof api.course.assignmentGroup
     * @instance
     * @async
     * @method create
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {string} opts.name - New assignment group name
     * @param {number} [opts.weight=0] - Assignment group weight
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
     */
    create(opts: {
        courseId: number;
        name: string;
        weight?: number;
    }, config?: APIConfig): Promise<CanvasAssignmentGroup>;
    /**
     * Deletes an assignment group from a course
     * @author Gabe Abrams
     * @memberof api.course.assignmentGroup
     * @instance
     * @async
     * @method delete
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.assignmentGroupId - Assignment group to delete
     * @param {number} [opts.moveAssignmentsTo] - Assignment group to move
     *   assignments to. If this parameter isn't included, assignments in the
     *   assignment group will be deleted.
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
     */
    delete(opts: {
        courseId: number;
        assignmentGroupId: number;
        moveAssignmentsTo: number;
    }, config?: APIConfig): Promise<CanvasAssignmentGroup>;
}
export default AssignmentGroup;
