"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared helpers
var genVisitEndpoint_1 = __importDefault(require("./shared/genVisitEndpoint"));
var Account_1 = __importDefault(require("./endpoints/Account"));
var Conversation_1 = __importDefault(require("./endpoints/Conversation"));
var Course_1 = __importDefault(require("./endpoints/Course"));
var Other_1 = __importDefault(require("./endpoints/Other"));
var User_1 = __importDefault(require("./endpoints/User"));
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
var initAPI = function (opts) {
    if (opts === void 0) { opts = {}; }
    // Initialize defaults
    var processedDefaults = {
        numRetries: (opts.numRetries || 3),
        itemsPerPage: (opts.itemsPerPage || 100),
        canvasHost: (opts.canvasHost || 'canvas.instructure.com'),
        pathPrefix: (opts.pathPrefix || ''),
        accessToken: (opts.accessToken || undefined),
        authenticityToken: (opts.authenticityToken || undefined),
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
    api.conversation = new Conversation_1.default(initPack);
    api.course = new Course_1.default(initPack);
    api.other = new Other_1.default(initPack);
    api.user = new User_1.default(initPack);
    // Return api instance
    return api;
};
exports.default = initAPI;
//# sourceMappingURL=index.js.map