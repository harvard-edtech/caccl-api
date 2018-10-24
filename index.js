/**
 * Canvas API Class
 * @module caccl-canvas-api
 * @see module: index
 */

const Endpoints = require('./endpoints/Endpoints.js');

const CACCLError = require('../caccl-error/index.js'); // TODO: Switch to actual node module
const errorCodes = require('./errorCodes.js');

const genVisitEndpoint = require('./classes/request/genVisitEndpoint.js'); // TODO: Switch to actual node module
const MemoryCache = require('./classes/caches/MemoryCache.js');
const SessionCache = require('./classes/caches/SessionCache.js');

/**
 * Creates a new SmartEndpoints object
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
 * @param {number} [config.defaultNumRetries=3] - Number of times to retry a
 *   request. Can be overridden for an individual request by including
 *   numRetries option
 * @param {number} [config.defaultItemsPerPage=100] - Number of items to
 *   request on a get request. Can be overridden for an individual request by
 *   including numPerPage option
 */
module.exports = (config) => {
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
      message: 'Smart Canvas Endpoints was initialized improperly: cacheType must be "memory" or "session" "custom". If "session", req must be included. If "custom", cache must be included.',
      code: errorCodes.invalid_cache,
    });
  }

  const api = new Endpoints({
    visitEndpoint,
    cache,
  });

  return api;
};
