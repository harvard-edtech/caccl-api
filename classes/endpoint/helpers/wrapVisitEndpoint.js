/**
 * Function that wraps visitEndpoint to make a cached version of the function
 * @author Gabriel Abrams
 * @module classes/endpoint/helpers/genCachedVisitEndpoint
 * @see module: classes/endpoint/helpers/genCachedVisitEndpoint
 */

/**
 * Wraps visitEndpoint to make a cached version of visitEndpoint that looks up
 *   in cache before sending a request and saves in cache after request returns
 * @author Gabriel Abrams
 * @param {function} config.visitEndpoint - The visitEndpoint function created
 *   by classes/request/genVisitEndpoint
 * @param {object} [config.cache=null] - The cache instance. Does not cache if
 *   no cache is included
 * @param {object} config.options - The options to send to visitEndpoint (same
 *   requirements as those listed in classes/request/genVisitEndpoint)
 * @return {function} new visitEndpoint function that also performs caching
 */
module.exports = (config = {}) => {
  // Set up original visitEndpoint
  const originalVisitEndpoint = config.visitEndpoint;

  // 1. WRAP WITH OVERRIDDEN VARIABLES
  // Gather variables to override
  const canvasHostOverride = config.options.canvasHost;
  const accessTokenOverride = config.options.accessToken;

  // Wrap
  let overriddenVarVisitEndpoint;
  if (canvasHostOverride || accessTokenOverride) {
    overriddenVarVisitEndpoint = (options = {}) => {
      const newOptions = options;
      // Override host
      if (canvasHostOverride) {
        newOptions.host = canvasHostOverride;
      }
      // Override access token
      if (accessTokenOverride) {
        if (!newOptions.params) {
          newOptions.params = {};
        }
        newOptions.params.access_token = accessTokenOverride;
      }
      return originalVisitEndpoint(newOptions);
    };
  } else {
    // No need to wrap. Just keep same visitEndpoint function
    overriddenVarVisitEndpoint = originalVisitEndpoint;
  }

  // 2. WRAP FOR CACHING
  let cachedVisitEndpoint;
  // Create variable for if we're caching and if we're looking up in cache
  const lookupInCache = (config.cache && !config.options.ignoreCache);
  const storeInCache = (config.cache && !config.options.dontCache);

  // Wrap
  if (lookupInCache || storeInCache) {
    // Wrap visitEndpoint to lookup (if applicable) before and store (if
    // applicable) after visiting the endpoint
    cachedVisitEndpoint = (options = {}) => {
      // Skip caching if not a GET request (only GET requests are cacheable)
      if (!options.method || options.method !== 'GET') {
        // Skip caching entirely (use original visitEndpoint function)
        return config.visitEndpoint(options);
      }

      // We're using the cache!
      let lookupCachedValue;
      if (lookupInCache) {
        // Get cached value
        lookupCachedValue = config.cache.get(
          options.path,
          options.params || {}
        );
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
  } else {
    // No caching taking place. No need for wrap
    cachedVisitEndpoint = overriddenVarVisitEndpoint;
  }

  return cachedVisitEndpoint;
};
