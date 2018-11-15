const CACCLError = require('../../../../caccl-error/index.js'); // TODO: use actual library
const EndpointCategory = require('../../../classes/EndpointCategory.js');
const errorCodes = require('../../../errorCodes.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');
const waitForCompletion = require('../../common/waitForCompletion.js');

/* Endpoints for gradebook column */
class GradebookColumn extends EndpointCategory {
  constructor(config) {
    super(config, GradebookColumn);
  }
}

/*------------------------------------------------------------------------*/
/*                       Gradebook Column Endpoints                       */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of custom gradebook columns in a course
 * @author Gabriel Abrams
 * @method list
 * @param {number} courseId - Canvas course Id to query
 * @param {boolean} [includeHidden=false] - If truthy, includes hidden
 *   gradebook columns as well.
 * @return {Promise.<Object[]>} List of Canvas CustomColumns {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
 */
GradebookColumn.list = (config) => {
  // @action: get the list of gradebook columns in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns`,
    method: 'GET',
    params: {
      include_hidden: utils.isTruthy(config.options.includeHidden),
    },
  });
};

/**
 * Gets info on a specific gradebook column in a course. This is a simulated
 *   endpoint: it does not exist. We are just pulling the list of columns and
 *   returning one element.
 * @author Gabriel Abrams
 * @method get
 * @param {number} courseId - Canvas course Id to query
 * @param {number} columnId - Canvas column Id to return
 * @param {boolean} [isHidden=false] - Must be set to true if the column
 *   you're retrieving is a hidden column.
 * @return {Promise.<Object>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
 */
GradebookColumn.get = (config) => {
  // @action: get a specific gradebook column in a course
  return config.api.course.gradebookcolumn.list({
    courseId: config.options.courseId,
    includeHidden: config.options.isHidden,
  }).then((columns) => {
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].id === config.options.columnId) {
        // Found the column the caller was looking for
        return Promise.resolve(columns[i]);
      }
    }
    // Couldn't find the column
    let hiddenMessage = '';
    if (!config.options.isHidden) {
      hiddenMessage = 'We were only searching through non-hidden columns. If the column you were looking for is hidden, you need to specify that.';
    }
    throw new CACCLError({
      message: `We couldn't find the column you were looking for. ${hiddenMessage}`,
      code: errorCodes.columnNotFound,
    });
  });
};

/**
 * Updates a gradebook column's information
 * @author Gabriel Abrams
 * @method update
 * @param {number} courseId - Canvas course ID
 * @param {number} columnId - Canvas custom gradebook column ID to query
 * @param {string} [title=current value] - New title for the column
 * @param {number} [position=current value] - New position for the column in
 *   the list of custom gradebook columns
 * @param {boolean} [hidden=current value] - If set, updates whether the
 *   custom gradebook column is hidden from everyone. Must be a boolean
 * @return {Promise.<Object>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
 */
GradebookColumn.update = (config) => {
  // @action: update a gradebook column\'s information
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns/${config.options.columnId}`,
    method: 'PUT',
    params: {
      'column[title]': utils.includeIfTruthy(config.options.title),
      'column[position]': utils.includeIfNumber(config.options.position),
      'column[hidden]': utils.includeIfBoolean(config.options.hidden),
    },
  }).then((response) => {
    return config.uncache([
      // Uncache custom gradebook column list
      `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns/${config.options.columnId}`,
    ], response);
  });
};

/**
 * Creates a new gradebook column in a course
 * @author Gabriel Abrams
 * @method create
 * @param {number} courseId - Canvas course Id to query
 * @param {string} [title=Untitled Column] - Title of new custom gradebook
 *   column
 * @param {number} [position=last] - Position of the gradebook column within
 *   the list of custom gradebook columns
 * @param {boolean} [hidden=false] - If truthy, hides the gradebook column
 *   from everyone, not just instructor as usual
 * @return {Promise.<Object>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
 */
GradebookColumn.create = (config) => {
  // @action: create a new gradebook column in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns`,
    method: 'POST',
    params: {
      'column[title]': config.options.title || 'Untitled Column',
      'column[hidden]': utils.isTruthy(config.options.hidden),
      'column[position]': utils.includeIfNumber(config.options.position),
    },
  }).then((response) => {
    return config.uncache([
      // Uncache custom gradebook column list
      `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns`,
      // Uncache custom gradebook column
      `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns/${response.id}`,
    ], response);
  });
};

/**
 * Deletes a gradebook column from a course
 * @author Gabriel Abrams
 * @method delete
 * @param {number} courseId - Canvas course Id to query
 * @param {number} columnId - Gradebook column Id
 * @return {Promise.<Object>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
 */
GradebookColumn.delete = (config) => {
  // @action: delete a gradebook column from a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns/${config.options.columnId}`,
    method: 'DELETE',
  }).then((response) => {
    return config.uncache([
      // Uncache custom gradebook column list
      `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns`,
      // Uncache custom gradebook column
      `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns/${config.options.columnId}`,
    ], response);
  });
};

/*------------------------------------------------------------------------*/
/*                     Gradebook Column Data Endpoints                    */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of entries in a specific gradebook column in a course
 * @author Gabriel Abrams
 * @method listEntries
 * @param {number} courseId - Canvas course Id to query
 * @param {number} columnId - Gradebook column Id
 * @return {Promise.<Object[]>} list of Canvas ColumnDatum objects {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum}
 */
GradebookColumn.listEntries = (config) => {
  // @action: get the list of entries in a specific gradebook column in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns/${config.options.columnId}/data`,
    method: 'GET',
    params: {
      include_hidden: true,
    },
  });
};

/**
 * Update the list of entries in a specific gradebook column in a course
 * @author Gabriel Abrams
 * @method updateEntries
 * @param {number} courseId - Canvas course Id to query
 * @param {number} columnId - Gradebook column Id
 * @param {array} entries - list of ColumnDatum objects:
 *   `[{user_id: <Canvas User Id>, text: <New Entry Text>}, ...]`
 * @param {boolean} [waitForCompletion=false] - If truthy, waits for
 *   completion of batch update request
 * @param {number} [waitForCompletionTimeout=2] - Number of minutes to wait
 *   for completion of batch upload
 * @return {Promise.<Object>} Canvas progress object {@link https://canvas.instructure.com/doc/api/progress.html#Progress}
 */
GradebookColumn.updateEntries = (config) => {
  // @action: batch update entries in a gradebook column

  // Pre-process column data, adding gradebook column Id to each entry
  const columnData = config.options.entries.map((entry) => {
    const newEntry = entry;
    newEntry.column_id = config.options.columnId;
    return newEntry;
  });
  // Send batch update request
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_column_data`,
    method: 'PUT',
    params: {
      column_data: columnData,
    },
  }).then((progress) => {
    return config.uncache([
      // Uncache column data
      `${prefix.v1}/courses/${config.options.courseId}/custom_gradebook_columns/${config.options.columnId}/data`,
    ]).then(() => {
      if (config.options.waitForCompletion) {
        return waitForCompletion({
          visitEndpoint: config.visitEndpoint,
          progress,
          timeout: config.options.waitForCompletionTimeout,
        });
      }
    });
  });
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = GradebookColumn;
