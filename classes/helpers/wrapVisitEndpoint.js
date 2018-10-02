const EXCLUDED_PARAM = '-=EXCLUDED_PARAMETER=-';

// Wrap visitEndpoint to add two new features:
// > Adds access tokens to each request
// > Looks up/stores values in cache, if applicable
// > Ignores (filters out) excluded parameters
//     excluded parameters are added via endpoints helpers
function wrapVisitEndpoint(config) {
  return (options) => {
    let { lookupInCache, storeInCache } = config;

    // Only GET requests are cacheable
    if (options.method && options.method !== 'GET') {
      lookupInCache = false;
      storeInCache = false;
    }

    // Check for cached value, resolve if it exists
    if (lookupInCache) {
      const cachedValue = config.cache.get(options.path);
      if (cachedValue) {
        // Resolve with cached value
        // > Cached value may be a promise or a value. Either way,
        //   Promise.resolve(...) turns the value into a Promise, so our
        //   returned value is always a Promise.
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

    // Create new options
    const requestOptions = options;
    requestOptions.params = newParams;
    requestOptions.method = options.method || 'GET';

    // Send new request
    const valuePromise = config.visitEndpoint(requestOptions)
      .then((response) => {
        // Success!

        // Cache if applicable
        if (storeInCache && !config.cache.storePromises) {
          // Store the value
          config.cache.set(options.path, response);
        }

        // Resolve with result
        return Promise.resolve(response);
      });

    // Immediately store the promise, if possible
    if (storeInCache && config.cache.storePromises) {
      // Store the promise
      config.cache.set(options.path, valuePromise);
    }

    // Resolve with value
    return valuePromise;
  };
}

module.exports = wrapVisitEndpoint;
