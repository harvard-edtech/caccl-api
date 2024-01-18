/**
 * Functions for interacting with gradebook columns within courses
 * @namespace api.course.gradebookColumn
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasCustomColumn from '../../types/CanvasCustomColumn';
import CanvasColumnDatum from '../../types/CanvasColumnDatum';
import CanvasProgress from '../../types/CanvasProgress';
declare class ECatGradebookColumn extends EndpointCategory {
    /**
     * Gets the list of custom gradebook columns in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId] Canvas course Id to query
     * @param {boolean} [opts.includeHidden] If truthy, includes hidden
     *   gradebook columns as well.
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCustomColumn[]>} List of Canvas CustomColumns {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
     */
    list(opts?: {
        courseId?: number;
        includeHidden?: boolean;
    }, config?: APIConfig): Promise<CanvasCustomColumn[]>;
    /**
     * Gets info on a specific gradebook column in a course. This is a simulated
     *   endpoint: it does not exist. We are just pulling the list of columns and
     *   returning one element.
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.columnId Canvas column Id to return
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {boolean} [opts.isHidden] Must be set to true if the column
     *   you're retrieving is a hidden column.
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
     */
    get(opts: {
        columnId: number;
        courseId?: number;
        includeHidden?: boolean;
    }, config?: APIConfig): Promise<CanvasCustomColumn>;
    /**
     * Updates a gradebook column's information
     * @author Gabe Abrams
     * @method update
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.columnId Canvas custom gradebook column ID to query
     * @param {number} [opts.courseId=default course id] Canvas course ID
     * @param {string} [opts.title=current value] New title for the column
     * @param {number} [opts.position=current value] New position for the
     *   column in the list of custom gradebook columns
     * @param {boolean} [opts.hidden=current value] If set, updates whether the
     *   custom gradebook column is hidden from everyone. Must be a boolean
     * @param {boolean} [opts.readOnly=current value] if set, updates whether the
     *   custom gradebook column is read-only in the UI
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
     */
    update(opts: {
        columnId: number;
        courseId?: number;
        title?: string;
        position?: number;
        hidden?: boolean;
        readOnly?: boolean;
    }, config?: APIConfig): Promise<CanvasCustomColumn>;
    /**
     * Creates a new gradebook column in a course
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.title=Untitled Column] Title of new custom
     *   gradebook column
     * @param {number} [opts.position=last] Position of the gradebook column
     *   within the list of custom gradebook columns
     * @param {boolean} [opts.hidden] If truthy, hides the gradebook
     *   column from everyone, not just instructor as usual
     * @param {boolean} [opts.readOnly] if truthy, makes column read-only in
     *   the Canvas UI
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
     */
    create(opts?: {
        courseId?: number;
        title?: string;
        position?: number;
        hidden?: boolean;
        readOnly?: boolean;
    }, config?: APIConfig): Promise<CanvasCustomColumn>;
    /**
     * Deletes a gradebook column from a course
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.columnId Gradebook column Id
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
     */
    delete(opts: {
        columnId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasCustomColumn>;
    /**
     * Gets the list of entries in a specific gradebook column in a course
     * @author Gabe Abrams
     * @method listEntries
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.columnId Gradebook column Id
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasColumnDatum[]>} list of Canvas ColumnDatum objects {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum}
     */
    listEntries(opts: {
        columnId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasColumnDatum[]>;
    /**
     * Update a specific entry in a gradebook column
     * @author Gabe Abrams
     * @method updateEntry
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.columnId Gradebook column Id
     * @param {number} opts.studentId Canvas user id to update
     * @param {string} opts.content the new text for the user's column cell
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasColumnDatum>} Canvas ColumnDatum object {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum}
     */
    updateEntry(opts: {
        columnId: number;
        studentId: number;
        content: string;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasColumnDatum>;
    /**
     * Update the list of entries in a specific gradebook column in a course
     * @author Gabe Abrams
     * @method updateEntries
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.columnId Gradebook column Id
     * @param {CanvasColumnDatum[]} opts.entries list of ColumnDatum objects:
     *   `[{user_id: <Canvas User Id>, content: <New Entry Text>}, ...]`
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {boolean} [opts.waitForCompletion] If truthy, waits for
     *   completion of batch update request
     * @param {number} [opts.waitForCompletionTimeout=2] Number of minutes to
     *   wait for completion of batch upload
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasProgress>} Canvas progress object {@link https://canvas.instructure.com/doc/api/progress.html#Progress}
     */
    updateEntries(opts: {
        columnId: number;
        entries: CanvasColumnDatum[];
        courseId?: number;
        waitForCompletion?: boolean;
        waitForCompletionTimeout?: number;
    }, config?: APIConfig): Promise<CanvasProgress>;
}
export default ECatGradebookColumn;
