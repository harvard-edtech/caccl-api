/**
 * Functions for interacting with gradebook columns within courses
 * @namespace api.course.gradebookColumn
 */

const CACCLError = require('caccl-error');

const EndpointCategory = require('../../../classes/EndpointCategory');
const errorCodes = require('../../../errorCodes');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');
const waitForCompletion = require('../../common/waitForCompletion');

class GradebookColumn extends EndpointCategory {
  constructor(config) {
    super(config, GradebookColumn);
  }
}

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
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {boolean} [options.includeHidden=false] - If truthy, includes hidden
 *   gradebook columns as well.
 * @return {CustomColumn[]} List of Canvas CustomColumns {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
 */
GradebookColumn.list = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/custom_gradebook_columns`,
    method: 'GET',
    params: {
      include_hidden: utils.isTruthy(options.includeHidden),
    },
  });
};
GradebookColumn.list.action = 'get the list of gradebook columns in a course';
GradebookColumn.list.requiredParams = ['courseId'];
GradebookColumn.list.scopes = [
  'url:GET|/api/v1/courses/:course_id/custom_gradebook_columns',
];

/**
 * Gets info on a specific gradebook column in a course. This is a simulated
 *   endpoint: it does not exist. We are just pulling the list of columns and
 *   returning one element.
 * @author Gabe Abrams
 * @method get
 * @memberof api.course.gradebookColumn
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.columnId - Canvas column Id to return
 * @param {boolean} [options.isHidden=false] - Must be set to true if the column
 *   you're retrieving is a hidden column.
 * @return {CustomColumn} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
 */
GradebookColumn.get = function (options) {
  return this.api.course.gradebookColumn.list({
    courseId: options.courseId,
    includeHidden: options.isHidden,
  })
    .then((columns) => {
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].id === options.columnId) {
          // Found the column the caller was looking for
          return Promise.resolve(columns[i]);
        }
      }
      // Couldn't find the column
      let hiddenMessage = '';
      if (!options.isHidden) {
        hiddenMessage = 'We were only searching through non-hidden columns. If the column you were looking for is hidden, you need to specify that.';
      }
      throw new CACCLError({
        message: `We couldn't find the column you were looking for. ${hiddenMessage}`,
        code: errorCodes.columnNotFound,
      });
    });
};
GradebookColumn.get.action = 'get a specific gradebook column in a course';
GradebookColumn.get.requiredParams = ['courseId', 'columnId'];
GradebookColumn.get.scopes = [
  'url:GET|/api/v1/courses/:course_id/custom_gradebook_columns',
];

/**
 * Updates a gradebook column's information
 * @author Gabe Abrams
 * @method update
 * @memberof api.course.gradebookColumn
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course ID
 * @param {number} options.columnId - Canvas custom gradebook column ID to query
 * @param {string} [options.title=current value] - New title for the column
 * @param {number} [options.position=current value] - New position for the
 *   column in the list of custom gradebook columns
 * @param {boolean} [options.hidden=current value] - If set, updates whether the
 *   custom gradebook column is hidden from everyone. Must be a boolean
 * @return {CustomColumn} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
 */
GradebookColumn.update = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/custom_gradebook_columns/${options.columnId}`,
    method: 'PUT',
    params: {
      'column[title]': utils.includeIfTruthy(options.title),
      'column[position]': utils.includeIfNumber(options.position),
      'column[hidden]': utils.includeIfBoolean(options.hidden),
    },
  });
};
GradebookColumn.update.action = 'update a gradebook column\'s information';
GradebookColumn.update.requiredParams = ['courseId', 'columnId'];
GradebookColumn.update.scopes = [
  'url:PUT|/api/v1/courses/:course_id/custom_gradebook_columns/:id',
];

/**
 * Creates a new gradebook column in a course
 * @author Gabe Abrams
 * @method create
 * @memberof api.course.gradebookColumn
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {string} [options.title=Untitled Column] - Title of new custom
 *   gradebook column
 * @param {number} [options.position=last] - Position of the gradebook column
 *   within the list of custom gradebook columns
 * @param {boolean} [options.hidden=false] - If truthy, hides the gradebook
 *   column from everyone, not just instructor as usual
 * @return {CustomColumn} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
 */
GradebookColumn.create = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/custom_gradebook_columns`,
    method: 'POST',
    params: {
      'column[title]': options.title || 'Untitled Column',
      'column[hidden]': utils.isTruthy(options.hidden),
      'column[position]': utils.includeIfNumber(options.position),
    },
  });
};
GradebookColumn.create.action = 'create a new gradebook column in a course';
GradebookColumn.create.requiredParams = ['courseId'];
GradebookColumn.create.scopes = [
  'url:POST|/api/v1/courses/:course_id/custom_gradebook_columns',
];

/**
 * Deletes a gradebook column from a course
 * @author Gabe Abrams
 * @method delete
 * @memberof api.course.gradebookColumn
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.columnId - Gradebook column Id
 * @return {CustomColumn} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
 */
GradebookColumn.delete = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/custom_gradebook_columns/${options.columnId}`,
    method: 'DELETE',
  });
};
GradebookColumn.delete.action = 'delete a gradebook column from a course';
GradebookColumn.delete.requiredParams = ['courseId', 'columnId'];
GradebookColumn.delete.scopes = [
  'url:DELETE|/api/v1/courses/:course_id/custom_gradebook_columns/:id',
];

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
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.columnId - Gradebook column Id
 * @return {ColumnDatum[]} list of Canvas ColumnDatum objects {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum}
 */
GradebookColumn.listEntries = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/custom_gradebook_columns/${options.columnId}/data`,
    method: 'GET',
    params: {
      include_hidden: true,
    },
  });
};
GradebookColumn.listEntries.action = 'get the list of entries in a specific gradebook column in a course';
GradebookColumn.listEntries.requiredParams = ['courseId', 'columnId'];
GradebookColumn.listEntries.scopes = [
  'url:GET|/api/v1/courses/:course_id/custom_gradebook_columns/:id/data',
];

/**
 * Update a specific entry in a gradebook column
 * @author Gabe Abrams
 * @method updateEntry
 * @memberof api.course.gradebookColumn
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.columnId - Gradebook column Id
 * @param {number} options.studentId - Canvas user id to update
 * @param {string} options.content - the new text for the user's column cell
 * @return {ColumnDatum} Canvas ColumnDatum object {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum}
 */
GradebookColumn.updateEntry = function (options) {
  // Send batch update request
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/custom_gradebook_columns/${options.columnId}/data/${options.studentId}`,
    method: 'PUT',
    params: {
      column_data: {
        content: options.content,
      },
    },
  })
    .then((data) => {
      return this.uncache([
        // Uncache column data
        `${prefix.v1}/courses/${options.courseId}/custom_gradebook_columns/${options.columnId}/data`,
      ], data);
    });
};
GradebookColumn.updateEntry.action = 'update an entry in a gradebook column';
GradebookColumn.updateEntry.requiredParams = [
  'courseId',
  'columnId',
  'studentId',
  'content',
];
GradebookColumn.updateEntry.scopes = [
  'url:PUT|/api/v1/courses/:course_id/custom_gradebook_columns/:id/data/:user_id',
];

/**
 * Update the list of entries in a specific gradebook column in a course
 * @author Gabe Abrams
 * @method updateEntries
 * @memberof api.course.gradebookColumn
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.columnId - Gradebook column Id
 * @param {array} options.entries - list of ColumnDatum objects:
 *   `[{user_id: <Canvas User Id>, content: <New Entry Text>}, ...]`
 * @param {boolean} [options.waitForCompletion=false] - If truthy, waits for
 *   completion of batch update request
 * @param {number} [options.waitForCompletionTimeout=2] - Number of minutes to
 *   wait for completion of batch upload
 * @return {Progress} Canvas progress object {@link https://canvas.instructure.com/doc/api/progress.html#Progress}
 */
GradebookColumn.updateEntries = function (options) {
  // Pre-process column data, adding gradebook column Id to each entry
  const columnData = options.entries.map((entry) => {
    const newEntry = entry;
    newEntry.column_id = options.columnId;
    return newEntry;
  });
  // Send batch update request
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/custom_gradebook_column_data`,
    method: 'PUT',
    params: {
      column_data: columnData,
    },
  })
    .then((progress) => {
      return this.uncache([
        // Uncache column data
        `${prefix.v1}/courses/${options.courseId}/custom_gradebook_columns/${options.columnId}/data`,
      ])
        .then(() => {
          if (options.waitForCompletion) {
            return waitForCompletion({
              visitEndpoint: this.visitEndpoint,
              progress,
              timeout: options.waitForCompletionTimeout,
            });
          }
        });
    });
};
GradebookColumn.updateEntries.action = 'batch update entries in a gradebook column';
GradebookColumn.updateEntries.requiredParams = [
  'courseId',
  'columnId',
  'entries',
];
GradebookColumn.updateEntries.scopes = [
  'url:PUT|/api/v1/courses/:course_id/custom_gradebook_column_data',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = GradebookColumn;
