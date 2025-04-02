import API from './types/API';
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
 * @param [opts.defaultCourseId] default courseId to add to use if no courseId
 *   is provided to course-specific requests
 */
declare const initAPI: (opts?: {
    numRetries?: number;
    itemsPerPage?: number;
    canvasHost?: string;
    pathPrefix?: string;
    accessToken?: string;
    authenticityToken?: string;
    defaultCourseId?: number;
}) => API;
export default initAPI;
