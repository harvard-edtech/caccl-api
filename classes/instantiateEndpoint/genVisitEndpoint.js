const parseLinkHeader = require('parse-link-header');
const pathLib = require('path');
const defaultSendRequest = require('caccl-send-request');
const CACCLError = require('caccl-error');
const sleep = require('util').promisify(setTimeout);

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
 * @param {function} [sendRequest=caccl-send-request instance] - a custom
 *   function that sends https requests (we recommend not including this)
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
  } = config;

  // Set up sendRequest
  const sendRequest = (config.sendRequest || defaultSendRequest);

  // Return the visitEndpoint function
  return (requestInfo = {}) => {
    /* ----------------- Extract request information ---------------- */
    const method = (requestInfo.method || 'GET');
    const params = requestInfo.params || {};
    const { path } = requestInfo;

    /* --------------------- Apply Caching Logic -------------------- */
    // dontCache - if truthy, does not cache the final result (must be true if
    //   no cache included or method is not 'GET')
    const dontCache = (
      !cache
      || config.dontCache
      || method !== 'GET'
    );
    // ignoreCache - if truthy, does not look up cached value before sending
    //   request (must be true if no cache included or method is not 'GET')
    const ignoreCache = (
      !cache
      || config.ignoreCache
      || method !== 'GET'
    );

    // Check if we are caching a Promise
    const cachePromise = (
      cache
      && !dontCache
      && (cache.storePromises)
    );

    /* ---------------- Check Cache and Run Endpoint ---------------- */

    // Steps:
    // 1. Acquire lock (if cache has acquireLock function)
    // 2. Check for cached value and return it (if ignoreCache is false)
    // Only occurs if there is a cached value:
    // 2b. Release lock (if cache has releaseLock function)
    // 2c. Resolve with cached value (convert to Promise no matter what)
    // Only occurs if there is no cached value:
    // 3. Save promise to cache (if we are caching promises)
    // 4. Release lock (if cache has releaseLock function)
    // 5. Fetch data from Canvas, detect errors, parse response
    // 6. Cache the value
    // 7. Auto-uncache
    // 8. Resolve with value

    let promiseChain = Promise.resolve();

    // Step 1: Acquire lock
    if (cache && cache.acquireLock) {
      promiseChain = promiseChain.then(() => {
        return cache.acquireLock(path, params);
      });
    }

    // Step 2: Check for cached value...
    if (!ignoreCache) {
      promiseChain = promiseChain
        .then(() => {
          return cache.get(path, params);
        });
    } else {
      promiseChain = promiseChain.then(() => {
        // Cached value is null (not looking up in cache)
        return Promise.resolve(null);
      });
    }

    // ...return cached value if we have one
    promiseChain = promiseChain
      .then((cachedValue) => {
        if (cachedValue) {
          // There is a cached value
          let releaseLockPromise = Promise.resolve();

          // Step 2b: Release lock
          if (cache.releaseLock) {
            releaseLockPromise = cache.releaseLock(path, params);
          }

          // Return value
          return releaseLockPromise.then(() => {
            return Promise.resolve(cachedValue);
          });
        }

        // There is no cached value. Continue to step 3
        // Now, add this second chain of promises to a new variable
        let innerPromiseChain = Promise.resolve();

        // Step 3: Save Promise to cache
        if (cachePromise) {
          innerPromiseChain = innerPromiseChain.then(() => {
            return cache.set(path, params, innerPromiseChain);
          });
        }

        // Step 4: Release lock
        if (cache && cache.releaseLock) {
          innerPromiseChain = innerPromiseChain.then(() => {
            return cache.releaseLock(path, params);
          });
        }

        // Step 5: Fetch data from Canvas, detect errors, parse response
        // > Pre-process the request params
        const preProcessedParams = preProcessParams({
          method,
          params,
          itemsPerPage,
          accessToken,
        });

        // > Fetch value from Canvas
        innerPromiseChain = innerPromiseChain.then(() => {
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

                  // Throttled
                  if (
                    response.status === 403
                    && response.body === '403 Forbidden (Rate Limit Exceeded)\n'
                  ) {
                    // Throttling occurred! Retry the request in 0.1s
                    return sleep(() => {
                      fetchPage(pageNumber);
                    }, 100);
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

                  // Page is valid. Save it
                  pages.push(parsedBody);

                  // Check for next page
                  let nextPagePath;
                  try {
                    const { link } = response.headers;
                    const parsedLinkHeader = parseLinkHeader(link);
                    const nextPageURL = parsedLinkHeader.next.url;
                    nextPagePath = nextPageURL.split(canvasHost)[1];
                  } catch (err) {
                    nextPagePath = null;
                  }

                  // Check if we're allowed to fetch another page
                  const allowedToFetchAnotherPage = (
                    !maxPages
                    || pages.length < maxPages
                  );

                  // Fetch next page if we're allowed to & we have a next page
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

        // Step 6: Cache the value
        if (!dontCache) {
          // Store the value in the cache
          innerPromiseChain = innerPromiseChain.then((value) => {
            return cache.set(path, params, value).then(() => {
              // Pass the value on to the next step
              return Promise.resolve(value);
            });
          });
        }

        // Step 7: Auto-uncache
        // If method is 'POST', uncache path we hit
        // If method is 'PUT OR DELETE',
        //   uncache path we hit plus parent path
        if (cache && method === 'POST') {
          innerPromiseChain = innerPromiseChain.then((value) => {
            // Uncache the path we hit
            const pathsToUncache = [path];
            // Uncache the item (in case it was already there)
            // > Item with an id
            if (value && value.id) {
              pathsToUncache.push(`${path}/${value.id}`);
            }
            // > Item with url (Canvas pages)
            if (value && value.url) {
              pathsToUncache.push(`${path}/${value.url}`);
            }
            // Uncache everything then resolve with the value
            return uncache(pathsToUncache, value);
          });
        } else if (cache && method !== 'GET') {
          innerPromiseChain = innerPromiseChain.then((value) => {
            // Uncache the path we hit plus the parent path
            const pathsToUncache = [`${path}*`];
            // Add parent path (if possible)
            const parentPath = pathLib.join(path, '..');
            if (!parentPath.startsWith('..')) {
              // We can add the parent path. Add it!
              pathsToUncache.push(parentPath);
            }
            // Uncache everything then resolve with the value
            return uncache(pathsToUncache, value);
          });
        }

        // Step 8: Resolve with value
        return innerPromiseChain;
      });

    return promiseChain;
  };
};
