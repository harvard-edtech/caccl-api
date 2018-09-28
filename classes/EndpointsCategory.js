const CACCLError = require('../../caccl-error/index.js'); // TODO: switch to actual package

// Wrap visitEndpoint to add two new features:
// > Adds access tokens to each request
// > Caches/uncaches values if cache was included
function wrapVisitEndpoint(config) {
  return (options) => {
    // Check for cached value
    if (config.cache) {
      const cachedValue = config.cache.get(options.path);
      if (cachedValue) {
        // Resolve with cached value
        return Promise.resolve(cachedValue);
      }
    }

    // Add access token to request
    const requestOptions = options;
    requestOptions.params = requestOptions.params || {};
    requestOptions.params.access_token = config.accessToken;

    // Send new request
    const valuePromise = config.visitEndpoint(requestOptions)
      .then((endpointResults) => {
        // Success!
        const uncacheExcluded = (
          !endpointResults
          || !endpointResults.uncache
          || !Array.isArray(endpointResults.uncache)
        );
        const response = (
          uncacheExcluded ? endpointResults : endpointResults.response
        );
        // > Save in cache
        if (config.cache) {
          if (config.cache.storePromises) {
            // Store the promise
            config.cache.set(options.path, valuePromise);
          } else {
            // Store the value
            config.cache.set(options.path, response);
          }
        }
        // > Uncache if applicable
        if (!uncacheExcluded && config.cache) {
          endpointResults.uncache.forEach((key) => {
            config.cache.clear(key);
          });
        }
        // > Resolve with result
        return Promise.resolve(response);
      });
  };
}

class EndpointsCategory {
  constructor(options) {
    // Wrap visitEndpoint to add two new features:
    // > Adds access tokens to each request
    // > Caches/uncaches values if cache was included
    const visitEndpoint = wrapVisitEndpoint({
      visitEndpoint: options.visitEndpoint,
      cache: options.cache,
      accessToken: options.accessToken,
    });

    // Turn each endpoint into a function
    let { endpointsDefinitions } = options;
    if (!Array.isArray(options.endpointsDefinitions)) {
      endpointsDefinitions = [options.endpointsDefinitions];
    }
    endpointsDefinitions.forEach((endpointsDefinition) => {
      endpointsDefinition(this, visitEndpoint).forEach((endpoint) => {
        this[endpoint.name] = (...args) => {
          return endpoint.run(...args)
            .catch((err) => {
              // Turn into CACCLError if not already
              let newError = err;
              if (!err.isCACCLError) {
                newError = new CACCLError(err);
              }

              // Add on action to the error
              newError.message = 'While attempting to ' + endpoint.action + ', we ran into an error: ' + err.message;
              throw newError;
            });
        };
      });
    });
  }
}

module.exports = EndpointsCategory;
