const parseLinkHeader = require('parse-link-header');
const pathLib = require('path');
const defaultSendRequest = require('caccl-send-request');
const CACCLError = require('caccl-error');

const errorCodes = require('../../errorCodes');
const interpretCanvasError = require('./helpers/interpretCanvasError');
const preProcessParams = require('./helpers/preProcessParams');

/**
 * Generates a new visitEndpoint function
 * @author Gabriel Abrams
 * @param {number} itemsPerPage - the number of items to request in each page
 * @param {number} maxPages - the maximum number of pages to request
 * @param {string} canvasHost - the Canvas host to send requests to
 * @param {string} apiPathPrefix - a prefix to prepend to all request paths
 * @param {number} numRetries - the number of times to retry failed requests
 * @param {string} [accessToken] - the access token to add to all requests
 * @param {object} [cache] - the cache instance
 * @param {function} [uncache] - a function that uncaches a list of paths then
 *   resolves with the passed in value. Only valid if cache is included
 * @param {boolean} [dontCache] - if truthy, we don't cache values after we
 *   request them from Canvas. Only valid if method is GET and cache is included
 * @param {boolean} [ignoreCache] - if truthy, we don't look to see if we have
 *   a cached value before requesting a new value from Canvas. Only valid if
 *   method is GET and cache is included
 * @param {function} [onNewPage] - called when each page is received.
 *   Called with the following arguments: page, pageNumber – where page is the
 *   page contents and pageNumber is the number of the current page (starting
 *   at page 1)
 * @param {function} [sendRequest=caccl-send-request instance] - a custom
 *   function that sends https requests (we recommend not including this)
 * @param {string} [authenticityToken] - An authenticity token
 *   to add to all requests no matter what (cannot be overridden)
 * @param {function} [pagePostProcessor] - if included, this function is used
 *   on each page before it is added to the list of pages. This is the default
 *   value, can be added directly to the visitEndpoint call
 * @param {string}
 */
module.exports = (config = {}) => {
  /* ----------------------- Set up defaults ---------------------- */
  const {
    accessToken,
    itemsPerPage,
    maxPages,
    startPage,
    canvasHost,
    apiPathPrefix,
    numRetries,
    cache,
    uncache,
    authenticityToken,
  } = config;

  // Set up sendRequest
  const sendRequest = (config.sendRequest || defaultSendRequest);

  /**
   * visitEndpoint function
   * @param {string} [method=GET] - the http method
   * @param {object} [params={}] - the request body
   * @param {function} [pagePostProcessor] - if included, this function is used
   *   on each page before it is added to the list of pages
   * @param {boolean} [dontCache=default value] - if true, forces caccl to
   *   not cache this value
   * @param {boolean} [ignoreCache=default value] - if true,
   *   forces caccl to ignore the cache when deciding whether to
   *   request data from Canvas
   * @param {function} [onNewPage] - called when each page is received.
   *   Called with the following arguments: page, pageNumber – where page is the
   *   page contents and pageNumber is the number of the current page (starting
   *   at page 1)
   */
  return (requestInfo = {}) => {
    /* ----------------- Extract request information ---------------- */
    const method = (requestInfo.method || 'GET');
    const params = requestInfo.params || {};
    const { path } = requestInfo;

    /* -------------- Extract config and apply defaults ------------- */
    // dontCache - if truthy, does not cache the final result (must be true if
    //   no cache included or method is not 'GET')
    const dontCache = (
      !cache
      || config.dontCache
      || method !== 'GET'
      || requestInfo.dontCache
    );
    // ignoreCache - if truthy, does not look up cached value before sending
    //   request (must be true if no cache included or method is not 'GET')
    const ignoreCache = (
      !cache
      || config.ignoreCache
      || method !== 'GET'
      || requestInfo.ignoreCache
    );
    // pagePostProcessor
    const pagePostProcessor = (
      config.pagePostProcessor
      || requestInfo.pagePostProcessor
    );

    // Step 1: check for cached value
    let getCachedValue = Promise.resolve(null);
    if (!ignoreCache) {
      getCachedValue = cache.get(path, params);
    }

    // Step 2: fetch value if no cached value
    let usedCachedValue = true;
    const getValue = getCachedValue
      .then((cachedValue) => {
        if (cachedValue) {
          return Promise.resolve(cachedValue);
        }

        // Pre-process the request params
        const preProcessedParams = preProcessParams({
          method,
          params,
          itemsPerPage,
          accessToken,
          authenticityToken,
        });

        // We are using the cached value. Keep note of this
        usedCachedValue = false;

        // Fetch value from Canvas (no cached value)
        return new Promise((resolve, reject) => {
          const pages = [];
          const fetchPage = (pageNumber) => {
            // Add the page number to the request (if applicable)
            const paramsWithPageNumber = preProcessedParams;
            if (pageNumber > 1) {
              paramsWithPageNumber.page = pageNumber;
            }

            // Send the request
            sendRequest({
              method,
              numRetries,
              params: paramsWithPageNumber,
              path: apiPathPrefix + path,
              host: canvasHost,
              // Ignore self-signed certificate if host is simulated Canvas
              ignoreSSLIssues: (canvasHost === 'localhost:8088'),
            })
              .then((response) => {
                // Check if the API call failed:
                // > 404 - endpoint not found
                if (response.status === 404) {
                  return reject(new CACCLError({
                    message: `The endpoint ${(canvasHost ? 'https://' + canvasHost : '')}${path} does not exist: Canvas responded with a 404 message. Please check your endpoint path.`,
                    code: errorCodes.notFound,
                  }));
                }
                // > 400 - Invalid syntax
                if (response.status === 400) {
                  // Terms only in root accounts
                  if (
                    response.body.message
                    && response.body.message.includes('Terms only belong to root_accounts')
                  ) {
                    return reject(new CACCLError({
                      message: 'We could not look up the list of terms because terms only belong to root accounts and this is not a root account.',
                      code: errorCodes.termsOnlyInRootAccounts,
                    }));
                  }

                  // Compile errors into string
                  let errors;
                  try {
                    const parsed = JSON.parse(response.body);
                    (parsed.errors || [parsed.message]).forEach((err) => {
                      if (!errors) {
                        errors = '';
                      } else {
                        errors += ', ';
                      }
                      errors += err.split(':')[0];
                    });
                    errors += '.';
                  } catch (err) {
                    errors = 'unknown (could not parse Canvas response)';
                  }
                  // Reject with our generated error
                  return reject(new CACCLError({
                    message: `The endpoint https://${canvasHost}${path} or params are invalid. Canvas responded with a 400 message (invalid syntax): ${errors}`,
                    code: errorCodes.invalidSyntax,
                  }));
                }

                // Parse body (if it's not already parsed)
                let parsedBody;
                if (response.body && typeof response.body !== 'string') {
                  // Body isn't a string. Assume it's already parsed
                  parsedBody = response.body;
                } else {
                  // Attempt to parse body
                  try {
                    parsedBody = JSON.parse(response.body);
                  } catch (err) {
                    return reject(new CACCLError({
                      message: 'We couldn\'t understand Canvas\'s response because it was malformed. Please contact an admin if this continues to occur.',
                      code: errorCodes.malformed,
                    }));
                  }
                }

                // Check for a Canvas error
                const canvasError = interpretCanvasError(
                  parsedBody, response.status
                );
                if (canvasError) {
                  // We got an error. Reject!
                  return reject(canvasError);
                }

                // Post-process the body
                if (pagePostProcessor) {
                  parsedBody = pagePostProcessor(parsedBody);
                }

                // Page is valid. Save it
                pages.push(parsedBody);

                // Send notifications
                if (requestInfo.onNewPage) {
                  requestInfo.onNewPage(parsedBody, pages.length);
                }
                if (config.onNewPage) {
                  config.onNewPage(parsedBody, pages.length);
                }

                // Check for next page
                let nextPagePath;
                try {
                  const { link } = response.headers;
                  const parsedLinkHeader = parseLinkHeader(link);
                  const nextPageURL = parsedLinkHeader.next.url;
                  const host = nextPageURL.split('/')[2];
                  nextPagePath = nextPageURL.split(host)[1];
                } catch (err) {
                  nextPagePath = null;
                }

                // Check if we're allowed to fetch another page
                const allowedToFetchAnotherPage = (
                  !maxPages
                  || pages.length < maxPages
                );

                // Fetch next page if we're allowed to and we have a next page
                if (nextPagePath && allowedToFetchAnotherPage) {
                  return fetchPage(pageNumber + 1);
                }

                // We don't need to fetch any more pages. Wrap up.
                // Concatenate pages if necessary
                const allData = (
                  pages.length === 1
                    ? pages[0]
                    : [].concat(...pages)
                );

                // Resolve with data
                return resolve(allData);
              })
              .catch((err) => {
                // An error occurred while trying to send the request
                return reject(err);
              });
          };
          // Fetch the first page starts off a chain
          fetchPage(startPage || 1);
        });
      });

    // Step 3: cache the value
    // Only the cache the value if:
    // > we're allowed to (dontCache is falsy)
    // > we didn't use a cached value (don't cache a value that's already saved)
    const cacheThenResolveWithValue = getValue
      .then((value) => {
        // Don't cache if dontCache is truthy or we used a cached value
        if (dontCache || usedCachedValue) {
          // Just pass along the value
          return Promise.resolve(value);
        }

        // Choose which item to store
        const itemToStore = (
          cache.storePromises
            ? getValue
            : value
        );

        // Store the item
        return cache.set(
          path,
          params,
          itemToStore
        )
          .then(() => {
            // On cache success, resolve with value
            return Promise.resolve(value);
          });
      });

    // Step 4: uncache paths
    // If method is 'GET', no need to uncache
    // If method is 'POST', uncache path we hit
    // If method is 'PUT OR DELETE',
    //   uncache path we hit plus parent path
    let uncacheThenResolveWithValue;
    if (!cache || method === 'GET') {
      uncacheThenResolveWithValue = cacheThenResolveWithValue;
    } else if (method === 'POST') {
      // Uncache the path we hit
      uncacheThenResolveWithValue = cacheThenResolveWithValue
        .then((value) => {
          const pathsToUncache = [path];
          // Uncache the item (in case it was already there)
          // > Items with ids
          if (value && value.id) {
            pathsToUncache.push(`${path}/${value.id}`);
          }
          // > Pages
          if (value && value.url) {
            pathsToUncache.push(`${path}/${value.url}`);
          }
          return uncache(pathsToUncache, value);
        });
    } else {
      // Uncache path we hit plus the parent path
      // Add path we hit
      const pathsToUncache = [`${path}*`];
      // Add parent path (if possible)
      const parentPath = pathLib.join(path, '..');
      if (!parentPath.startsWith('..')) {
        pathsToUncache.push(parentPath);
      }
      // Uncache
      uncacheThenResolveWithValue = cacheThenResolveWithValue
        .then((value) => {
          return uncache(pathsToUncache, value);
        });
    }

    return uncacheThenResolveWithValue;
  };
};
