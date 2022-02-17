"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import built-in libs
var path_1 = __importDefault(require("path"));
// Import libs
var parse_link_header_1 = __importDefault(require("parse-link-header"));
var fast_clone_1 = __importDefault(require("fast-clone"));
// Import CACCL libs
var caccl_send_request_1 = __importDefault(require("caccl-send-request"));
var caccl_error_1 = __importDefault(require("caccl-error"));
var ErrorCode_1 = __importDefault(require("../types/ErrorCode"));
// Import helpers
var interpretCanvasError_1 = __importDefault(require("./interpretCanvasError"));
var removeUndefinedValues_1 = __importDefault(require("./removeUndefinedValues"));
/**
 * Generate a visitEndpoint function
 * @param defaults defaults to use when visiting endpoints
 * @returns visitEndpoint function
 */
var genVisitEndpoint = function (defaults) {
    /**
     * Visit a Canvas endpoint
     * @author Gabe Abrams
     * @param opts visit endpoint arguments (see shared type)
     * @returns response from Canvas
     */
    var visitEndpoint = function (opts) { return __awaiter(void 0, void 0, void 0, function () {
        var path, _a, config, _b, method, _c, action, _d, params, pagePostProcessor, updatedParams, canvasHost, numRetries, maxPages, pathPrefix, onNewPage, fetchPage, pages, getNextPage, nextPageNumber, _e, page, anotherPageExists, allowedToFetchAnotherPage, allData;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    path = opts.path, _a = opts.config, config = _a === void 0 ? {} : _a, _b = opts.method, method = _b === void 0 ? 'GET' : _b, _c = opts.action, action = _c === void 0 ? 'interact with Canvas' : _c, _d = opts.params, params = _d === void 0 ? {} : _d, pagePostProcessor = opts.pagePostProcessor;
                    updatedParams = (0, removeUndefinedValues_1.default)(__assign(__assign({}, params), { 
                        // Canvas access token
                        access_token: (params.accessToken
                            || params.access_token
                            || config.accessToken
                            || defaults.accessToken), 
                        // Authenticity token
                        authenticity_token: (params.authenticityToken
                            || params.authenticity_token
                            || config.authenticityToken
                            || defaults.authenticityToken), 
                        // Items per page
                        per_page: (method === 'GET'
                            ? (params.per_page
                                || params.perPage
                                || config.itemsPerPage
                                || defaults.itemsPerPage)
                            : undefined) }));
                    canvasHost = (config.canvasHost || defaults.canvasHost);
                    numRetries = (config.numRetries || defaults.numRetries);
                    maxPages = (config.maxPages || defaults.maxPages);
                    pathPrefix = (config.pathPrefix || defaults.pathPrefix || '');
                    onNewPage = config.onNewPage;
                    fetchPage = function (pageNumber) { return __awaiter(void 0, void 0, void 0, function () {
                        var pageParams, response, errors_1, parsed, parsedBody, canvasError, page, anotherPageExists, link, parsedLinkHeader, nextPageURL, host, nextPagePath, err_1, newError, newUmbrella, currUmbrella, parts;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    pageParams = (0, fast_clone_1.default)(updatedParams);
                                    if (pageNumber > 1) {
                                        pageParams.page = pageNumber;
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, (0, caccl_send_request_1.default)({
                                            method: method,
                                            numRetries: numRetries,
                                            params: pageParams,
                                            path: path_1.default.join(pathPrefix, path),
                                            host: canvasHost,
                                            // Ignore self-signed certificate if host is simulated Canvas
                                            ignoreSSLIssues: (canvasHost === 'localhost:8088'),
                                        })];
                                case 2:
                                    response = _a.sent();
                                    /*----------------------------------------*/
                                    /*         Handle request failures        */
                                    /*----------------------------------------*/
                                    // 404 - endpoint not found
                                    if (response.status === 404) {
                                        throw new caccl_error_1.default({
                                            message: "The endpoint ".concat((canvasHost ? 'https://' + canvasHost : '')).concat(path, " does not exist: Canvas responded with a 404 message. Please check your endpoint path."),
                                            code: ErrorCode_1.default.NotFound,
                                        });
                                    }
                                    // 400 - Invalid syntax
                                    if (response.status === 400) {
                                        // Terms only in root accounts
                                        if (response.body.message
                                            && response.body.message.includes('Terms only belong to root_accounts')) {
                                            throw new caccl_error_1.default({
                                                message: 'We could not look up the list of terms because terms only belong to root accounts and this is not a root account.',
                                                code: ErrorCode_1.default.TermsOnlyInRootAccounts,
                                            });
                                        }
                                        // Invalid tab location
                                        if (response.body.error && response.body.error === 'That tab location is invalid') {
                                            throw new caccl_error_1.default({
                                                message: 'The requested tab location is invalid.',
                                                code: ErrorCode_1.default.InvalidTabLocation,
                                            });
                                        }
                                        try {
                                            parsed = JSON.parse(response.body);
                                            (parsed.errors || [parsed.message]).forEach(function (err) {
                                                if (!errors_1) {
                                                    errors_1 = '';
                                                }
                                                else {
                                                    errors_1 += ', ';
                                                }
                                                errors_1 += String(err).split(':')[0];
                                            });
                                            errors_1 += '.';
                                        }
                                        catch (err) {
                                            errors_1 = 'unknown (could not parse Canvas response)';
                                        }
                                        // Reject with our generated error
                                        throw new caccl_error_1.default({
                                            message: "The endpoint https://".concat(canvasHost).concat(path, " or params are invalid. Canvas responded with a 400 message (invalid syntax): ").concat(errors_1),
                                            code: ErrorCode_1.default.InvalidSyntax,
                                        });
                                    }
                                    parsedBody = void 0;
                                    if (response.body && typeof response.body !== 'string') {
                                        // Body isn't a string. Assume it's already parsed
                                        parsedBody = response.body;
                                    }
                                    else {
                                        // Attempt to parse body
                                        try {
                                            parsedBody = JSON.parse(response.body);
                                        }
                                        catch (err) {
                                            throw new caccl_error_1.default({
                                                message: 'We couldn\'t understand Canvas\'s response because it was malformed. Please contact an admin if this continues to occur.',
                                                code: ErrorCode_1.default.Malformed,
                                            });
                                        }
                                    }
                                    canvasError = (0, interpretCanvasError_1.default)(parsedBody, response.status);
                                    if (canvasError) {
                                        // We got an error. Reject!
                                        throw canvasError;
                                    }
                                    // Post-process the body
                                    if (pagePostProcessor) {
                                        parsedBody = pagePostProcessor(parsedBody, pageNumber);
                                    }
                                    page = parsedBody;
                                    // Send notifications
                                    if (onNewPage) {
                                        onNewPage(parsedBody, pageNumber);
                                    }
                                    anotherPageExists = void 0;
                                    try {
                                        link = response.headers.link;
                                        parsedLinkHeader = (0, parse_link_header_1.default)(link);
                                        nextPageURL = parsedLinkHeader.next.url;
                                        host = nextPageURL.split('/')[2];
                                        nextPagePath = nextPageURL.split(host)[1];
                                        anotherPageExists = (nextPageURL && nextPageURL.trim().length > 0);
                                    }
                                    catch (err) {
                                        anotherPageExists = false;
                                    }
                                    // Return data
                                    return [2 /*return*/, {
                                            page: page,
                                            anotherPageExists: anotherPageExists,
                                        }];
                                case 3:
                                    err_1 = _a.sent();
                                    newError = err_1;
                                    if (!err_1.isCACCLError) {
                                        newError = new caccl_error_1.default(err_1);
                                        newError.code = ErrorCode_1.default.UnnamedEndpointError;
                                    }
                                    // Add on action to the error
                                    if (newError.message.startsWith('While attempting to ')) {
                                        newUmbrella = " (in order to ".concat(action, ")");
                                        currUmbrella = newError.message.match(/\(in order to .*\)/g);
                                        if (currUmbrella && currUmbrella.length > 0) {
                                            // Another umbrella action already exists. Replace it
                                            newError.message = newError.message.replace(currUmbrella[0], newUmbrella);
                                        }
                                        else {
                                            parts = newError.message.split(',');
                                            parts[0] += newUmbrella;
                                            newError.message = parts.join(',');
                                        }
                                    }
                                    else {
                                        newError.message = "While attempting to ".concat(action, ", we ran into an error: ").concat((err_1.message || 'unknown'));
                                    }
                                    throw newError;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); };
                    pages = [];
                    getNextPage = true;
                    nextPageNumber = 1;
                    _f.label = 1;
                case 1:
                    if (!getNextPage) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetchPage(nextPageNumber)
                        // Add the page to the list
                    ];
                case 2:
                    _e = _f.sent(), page = _e.page, anotherPageExists = _e.anotherPageExists;
                    // Add the page to the list
                    pages.push(page);
                    allowedToFetchAnotherPage = (!maxPages || pages.length < maxPages);
                    if (anotherPageExists && allowedToFetchAnotherPage) {
                        // Getting next page
                        nextPageNumber += 1;
                    }
                    else {
                        // Not getting next page
                        getNextPage = false;
                    }
                    return [3 /*break*/, 1];
                case 3:
                    allData = (pages.length === 1
                        ? pages[0]
                        : [].concat.apply([], pages));
                    return [2 /*return*/, allData];
            }
        });
    }); };
    return visitEndpoint;
};
exports.default = genVisitEndpoint;
//# sourceMappingURL=index.js.map