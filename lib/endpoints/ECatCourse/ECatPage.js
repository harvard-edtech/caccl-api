"use strict";
/**
 * Functions for interacting with pages within courses
 * @namespace api.course.page
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// Import shared classes
var EndpointCategory_1 = __importDefault(require("../../shared/EndpointCategory"));
// Import shared helpers
var utils_1 = __importDefault(require("../../shared/helpers/utils"));
// Import shared constants
var API_PREFIX_1 = __importDefault(require("../../shared/constants/API_PREFIX"));
// Endpoint category
var ECatPage = /** @class */ (function (_super) {
    __extends(ECatPage, _super);
    function ECatPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                             Page Endpoints                             */
    /*------------------------------------------------------------------------*/
    /**
     * Gets the list of pages in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.page
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasPage[]>} list of Canvas Pages {@link https://canvas.instructure.com/doc/api/pages.html#Page}
     */
    ECatPage.prototype.list = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of pages in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/pages"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Get info on a specific page in a course
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.page
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {string} opts.pageURL Canvas page url (just the last part of
     *   path)
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasPage>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
     */
    ECatPage.prototype.get = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on a specific page in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/pages/").concat(opts.pageURL),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Updates a Canvas page
     * @author Gabe Abrams
     * @method update
     * @memberof api.course.page
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     *   update
     * @param {string} opts.pageURL Canvas page url (just the last part of
     *   path)
     * @param {number} [opts.courseId==default course id] Canvas course ID holding the page to
     * @param {boolean} [opts.notifyOfUpdate] if true, send notification
     * @param {string} [opts.title=current value] New title of the page
     * @param {string} [opts.body=current value] New html body of the page
     * @param {string} [opts.editingRoles=current value] New usertype(s) who
     *   can edit
     * @param {boolean} [opts.published=current value] New publish status of
     *   page
     * @param {boolean} [opts.frontPage=current value] New front page status of
     *   page
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasPage>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
     */
    ECatPage.prototype.update = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update a specific page in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/pages/").concat(opts.pageURL),
                        method: 'PUT',
                        params: {
                            'wiki_page[title]': utils_1.default.includeIfTruthy(opts.title),
                            'wiki_page[body]': utils_1.default.includeIfTruthy(opts.body),
                            'wiki_page[editing_roles]': (utils_1.default.includeIfTruthy(opts.editingRoles)),
                            'wiki_page[notify_of_update]': (utils_1.default.includeIfTruthy(opts.notifyOfUpdate)),
                            'wiki_page[published]': utils_1.default.includeIfBoolean(opts.published),
                            'wiki_page[front_page]': utils_1.default.includeIfBoolean(opts.frontPage),
                        },
                    })];
            });
        });
    };
    /**
     * Creates a new page in a course
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.page
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.title=Untitled Page] The title of the page
     * @param {string} [opts.body=null] html body of the page
     * @param {string} [opts.editingRoles=teachers] usertype(s) who can edit
     * @param {boolean} [opts.notifyOfUpdate] if true, sends notification
     * @param {boolean} [opts.published] if true, publishes page upon
     *   creation
     * @param {boolean} [opts.frontPage] if true, sets page as front page
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasPage>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
     */
    ECatPage.prototype.create = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a new page in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/pages"),
                        method: 'POST',
                        params: {
                            'wiki_page[title]': (opts.title || 'Untitled Page'),
                            'wiki_page[body]': (opts.body || ''),
                            'wiki_page[editing_roles]': (opts.editingRoles || 'teachers'),
                            'wiki_page[notify_of_update]': utils_1.default.isTruthy(opts.notifyOfUpdate),
                            'wiki_page[published]': utils_1.default.isTruthy(opts.published),
                            'wiki_page[front_page]': utils_1.default.isTruthy(opts.frontPage),
                        },
                    })];
            });
        });
    };
    /**
     * Deletes a page from a course
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.page
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {string} opts.pageURL Page url to delete (just last part of path)
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasPage>} Canvas Page {@link https://canvas.instructure.com/doc/api/pages.html#Page}
     */
    ECatPage.prototype.delete = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'delete a page from a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/pages/").concat(opts.pageURL),
                        method: 'DELETE',
                    })];
            });
        });
    };
    return ECatPage;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatPage;
//# sourceMappingURL=ECatPage.js.map