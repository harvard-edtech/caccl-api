/**
 * Class that handles a category of endpoints
 * @module classes/EndpointCategory
 * @see module: classes/EndpointCategory
 */

// Endpoint-related helpers
const genEndpointFunction = require('./endpoint/genEndpointFunction.js');

const CACCLError = require('../../caccl-error/index.js'); // TODO: Switch to actual node module
const errorCodes = require('../errorCodes.js');

const genVisitEndpoint = require('./visitEndpoint/genVisitEndpoint.js'); // TODO: Switch to actual node module
const MemoryCache = require('./caches/MemoryCache.js');
const SessionCache = require('./caches/SessionCache.js');

/** A category of endpoints */
class EndpointCategory {
  /**
   * Creates an EndpointCategory
   * @author Gabriel Abrams
   * @param {function} [config.visitEndpoint=instance made by genVisitEndpoint]
   *   - An instance of a visitEndpoint function generated by
   *   classes/endpoint/genEndpointFunction
   * @param {number} [config.defaultNumRetries=3] – Only valid if visitEndpoint
   *   is excluded. Used when creating a new visitEndpoint function (equals the
   *   default number of times to retry failed a request). This may be
   *   overridden in any request by including a numRetries option
   * @param {number} [config.defaultItemsPerPage=100] – Only valid if
   *   visitEndpoint is excluded. Used when creating a new visitEndpoint
   *   function (equals the default number of items to request from Canvas).
   *   This may be overridden in any request by including an itemsPerPage option
   * @param {string} [config.canvasHost=canvas.instructure.com] – Only valid if
   *   visitEndpoint is excluded. Used when creating a new visitEndpoint
   *   function (equals the default Canvas hostname to use). This may be
   *   overridden in any request by including a host option
   * @param {string} [config.apiPathPrefix] – Only valid if visitEndpoint is
   *   excluded. Used when creating a new visitEndpoint function (this string
   *   prefix is prepended to all paths before sending requests)
   * @param {string} [config.accessToken] – Only valid if visitEndpoint is
   *   excluded. Used when creating a new visitEndpoint function (this access
   *   token will be added to all requests). This may be overridden in any
   *   request by including an access_token query parameter
   * @param {function} [config.sendRequest=defaultSendRequest] – Only valid if
   *   visitEndpoint is excluded. Used when creating a new visitEndpoint
   *   function (this function is used to send https requests to Canvas)
   * @param {object} [config.cache=null] - A cache instance to use. If excluded,
   *   caching is turned off
   * @param {string} [config.cacheType=none] – Only valid if cache is excluded.
   *   Used when creating a new cache. If cacheType is not included, caching is
   *   turned off. If cacheType is 'memory', a new MemoryCache is created. If
   *   cacheType is 'session', you must also include config.req and we'll create
   *   a new SessionCache. To include your own custom cache, include it as
   *   config.cache and do not define cacheType
   * @param {object} [config.api=this] - Top level EndpointCategory instance
   *   of which this EndpointCategory instance is a descendent
   * @param {function} [uncache=create new uncache function] - A function that
   *   takes paths and a response object, uncaches those paths, then resolves
   *   to the response object
   */
  constructor(config, Child) {
    // Initialize visitEndpoint
    let { visitEndpoint } = config;
    if (!visitEndpoint) {
      // Create a new visitEndpoint function
      const numRetries = (
        config.defaultNumRetries !== undefined
          ? config.defaultNumRetries
          : 3
      );
      visitEndpoint = genVisitEndpoint({
        defaults: {
          numRetries,
          itemsPerPage: config.defaultItemsPerPage || 100,
          host: config.canvasHost || 'canvas.instructure.com',
          apiPathPrefix: config.apiPathPrefix,
        },
        sendRequest: config.sendRequest,
        accessToken: config.accessToken,
      });
    }

    // Initialize api
    let { api } = config;
    if (!api) {
      api = this;
    }

    // Initialize cache
    let { cache } = config;
    if (!cache) {
      if (config.cacheType === 'memory') {
        cache = new MemoryCache();
      } else if (config.cacheType === 'session' && config.req) {
        cache = new SessionCache(config.req);
      } else if (config.cacheType) {
        // Invalid cache type
        throw new CACCLError({
          message: 'Canvas API was initialized improperly: cacheType must be "memory" or "session". If "session", req must be included.',
          code: errorCodes.invalid_cache,
        });
      }
    }

    // Initialize uncache
    let { uncache } = config;
    if (!uncache) {
      // Create an uncache function to pass to endpoints
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
    }

    // Turn each endpoint (defined as a static function in the child) into a
    // function
    Object.keys(Child).forEach((prop) => {
      if (Child[prop].prototype instanceof EndpointCategory) {
        // This is a sub-category
        this[prop] = new Child[prop]({
          visitEndpoint,
          cache,
          api,
          uncache,
        });
      } else {
        // This is an endpoint

        // Extract action from first line of function
        let action;
        try {
          const firstLine = Child[prop].toString().split('\n')[1];
          action = firstLine.split('// @action: ')[1].trim();
        } catch (err) {
          action = 'perform an unnamed task';
        }

        // Create the function
        this[prop] = genEndpointFunction({
          visitEndpoint,
          cache,
          api,
          uncache,
          action,
          run: Child[prop],
        });
      }
    });
  }
}

module.exports = EndpointCategory;
