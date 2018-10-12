/*
config:
- visitEndpoint
- cache
- options (from endpoint caller)
*/
module.exports = (config) => {
  // Create variable for if we're caching and if we're looking up in cache
  const lookupInCache = (config.cache && !config.options.ignoreCache);
  const storeInCache = (config.cache && !config.options.dontCache);

  // If no caching taking place, no need to wrap visitEndpoint
  if (!lookupInCache && !storeInCache) {
    return config.visitEndpoint;
  }

  // Wrap visitEndpoint to lookup (if applicable) before and store (if
  // applicable) after visiting the endpoint
  return (options = {}) => {
    // Skip caching if not a GET request (only GET requests are cacheable)
    if (!options.method || options.method !== 'GET') {
      // Skip caching entirely (use original visitEndpoint function)
      return config.visitEndpoint(options);
    }

    // We're using the cache!
    let lookupCachedValue;
    if (lookupInCache) {
      // Get cached value
      lookupCachedValue = config.cache.get(options.path, options.params || {});
    } else {
      // Not looking up cached value. Just continue
      lookupCachedValue = Promise.resolve(null);
    }

    lookupCachedValue.then((cachedValue) => {
      if (cachedValue) {
        // Found a cached value! Return it after converting it to a promise
        // (if it's already a promise, it'll just remain a promise)
        return Promise.resolve(cachedValue);
      }

      // No cached value. Need to visit the endpoint
      const visitEndpointPromise = config.visitEndpoint(options);

      // Store the promise if possible
      let storePromiseInCache;
      if (config.cache.storePromises) {
        // Store the promise
        storePromiseInCache = config.cache.set(
          options.path,
          options.params || {},
          visitEndpointPromise
        );
      } else {
        storePromiseInCache = Promise.resolve();
      }

      // Wait for store to complete, then resolve with visitEndpoint response
      return storePromiseInCache.then(() => {
        return visitEndpointPromise;
      });
    }).then((response) => {
      // Success!

      // Cache the value if applicable
      let storeValueInCache;
      if (!config.cache.storePromises) {
        // Store the value
        storeValueInCache = config.cache.set(
          options.path,
          options.params,
          response
        );
      } else {
        storeValueInCache = Promise.resolve();
      }

      // Wait for store to complete, then resolve with visitEndpoint response
      return storeValueInCache.then(() => {
        return Promise.resolve(response);
      });
    });
  };
};
