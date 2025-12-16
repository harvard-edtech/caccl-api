// Import clone
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
    const canvasHost = (config.canvasHost ?? defaults.canvasHost);
    const numRetries = (config.numRetries ?? defaults.numRetries);
    const maxPages = (config.maxPages ?? defaults.maxPages);
    const pathPrefix = (config.pathPrefix ?? defaults.pathPrefix ?? '');
    const { onNewPage } = config;

    /*----------------------------------------*/
    /*               Fetch Pages              */
    /*----------------------------------------*/

    /**
     * Helper to fetch one page from Canvas
     * @author Gabe Abrams
     * @param pageNumber the number of the page being fetched (1-indexed)
     * @param pageBookmark the bookmark for the next page (if applicable)
     * @returns { page, nextPageBookmark }
     */
    const fetchPage = async (
      pageNumber: number,
      pageBookmark?: string,
    ): Promise<(
      | {
        page: any;
        nextPageNumber: undefined,
        nextPageBookmark: undefined,
      }
      | {
        page: any,
        nextPageNumber: number,
        nextPageBookmark: string,
      }
      )> => {
      // Add page bookmark if there is one
      let updatedParamsWithBookmark = updatedParams;
      if (pageBookmark) {
        // Clone params to avoid mutating original
        updatedParamsWithBookmark = clone(updatedParams);
        updatedParamsWithBookmark.page = `bookmark:${pageBookmark}`;
      }

      // Send the request
      try {
        const response = await sendRequest({
          method,
          numRetries,
          params: updatedParamsWithBookmark,
          path: `${pathPrefix}${path}`,
          host: canvasHost,
        });

        /*----------------------------------------*/
        /*         Handle request failures        */
        /*----------------------------------------*/

        // 404 - endpoint not found
        if (response.status === 404) {
          throw new CACCLError({
            message: `The endpoint ${(canvasHost ? `https://${canvasHost}` : '')}${path} does not exist: Canvas responded with a 404 message. Please check your endpoint path.`,
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
        let parsedBody: any;
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
        let nextPageBookmark: string | undefined;
        try {
          const { link } = response.headers;
          // Go through all links and see if there's a next page
          // Example:
          // <https://canvas.harvard.edu/api/v1/courses/53450/users?page=bookmark:Acnbawijeflksdifhadnfkie>; rel="next",
          // <https://canvas.harvard.edu/api/v1/courses/53450/users?page=bookmark:fbjsodifgoirughudhfiuahs>; rel="first",
          // <https://canvas.harvard.edu/api/v1/courses/53450/users?page=bookmark:vgsdgfyweHDFShiudfhiause>; rel="last",
          const links = String(link ?? '').split(',');
          const nextPageLink = links.find((linkPart) => {
            return (
              // This is the "next" link
              linkPart
                .toLowerCase()
                .trim()
                .endsWith('rel="next"')
              // The link exists
              && linkPart.split(';')[0].length > 2
            );
          });

          // Extract next page bookmark if it exists
          if (nextPageLink) {
            // Get URL from link
            const urlPart = nextPageLink.split(';')[0].trim();
            const url = urlPart.substring(1, urlPart.length - 1); // Remove < and >

            // Parse URL
            const urlObj = new URL(url);
            const urlParams = urlObj.searchParams;

            // Get bookmark
            nextPageBookmark = urlParams.get('page')?.replace('bookmark:', '') || undefined;
          }
        } catch (err) {
          nextPageBookmark = undefined;
        }

        // Return data
        if (!nextPageBookmark) {
          return {
            page,
            nextPageNumber: undefined,
            nextPageBookmark: undefined,
          };
        }

        // Return data with page info
        return {
          page,
          nextPageNumber: (pageNumber || 1) + 1,
          nextPageBookmark,
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
              newUmbrella,
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
    let nextPageNumber = 1;
    let nextPageBookmark: string | undefined;
    while (nextPageNumber === 1 || nextPageBookmark) {
      // Fetch the page
      const pageResults = await fetchPage(
        nextPageNumber,
        nextPageBookmark,
      );

      // Extract the page
      const { page } = pageResults;

      // Add the page to the list
      pages.push(page);

      // Prepare for next page
      const allowedToFetchAnotherPage = (!maxPages || pages.length < maxPages);
      const anotherPageExists = !!pageResults.nextPageBookmark;
      if (anotherPageExists && allowedToFetchAnotherPage) {
        // Getting next page
        nextPageNumber = pageResults.nextPageNumber;
        nextPageBookmark = pageResults.nextPageBookmark;
      } else {
        // Not getting next page
        nextPageBookmark = undefined;
        nextPageNumber = undefined;
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
