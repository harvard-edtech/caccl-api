// Import built-in libs
import pathLib from 'path';

// Import libs
import parseLinkHeader from 'parse-link-header';
import clone from 'fast-clone';

// Import CACCL libs
import sendRequest from 'caccl-send-request';
import CACCLError from 'caccl-error';

// Import shared types
import SharedArgs from '../types/APIConfig';
import ErrorCode from '../types/ErrorCode';

// Import helpers
import interpretCanvasError from './interpretCanvasError';
import VisitEndpointFunc from '../types/VisitEndpointFunc';
import removeUndefinedValues from './removeUndefinedValues';

/**
 * Generate a visitEndpoint function
 * @param defaults defaults to use when visiting endpoints
 * @returns visitEndpoint function
 */
const genVisitEndpoint = (defaults: SharedArgs) => {
  /**
   * Visit a Canvas endpoint
   * @author Gabe Abrams
   * @param opts visit endpoint arguments (see shared type)
   * @returns response from Canvas
   */
  const visitEndpoint: VisitEndpointFunc = async (opts) => {
    /*----------------------------------------*/
    /*            Destructure Args            */
    /*----------------------------------------*/

    const {
      path,
      config = {},
      method = 'GET',
      action = 'interact with Canvas',
      params = {},
      pagePostProcessor,
    } = opts;

    /*----------------------------------------*/
    /*            Determine Config            */
    /*----------------------------------------*/

    // Create params
    const updatedParams: { [k: string]: any } = removeUndefinedValues({
      ...params,
      // Canvas access token
      access_token: (
        params.accessToken
        || params.access_token
        || config.accessToken
        || defaults.accessToken
      ),
      // Authenticity token
      authenticity_token: (
        params.authenticityToken
        || params.authenticity_token
        || config.authenticityToken
        || defaults.authenticityToken
      ),
      // Items per page
      per_page: (
        method === 'GET'
          ? (
            params.per_page
            || params.perPage
            || config.itemsPerPage
            || defaults.itemsPerPage
          )
          : undefined
      ),
    });

    // Get settings
    const canvasHost = (config.canvasHost || defaults.canvasHost);
    const numRetries = (config.numRetries || defaults.numRetries);
    const maxPages = (config.maxPages || defaults.maxPages);
    const pathPrefix = (config.pathPrefix || defaults.pathPrefix || '');
    const { onNewPage } = config;

    /*----------------------------------------*/
    /*               Fetch Pages              */
    /*----------------------------------------*/

    /**
     * Helper to fetch one page from Canvas
     * @author Gabe Abrams
     * @param pageNumber the number of the page to fetch
     * @returns { page, anotherPageExists }
     */
    const fetchPage = async (
      pageNumber: number,
    ): Promise<{
      page: any,
      anotherPageExists: boolean,
    }> => {
      // Add the page number to the request (if applicable)
      const pageParams = clone(updatedParams);
      if (pageNumber > 1) {
        pageParams.page = pageNumber;
      }

      // Send the request
      try {
        // Send request
        const response = await sendRequest({
          method,
          numRetries,
          params: pageParams,
          path: pathLib.join(pathPrefix, path),
          host: canvasHost,
          // Ignore self-signed certificate if host is simulated Canvas
          ignoreSSLIssues: (canvasHost === 'localhost:8088'),
        });

        /*----------------------------------------*/
        /*         Handle request failures        */
        /*----------------------------------------*/

        // 404 - endpoint not found
        if (response.status === 404) {
          throw new CACCLError({
            message: `The endpoint ${(canvasHost ? 'https://' + canvasHost : '')}${path} does not exist: Canvas responded with a 404 message. Please check your endpoint path.`,
            code: ErrorCode.NotFound,
          });
        }

        // 400 - Invalid syntax
        if (response.status === 400) {
          // Terms only in root accounts
          if (
            response.body.message
            && response.body.message.includes('Terms only belong to root_accounts')
          ) {
            throw new CACCLError({
              message: 'We could not look up the list of terms because terms only belong to root accounts and this is not a root account.',
              code: ErrorCode.TermsOnlyInRootAccounts,
            });
          }

          // Invalid tab location
          if (response.body.error && response.body.error === 'That tab location is invalid') {
            throw new CACCLError({
              message: 'The requested tab location is invalid.',
              code: ErrorCode.InvalidTabLocation,
            });
          }

          // Compile errors into string
          let errors: (undefined | string);
          try {
            const parsed = JSON.parse(response.body);
            (parsed.errors || [parsed.message]).forEach((err: any) => {
              if (!errors) {
                errors = '';
              } else {
                errors += ', ';
              }
              errors += String(err).split(':')[0];
            });
            errors += '.';
          } catch (err) {
            errors = 'unknown (could not parse Canvas response)';
          }
          // Reject with our generated error
          throw new CACCLError({
            message: `The endpoint https://${canvasHost}${path} or params are invalid. Canvas responded with a 400 message (invalid syntax): ${errors}`,
            code: ErrorCode.InvalidSyntax,
          });
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
            throw new CACCLError({
              message: 'We couldn\'t understand Canvas\'s response because it was malformed. Please contact an admin if this continues to occur.',
              code: ErrorCode.Malformed,
            });
          }
        }

        // Check for a Canvas error
        const canvasError = interpretCanvasError(parsedBody, response.status);
        if (canvasError) {
          // We got an error. Reject!
          throw canvasError;
        }

        // Post-process the body
        if (pagePostProcessor) {
          parsedBody = pagePostProcessor(parsedBody, pageNumber);
        }

        // Page is valid!
        const page = parsedBody;

        // Send notifications
        if (onNewPage) {
          onNewPage(parsedBody, pageNumber);
        }

        // Check for next page
        let anotherPageExists: boolean;
        try {
          const { link } = response.headers;
          const parsedLinkHeader = parseLinkHeader(link);
          const nextPageURL = parsedLinkHeader.next.url;
          const host = nextPageURL.split('/')[2];
          const nextPagePath = nextPageURL.split(host)[1];
          anotherPageExists = (nextPageURL && nextPageURL.trim().length > 0);
        } catch (err) {
          anotherPageExists = false;
        }

        // Return data
        return {
          page,
          anotherPageExists,
        };
      } catch (err) {
        // Turn into CACCLError if not already
        let newError = err;
        if (!err.isCACCLError) {
          newError = new CACCLError(err);
          newError.code = ErrorCode.UnnamedEndpointError;
        }
    
        // Add on action to the error
        if (newError.message.startsWith('While attempting to ')) {
          // There's already an action. Add an umbrella action
          const newUmbrella = ` (in order to ${action})`;

          // Check to see if an umbrella action has already been added
          const currUmbrella = newError.message.match(/\(in order to .*\)/g);
          if (currUmbrella && currUmbrella.length > 0) {
            // Another umbrella action already exists. Replace it
            newError.message = newError.message.replace(
              currUmbrella[0],
              newUmbrella
            );
          } else {
            const parts = newError.message.split(',');
            parts[0] += newUmbrella;
            newError.message = parts.join(',');
          }
        } else {
          newError.message = `While attempting to ${action}, we ran into an error: ${(err.message || 'unknown')}`;
        }

        throw newError;
      }
    };

    // Iteratively get pages
    const pages: any[] = [];
    let getNextPage: boolean = true;
    let nextPageNumber = 1;
    while (getNextPage) {
      // Fetch the page
      const {
        page,
        anotherPageExists,
      } = await fetchPage(nextPageNumber)

      // Add the page to the list
      pages.push(page);

      // Prepare for next page
      const allowedToFetchAnotherPage = (!maxPages || pages.length < maxPages);
      if (anotherPageExists && allowedToFetchAnotherPage) {
        // Getting next page
        nextPageNumber += 1;
      } else {
        // Not getting next page
        getNextPage = false;
      }
    }

    // We don't need to fetch any more pages. Wrap up.
    // Concatenate pages if necessary
    const allData = (
      pages.length === 1
        ? pages[0]
        : [].concat(...pages)
    );

    return allData;
  };

  return visitEndpoint;
};

export default genVisitEndpoint;
