"use strict";
/**
 * Functions for interacting with student groups within courses
 * @namespace api.course.group
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
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                           Table of Contents:                           */
    /*                           - Group                                      */
    /*                           - Group Members                              */
    /*------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------*/
    /*                             Group Endpoints                            */
    /*------------------------------------------------------------------------*/
    /**
     * Gets info on a specific group in a course
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.group
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.groupId - Canvas group Id
     * @param {boolean} [opts.includeUsers] if true, include users as group.users
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroup>} Canvas group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
     */
    Group.prototype.get = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var group, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'get info on a specific group in a course',
                            path: "".concat(API_PREFIX_1.default, "/groups/").concat(opts.groupId),
                            method: 'GET',
                        })];
                    case 1:
                        group = _a.sent();
                        if (!opts.includeUsers || group.users) {
                            // Return group as-is
                            return [2 /*return*/, group];
                        }
                        return [4 /*yield*/, this.listUsers({
                                groupId: opts.groupId,
                            }, config)];
                    case 2:
                        users = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, group), { users: users })];
                }
            });
        });
    };
    /**
     * Create a new group in a group set
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.group
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.groupSetId - Canvas group set Id to put the group into
     * @param {string} [opts.name=Unnamed Group] - Name of the new group
     * @param {string} [opts.description] - Description of the new group
     * @param {boolean} [opts.isPublic] - If truthy, group is public
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroup>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
     */
    Group.prototype.create = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a new group in a group set',
                        path: "".concat(API_PREFIX_1.default, "/group_categories/").concat(opts.groupSetId, "/groups"),
                        method: 'POST',
                        params: {
                            name: (opts.name || 'Unnamed Group'),
                            description: (opts.description || ''),
                            is_public: utils_1.default.isTruthy(opts.isPublic),
                        },
                    })];
            });
        });
    };
    /**
     * Delete a specific group from a group set
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.group
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.groupId - Canvas group Id to delete
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroup>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
     */
    Group.prototype.delete = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'delete a specific group from a group set',
                        path: "".concat(API_PREFIX_1.default, "/groups/").concat(opts.groupId),
                        method: 'DELETE',
                    })];
            });
        });
    };
    // NOTE: to create or delete a group, see endpoints in groupSets
    /*------------------------------------------------------------------------*/
    /*                         Group Member Endpoints                         */
    /*------------------------------------------------------------------------*/
    /**
     * Gets the list of users in a group
     * @author Gabe Abrams
     * @method listUsers
     * @memberof api.course.group
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.groupId - Canvas group Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    Group.prototype.listUsers = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of members in a specific group',
                        path: "".concat(API_PREFIX_1.default, "/groups/").concat(opts.groupId, "/users"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Gets the list of members in a group
     * @author Gabe Abrams
     * @method updateMembers
     * @memberof api.course.group
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.groupId - Canvas group Id
     * @param {number[]} [opts.members=[]] - The list of user objects/user Ids that
     *   should be in the group
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @return {Promise<CanvasGroup>} Canvas Group {@link https://canvas.instructure.com/doc/api/groups.html#Group}
     */
    Group.prototype.updateMembers = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update the list of members in a group',
                        path: "".concat(API_PREFIX_1.default, "/groups/").concat(opts.groupId),
                        method: 'PUT',
                        params: {
                            members: utils_1.default.extractIdsIfApplicable(opts.members),
                        },
                    })];
            });
        });
    };
    return Group;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = Group;
//# sourceMappingURL=Group.js.map