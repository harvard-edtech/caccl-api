const EXCLUDED_PARAM = '-=EXCLUDED_PARAMETER=-';

// Wrap visitEndpoint to add two new features:
// > Adds access tokens to each request
// > Caches/uncaches values if cache was included
function wrapVisitEndpoint(config) {
  return (options) => {
    // Check if this request is cacheable
    // > Only cache if we have a cache
    // > and
    // > Only cache if the method is "GET"
    const cacheThis = (
      (!options.method || options.method === 'GET')
      && config.cache
    );

    // Check for cached value
    if (cacheThis) {
      const cachedValue = config.cache.get(options.path);
      if (cachedValue) {
        // Resolve with cached value
        return Promise.resolve(cachedValue);
      }
    }

    // Remove excluded parameters
    const newParams = {};
    Object.keys(options.params || {}).forEach((key) => {
      if (options.params[key] !== EXCLUDED_PARAM) {
        newParams[key] = options.params[key];
      }
    });

    // Add access token to request
    if (config.accessToken) {
      newParams.access_token = config.accessToken;
    }
    const requestOptions = options;
    requestOptions.params = newParams;

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
        if (cacheThis) {
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
            // Handle prefix-based keys
            if (key.endsWith('*')) {
              // Extract prefix
              const prefix = key.split('*')[0];
              // This is a prefix-based key
              const cacheObject = config.cache.getAll();
              Object.keys(cacheObject).forEach((cachedKey) => {
                if (cachedKey.startsWith(prefix)) {
                  // Found a match. Clear it.
                  config.cache.clear(cachedKey);
                }
              });
            } else {
              // This is a simple key, just uncache it
              config.cache.clear(key);
            }
          });
        }
        // > Resolve with result
        return Promise.resolve(response);
      });
  };
}

module.exports = wrapVisitEndpoint;
