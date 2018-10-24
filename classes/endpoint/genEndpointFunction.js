/**
 * Function that takes an endpoint definition and creates an endpoint function
 * @module classes/endpoint/genEndpointFunction
 * @see module: classes/endpoint/genEndpointFunction
 */

const CACCLError = require('../../../caccl-error/index.js');
const errorCodes = require('../../errorCodes.js');
const genCachedVisitEndpoint = require('./helpers/genCachedVisitEndpoint.js');

/**
 * Creates an endpoint function based on an endpoint definition (from a file
 *   at endpoints/category/file.js)
 * @param {object} config.endpoint - An endpoint definition (from a file
 *   at endpoints/category/file.js)
 * @param {object} config.uncache - A function that uncaches a list of paths and
 *   passes through a response, or just passes through a response if not caching
 * @param {function} config.visitEndpoint - The visitEndpoint function created
 *   by classes/request/genVisitEndpoint
 * @param {object} config.categoryInstance - The EndpointCategory instance that
 *   will act as the parent to this function
 * @param {object} [config.cache=null] - The cache instance. Does not cache if
 *   no cache is included
 * @return {function} endpoint function that the library-user will call
 */
module.exports = (config) => {
  return (options = {}) => {
    // Create a cached version of visitEndpoint
    const cachedVisitEndpoint = genCachedVisitEndpoint({
      options,
      visitEndpoint: config.visitEndpoint,
      cache: config.cache,
    });

    // Run the endpoint
    const runPromise = config.endpoint.run({
      options,
      uncache: config.uncache,
      visitEndpoint: cachedVisitEndpoint,
      self: config.categoryInstance,
    });

    if (
      runPromise
      && runPromise.then
      && runPromise.catch
    ) {
      // Post-process errors
      return runPromise.catch((err) => {
        // Turn into CACCLError if not already
        let newError = err;
        if (!err.isCACCLError) {
          newError = new CACCLError(err);
          newError.code = errorCodes.unnamedEndpointError;
        }

        // Add on action to the error if not already describing an action
        if (!newError.message.startsWith('While attempting to ')) {
          newError.message = `While attempting to ${config.endpoint.action}, we ran into an error: ${(err.message || 'unknown')}`;
        }

        throw newError;
      });
    }

    // Endpoint didn't return promise
    return Promise.reject(new CACCLError({
      message: `The "${config.endpoint.action}" endpoint malfunctioned: it didn't return a promise. Please contact an admin.`,
      code: errorCodes.endpointDidntReturnPromise,
    }));
  };
};
