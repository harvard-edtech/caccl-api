const CACCLError = require('../../caccl-error/index.js'); // TODO: switch to actual package
const errorCodes = require('../errorCodes.js');
const wrapVisitEndpoint = require('./helpers/wrapVisitEndpoint.js');

class EndpointsCategory {
  constructor(config) {
    // Wrap visitEndpoint to add two new features:
    // > Adds access tokens to each request
    // > Looks up/stores values in cache, if applicable
    // > Ignores excluded parameters
    const defaultLookupInCache = config.cache;
    const defaultStoreInCache = config.cache;
    const defaultVisitEndpoint = wrapVisitEndpoint({
      lookupInCache: defaultLookupInCache,
      storeInCache: defaultStoreInCache,
      visitEndpoint: config.visitEndpoint,
      cache: config.cache,
      accessToken: config.accessToken,
    });

    // Turn each endpoint into a function
    const { endpointsFiles } = config;
    // Loop through all endpoint definition files in the category
    endpointsFiles.forEach((endpointsFile) => {
      // For each endpoint definition file, loop through all endpoints
      endpointsFile(this).forEach((endpoint) => {
        // Add this endpoint to the current EntpointsCategory instance
        // > Use endpoint.name as the function name
        // > Before running, create a visitEndpoint function that caches
        //     according to caching params: ignoreCache and dontCache
        // > Call endpoint.run with the options passed by the caller and with
        //     the customized visitEndpoint function
        this[endpoint.name] = (options = {}) => {
          // Check if we're caching
          const lookupInCache = (config.cache && options.ignoreCache);
          const storeInCache = (config.cache && options.dontCache);

          // Generate a visitEndpoint function
          let visitEndpoint;
          if (
            (lookupInCache !== defaultLookupInCache)
            || (storeInCache !== defaultStoreInCache)
          ) {
            // Options changed. Need to create a custom visitEndpoint function
            visitEndpoint = wrapVisitEndpoint({
              storeInCache,
              lookupInCache,
              visitEndpoint: config.visitEndpoint,
              cache: config.cache,
              accessToken: config.accessToken,
            });
          } else {
            // Options didn't change. Use default visitEndpoint function
            visitEndpoint = defaultVisitEndpoint;
          }

          // Run the endpoint with the correct visitEndpoint function
          const runPromise = endpoint.run(options, visitEndpoint);

          if (
            runPromise
            && runPromise.then
            && runPromise.catch
          ) {
            return runPromise.then((endpointResults) => {
              // endpointResults will either be equal to the endpoint response
              // OR, if we need to uncache some paths, endpointResults will be:
              // {
              //   response: /* the endpoint response */,
              //   uncache: [
              //     // List of paths to uncache
              //   ],
              // }

              // Check if the endpoint returned a list of paths to uncache
              const uncacheListIncluded = (
                endpointResults
                && endpointResults.uncache
                && Array.isArray(endpointResults.uncache)
              );

              // Uncache if applicable (always uncache if there's a cache)
              if (uncacheListIncluded) {
                // Uncache if we have a cache
                if (config.cache) {
                  // Uncache included paths
                  endpointResults.uncache.forEach((key) => {
                    // Handle prefix-based keys
                    if (key.endsWith('*')) {
                      // Extract prefix
                      const prefix = key.split('*')[0];
                      // This is a prefix-based key
                      // > Loop through all cached keys and check their prefixes
                      const cacheObject = config.cache.getAll();
                      Object.keys(cacheObject).forEach((cachedKey) => {
                        if (cachedKey.startsWith(prefix)) {
                          // Found a match. Clear it.
                          config.cache.clear(cachedKey);
                        }
                      });
                    } else {
                      // This is a simple key, just uncache it
                      options.cache.clear(key);
                    }
                  });
                }

                // Resolve with embedded response
                return Promise.resolve(endpointResults.response);
              }

              // Not uncaching
              return Promise.resolve(endpointResults);
            }).catch((err) => {
              // Turn into CACCLError if not already
              let newError = err;
              if (!err.isCACCLError) {
                newError = new CACCLError(err);
                newError.code = errorCodes.unnamedEndpointError;
              }

              // Add on action to the error
              newError.message = 'While attempting to ' + endpoint.action + ', we ran into an error: ' + (err.message || 'unknown');
              throw newError;
            });
          }

          // Endpoint didn't return promise
          return Promise.reject(new CACCLError({
            message: 'The "' + endpoint.action + '" endpoint malfunctioned: it didn\'t return a promise. Please contact an admin.',
            code: errorCodes.endpointDidntReturnPromise,
          }));
        };
      });
    });
  }
}

module.exports = EndpointsCategory;
