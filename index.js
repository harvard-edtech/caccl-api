/**
 * Canvas API Class
 * @module caccl-canvas-api
 * @see module: index
 */

const API = require('./endpoints/API');

const CACCLError = require('../caccl-error/index.js'); // TODO: Switch to actual node module
const errorCodes = require('./errorCodes.js');

const genVisitEndpoint = require('./classes/request/genVisitEndpoint.js'); // TODO: Switch to actual node module
const MemoryCache = require('./classes/caches/MemoryCache.js');
const SessionCache = require('./classes/caches/SessionCache.js');

/**
 * Creates a new API object
 * @param {string} [config.accessToken] - An access token to add to all
 *   requests. Can be overridden by including `access_token` query/body
 *   parameter.
 * @param {string} [config.canvasHost=canvas.instructure.com] - The hostname
 *   to use when sending requests to the Canvas API. Can be overridden for an
 *   individual request by including `host` option
 * @param {string} [config.cacheType] - If 'memory', cache is stored in
 *   memory. If 'session' and req is included, cache is stored in express
 *   session. If 'custom' and cache is included, cache is stored in your
 *   custom cache manager. Otherwise, caching is disabled.
 * @param {object} config.req - Express request object with req.session
 *   support. Required if using 'session' cacheType.
 * @param {object} config.cache - Custom cache manager class. Required if
 *   using 'custom' cacheType.
 * @param {function} [config.sendRequest] - Function that sends a request to
 *   the Canvas API. Defaults to HTTPS request sender.
 * @param {string} [options.apiPathPrefix=''] - The
 *   prefix to prepend to all endpoint paths
 * @param {number} [config.defaultNumRetries=3] - Number of times to retry a
 *   request. Can be overridden for an individual request by including
 *   numRetries option
 * @param {number} [config.defaultItemsPerPage=100] - Number of items to
 *   request on a get request. Can be overridden for an individual request by
 *   including numPerPage option
 */
module.exports = (config) => {
  // Initialize visitEndpoint if it's not included
  const numRetries = (
    config.numRetries !== undefined
      ? config.defaultNumRetries
      : 3
  );
  const visitEndpoint = genVisitEndpoint({
    defaults: {
      numRetries,
      itemsPerPage: config.defaultItemsPerPage || 100,
      host: config.canvasHost || 'canvas.instructure.com',
      apiPathPrefix: config.apiPathPrefix,
    },
    sendRequest: config.sendRequest,
    accessToken: config.accessToken,
  });

  // Initialize cache
  let cache;
  if (config.cacheType === 'memory') {
    cache = new MemoryCache();
  } else if (config.cacheType === 'session' && config.req) {
    cache = new SessionCache(config.req);
  } else if (config.cacheType === 'custom' && config.cache) {
    ({ cache } = config);
  } else if (config.cacheType) {
    // Invalid cache type
    throw new CACCLError({
      message: 'Smart Canvas API was initialized improperly: cacheType must be "memory" or "session" "custom". If "session", req must be included. If "custom", cache must be included.',
      code: errorCodes.invalid_cache,
    });
  }

  // Create an uncache function to pass to endpoints
  let uncache;
  if (cache) {
    // Create uncache function that changes the cache
    uncache = (paths, response) => {
      return cache.getAllPaths().then((cachedPaths) => {
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
        return cache.deletePaths(pathsToUncache);
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

  // Create a new API class
  const api = new API({
    visitEndpoint,
    cache,
    uncache,
  });

  return api;
};
