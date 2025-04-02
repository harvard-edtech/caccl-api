"use strict";
/**
 * Functions for interacting with group sets/categories within courses
 * @namespace api.course.groupSet
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
// Import shared classes
var EndpointCategory_1 = __importDefault(require("../../shared/EndpointCategory"));
// Import shared helpers
var parallelLimit_1 = __importDefault(require("../../shared/helpers/parallelLimit"));
// Import shared constants
var API_PREFIX_1 = __importDefault(require("../../shared/constants/API_PREFIX"));
// Endpoint category
var ECatGroupSet = /** @class */ (function (_super) {
    __extends(ECatGroupSet, _super);
    function ECatGroupSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                           Table of Contents:                           */
    /*                           - Group Sets                                 */
    /*                           - Groups in Group Sets                       */
    /*------------------------------------------------------------------------*/
    // NOTE: Canvas uses inconsistent language. What are referred to as
    // "group sets" in the front-end are called "group categories" in the API.
    /*------------------------------------------------------------------------*/
    /*                           Group Set Endpoints                          */
    /*------------------------------------------------------------------------*/
    /**
     * Lists the group sets in the course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.groupSet
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroupCategory[]>} list of Canvas GroupCategories {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
     */
    ECatGroupSet.prototype.list = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of group sets in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/group_categories"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Gets info on a specific group set
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.groupSet
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.groupSetId Canvas group set Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroupCategory>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
     */
    ECatGroupSet.prototype.get = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on a specific group set in a course',
                        path: "".concat(API_PREFIX_1.default, "/group_categories/").concat(opts.groupSetId),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Create a group set in a course
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.groupSet
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {string} opts.name The name of the new group set
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   create a group set in
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroupCategory>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
     */
    ECatGroupSet.prototype.create = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a new group set in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/group_categories"),
                        method: 'POST',
                        params: {
                            name: opts.name || 'Unnamed Group Set',
                        },
                    })];
            });
        });
    };
    /**
     * Deletes a group set
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.groupSet
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.groupSetId Canvas group set Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroupCategory>} Canvas GroupCategory {@link https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory}
     */
    ECatGroupSet.prototype.delete = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'delete a specific group set from a course',
                        path: "".concat(API_PREFIX_1.default, "/group_categories/").concat(opts.groupSetId),
                        method: 'DELETE',
                    })];
            });
        });
    };
    ;
    /*------------------------------------------------------------------------*/
    /*                   Endpoints for Groups in Group Sets                   */
    /*------------------------------------------------------------------------*/
    /**
     * Gets the list of groups in a group set
     * @author Gabe Abrams
     * @method listGroups
     * @memberof api.course.groupSet
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.groupSetId Canvas group set Id to query
     * @param {boolean} [opts.includeUsers] if true, after getting the list
     *   of groups, CACCL requests each group's member list individually and adds
     *   each array to the group as groups[i].users (an array of Canvas user
     *   objects)
     * @param {number} [opts.parallelLimit=1] the number of group membership
     *   arrays to request in parallel (if 1 or undefined, memberships will be
     *   requested serially). Only relevant if including users
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroup[]>} list of Canvas Groups {@link https://canvas.instructure.com/doc/api/groups.html#Group}
     */
    ECatGroupSet.prototype.listGroups = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var groups;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'get the list of groups in a course',
                            path: "".concat(API_PREFIX_1.default, "/group_categories/").concat(opts.groupSetId, "/groups"),
                            method: 'GET',
                        })];
                    case 1:
                        groups = _a.sent();
                        // Finish if not requesting members
                        if (!opts.includeMembers) {
                            return [2 /*return*/, groups];
                        }
                        return [4 /*yield*/, (0, parallelLimit_1.default)(groups.map(function (group) {
                                return function () { return __awaiter(_this, void 0, void 0, function () {
                                    var users;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (group.users) {
                                                    // Users already defined. Return
                                                    return [2 /*return*/, group];
                                                }
                                                return [4 /*yield*/, this.api.course.group.listUsers({
                                                        groupId: group.id,
                                                    })];
                                            case 1:
                                                users = _a.sent();
                                                return [2 /*return*/, __assign(__assign({}, group), { users: users })];
                                        }
                                    });
                                }); };
                            }), (opts.parallelLimit || 1))];
                    case 2: 
                    // Add members in parallel
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ECatGroupSet;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatGroupSet;
//# sourceMappingURL=ECatGroupSet.js.map