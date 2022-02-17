"use strict";
/**
 * Functions for user endpoints
 * @namespace api.user
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
// Import shared constants
var API_PREFIX_1 = __importDefault(require("../../shared/constants/API_PREFIX"));
// Import subcategories
var Self_1 = __importDefault(require("./Self"));
// Endpoint category
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    /**
     * Initialize endpoint category
     * @param initPack package of info for initializing the endpoint category
     */
    function User(initPack) {
        var _this = _super.call(this, initPack) || this;
        // Initialize subcategory
        _this.self = new Self_1.default(initPack);
        return _this;
    }
    /*------------------------------------------------------------------------*/
    /*                               Endpoints:                               */
    /*------------------------------------------------------------------------*/
    /**
     * Get a user's list of email addresses. Masquerade (act as user) ability is
     *   required for this function
     * @author Gabe Abrams
     * @memberof api.user
     * @instance
     * @async
     * @method listEmails
     * @param {object} opts - object containing all arguments
     * @param {number} opts.userId - the id of the user to get emails for
     * @param {boolean} [opts.sortByDate] - if false then sort by ranked
     *   order of emails (primary email first), if true then sort by date
     *   created so the official emails should be first
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CACCLEmailEntry[]>}
     *   email address objects
     */
    User.prototype.listEmails = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var channels, emailChannels, emailObjects;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'get the list of email addresses for a user',
                            path: "".concat(API_PREFIX_1.default, "/users/self/communication_channels"),
                            method: 'GET',
                            params: {
                                as_user_id: opts.userId,
                            },
                        })];
                    case 1:
                        channels = _a.sent();
                        emailChannels = channels.filter(function (channel) {
                            return (channel.type === 'email');
                        });
                        emailObjects = emailChannels.map(function (channel) {
                            return {
                                position: channel.position,
                                email: channel.address,
                                createdAt: new Date(channel.created_at),
                            };
                        });
                        // Sort
                        if (opts.sortByDate) {
                            emailObjects.sort(function (a, b) {
                                var aT = a.createdAt.getTime();
                                var bT = b.createdAt.getTime();
                                if (aT < bT) {
                                    return -1;
                                }
                                if (aT > bT) {
                                    return 1;
                                }
                                return 0;
                            });
                        }
                        // Return
                        return [2 /*return*/, emailObjects];
                }
            });
        });
    };
    /**
     * Get a user's list of courses. Masquerade (act as user) ability is
     *   required for this function
     * @author Gabe Abrams
     * @memberof api.user
     * @instance
     * @async
     * @method listCourses
     * @param {object} opts - object containing all arguments
     * @param {number} opts.userId - the id of the user to get emails for
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCourse[]>} list of courses {@link https://canvas.instructure.com/doc/api/courses.html#Course}
     */
    User.prototype.listCourses = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of courses for a user',
                        path: "".concat(API_PREFIX_1.default, "/courses"),
                        method: 'GET',
                        params: {
                            as_user_id: opts.userId,
                        },
                    })];
            });
        });
    };
    /**
     * Search users
     * @author Gabe Abrams
     * @memberof api.user
     * @instance
     * @async
     * @method search
     * @param {object} opts - object containing all arguments
     * @param {number} opts.accountId - the account to search through
     * @param {string} opts.searchTerm - a search term to apply (must be at
     *   least 3 chars). Can be a full ID or partial name. For admins, searches
     *   SIS ID, login ID, name, and email address.
     * @param {boolean} [opts.isStudent] - if true, only search for students.
     *   Only one user type boolean can be true
     * @param {boolean} [opts.isTeacher] - if true, only search for teachers.
     *   Only one user type boolean can be true
     * @param {boolean} [opts.isTA] - if true, only search for TAs.
     *   Only one user type boolean can be true
     * @param {boolean} [opts.isObserver] - if true, only search for observers.
     *   Only one user type boolean can be true
     * @param {boolean} [opts.isDesigner] - if true, only search for designers.
     *   Only one user type boolean can be true
     * @param {string} [opts.sortBy=username] - the item to sort by. Can be:
     *   "username" or "email" or "sis_id" or "last_login"
     * @param {boolean} [opts.sortDescending] - if true, sort descending
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of user objects {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    User.prototype.search = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var searchTerm, enrollmentType, sort, order;
            return __generator(this, function (_a) {
                searchTerm = String(opts.searchTerm);
                if (opts.isStudent) {
                    enrollmentType = 'student';
                }
                else if (opts.isTeacher) {
                    enrollmentType = 'teacher';
                }
                else if (opts.isTA) {
                    enrollmentType = 'ta';
                }
                else if (opts.isObserver) {
                    enrollmentType = 'observer';
                }
                else if (opts.isDesigner) {
                    enrollmentType = 'designer';
                }
                sort = opts.sortBy || 'username';
                order = (opts.sortDescending ? 'desc' : 'asc');
                // Send request
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'search for a user or a list of users',
                        path: "".concat(API_PREFIX_1.default, "/accounts/").concat(opts.accountId, "/users"),
                        method: 'GET',
                        params: {
                            sort: sort,
                            order: order,
                            search_term: searchTerm,
                            enrollment_type: enrollmentType,
                        },
                    })];
            });
        });
    };
    return User;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = User;
//# sourceMappingURL=index.js.map