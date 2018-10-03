const utils = require('../helpers/utils.js');
const waitForCompletion = require('../helpers/waitForCompletion.js');

module.exports = () => {
  return [

    /*------------------------------------------------------------------------*/
    /*                            Gradebook Columns                           */
    /*------------------------------------------------------------------------*/

    /**
     * Gets the list of custom gradebook columns in a course
     * @param {number} courseId - Canvas course Id to query
     * @return List of CustomColumns (see: https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)
     */
    {
      name: 'listGradebookColumns',
      action: 'get the list of gradebook columns in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId
            + '/custom_gradebook_columns',
          method: 'GET',
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
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId
            + '/custom_gradebook_columns/' + options.columnId,
          method: 'PUT',
          params: {
            'column[title]': utils.includeIfTruthy(options.title),
            'column[position]': utils.includeIfNumber(options.position),
            'column[hidden]': utils.includeIfBoolean(options.hidden),
          },
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache custom gradebook column list
              '/api/v1/courses/' + options.courseId
                + '/custom_gradebook_columns/' + options.columnId,
            ],
          };
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
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId
            + '/custom_gradebook_columns',
          method: 'POST',
          params: {
            'column[title]': options.title || 'Untitled Column',
            'column[hidden]': utils.isTruthy(options.hidden),
            'column[position]': utils.includeIfNumber(options.position),
          },
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache custom gradebook column list
              '/api/v1/courses/' + options.courseId
                + '/custom_gradebook_columns',
              // Uncache custom gradebook column
              '/api/v1/courses/' + options.courseId
                + '/custom_gradebook_columns/' + response.id,
            ],
          };
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
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId
            + '/custom_gradebook_columns/' + options.columnId,
          method: 'DELETE',
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache custom gradebook column list
              '/api/v1/courses/' + options.courseId
                + '/custom_gradebook_columns',
              // Uncache custom gradebook column
              '/api/v1/courses/' + options.courseId
                + '/custom_gradebook_columns/' + options.columnId,
            ],
          };
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
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId
            + '/custom_gradebook_columns/' + options.columnId + '/data',
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
      run: (options, visitEndpoint) => {
        // Pre-process column data, adding gradebook column Id to each entry
        const columnData = options.entries.map((entry) => {
          const newEntry = entry;
          newEntry.column_id = options.columnId;
          return newEntry;
        });
        // Send batch update request
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId
            + '/custom_gradebook_column_data',
          method: 'PUT',
          params: {
            column_data: columnData,
          },
        }).then((progress) => {
          if (options.waitForCompletion) {
            return waitForCompletion({
              visitEndpoint,
              progress,
              timeout: options.waitForCompletionTimeout,
            });
          }
          // Not waiting. Just return current progress
          return Promise.resolve(progress);
        });
      },
    },
  ];
};
