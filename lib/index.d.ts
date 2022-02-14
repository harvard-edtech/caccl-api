import APIConfig from './shared/types/APIConfig';
import API from './types/API';
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
declare const initAPI: (defaults: APIConfig) => API;
export default initAPI;
