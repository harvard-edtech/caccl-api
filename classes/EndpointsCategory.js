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

    // Create an uncache function
    // > Use dummy function
    let uncache;
    if (config.cache) {
      // > Create uncache function that changes the cache
      uncache = (paths, response) => {
        return config.cache.getAllPaths().then((cachedPaths) => {
          // Find paths that need to be uncached
          const pathsToUncache = [];
          paths.forEach((path) => {
            if (path.endsWith('*')) {
              // This is a prefix-based path. Loop to find paths that match.
              const prefix = path.split('*')[0];
              cachedPaths.forEach((cachedPath) => {
                if (cachedPath.startsWith(prefix)) {
                  // Prefix matches! Uncache this!
                  pathsToUncache.push(cachedPath);
                }
              });
            } else {
              // This is a normal path. Just add it.
              pathsToUncache.push(path);
            }
          });

          // Uncache
          return config.cache.deletePaths(pathsToUncache);
        }).then(() => {
          // Finally resolve with response
          return Promise.resolve(response);
        });
      };
    } else {
      // > Use a dummy function so uncaching doesn't crash
      uncache = (_, response) => {
        return Promise.resolve(response);
      };
    }

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
          const lookupInCache = (config.cache && !options.ignoreCache);
          const storeInCache = (config.cache && !options.dontCache);

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
          // > Create a cg (config) object for the endpoint
          const cg = {
            options,
            visitEndpoint,
            uncache,
          };
          const runPromise = endpoint.run(cg);

          if (
            runPromise
            && runPromise.then
            && runPromise.catch
          ) {
            return runPromise.catch((err) => {
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
