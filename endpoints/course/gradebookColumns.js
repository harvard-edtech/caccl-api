const CACCLError = require('../../../caccl-error/index.js'); // TODO: use actual library
const errorCodes = require('../../errorCodes.js');

const utils = require('../helpers/utils.js');
const waitForCompletion = require('../helpers/waitForCompletion.js');

module.exports = [

  /*------------------------------------------------------------------------*/
  /*                            Gradebook Columns                           */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of custom gradebook columns in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {boolean} includeHidden - If true, includes hidden gradebook
   *   columns as well.
   * @return List of CustomColumns (see: https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)
   */
  {
    name: 'listGradebookColumns',
    action: 'get the list of gradebook columns in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/custom_gradebook_columns',
        method: 'GET',
        params: {
          include_hidden: utils.isTruthy(cg.options.includeHidden),
        },
      });
    },
  },

  /**
   * Gets info on a specific gradebook column in a course. This is a simulated
   *   endpoint: it does not exist. We are just pulling the list of columns and
   *   returning one element.
   * @param {number} courseId - Canvas course Id to query
   * @param {number} columnId - Canvas column Id to return
   * @param {boolean} isHidden - Must be set to true if the column you're
   *   retrieving is a hidden column.
   * @return CustomColumn (see: https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)
   */
  {
    name: 'getGradebookColumn',
    action: 'get a specific gradebook column in a course',
    run: (cg) => {
      return cg.self.listGradebookColumns({
        courseId: cg.options.courseId,
        includeHidden: cg.options.isHidden,
      }).then((columns) => {
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].id === cg.options.columnId) {
            // Found the column the caller was looking for
            return Promise.resolve(columns[i]);
          }
        }
        // Couldn't find the column
        throw new CACCLError({
          message: 'We couldn\'t find the column you were looking for. ' + (!cg.options.isHidden ? 'We were only searching through non-hidden columns. If the column you were looking for is hidden, you need to specify that.' : ''),
          code: errorCodes.columnNotFound,
        });
      });
    },
  },

  /**
   * Updates a gradebook column's information
   * @param {number} courseId - Canvas course ID
   * @param {number} columnId - Canvas custom gradebook column ID to query
   * @param {string} title - New title for the column (default: previous
   *   value)
   * @param {number} position - New position for the column in the list of
   *   custom gradebook columns (default: previous value)
   * @param {boolean} hidden - If set, updates whether the custom gradebook
   *   column is hidden from everyone. Must be a boolean
   *   (default: previous value)
   * @return CustomColumn (see: https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)
   */
  {
    name: 'updateGradebookColumn',
    action: 'update a gradebook column\'s information',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId
          + '/custom_gradebook_columns/' + cg.options.columnId,
        method: 'PUT',
        params: {
          'column[title]': utils.includeIfTruthy(cg.options.title),
          'column[position]': utils.includeIfNumber(cg.options.position),
          'column[hidden]': utils.includeIfBoolean(cg.options.hidden),
        },
      }).then((response) => {
        return cg.uncache([
          // Uncache custom gradebook column list
          '/api/v1/courses/' + cg.options.courseId + '/custom_gradebook_columns/' + cg.options.columnId,
        ], response);
      });
    },
  },

  /**
   * Creates a new gradebook column in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {string} title - Title of new custom gradebook column
   *   (default: Untitled Column)
   * @param {number} position - Position of the gradebook column within the
   *   list of custom gradebook columns (default: last)
   * @param {boolean} hidden - If true, hides the gradebook column from
   *   everyone, not just instructor as usual (default: false)
   * @return CustomColumn (see: https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)
   */
  {
    name: 'createGradebookColumn',
    action: 'create a new gradebook column in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId
          + '/custom_gradebook_columns',
        method: 'POST',
        params: {
          'column[title]': cg.options.title || 'Untitled Column',
          'column[hidden]': utils.isTruthy(cg.options.hidden),
          'column[position]': utils.includeIfNumber(cg.options.position),
        },
      }).then((response) => {
        return cg.uncache([
          // Uncache custom gradebook column list
          '/api/v1/courses/' + cg.options.courseId + '/custom_gradebook_columns',
          // Uncache custom gradebook column
          '/api/v1/courses/' + cg.options.courseId + '/custom_gradebook_columns/' + response.id,
        ], response);
      });
    },
  },

  /**
   * Deletes a gradebook column from a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} columnId - Gradebook column Id
   * @return CustomColumn (see: https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)
   */
  {
    name: 'deleteGradebookColumn',
    action: 'delete a gradebook column from a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/custom_gradebook_columns/' + cg.options.columnId,
        method: 'DELETE',
      }).then((response) => {
        return cg.uncache([
          // Uncache custom gradebook column list
          '/api/v1/courses/' + cg.options.courseId + '/custom_gradebook_columns',
          // Uncache custom gradebook column
          '/api/v1/courses/' + cg.options.courseId + '/custom_gradebook_columns/' + cg.options.columnId,
        ], response);
      });
    },
  },

  /*------------------------------------------------------------------------*/
  /*                               Column Data                              */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of entries in a specific gradebook column in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} columnId - Gradebook column Id
   * @return list of ColumnDatum objects (see: https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum)
   */
  {
    name: 'listGradebookColumnEntries',
    action: 'get the list of entries in a specific gradebook column in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/custom_gradebook_columns/' + cg.options.columnId + '/data',
        method: 'GET',
        params: {
          include_hidden: true,
        },
      });
    },
  },

  /**
   * Update the list of entries in a specific gradebook column in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} columnId - Gradebook column Id
   * @param {array} entries - list of ColumnDatum objects:
   *   `[{user_id: <Canvas User Id>, text: <New Entry Text>}, ...]`
   * @param {boolean} waitForCompletion - If true, waits for completion of
   *   batch update request
   * @param {number} waitForCompletionTimeout - Number of minutes to wait for
   *   completion of batch upload (default: 2)
   * @return Progress (see: https://canvas.instructure.com/doc/api/progress.html#Progress)
   */
  {
    name: 'updateGradebookColumnEntries',
    action: 'batch update entries in a gradebook column',
    run: (cg) => {
      // Pre-process column data, adding gradebook column Id to each entry
      const columnData = cg.options.entries.map((entry) => {
        const newEntry = entry;
        newEntry.column_id = cg.options.columnId;
        return newEntry;
      });
      // Send batch update request
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/custom_gradebook_column_data',
        method: 'PUT',
        params: {
          column_data: columnData,
        },
      }).then((progress) => {
        return cg.uncache([
          // Uncache column data
          '/api/v1/courses/' + cg.options.courseId + '/custom_gradebook_columns/' + cg.options.columnId + '/data',
        ]).then(() => {
          if (cg.options.waitForCompletion) {
            return waitForCompletion({
              visitEndpoint: cg.visitEndpoint,
              progress,
              timeout: cg.options.waitForCompletionTimeout,
            });
          }
        });
      });
    },
  },

];
