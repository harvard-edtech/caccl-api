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
      uncache = (pathOrPaths = {}) => {
        const paths = (
          Array.isArray(pathOrPaths) ? pathOrPaths : [pathOrPaths]
        );

        // Pre-process so we can do one sweep through cache
        const pathIsBeingUncached = {};
        const pathPrefixesToUncache = [];
        paths.forEach((path) => {
          if (path.endsWith('*')) {
            // This is a prefix-based path
            pathPrefixesToUncache.push(path.split('*')[0]);
          } else {
            // This is a normal path
            pathIsBeingUncached[path] = true;
          }
        });

        // Uncache individual paths
        pathPrefixesToUncache.forEach(config.cache.clear);

        // Uncache based on path prefixes
        if (pathPrefixesToUncache.length > 0) {
          const cachedKeys = Object.keys(config.cache.getAll());
          cachedKeys.forEach((key) => {
            for (let i = 0; i < pathPrefixesToUncache.length; i++) {
              if (key.startsWith(pathPrefixesToUncache[i])) {
                // Uncache this path
                config.cache.clear(key);
                break;
              }
            }
          });
        }
      };
    } else {
      // > Use a dummy function so uncaching doesn't crash
      uncache = () => {};
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
