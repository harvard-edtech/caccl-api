"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared helpers
var genVisitEndpoint_1 = __importDefault(require("./shared/genVisitEndpoint"));
var Account_1 = __importDefault(require("./endpoints/Account"));
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
var initAPI = function (defaults) {
    // Initialize defaults
    var processedDefaults = {
        numRetries: (defaults.numRetries || 3),
        itemsPerPage: (defaults.itemsPerPage || 100),
        canvasHost: (defaults.canvasHost || 'canvas.instructure.com'),
        pathPrefix: (defaults.pathPrefix || ''),
        accessToken: (defaults.accessToken || undefined),
        authenticityToken: (defaults.authenticityToken || undefined),
    };
    // Generate a visitEndpoint function
    var visitEndpoint = (0, genVisitEndpoint_1.default)(processedDefaults);
    // Create a new API instance
    var api = {};
    // Create a pack of info that's used to initialize each endpoint category
    var initPack = {
        visitEndpoint: visitEndpoint,
        api: api,
    };
    // Initialize and add endpoint categories
    api.account = new Account_1.default(initPack);
    // Return api instance
    return api;
};
exports.default = initAPI;
//# sourceMappingURL=index.js.map