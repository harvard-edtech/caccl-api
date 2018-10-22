const CACCLError = require('../../../caccl-error/index.js');
const errorCodes = require('../../errorCodes.js');
const genCachedVisitEndpoint = require('./helpers/genCachedVisitEndpoint.js');
/*
config:
- cache
- endpoint
- uncache
- visitEndpoint
- categoryInstance
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
          newError.message = 'While attempting to ' + config.endpoint.action + ', we ran into an error: ' + (err.message || 'unknown');
        }

        throw newError;
      });
    }

    // Endpoint didn't return promise
    return Promise.reject(new CACCLError({
      message: 'The "' + config.endpoint.action + '" endpoint malfunctioned: it didn\'t return a promise. Please contact an admin.',
      code: errorCodes.endpointDidntReturnPromise,
    }));
  };
};
