"use strict";
/**
 * Functions for interacting with external LTI apps within courses
 * @namespace api.course.app
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
// Import shared types
var caccl_error_1 = __importDefault(require("caccl-error"));
var ErrorCode_1 = __importDefault(require("../../shared/types/ErrorCode"));
// Import shared helpers
var utils_1 = __importDefault(require("../../shared/helpers/utils"));
// Import shared constants
var API_PREFIX_1 = __importDefault(require("../../shared/constants/API_PREFIX"));
// Endpoint category
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                               Endpoints:                               */
    /*------------------------------------------------------------------------*/
    /**
     * Gets the list of apps installed into a course
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method list
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id to query
     * @param {boolean} [opts.excludeParents] If true, excludes tools
     *   installed in all accounts above the current context
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasExternalTool[]>} list of external tools {@link https://canvas.instructure.com/doc/api/external_tools.html}
     */
    App.prototype.list = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = (!opts.excludeParents
                    ? { include_parents: false }
                    : {});
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of apps installed into a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/external_tools"),
                        method: 'GET',
                        params: params,
                    })];
            });
        });
    };
    /**
     * Gets info on a single LTI tool
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method get
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id
     * @param {number} opts.appId The LTI app Id to get
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasExternalTool>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
     */
    App.prototype.get = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on a specific LTI app in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/external_tools/").concat(opts.appId),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Adds an LTI app to a Canvas course
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method add
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id to install into
     * @param {string} opts.name The app name (for settings app list)
     * @param {string} opts.key Installation consumer key
     * @param {string} opts.secret Installation consumer secret
     * @param {string} opts.xml XML configuration file, standard LTI format
     * @param {string} [opts.description] A human-readable description of the
     *   app
     * @param {string} [opts.launchPrivacy] 'public' by default
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasExternalTool>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
     */
    App.prototype.add = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'add an LTI app to a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/external_tools"),
                        method: 'POST',
                        params: {
                            name: opts.name,
                            privacy_level: opts.launchPrivacy || 'public',
                            consumer_key: opts.key,
                            shared_secret: opts.secret,
                            config_type: 'by_xml',
                            config_xml: opts.xml,
                            description: utils_1.default.includeIfTruthy(opts.description),
                        },
                    })];
            });
        });
    };
    /**
     * Removes an LTI app from a Canvas course
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method remove
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id to remove app from
     * @param {number} opts.appId The LTI app Id to remove
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasExternalTool>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
     */
    App.prototype.remove = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'remove an LTI app from a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/external_tools/").concat(opts.appId),
                        method: 'DELETE',
                    })];
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                                Metadata                                */
    /*------------------------------------------------------------------------*/
    /**
     * Gets the metadata for an LTI app in a course. Note: this endpoint requires
     *   that the app have a custom parameter called 'metadata_id' with an
     *   identifier that we will use to refer to the metadata. If each installation
     *   of an app will have its own metadata, each installation should have a
     *   different metadata_id. If all installations share the same metadata, they
     *   should all have the same metadata_id. When getting metadata, we return the
     *   metadata for the first app we find that has this metadata_id.
     *   Also note that the variable is 'metadata_id' all lowercase because launch
     *   params are made lowercase.
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method getMetadata
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id that holds the app
     * @param {number} opts.metadata_id metadata identifier (see endpoint
     *   description)
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<object>} the metadata for the first app that has the given
     *   metadata_id
     */
    App.prototype.getMetadata = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var apps, firstAppWithMetadataId, i, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.course.app.list({
                            courseId: opts.courseId,
                        }, config)];
                    case 1:
                        apps = _a.sent();
                        for (i = 0; i < apps.length; i++) {
                            if (apps[i].custom_fields
                                && apps[i].custom_fields.metadata_id
                                && apps[i].custom_fields.metadata_id === opts.metadata_id) {
                                // Found an app with this metadata id!
                                firstAppWithMetadataId = apps[i];
                                break;
                            }
                        }
                        if (!firstAppWithMetadataId) {
                            // No apps with this metadata_id could be found! Throw error
                            throw new caccl_error_1.default({
                                message: 'We could not find any apps with the given metadata id.',
                                code: ErrorCode_1.default.NoAppWithMetadataFound,
                            });
                        }
                        // Check if metadata is empty
                        if (!firstAppWithMetadataId.custom_fields.metadata
                            || firstAppWithMetadataId.custom_fields.metadata === ''
                            || firstAppWithMetadataId.custom_fields.metadata.trim().length === 0) {
                            // Metadata empty
                            return [2 /*return*/, Promise.resolve({})];
                        }
                        // Parse metadata
                        try {
                            metadata = JSON.parse(firstAppWithMetadataId.custom_fields.metadata);
                            return [2 /*return*/, Promise.resolve(metadata)];
                        }
                        catch (err) {
                            // Metadata malformed
                            throw new caccl_error_1.default({
                                message: 'Metadata was malformed.',
                                code: ErrorCode_1.default.MetadataMalformed,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates the metadata for an LTI app in a course. Note: this endpoint requires
     *   that the app have a custom parameter called 'metadata_id' with an
     *   identifier that we will use to refer to the metadata. If each installation
     *   of an app will have its own metadata, each installation should have a
     *   different metadata_id. If all installations share the same metadata, they
     *   should all have the same metadata_id. When getting metadata, we return the
     *   metadata for the first app we find that has this metadata_id.
     *   Also note that the variable is 'metadata_id' all lowercase because launch
     *   params are made lowercase.
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method updateMetadata
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id that holds the app
     * @param {number} opts.metadata_id metadata identifier (see endpoint
     *   description)
     * @param {object} [opts.metadata={}] json metadata object
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasExternalTool[]>} Array of external tools (the apps that were updated) {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
     */
    App.prototype.updateMetadata = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata, apps, appsToUpdate;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = JSON.stringify(opts.metadata || {});
                        return [4 /*yield*/, this.api.course.app.list({
                                courseId: opts.courseId,
                            }, config)
                            // Find all apps with this metadata_id
                        ];
                    case 1:
                        apps = _a.sent();
                        appsToUpdate = apps.filter(function (app) {
                            return (app.custom_fields
                                && app.custom_fields.metadata_id
                                && app.custom_fields.metadata_id === opts.metadata_id);
                        });
                        if (appsToUpdate.length === 0) {
                            // No apps with this metadata_id could be found! Throw arror
                            throw new caccl_error_1.default({
                                message: 'We could not find any apps with the given metadata id.',
                                code: ErrorCode_1.default.NoAppsToUpdateMetadata,
                            });
                        }
                        // Update all app metadata objects in parallel
                        return [2 /*return*/, Promise.all(appsToUpdate.map(function (app) {
                                // Perform merge for custom fields so we don't lose other custom vals
                                var params = {
                                    'custom_fields[metadata]': metadata,
                                };
                                Object.keys(app.custom_fields).forEach(function (customPropName) {
                                    // Don't let old metadata overwrite new metadata
                                    if (customPropName === 'metadata') {
                                        return;
                                    }
                                    var customVal = app.custom_fields[customPropName];
                                    params["custom_fields[".concat(customPropName, "]")] = customVal;
                                });
                                // Update custom params
                                return _this.visitEndpoint({
                                    config: config,
                                    action: 'update metadata for an LTI app in a course',
                                    params: params,
                                    path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/external_tools/").concat(app.id),
                                    method: 'PUT',
                                });
                            }))];
                }
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                           Sessionless Launch                           */
    /*------------------------------------------------------------------------*/
    /**
     * Gets a sessionless navigation LTI launch URL
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method getNavLaunchURL
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id that holds the app
     * @param {number} opts.appId The LTI app Id to get a launch URL for
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<string>} launch URL
     */
    App.prototype.getNavLaunchURL = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'get a sessionless navigation LTI launch url for an app in a course',
                            path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/external_tools/sessionless_launch"),
                            method: 'GET',
                            params: {
                                id: opts.appId,
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.url];
                }
            });
        });
    };
    /**
     * Gets a sessionless navigation LTI launch URL
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method getAssignmentLaunchURL
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id that holds the app
     * @param {number} opts.appId The LTI app Id to get a launch URL for
     * @param {number} opts.assignmentId the Canvas assignment id to launch
     *   from
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<string>} launch url
     */
    App.prototype.getAssignmentLaunchURL = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'get a sessionless assignment LTI launch url for an app in a course',
                            path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/external_tools/sessionless_launch"),
                            method: 'GET',
                            params: {
                                id: opts.appId,
                                assignment_id: opts.assignmentId,
                                launch_type: 'assessment',
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.url];
                }
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                               Navigation                               */
    /*------------------------------------------------------------------------*/
    /**
     * Move an app near the top of the nav menu and make sure it's visible
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method moveToTopOfNavMenu
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id that holds the app
     * @param {number} opts.appId The LTI app Id to make visible and move near
     *   the top of the nav menu
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasTab>} Canvas tab {@link https://canvas.instructure.com/doc/api/tabs.html#Tab}
     */
    App.prototype.moveToTopOfNavMenu = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'move an app near the top of the nav menu and make sure it\'s visible',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/tabs/context_external_tool_").concat(opts.appId),
                        method: 'PUT',
                        params: {
                            position: 2,
                            hidden: false,
                        },
                    })];
            });
        });
    };
    return App;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = App;
//# sourceMappingURL=App.js.map