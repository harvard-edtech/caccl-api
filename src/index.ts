// Import shared types
import APIConfig from './shared/types/APIConfig';
import API from './types/API';

// Import shared helpers
import genVisitEndpoint from './shared/genVisitEndpoint';
import Account from './endpoints/Account';
import InitPack from './shared/types/InitPack';

/**
 * Initialize api
 * @author Gabe Abrams
 * @param [defaults] object containing all arguments
 * @param [defaults.numRetries=3] default number of retries per request
 * @param [defaults.itemsPerPage=100] default number of items to request
 *   per page
 * @param [defaults.canvasHost=canvas.instructure.com] default hostname of
 *   the Canvas instance to interact with
 * @param [defaults.pathPrefix] default path prefix to prepend to all
 *   requests
 * @param [defaults.accessToken] default access token to add to all
 *   requests
 * @param [defaults.authenticityToken] default authenticity token to
 *   add to all requests no matter what
 */
const initAPI = (defaults: APIConfig) => {
  // Initialize defaults
  const processedDefaults = {
    numRetries: (defaults.numRetries || 3),
    itemsPerPage: (defaults.itemsPerPage || 100),
    canvasHost: (defaults.canvasHost || 'canvas.instructure.com'),
    pathPrefix: (defaults.pathPrefix || ''),
    accessToken: (defaults.accessToken || undefined),
    authenticityToken: (defaults.authenticityToken || undefined),
  };

  // Generate a visitEndpoint function
  const visitEndpoint = genVisitEndpoint(processedDefaults);

  // Create a new API instance
  const api: API = ({} as API);

  // Create a pack of info that's used to initialize each endpoint category
  const initPack: InitPack = {
    visitEndpoint,
    api,
  };

  // Initialize and add endpoint categories
  api.account = new Account(initPack);

  // Return api instance
  return api;
};

export default initAPI;