/**
 * Function that pre-processes request parameters for https requests
 * @author Gabriel Abrams
 * @module classes/request/helpers/interpretCanvasError
 * @see module: classes/request/helpers/interpretCanvasError
 */

// The value to exclude
const EXCLUDED_VALUE = require('./valueThatsExcluded.js');

/**
 * Recursively excludes values that match EXCLUDED_VALUE
 * @author Gabriel Abrams
 * @param {object} value - object to preprocess
 * @return {object} pre-processed object with values excluded
 */
const _recursivelyExcludeParams = (obj) => {
  if (Array.isArray(obj)) {
    // This is an array
    // Filter out excluded elements then call recursively on each element
    return obj
      .filter((item) => {
        return (item !== EXCLUDED_VALUE);
      })
      .map((item) => {
        return _recursivelyExcludeParams(item);
      });
  }

  if (typeof obj === 'object') {
    const newObj = {};
    Object.keys(obj).forEach((prop) => {
      if (obj[prop] === EXCLUDED_VALUE) {
        // Skip excluded value
        return;
      }
      newObj[prop] = _recursivelyExcludeParams(obj[prop]);
    });
    return newObj;
  }

  return obj;
};

/**
 * Pre-processes request params/body
 * @author Gabriel Abrams
 * @param {object} config.options - The options to pass into the visitEndpoint
 *   function (same definition as in classes/request/genVisitEndpoint)
 * @param {number} [config.itemsPerPage=100] - The default number of items per
 *   page (ignored if options.itemsPerPage is defined)
 * @param {string} [config.accessToken=null] - An access token to add to the
 *   request
 * @return {object} pre-processed request parameters
 */
module.exports = (config) => {
  const { options } = config;
  const oldParams = (options || {}).params || {};

  // Exclude params that have value equal to EXCLUDED_VALUE
  const newParams = _recursivelyExcludeParams(oldParams);

  // Add access token to request (if we have one and one isn't already added)
  if (config.accessToken && !newParams.access_token) {
    newParams.access_token = config.accessToken;
  }

  // Set up number of entries per page
  if (!options.method || options.method === 'GET') {
    newParams.per_page = options.itemsPerPage || config.itemsPerPage || 100;
  }

  return newParams;
};
