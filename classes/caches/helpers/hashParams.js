/**
 * Function that hashes params object to make a cache key
 * @author Gabe Abrams
 * @module classes/caches/helpers/hashParams
 * @see module: classes/caches/helpers/hashParams
 */

/**
 * Creates a cache key out of a set of params
 * @author Gabe Abrams
 * @param {object} params - Object containing get parameters
 * @return {string} hashed cache key
 */
module.exports = (params) => {
  return JSON.stringify(params);
};
