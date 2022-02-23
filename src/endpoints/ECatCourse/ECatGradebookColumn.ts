/**
 * Functions for interacting with gradebook columns within courses
 * @namespace api.course.gradebookColumn
 */

// Import caccl libs
import CACCLError from 'caccl-error';

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasCustomColumn from '../../types/CanvasCustomColumn';
import ErrorCode from '../../shared/types/ErrorCode';
import CanvasColumnDatum from '../../types/CanvasColumnDatum';
import CanvasProgress from '../../types/CanvasProgress';

// Import shared helpers
import utils from '../../shared/helpers/utils';
import waitForCompletion from '../../shared/helpers/waitForCompletion';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatGradebookColumn extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                           Table of Contents:                           */
  /*                           - Gradebook Column                           */
  /*                           - Gradebook Column Data                      */
  /*------------------------------------------------------------------------*/

  /*------------------------------------------------------------------------*/
  /*                       Gradebook Column Endpoints                       */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of custom gradebook columns in a course
   * @author Gabe Abrams
   * @method list
   * @memberof api.course.gradebookColumn
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {boolean} [opts.includeHidden] - If truthy, includes hidden
   *   gradebook columns as well.
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCustomColumn[]>} List of Canvas CustomColumns {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
   */
  public async list(
    opts: {
      courseId: number,
      includeHidden?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasCustomColumn[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of gradebook columns in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/custom_gradebook_columns`,
      method: 'GET',
      params: {
        include_hidden: utils.isTruthy(opts.includeHidden),
      },
    });
  }

  /**
   * Gets info on a specific gradebook column in a course. This is a simulated
   *   endpoint: it does not exist. We are just pulling the list of columns and
   *   returning one element.
   * @author Gabe Abrams
   * @method get
   * @memberof api.course.gradebookColumn
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.columnId - Canvas column Id to return
   * @param {boolean} [opts.isHidden] - Must be set to true if the column
   *   you're retrieving is a hidden column.
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
   */
  public async get(
    opts: {
      courseId: number,
      columnId: number,
      includeHidden?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasCustomColumn> {
    // Get all columns
    const columns = await this.api.course.gradebookColumn.list({
      courseId: opts.courseId,
      includeHidden: opts.includeHidden,
    });

    // Find the column
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].id === opts.columnId) {
        // Found the column the caller was looking for
        return columns[i];
      }
    }
    // Couldn't find the column
    let hiddenMessage = '';
    if (!opts.includeHidden) {
      hiddenMessage = 'We were only searching through non-hidden columns. If the column you were looking for is hidden, you need to specify that.';
    }
    throw new CACCLError({
      message: `We couldn't find the column you were looking for. ${hiddenMessage}`,
      code: ErrorCode.ColumnNotFound,
    });
  }

  /**
   * Updates a gradebook column's information
   * @author Gabe Abrams
   * @method update
   * @memberof api.course.gradebookColumn
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course ID
   * @param {number} opts.columnId - Canvas custom gradebook column ID to query
   * @param {string} [opts.title=current value] - New title for the column
   * @param {number} [opts.position=current value] - New position for the
   *   column in the list of custom gradebook columns
   * @param {boolean} [opts.hidden=current value] - If set, updates whether the
   *   custom gradebook column is hidden from everyone. Must be a boolean
   * @param {boolean} [opts.readOnly=current value] if set, updates whether the
   *   custom gradebook column is read-only in the UI
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
   */
  public async update(
    opts: {
      courseId: number,
      columnId: number,
      title?: string,
      position?: number,
      hidden?: boolean,
      readOnly?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasCustomColumn> {
    return this.visitEndpoint({
      config,
      action: 'update a gradebook column\'s information',
      path: `${API_PREFIX}/courses/${opts.courseId}/custom_gradebook_columns/${opts.columnId}`,
      method: 'PUT',
      params: {
        'column[title]': utils.includeIfTruthy(opts.title),
        'column[position]': utils.includeIfNumber(opts.position),
        'column[hidden]': utils.includeIfBoolean(opts.hidden),
        'column[read_only]': utils.includeIfBoolean(opts.readOnly),
      },
    });
  }

  /**
   * Creates a new gradebook column in a course
   * @author Gabe Abrams
   * @method create
   * @memberof api.course.gradebookColumn
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {string} [opts.title=Untitled Column] - Title of new custom
   *   gradebook column
   * @param {number} [opts.position=last] - Position of the gradebook column
   *   within the list of custom gradebook columns
   * @param {boolean} [opts.hidden] - If truthy, hides the gradebook
   *   column from everyone, not just instructor as usual
   * @param {boolean} [opts.readOnly] if truthy, makes column read-only in
   *   the Canvas UI
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
   */
  public async create(
    opts: {
      courseId: number,
      title?: string,
      position?: number,
      hidden?: boolean,
      readOnly?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasCustomColumn> {
    return this.visitEndpoint({
      config,
      action: 'create a new gradebook column in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/custom_gradebook_columns`,
      method: 'POST',
      params: {
        'column[title]': opts.title || 'Untitled Column',
        'column[position]': utils.includeIfNumber(opts.position),
        'column[hidden]': utils.isTruthy(opts.hidden),
        'column[read_only]': utils.isTruthy(opts.readOnly),
      },
    });
  }

  /**
   * Deletes a gradebook column from a course
   * @author Gabe Abrams
   * @method delete
   * @memberof api.course.gradebookColumn
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.columnId - Gradebook column Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
   */
  public async delete(
    opts: {
      courseId: number,
      columnId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasCustomColumn> {
    return this.visitEndpoint({
      config,
      action: 'delete a gradebook column from a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/custom_gradebook_columns/${opts.columnId}`,
      method: 'DELETE',
    });
  }

  /*------------------------------------------------------------------------*/
  /*                     Gradebook Column Data Endpoints                    */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of entries in a specific gradebook column in a course
   * @author Gabe Abrams
   * @method listEntries
   * @memberof api.course.gradebookColumn
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.columnId - Gradebook column Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasColumnDatum[]>} list of Canvas ColumnDatum objects {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum}
   */
  public async listEntries(
    opts: {
      courseId: number,
      columnId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasColumnDatum[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of entries in a specific gradebook column in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/custom_gradebook_columns/${opts.columnId}/data`,
      method: 'GET',
      params: {
        include_hidden: true,
      },
    });
  }

  /**
   * Update a specific entry in a gradebook column
   * @author Gabe Abrams
   * @method updateEntry
   * @memberof api.course.gradebookColumn
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.columnId - Gradebook column Id
   * @param {number} opts.studentId - Canvas user id to update
   * @param {string} opts.content - the new text for the user's column cell
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasColumnDatum>} Canvas ColumnDatum object {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum}
   */
  public async updateEntry(
    opts: {
      courseId: number,
      columnId: number,
      studentId: number,
      content: string,
    },
    config?: APIConfig,
  ): Promise<CanvasColumnDatum> {
    // Send batch update request
    return this.visitEndpoint({
      config,
      action: 'update an entry in a gradebook column',
      path: `${API_PREFIX}/courses/${opts.courseId}/custom_gradebook_columns/${opts.columnId}/data/${opts.studentId}`,
      method: 'PUT',
      params: {
        column_data: {
          content: opts.content,
        },
      },
    });
  }

  /**
   * Update the list of entries in a specific gradebook column in a course
   * @author Gabe Abrams
   * @method updateEntries
   * @memberof api.course.gradebookColumn
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.columnId - Gradebook column Id
   * @param {CanvasColumnDatum[]} opts.entries - list of ColumnDatum objects:
   *   `[{user_id: <Canvas User Id>, content: <New Entry Text>}, ...]`
   * @param {boolean} [opts.waitForCompletion] - If truthy, waits for
   *   completion of batch update request
   * @param {number} [opts.waitForCompletionTimeout=2] - Number of minutes to
   *   wait for completion of batch upload
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasProgress>} Canvas progress object {@link https://canvas.instructure.com/doc/api/progress.html#Progress}
   */
  public async updateEntries(
    opts: {
      courseId: number,
      columnId: number,
      entries: CanvasColumnDatum[],
      waitForCompletion?: boolean,
      waitForCompletionTimeout?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasProgress> {
    // Pre-process column data, adding gradebook column Id to each entry
    const columnData = opts.entries.map((entry) => {
      return {
        ...entry,
        column_id: opts.columnId,
      };
    });
    // Send batch update request
    const progress = await this.visitEndpoint({
      config,
      action: 'batch update entries in a gradebook column',
      path: `${API_PREFIX}/courses/${opts.courseId}/custom_gradebook_column_data`,
      method: 'PUT',
      params: {
        column_data: columnData,
      },
    });

    if (opts.waitForCompletion) {
      const finishedProgress = await waitForCompletion({
        visitEndpoint: this.visitEndpoint,
        progress,
        timeoutMin: opts.waitForCompletionTimeout,
      });
      return finishedProgress;
    }

    // Return original progress
    return progress;
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatGradebookColumn;
