// Import shared types
import APIConfig from './shared/types/APIConfig';
import API from './types/API';

// Import shared helpers
import genVisitEndpoint from './shared/genVisitEndpoint';
import Account from './endpoints/Account';
import InitPack from './shared/types/InitPack';
import Conversation from './endpoints/Conversation';
import Course from './endpoints/Course';
import Other from './endpoints/Other';
import User from './endpoints/User';

/**
 * Initialize api
 * @author Gabe Abrams
 * @param [opts] object containing all defaults
 * @param [opts.numRetries=3] default number of retries per request
 * @param [opts.itemsPerPage=100] default number of items to request
 *   per page
 * @param [opts.canvasHost=canvas.instructure.com] default hostname of
 *   the Canvas instance to interact with
 * @param [opts.pathPrefix] default path prefix to prepend to all
 *   requests
 * @param [opts.accessToken] default access token to add to all
 *   requests
 * @param [opts.authenticityToken] default authenticity token to
 *   add to all requests no matter what
 */
const initAPI = (
  opts: {
    numRetries?: number
    itemsPerPage?: number,
    canvasHost?: string,
    pathPrefix?: string,
    accessToken?: string,
    authenticityToken?: string,
  } = {},
) => {
  // Initialize defaults
  const processedDefaults: APIConfig = {
    numRetries: (opts.numRetries || 3),
    itemsPerPage: (opts.itemsPerPage || 100),
    canvasHost: (opts.canvasHost || 'canvas.instructure.com'),
    pathPrefix: (opts.pathPrefix || ''),
    accessToken: (opts.accessToken || undefined),
    authenticityToken: (opts.authenticityToken || undefined),
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
  api.conversation = new Conversation(initPack);
  api.course = new Course(initPack);
  api.other = new Other(initPack);
  api.user = new User(initPack);

  // Return api instance
  return api;
};

export default initAPI;