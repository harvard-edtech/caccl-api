/**
 * Useful utilities for use in defining endpoints
 * @module endpoints/helpers/utils
 * @see module: endpoints/helpers/utils
 */

// wrapVisitEndpoint filters out all parameters with value equal to
// EXCLUDED_PARAM. To exclude a parameter, just set its value to EXCLUDED_PARAM
const EXCLUDED_PARAM = (
  require('../../classes/visitEndpoint/helpers/valueThatsExcluded.js')
);

module.exports = {

  /**
   * Returns the value if it's truthy, otherwise returns a special value that
   *   indicates to the request pre-processor that the associated parameter
   *   should be excluded
   * @param {object} [value] - The value to include if truthy
   * @return {object} the value to send to visitEndpoint
   */
  includeIfTruthy: (value) => {
    return value || EXCLUDED_PARAM;
  },

  /**
   * Returns the value if it's a boolean, otherwise returns a special value that
   *   indicates to the request pre-processor that the associated parameter
   *   should be excluded
   * @param {object} [value] - The value to include if it's a boolean
   * @return {object} the value to send to visitEndpoint
   */
  includeIfBoolean: (value) => {
    if (value === true || value === false) {
      return value;
    }
    return EXCLUDED_PARAM;
  },

  /**
   * Returns a new list that only includes truthy elements of the array, if
   *   array has no truthy elements, an empty array is returned, if no
   *   array is included, returns a special value that indicates to the request
   *   pre-processor that the associated parameter should be excluded
   * @param {array} [arr] - The value to include if truthy
   * @return {object} the value to send to visitEndpoint
   */
  includeTruthyElements: (arr) => {
    // Exclude if this isn't an array
    if (!arr || !Array.isArray(arr)) {
      return EXCLUDED_PARAM;
    }
    // Filter non-truthy elements
    return arr.filter((x) => {
      return x;
    });
  },

  /**
   * Returns a new list that only includes truthy elements of the array, if
   *   array has no truthy elements or if no array is included, returns a
   *   special value that indicates to the request pre-processor that the
   *   associated parameter should be excluded
   * @param {array} [arr] - The array to filter
   * @return {object} the value to send to visitEndpoint
   */
  includeTruthyElementsExcludeIfEmpty: (arr) => {
    // Exclude if this isn't an array
    if (!arr || !Array.isArray(arr)) {
      return EXCLUDED_PARAM;
    }
    // Filter non-truthy elements
    const onlyTruthy = arr.filter((x) => {
      return x;
    });
    if (onlyTruthy.length === 0) {
      // No truthy elements
      return EXCLUDED_PARAM;
    }
    return onlyTruthy;
  },

  /**
   * Returns the ISO 8601 string for the given date if it is truthy, otherwise
   *   returns a special value that indicates to the request pre-processor
   *   that the associated parameter should be excluded
   * @param {string|date} [date] - The string (ISO 8601 format) or javascript
   *   date object to include if it's truthy
   * @return {string} the value to send to visitEndpoint
   */
  includeIfDate: (date) => {
    if (date && date.toISOString) {
      // This is a date object. Convert to ISO 8601 string
      return date.toISOString();
    }
    // Exclude if no date included
    return date || EXCLUDED_PARAM;
  },

  /**
   * Returns the value if it's a number, otherwise returns a special value that
   *   indicates to the request pre-processor that the associated parameter
   *   should be excluded
   * @param {object} [value] - The value to include if it's a number
   * @return {object} the value to send to visitEndpoint
   */
  includeIfNumber: (value) => {
    if (
      !Number.isNaN(value)
      && value !== null
      && value !== undefined
    ) {
      return value;
    }
    return EXCLUDED_PARAM;
  },

  /**
   * Returns true if the value is truthy, otherwise returns false
   * @param {object} [value] - The value to check
   * @return {boolean} the value to send to visitEndpoint
   */
  isTruthy: (value) => {
    return !(!value);
  },

  /**
   * Returns an array of ids. If the first element in the list has an id
   *   property (arr[0].id is defined), extracts each array element's id
   *   property, otherwise, just returns the array. If the array is not falsy,
   *   an empty array is returned
   * @param {array} [arr] - The array of ids or objects containing ids
   * @return {array} array of ids
   */
  extractIdsIfApplicable: (arr) => {
    let ids = (arr || []);
    if (ids.length > 0 && ids[0].id !== undefined) {
      // Need to extract Ids
      ids = ids.map((obj) => {
        return obj.id;
      });
    }
    return ids;
  },

  /**
   * Returns 's' if num is not 1, otherwise returns ''. May be used to pluralize
   *   descriptions:
   *   `Only ${students.length} student${sIfPlural(students.length)} submitted`
   * @param {number} [num] - The number to check
   * @return {string} the pluralization 's' or an empty string
   */
  sIfPlural: (num) => {
    return (num === 1 ? '' : 's');
  },

};
