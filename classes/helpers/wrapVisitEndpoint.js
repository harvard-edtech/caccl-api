const EXCLUDED_NAMES = [
  'dontCache',
  'ignoreCache',
];
const EXCLUDED_VALUE = '-=EXCLUDED_PARAMETER=-';

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

    // Check for cached value
    let getCachedValue;
    if (lookupInCache) {
      getCachedValue = config.cache.get(options.path);
    } else {
      getCachedValue = Promise.resolve(null);
    }

    return getCachedValue.then((cachedValue) => {
      if (cachedValue) {
        // Convert to promise and resolve
        return Promise.resolve(cachedValue);
      }

      // No cached value. Need to visit the endpoint

      // Pre-process params
      // > Remove excluded parameters
      const newParams = {};
      Object.keys(options.params || {}).forEach((key) => {
        // Exclude by name
        if (EXCLUDED_NAMES.indexOf(key) >= 0) {
          return;
        }
        // Exclude by value
        if (EXCLUDED_VALUE === options.params[key]) {
          return;
        }
        // Not excluded. Include this.
        newParams[key] = options.params[key];
      });
      // > Add access token to request (if we have one)
      if (config.accessToken) {
        newParams.access_token = config.accessToken;
      }

      // Pre-process options
      const requestOptions = options;
      requestOptions.params = newParams;
      requestOptions.method = options.method || 'GET';

      // Send request
      const valuePromise = config.visitEndpoint(requestOptions)
        .then((response) => {
          // Success!

          // Cache value if applicable
          if (storeInCache && !config.cache.storePromises) {
            // Save to cache and then resolve with response
            return config.cache.set(options.path, newParams, response)
              .then(() => {
                return Promise.resolve(response);
              });
          }

          // Not caching value. Just resolve.
          return Promise.resolve(response);
        });

      // Cache promise if applicable
      if (storeInCache && config.cache.storePromises) {
        // Save promise to cache then resolve with promise
        return config.cache.set(options.path, newParams, valuePromise)
          .then(() => {
            return valuePromise;
          });
      }

      // Not caching promise. Just return value promise.
      return valuePromise;
    });
  };
}

module.exports = wrapVisitEndpoint;
