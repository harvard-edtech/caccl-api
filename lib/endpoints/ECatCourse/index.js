"use strict";
/**
 * Functions for interacting with courses
 * @namespace api.course
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
// Import subcategories
var ECatAnalytics_1 = __importDefault(require("./ECatAnalytics"));
var ECatAnnouncement_1 = __importDefault(require("./ECatAnnouncement"));
var ECatApp_1 = __importDefault(require("./ECatApp"));
var ECatAssignment_1 = __importDefault(require("./ECatAssignment"));
var ECatAssignmentGroup_1 = __importDefault(require("./ECatAssignmentGroup"));
var ECatDiscussionTopic_1 = __importDefault(require("./ECatDiscussionTopic"));
var ECatGradebookColumn_1 = __importDefault(require("./ECatGradebookColumn"));
var ECatGroup_1 = __importDefault(require("./ECatGroup"));
var ECatGroupSet_1 = __importDefault(require("./ECatGroupSet"));
var ECatNavMenuItem_1 = __importDefault(require("./ECatNavMenuItem"));
var ECatPage_1 = __importDefault(require("./ECatPage"));
var ECatQuiz_1 = __importDefault(require("./ECatQuiz"));
var ECatRubric_1 = __importDefault(require("./ECatRubric"));
var ECatSection_1 = __importDefault(require("./ECatSection"));
// Endpoint category
var ECatCourse = /** @class */ (function (_super) {
    __extends(ECatCourse, _super);
    /**
     * Initialize endpoint category
     * @param initPack package of info for initializing the endpoint category
     */
    function ECatCourse(initPack) {
        var _this = _super.call(this, initPack) || this;
        // Initialize subcategories
        _this.analytics = new ECatAnalytics_1.default(initPack);
        _this.announcement = new ECatAnnouncement_1.default(initPack);
        _this.app = new ECatApp_1.default(initPack);
        _this.assignment = new ECatAssignment_1.default(initPack);
        _this.assignmentGroup = new ECatAssignmentGroup_1.default(initPack);
        _this.discussionTopic = new ECatDiscussionTopic_1.default(initPack);
        _this.gradebookColumn = new ECatGradebookColumn_1.default(initPack);
        _this.group = new ECatGroup_1.default(initPack);
        _this.groupSet = new ECatGroupSet_1.default(initPack);
        _this.navMenuItem = new ECatNavMenuItem_1.default(initPack);
        _this.page = new ECatPage_1.default(initPack);
        _this.quiz = new ECatQuiz_1.default(initPack);
        _this.rubric = new ECatRubric_1.default(initPack);
        _this.section = new ECatSection_1.default(initPack);
        return _this;
    }
    /*------------------------------------------------------------------------*/
    /*                                 Course                                 */
    /*------------------------------------------------------------------------*/
    /**
     * Gets info on a specific course
     * @author Gabe Abrams
     * @method get
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to get info on
     * @param {boolean} [opts.includeSyllabus] If truthy, includes
     *   syllabus body
     * @param {boolean} [opts.includeTerm] If truthy, includes term
     * @param {boolean} [opts.includeAccount] If truthy, includes account
     *   Id
     * @param {boolean} [opts.includeDescription] If truthy, includes
     *   public description
     * @param {boolean} [opts.includeSections] If truthy, includes
     *   sections
     * @param {boolean} [opts.includeTeachers] If truthy, includes
     *   teachers
     * @param {boolean} [opts.includeCourseImage] If truthy, includes the
     *   course image
     * @param {boolean} [opts.includeNeedsGradingCount] If truthy,
     *   includes the number of students who still need to be graded
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCourse>} Canvas course {@link https://canvas.instructure.com/doc/api/courses.html#Course}
     */
    ECatCourse.prototype.get = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on a specific course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId),
                        method: 'GET',
                        params: {
                            include: utils_1.default.genIncludesList({
                                syllabus_body: opts.includeSyllabus,
                                term: opts.includeTerm,
                                account: opts.includeAccount,
                                public_description: opts.includeDescription,
                                sections: opts.includeSections,
                                teachers: opts.includeTeachers,
                                course_image: opts.includeCourseImage,
                                needs_grading_count: opts.includeNeedsGradingCount,
                            }),
                        },
                    })];
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                               Enrollments                              */
    /*------------------------------------------------------------------------*/
    /**
     * Gets the list of enrollments in a course
     * @author Gabe Abrams
     * @method listEnrollments
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.types=all] list of enrollment types to include:
     *   ['student', 'ta', 'teacher', 'designer', 'observer']
     *   Defaults to all types.
     * @param {boolean} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeAvatar] If truthy, avatar_url is
     *   included
     * @param {boolean} [opts.includeGroups] If truthy, group_ids is
     *   included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasEnrollment[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
     */
    ECatCourse.prototype.listEnrollments = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_b) {
                params = {};
                // Pre-process enrollment types
                if (opts.types) {
                    params.type = opts.types.map(function (type) {
                        if (type.includes('Enrollment')) {
                            return type;
                        }
                        return "".concat(type.charAt(0).toUpperCase()).concat(type.substring(1), "Enrollment");
                    });
                }
                // Filter to only active
                if (opts.activeOnly) {
                    params.state = ['active'];
                }
                // Include avatar
                if (opts.includeAvatar) {
                    params.include = ['avatar_url'];
                }
                // Include groups
                if (opts.includeGroups) {
                    if (!params.include) {
                        params.include = [];
                    }
                    params.include.push('group_ids');
                }
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get enrollments from a course',
                        params: params,
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/enrollments"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Get the list of student enrollments in a course
     * @author Gabe Abrams
     * @method listStudentEnrollments
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {string} [opts.includeAvatar] If truthy, avatar_url is
     *   included
     * @param {string} [opts.includeGroups] If truthy, group_ids is
     *   included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasEnrollment[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
     */
    ECatCourse.prototype.listStudentEnrollments = function (opts, config) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.course.listEnrollments(__assign(__assign({}, opts), { types: ['student'] }), config)];
            });
        });
    };
    /**
     * Gets the list of TAs and Teacher enrollments in a course
     * @author Gabe Abrams
     * @method listTeachingTeamMemberEnrollments
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {string} [opts.includeAvatar] If truthy, avatar_url is
     *   included
     * @param {string} [opts.includeGroups] If truthy, group_ids is
     *   included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasEnrollment[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
     */
    ECatCourse.prototype.listTeachingTeamMemberEnrollments = function (opts, config) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.course.listEnrollments(__assign(__assign({}, opts), { types: ['ta', 'teacher'] }), config)];
            });
        });
    };
    /**
     * Gets the list of designer enrollments in a course
     * @author Gabe Abrams
     * @method listDesignerEnrollments
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {string} [opts.includeAvatar] If truthy, avatar_url is
     *   included
     * @param {string} [opts.includeGroups] If truthy, group_ids is
     *   included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasEnrollment[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
     */
    ECatCourse.prototype.listDesignerEnrollments = function (opts, config) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.course.listEnrollments(__assign(__assign({}, opts), { types: ['designer'] }), config)];
            });
        });
    };
    /**
     * Gets the list of observer enrollments in a course
     * @author Gabe Abrams
     * @method listObserverEnrollments
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {string} [opts.includeAvatar] If truthy, avatar_url is
     *   included
     * @param {string} [opts.includeGroups] If truthy, group_ids is
     *   included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasEnrollment[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
     */
    ECatCourse.prototype.listObserverEnrollments = function (opts, config) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.course.listEnrollments(__assign(__assign({}, opts), { types: ['observer'] }), config)];
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                                  Users                                 */
    /*------------------------------------------------------------------------*/
    /**
     * Gets info on a specific user in a course
     * @author Gabe Abrams
     * @method getUser
     * @memberof api.course
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.userId Canvas user Id to get
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser>} Canvas user {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    ECatCourse.prototype.getUser = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on a user in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/users/").concat(opts.userId),
                        method: 'GET',
                        params: {
                            include: utils_1.default.genIncludesList({
                                email: opts.includeEmail,
                                enrollments: opts.includeEnrollments,
                                locked: opts.includeLocked,
                                avatar_url: opts.includeAvatar,
                                bio: opts.includeBio,
                            }),
                        },
                    })];
            });
        });
    };
    /**
     * Gets info on all users in a course
     * @author Gabe Abrams
     * @method listUsers
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.types=all] list of enrollment types to include:
     *   ['student', 'ta', 'teacher', 'designer', 'observer']
     *   Defaults to all types.
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} Canvas users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    ECatCourse.prototype.listUsers = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on all users in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/users"),
                        method: 'GET',
                        params: {
                            enrollment_type: opts.types,
                            include: utils_1.default.genIncludesList({
                                email: opts.includeEmail,
                                enrollments: opts.includeEnrollments,
                                locked: opts.includeLocked,
                                avatar_url: opts.includeAvatar,
                                bio: opts.includeBio,
                            }),
                        },
                    })];
            });
        });
    };
    /**
     * Gets the list of students in a course
     * @author Gabe Abrams
     * @method listStudents
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    ECatCourse.prototype.listStudents = function (opts, config) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.course.listUsers(__assign(__assign({}, opts), { types: ['student'] }), config)];
            });
        });
    };
    /**
     * Gets the list of TAs and Teachers in a course
     * @author Gabe Abrams
     * @method listTeachingTeamMembers
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    ECatCourse.prototype.listTeachingTeamMembers = function (opts, config) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.course.listUsers(__assign(__assign({}, opts), { types: ['ta', 'teacher'] }), config)];
            });
        });
    };
    /**
     * Gets the list of TAs in a course
     * @author Gabe Abrams
     * @method listTAs
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    ECatCourse.prototype.listTAs = function (opts, config) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.course.listUsers(__assign(__assign({}, opts), { types: ['ta'] }), config)];
            });
        });
    };
    /**
     * Gets the list of teachers in a course
     * @author Gabe Abrams
     * @method listTeachers
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    ECatCourse.prototype.listTeachers = function (opts, config) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.course.listUsers(__assign(__assign({}, opts), { types: ['teacher'] }), config)];
            });
        });
    };
    /**
     * Gets the list of designers in a course
     * @author Gabe Abrams
     * @method listDesigners
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    ECatCourse.prototype.listDesigners = function (opts, config) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.course.listUsers(__assign(__assign({}, opts), { types: ['designer'] }), config)];
            });
        });
    };
    /**
     * Gets the list of observers in a course
     * @author Gabe Abrams
     * @method listObservers
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    ECatCourse.prototype.listObservers = function (opts, config) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.course.listUsers(__assign(__assign({}, opts), { types: ['observer'] }), config)];
            });
        });
    };
    return ECatCourse;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatCourse;
//# sourceMappingURL=index.js.map