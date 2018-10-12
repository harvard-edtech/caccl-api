const CACCLError = require('../caccl-error/index.js'); // TODO: Switch to actual node module
const errorCodes = require('./errorCodes.js');

const genVisitEndpoint = require('./classes/request/genVisitEndpoint.js'); // TODO: Switch to actual node module
const MemoryCache = require('./classes/caches/MemoryCache.js');
const SessionCache = require('./classes/caches/SessionCache.js');

// Endpoints categories
const EndpointsCategory = require('./classes/EndpointsCategory.js');
const categoryToEndpointsFilesMap = require('./endpoints/config.js');

class CanvasAPI {
  /**
   * Creates a new SmartEndpoints object
   * @param {string} accessToken - An access token to add to all requests. Can
   *   be overridden by including `access_token` query/body parameter.
   * @param {string} canvasHost - The hostname to use when sending requests to
   *   the Canvas API. Can be overridden for an individual request by including
   *   `host` option. (default: canvas.instructure.com)
   * @param {string} cacheType - If 'memory', cache is stored in memory.
   *   If 'session' and req is included, cache is stored in express session.
   *   If 'custom' and cache is included, cache is stored in your custom cache
   *   manager. Otherwise, caching is disabled.
   * @param {object} req - Express request object with req.session support.
   *   Required if using 'session' cacheType.
   * @param {object} cache - Custom cache manager class. Required if using
   *   'custom' cacheType.
   * @param {function} sendRequest - Optional. Function that sends a request to
   *   the Canvas API. Defaults to HTTPS request sender.
   * @param {number} defaultNumRetries – Optional. Number of times to retry a
   *   request. Can be overridden for an individual request by including
   *   `numRetries` option (default: 3)
   * @param {number} defaultItemsPerPage – Optional. Number of items to request
   *   on a get request. Can be overridden for an individual request by
   *   including `numPerPage` option (default: 100)
   */
  constructor(config) {
    // Initialize visitEndpoint if it's not included
    const visitEndpoint = genVisitEndpoint({
      defaults: {
        numRetries: config.defaultNumRetries || 3,
        itemsPerPage: config.defaultItemsPerPage || 100,
        host: config.canvasHost || 'canvas.instructure.com',
      },
      sendRequest: config.sendRequest,
      accessToken: config.accessToken,
    });

    // Initialize cache
    if (config.cacheType === 'memory') {
      this.cache = new MemoryCache();
    } else if (config.cacheType === 'session' && config.req) {
      this.cache = new SessionCache(config.req);
    } else if (config.cacheType === 'custom' && config.cache) {
      this.cache = config.cache;
    } else if (config.cacheType) {
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
        endpointsFiles: categoryToEndpointsFilesMap[categoryName],
      });
    });
  }
}

module.exports = CanvasAPI;
