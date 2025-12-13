"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
/**
 * Functions for interacting with course navigation menu items
 * @namespace api.course.navMenuItem
 */
// Import caccl libs
var caccl_error_1 = __importDefault(require("caccl-error"));
// Import shared classes
var EndpointCategory_1 = __importDefault(require("../../shared/EndpointCategory"));
var ErrorCode_1 = __importDefault(require("../../shared/types/ErrorCode"));
// Import shared constants
var API_PREFIX_1 = __importDefault(require("../../shared/constants/API_PREFIX"));
// Endpoint category
var ECatNavMenuItem = /** @class */ (function (_super) {
    __extends(ECatNavMenuItem, _super);
    function ECatNavMenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                            Nav Menu Endpoints                          */
    /*------------------------------------------------------------------------*/
    /**
     * Lists the nav menu items in the course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.navMenuItem
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId] Canvas course Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasTab[]>} list of Canvas Tabs {@link https://canvas.instructure.com/doc/api/tabs.html#method.tabs.index}
     */
    ECatNavMenuItem.prototype.list = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of nav menu items in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/tabs"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Update a nav menu item
     * @author Gabe Abrams
     * @method update
     * @memberof api.course.navMenuItem
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {string} [opts.url] a url string identifying the item
     *   to move to the top of the menu. The url must either be a full url or
     *   a path.
     *   At least one of url, label, or id must
     *   be included. Case insensitive
     * @param {string} [opts.label] a text label identifying the item
     *   to move to the top of the menu. At least one of url, label, or id must
     *   be included. Case insensitive.
     * @param {string} [opts.id] the id of the item to move to the top of
     *   the menu. At least one of url, label, or id must be included. Case
     *   sensitive.
     * @param {boolean} [opts.moveToTop] if true, moves the given nav menu
     *   item as high up in the nav menu as allowed by Canvas. At best, the position
     *   will be set to 2 because position 1 is reserved for the "Home" item.
     * @param {number} [opts.position] the new position of the item (starts
     *   at 1)
     * @param {boolean} [opts.hidden] if true, menu item is hidden.
     *   if false, menu item is made visible. if excluded, visibility is unchanged.
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasTab>} Canvas Tab {@link https://canvas.instructure.com/doc/api/tabs.html#method.tabs.index}
     */
    ECatNavMenuItem.prototype.update = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var params, tabs, tab, i, makeAttempt;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {};
                        // > Add position
                        if (opts.moveToTop) {
                            params.position = 2;
                        }
                        else if (opts.position) {
                            params.position = opts.position;
                        }
                        // > Add hidden
                        if (opts.hidden !== undefined) {
                            params.hidden = !!opts.hidden;
                        }
                        // Just return if no updates to be made
                        if (Object.keys(params).length === 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.api.course.navMenuItem.list({
                                courseId: ((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId),
                            }, config)];
                    case 1:
                        tabs = _b.sent();
                        for (i = 0; i < tabs.length; i++) {
                            // Match based on id
                            if (opts.id
                                && (String(tabs[i].id).trim()
                                    === String(opts.id).trim())) {
                                tab = tabs[i];
                                break;
                            }
                            // Match based on url
                            if (opts.url
                                && (tabs[i].html_url.toLowerCase()
                                    === opts.url.toLowerCase())) {
                                tab = tabs[i];
                                break;
                            }
                            // Match based on label
                            if (opts.label
                                && ((String(tabs[i].label)
                                    .trim()
                                    .toLowerCase())
                                    === (String(opts.label)
                                        .trim()
                                        .toLowerCase()))) {
                                tab = tabs[i];
                                break;
                            }
                        }
                        // Error if no menu item found
                        if (!tab) {
                            throw new caccl_error_1.default({
                                message: 'We could not find the menu item of interest.',
                                code: ErrorCode_1.default.NavItemNotFound,
                            });
                        }
                        // Keep same value for hidden field if unchanged
                        if (params.hidden === undefined) {
                            params.hidden = !!tab.hidden;
                        }
                        makeAttempt = function () { return __awaiter(_this, void 0, void 0, function () {
                            var results, err_1;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.visitEndpoint({
                                                config: config,
                                                action: 'update a nav menu item in a course',
                                                params: params,
                                                path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/tabs/").concat(tab.id),
                                                method: 'PUT',
                                            })];
                                    case 1:
                                        results = _b.sent();
                                        return [2 /*return*/, results];
                                    case 2:
                                        err_1 = _b.sent();
                                        // Check for invalid location errors we can fix
                                        if (err_1.code === ErrorCode_1.default.InvalidTabLocation
                                            && opts.moveToTop) {
                                            // Keep trying larger numbered positions
                                            if (params.position >= tabs.length) {
                                                // Already at the max position
                                                throw new caccl_error_1.default({
                                                    message: 'In an attempt to move a nav item to the top of the menu, we tried every position and Canvas denied the change.',
                                                    code: ErrorCode_1.default.TriedAllTabLocations,
                                                });
                                            }
                                            // We can still try the next position
                                            // > Increment the position
                                            params.position += 1;
                                            // > Make another attempt
                                            return [2 /*return*/, makeAttempt()];
                                        }
                                        // Other error. Rethrow it
                                        throw err_1;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); };
                        // Start attempts
                        return [2 /*return*/, makeAttempt()];
                }
            });
        });
    };
    return ECatNavMenuItem;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatNavMenuItem;
//# sourceMappingURL=ECatNavMenuItem.js.map