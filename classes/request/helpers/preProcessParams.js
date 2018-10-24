/**
 * Function that pre-processes request parameters for https requests
 * @module classes/request/helpers/interpretCanvasError
 * @see module: classes/request/helpers/interpretCanvasError
 */

// The value to exclude
const EXCLUDED_VALUE = require('./valueThatsExcluded.js');

/**
 * Pre-processes request params/body
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

  // Exclude parameters by name and value
  const newParams = {};
  Object.keys(oldParams).forEach((key) => {
    // Skip if excluded by value
    if (oldParams[key] === EXCLUDED_VALUE) {
      return;
    }

    // Add to new params
    if (Array.isArray(oldParams[key])) {
      // This is an array. Prep for repeat array format (Canvas requires this)
      newParams[key + '[]'] = oldParams[key];
    } else {
      // This is not an array. Just add it as usual
      newParams[key] = oldParams[key];
    }
  });

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
