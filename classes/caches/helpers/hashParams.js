/**
 * Function that hashes params object to make a cache key
 * @module classes/caches/helpers/hashParams
 * @see module: classes/caches/helpers/hashParams
 */

/**
 * Creates a cache key out of a set of params
 * @param {object} params - Object containing get parameters
 * @return {string} hashed cache key
 */
module.exports = (params) => {
  return JSON.stringify(params);
};