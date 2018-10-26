/**
 * Function that generates a function that visits a Canvas endpoint and returns
 *   Canvas' response
 * @module classes/request/genVisitEndpoint
 * @see module: classes/request/genVisitEndpoint
 */

const CACCLError = require('../../../caccl-error/index.js'); // TODO: use actual library
const errorCodes = require('../../errorCodes.js');
const defaultSendRequest = require('./helpers/defaultSendRequest.js');
const interpretCanvasError = require('./helpers/interpretCanvasError.js');
const preProcessParams = require('./helpers/preProcessParams.js');

/**
 * Generates a function that visits a Canvas endpoint and returns Canvas'
 *   response
 * @param {object} [config.defaults={}] - The set of defaults to apply to the
 *   params. Each default can be overridden by including the same option in the
 *   options object passed to visitEndpoint
 * @param {number} [config.defaults.itemsPerPage=100] - The default number of
 *   items to include on each page
 * @param {number} [config.defaults.numRetries=3] - The default number of times
 *   to retry failed requests
 * @param {string} [config.defaults.host=canvas.instructure.com] - The default
 *   hostname to send requests to
 * @param {string} [config.defaults.apiPathPrefix=null] - The default prefix to
 *   prepend to every path sent to the visitEndpoint function
 * @param {function} [config.sendRequest=defaultSendRequest] - A function that
 *   sends a network request. Defaults to
 *   classes/request/helpers/defaultSendRequest
 * @param {string} [config.accessToken=null] - An access token to add to every
 *   request
 * @return {function} function that visits a Canvas endpoint and returns Canvas'
 *   response
 */
module.exports = (config = {}) => {
  // Initialize defaults if excluded
  const defaults = config.defaults || {};

  // Initialize sendRequest if not included
  const sendRequest = config.sendRequest || defaultSendRequest;

  /**
   * Visits a Canvas endpoint and returns Canvas' response
   * @param {string} options.path - The path of the endpoint to visit
   * @param {boolean} [options.dontParse=false] - If truthy, does not attempt to
   *   JSON.parse Canvas' response
   * @param {string} [config.accessToken=default accessToken] - An access token
   *   to add to the request
   * @param {string} [options.method=GET] - The http method to use
   * @param {string} [options.maxPages=unlimited] - The max number of pages
   *   to fetch
   * @param {number} [options.itemsPerPage=default itemsPerPage] - The
   *   number of items to include on each page
   * @param {number} [options.numRetries=default numRetries] - The
   *   number of times to retry failed requests
   * @param {string} [options.host=default host] - The hostname to send
   *   the request to
   * @param {string} [options.apiPathPrefix=default apiPathPrefix] - The
   *   prefix to prepend to the path
   * @return {function} function that visits a Canvas endpoint and returns
   *   Canvas' response
   */
  return (options) => {
    // Immediately return a promise that resolves with endpoint response
    return new Promise((resolve, reject) => {
      // Extract options, set defaults
      const { path, dontParse } = options;
      const method = options.method || 'GET';
      const numRetries = (
        options.numRetries
        || defaults.numRetries
      );
      const apiPathPrefix = (
        options.apiPathPrefix
        || defaults.apiPathPrefix
        || ''
      );
      const { maxPages } = options; // Fetch all pages if 0/null/undefined
      const host = (
        options.host
        || defaults.host
        || 'canvas.instructure.com'
      );

      const params = preProcessParams({
        options,
        itemsPerPage: defaults.itemsPerPage,
        accessToken: config.accessToken || options.accessToken,
      });

      // Fetch all pages
      const pages = [];
      function fetchNextPage(pagePath) {
        const requestOptions = {
          host,
          params,
          method,
          numRetries,
          path: apiPathPrefix + pagePath,
        };
        sendRequest(requestOptions).then((response) => {
          // Check if API call failed
          if (response.status === 404) {
            // No API endpoint
            return reject(new CACCLError({
              message: `The endpoint https://${host}${pagePath} does not exist: Canvas responded with a 404 message. Please check your endpoint path.`,
              code: errorCodes.notfound,
            }));
          }

          // Invalid syntax
          if (response.status === 400) {
            // Invalid API syntax

            // Compile errors into string
            let errors;
            try {
              JSON.parse(response.body).errors.forEach((err) => {
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

            return reject(new CACCLError({
              message: `The endpoint https://${host}${pagePath} or params are invalid. Canvas responded with a 400 message (invalid syntax): ${errors}`,
              code: errorCodes.invalidSyntax,
            }));
          }

          // Attempt to pre-process data from Canvas
          let canvasData;
          if (dontParse) {
            canvasData = response.body;
          } else {
            try {
              canvasData = JSON.parse(response.body.replace('while(1);', ''));
            } catch (err) {
              return reject(new CACCLError({
                message: 'We couldn\'t understand Canvas\'s response because it was malformed. Please contact an admin if this continues to occur.',
                code: errorCodes.malformed,
              }));
            }
          }

          // Check for error
          const canvasError = interpretCanvasError(
            canvasData,
            response.status
          );
          if (canvasError) {
            // We got an error from Canvas!
            return reject(canvasError);
          }

          // Save page
          pages.push(canvasData);

          // Check for next page
          let nextPagePath;
          if (
            response.headers.link
            && response.headers.link.includes('rel="next"')
          ) {
            const headerParts = response.headers.link.split(',');
            const linkIndex = headerParts.indexOf('rel="next"') + 1;
            if (linkIndex < headerParts.length) {
              // Extract link
              const url = headerParts[linkIndex].split('>')[0].replace('<', '');
              nextPagePath = url.split(host)[1];
            }
          }

          // Fetch next page if we can
          if (
            nextPagePath
            && (maxPages && pages.length < maxPages)
          ) {
            fetchNextPage(nextPagePath);
          } else {
            // We have all the pages. Wrap up!

            // Concatenate pages if necessary
            let allData;
            if (pages.length === 1) {
              [allData] = pages;
            } else {
              // Concatenate all pages to form one response
              allData = [].concat(...pages);
            }

            return resolve(allData);
          }
        });
      }

      // Fetch the first page
      fetchNextPage(path);
    });
  };
};
