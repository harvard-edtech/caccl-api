const CACCLError = require('../../caccl-error/index.js'); // TODO: Switch to actual node module
const errorCodes = require('../errorCodes.js');

const genVisitEndpoint = require('../../caccl-visit-endpoint/index.js'); // TODO: Switch to actual node module
const MemoryCache = require('./MemoryCache.js');
const SessionCache = require('./SessionCache.js');

// Endpoints categories
const EndpointsCategory = require('./EndpointsCategory.js');
const categoryToEndpointsFilesMap = require('../endpoints/config.js');

class SmartEndpoints {
  /**
   * Creates a new SmartEndpoints object
   * @param {string} accessToken - An access token to add to all requests.
   * @param {string} canvasHost - The hostname to use when sending requests to
   *   the Canvas API.
   * @param {string} cacheType - If 'memory', cache is stored in memory.
   *   If 'session' and req is included, cache is stored in express session.
   *   If 'custom' and cache is included, cache is stored in your custom cache
   *   manager. Otherwise, caching is disabled.
   * @param {object} req - Express request object with req.session support.
   *   Required if using 'session' cacheType.
   * @param {object} cache - Custom cache manager class. Required if using
   *   'custom' cacheType.
   * @param {function} visitEndpoint - Optional function that sends a request to
   *   the Canvas API. Defaults to HTTPS request sender.
   */
  constructor(options) {
    // Initialize visitEndpoint if it's not included
    const visitEndpoint = options.visitEndpoint || genVisitEndpoint({
      defaults: {
        numRetries: 3,
        itemsPerPage: 100,
        host: options.canvasHost,
      },
    });

    // Initialize cache
    if (options.cacheType === 'memory') {
      this.cache = new MemoryCache();
    } else if (options.cacheType === 'session' && options.req) {
      this.cache = new SessionCache(options.req);
    } else if (options.cacheType === 'custom' && options.cache) {
      this.cache = options.cache;
    } else if (options.cacheType) {
      // Invalid cache type
      throw new CACCLError({
        message: 'Smart Canvas Endpoints was initialized improperly: cacheType must be "memory" or "session" "custom". If "session", req must be included. If "custom", cache must be included.',
        code: errorCodes.invalid_cache,
      });
    }

    // Initialize apps endpoints
    Object.keys(categoryToEndpointsFilesMap).forEach((categoryName) => {
      this[categoryName] = new EndpointsCategory({
        visitEndpoint,
        accessToken: options.accessToken,
        enpointsFiles: categoryToEndpointsFilesMap[categoryName],
      });
    });
  }

  /*------------------------------------------------------------------------*/
  /*                             Cache Functions                            */
  /*------------------------------------------------------------------------*/

  // TODO: add docs
  uncacheAll() {
    if (this.cache) {
      this.cache.clearAll();
    }
  }

  // TODO: add docs
  uncache(path) {
    // Handle prefix-based keys
    if (path.endsWith('*')) {
      // Extract prefix
      const prefix = path.split('*')[0];
      // This is a prefix-based key
      // > Loop through all cached keys and check their prefixes
      const cacheObject = this.cache.getAll();
      Object.keys(cacheObject).forEach((cachedPath) => {
        if (cachedPath.startsWith(prefix)) {
          // Found a match. Clear it.
          this.cache.clear(cachedPath);
        }
      });
    } else {
      // This is a simple key, just uncache it
      this.cache.clear(path);
    }
  }
}

module.exports = SmartEndpoints;
