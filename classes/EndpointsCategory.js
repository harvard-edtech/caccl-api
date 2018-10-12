// Endpoint-related helpers
const genEndpointFunction = require('./endpoint/genEndpointFunction.js');

/*
config:
- cache
- visitEndpoint
*/
class EndpointsCategory {
  constructor(config) {
    // Create an uncache function to pass to endpoints
    let uncache;
    if (config.cache) {
      // Create uncache function that changes the cache
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
      // No cache. Return dummy function that does nothing
      uncache = (_, response) => {
        return Promise.resolve(response);
      };
    }

    // Turn each endpoint into a function
    const { endpointsFiles } = config;
    // Loop through all endpoint definition files in the category
    endpointsFiles.forEach((endpointsFile) => {
      // For each endpoint definition file, loop through all endpoints
      endpointsFile.forEach((endpoint) => {
        // Add this endpoint to the current EntpointsCategory instance
        // > Use endpoint.name as the function name
        // > Before running, create a visitEndpoint function that caches
        //     according to caching params: ignoreCache and dontCache
        // > Call endpoint.run with the options passed by the caller and with
        //     the customized visitEndpoint function
        this[endpoint.name] = genEndpointFunction({
          uncache,
          endpoint,
          cache: config.cache,
          visitEndpoint: config.visitEndpoint,
          categoryInstance: this,
        });
      });
    });
  }
}

module.exports = EndpointsCategory;
