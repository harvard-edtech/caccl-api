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
var caccl_error_1 = __importDefault(require("caccl-error"));
var ErrorCode_1 = __importDefault(require("../../shared/types/ErrorCode"));
var EndpointCategory_1 = __importDefault(require("../../shared/EndpointCategory"));
var DateHandling_1 = require("./types/DateHandling");
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
var ECatFile_1 = __importDefault(require("./ECatFile"));
var ECatFolder_1 = __importDefault(require("./ECatFolder"));
var ECatGradebookColumn_1 = __importDefault(require("./ECatGradebookColumn"));
var ECatGroup_1 = __importDefault(require("./ECatGroup"));
var ECatGroupSet_1 = __importDefault(require("./ECatGroupSet"));
var ECatModule_1 = __importDefault(require("./ECatModule"));
var ECatNavMenuItem_1 = __importDefault(require("./ECatNavMenuItem"));
var ECatPage_1 = __importDefault(require("./ECatPage"));
var ECatQuiz_1 = __importDefault(require("./ECatQuiz"));
var ECatRubric_1 = __importDefault(require("./ECatRubric"));
var ECatSection_1 = __importDefault(require("./ECatSection"));
/*------------------------------------------------------------------------*/
/*                                Constants                               */
/*------------------------------------------------------------------------*/
var assignmentTagPrefix = '#CurrentlyBeingMigrated#';
/*------------------------------------------------------------------------*/
/*                            Endpoint Category                           */
/*------------------------------------------------------------------------*/
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
        _this.file = new ECatFile_1.default(initPack);
        _this.folder = new ECatFolder_1.default(initPack);
        _this.gradebookColumn = new ECatGradebookColumn_1.default(initPack);
        _this.group = new ECatGroup_1.default(initPack);
        _this.groupSet = new ECatGroupSet_1.default(initPack);
        _this.module = new ECatModule_1.default(initPack);
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
    /**
     * Update whether the course is published or not
     * @author Gabe Abrams
     * @method updatePublishState
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   modify
     * @param {boolean} [opts.isPublished] if true, publish the course. Otherwise,
     *   unpublish the course
     */
    ECatCourse.prototype.updatePublishState = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var course, nowPublished;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'update the published state of a specific course',
                            path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId),
                            method: 'PUT',
                            params: {
                                'course[event]': (opts.isPublished
                                    ? 'offer'
                                    : 'claim'),
                            },
                        })];
                    case 1:
                        course = _b.sent();
                        nowPublished = (course.workflow_state !== 'unpublished');
                        if (nowPublished !== opts.isPublished) {
                            throw new caccl_error_1.default({
                                message: 'The course published state could not be updated, probably because the course already has graded content.',
                                code: ErrorCode_1.default.CoursePublishedStateNotUpdated,
                            });
                        }
                        return [2 /*return*/, course];
                }
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
    /*------------------------------------------------------------------------*/
    /*                               Migrations                               */
    /*------------------------------------------------------------------------*/
    /**
     * Perform a course content migration
     * @author Yuen Ler Chow
     * @method migrateContent
     * @memberof api.course
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} [opts.sourceCourseId=default course id] Canvas course Id of
     *   the source course
     * @param {number} opts.destinationCourseId Canvas course Id of the
     *   destination course
     * @param {object} opts.include object containing all items and their ids to
     *   include
     * @param {number[]} [opts.include.fileIds = []] list of file ids to include
     * @param {number[]} [opts.include.quizIds = []] list of quiz ids to include
     * @param {number[]} [opts.include.assignmentIds = []] list of assignment ids
     *   to include
     * @param {number[]} [opts.include.announcementIds = []] list of announcement
     *   ids to include
     * @param {number[]} [opts.include.discussionIds = []] list of discussion ids
     *   to include
     * @param {number[]} [opts.include.moduleIds = []] list of module ids to
     *   include
     * @param {number[]} [opts.include.pageIds = []] list of page ids to include
     * @param {number[]} [opts.include.rubricIds = []] list of rubric ids to
     *   include
     * @param {DateShiftOptions} opts.dateShiftOptions options for shifting dates
     * @param {number} [opts.timeoutMs = 5 minutes] maximum time in milliseconds
     *   to wait for course migration to finish
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     */
    ECatCourse.prototype.migrateContent = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceCourseId, destinationCourseId, include, dateShiftOptions, _a, timeoutMs, _b, fileIds, _c, quizIds, _d, assignmentIds, _e, announcementIds, _f, discussionTopicsIds, _g, moduleIds, _h, pageIds, _j, rubricIds, params, oldStart, oldEnd, newStart, newEnd, _k, daySubstitutionMap_1, dayNumberSubstitutionMap_1, i, id, name_1, contentMigration, workflowState, migrationIssuesCount, CHECK_INTERVAL_MS_1, numIterations, i, status_1, migrationIssues_1, errorsAsText, errorMessage, err_1, sourceAssignments, destinationAssignments, assignmentGroupMap, assignmentMap, sourceAssignmentGroups, destinationAssignmentGroups, sourceCourse, applyAssignmentGroupWeights, _loop_1, this_1, i, i, sourceAssignment, assignmentGroupId, destinationAssignmentGroupId, destinationAssignmentId, parts, tag, originalAssignmentName, i, sourceAssignmentGroup, destinationAssignmentGroupId, destinationNeverDrop;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        sourceCourseId = opts.sourceCourseId, destinationCourseId = opts.destinationCourseId, include = opts.include, dateShiftOptions = opts.dateShiftOptions, _a = opts.timeoutMs, timeoutMs = _a === void 0 ? 300000 : _a;
                        _b = include.fileIds, fileIds = _b === void 0 ? [] : _b, _c = include.quizIds, quizIds = _c === void 0 ? [] : _c, _d = include.assignmentIds, assignmentIds = _d === void 0 ? [] : _d, _e = include.announcementIds, announcementIds = _e === void 0 ? [] : _e, _f = include.discussionTopicsIds, discussionTopicsIds = _f === void 0 ? [] : _f, _g = include.moduleIds, moduleIds = _g === void 0 ? [] : _g, _h = include.pageIds, pageIds = _h === void 0 ? [] : _h, _j = include.rubricIds, rubricIds = _j === void 0 ? [] : _j;
                        params = {
                            migration_type: 'course_copy_importer',
                            settings: {
                                source_course_id: sourceCourseId,
                                overwrite_quizzes: true,
                            },
                        };
                        // Add selected ids to the request
                        params.select = {
                            files: fileIds,
                            quizzes: quizIds,
                            assignments: assignmentIds,
                            announcements: announcementIds,
                            discussion_topics: discussionTopicsIds,
                            modules: moduleIds,
                            pages: pageIds,
                            rubrics: rubricIds,
                        };
                        // if we remove dates we don't need to provide start and end dates,
                        // but if we shift dates, we do
                        if (dateShiftOptions.dateHandling === DateHandling_1.DateHandlingType.RemoveDates) {
                            params.date_shift_options = {
                                remove_dates: true,
                            };
                        }
                        else if (dateShiftOptions.dateHandling === DateHandling_1.DateHandlingType.ShiftDates) {
                            oldStart = dateShiftOptions.oldStart, oldEnd = dateShiftOptions.oldEnd, newStart = dateShiftOptions.newStart, newEnd = dateShiftOptions.newEnd, _k = dateShiftOptions.daySubstitutionMap, daySubstitutionMap_1 = _k === void 0 ? {} : _k;
                            dayNumberSubstitutionMap_1 = {};
                            Object.keys(daySubstitutionMap_1).forEach(function (k) {
                                var key = k;
                                dayNumberSubstitutionMap_1[DateHandling_1.dayOfWeekToNumber[key]] = (DateHandling_1.dayOfWeekToNumber[daySubstitutionMap_1[key]]);
                            });
                            // Add date shift info to the request
                            params.date_shift_options = {
                                shift_dates: true,
                                old_start_date: oldStart,
                                old_end_date: oldEnd,
                                new_start_date: newStart,
                                new_end_date: newEnd,
                                day_substitutions: dayNumberSubstitutionMap_1,
                            };
                        }
                        i = 0;
                        _l.label = 1;
                    case 1:
                        if (!(i < assignmentIds.length)) return [3 /*break*/, 4];
                        id = assignmentIds[i];
                        return [4 /*yield*/, this.api.course.assignment.get({
                                assignmentId: id,
                                courseId: sourceCourseId,
                            })];
                    case 2:
                        name_1 = (_l.sent()).name;
                        this.api.course.assignment.update({
                            assignmentId: id,
                            courseId: sourceCourseId,
                            name: "".concat(name_1).concat(assignmentTagPrefix).concat(id),
                        });
                        _l.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _l.trys.push([4, 13, , 14]);
                        return [4 /*yield*/, this.visitEndpoint({
                                path: "".concat(API_PREFIX_1.default, "/courses/").concat(destinationCourseId, "/content_migrations"),
                                action: 'perform a course content migration',
                                method: 'POST',
                                params: params,
                            })];
                    case 5:
                        contentMigration = _l.sent();
                        workflowState = 'running';
                        migrationIssuesCount = 0;
                        CHECK_INTERVAL_MS_1 = 500;
                        numIterations = Math.ceil(timeoutMs / CHECK_INTERVAL_MS_1);
                        i = 0;
                        _l.label = 6;
                    case 6:
                        if (!(i < numIterations)) return [3 /*break*/, 10];
                        // Wait for CHECK_INTERVAL_MS
                        return [4 /*yield*/, new Promise(function (resolve) {
                                setTimeout(resolve, CHECK_INTERVAL_MS_1);
                            })];
                    case 7:
                        // Wait for CHECK_INTERVAL_MS
                        _l.sent();
                        return [4 /*yield*/, this.visitEndpoint({
                                path: "".concat(API_PREFIX_1.default, "/courses/").concat(destinationCourseId, "/content_migrations/").concat(contentMigration.id),
                                action: 'check the status of a content migration',
                                method: 'GET',
                            })];
                    case 8:
                        status_1 = _l.sent();
                        workflowState = status_1.workflow_state;
                        migrationIssuesCount = status_1.migration_issues_count;
                        // If the workflow is no longer running, end the loop
                        if (workflowState === 'completed' || workflowState === 'failed') {
                            return [3 /*break*/, 10];
                        }
                        _l.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 6];
                    case 10:
                        // Detect a timeout (if the workflow never left the pending state)
                        if (workflowState !== 'completed' && workflowState !== 'failed') {
                            throw new caccl_error_1.default({
                                message: 'Migration timed out',
                                code: ErrorCode_1.default.MigrationTimeout,
                            });
                        }
                        if (!(migrationIssuesCount > 0)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.visitEndpoint({
                                path: "".concat(API_PREFIX_1.default, "/courses/").concat(destinationCourseId, "/content_migrations/").concat(contentMigration.id, "/migration_issues"),
                                action: 'get migration issues',
                                method: 'GET',
                            })];
                    case 11:
                        migrationIssues_1 = _l.sent();
                        errorsAsText = void 0;
                        // If there is only 1 issue, we simply print the issue.
                        // If there is more than 1, we need to concatenate these
                        // issues with commas + ands
                        if (migrationIssuesCount === 1) {
                            errorsAsText = migrationIssues_1[0].description;
                        }
                        else if (migrationIssuesCount === 2) {
                            errorsAsText = "".concat(migrationIssues_1[0].description, " and ").concat(migrationIssues_1[1].description);
                        }
                        else {
                            errorsAsText = (migrationIssues_1
                                // Extract only the descriptions and add "and" to last item
                                .map(function (migrationIssue, i) {
                                if (i === migrationIssues_1.length - 1) {
                                    return "and ".concat(migrationIssue.description);
                                }
                                return migrationIssue.description;
                            })
                                // Put together
                                .join(', '));
                        }
                        errorMessage = "We ran into an error while migrating your course content: ".concat(errorsAsText, ".");
                        throw new caccl_error_1.default({
                            message: errorMessage,
                            code: ErrorCode_1.default.MigrationIssue,
                        });
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        err_1 = _l.sent();
                        if (err_1 instanceof caccl_error_1.default) {
                            // Rethrow the error (it's already in the right format)
                            throw err_1;
                        }
                        // An unknown error occurred. Throw a new error
                        throw new caccl_error_1.default({
                            message: err_1,
                            code: ErrorCode_1.default.MigrationIssue,
                        });
                    case 14: return [4 /*yield*/, this.api.course.assignment.list({
                            courseId: sourceCourseId,
                        })];
                    case 15:
                        sourceAssignments = _l.sent();
                        // filter sourceAssignments to only those that were migrated
                        sourceAssignments = sourceAssignments.filter(function (assignment) {
                            return assignmentIds.includes(assignment.id);
                        });
                        return [4 /*yield*/, this.api.course.assignment.list({
                                courseId: destinationCourseId,
                            })];
                    case 16:
                        destinationAssignments = _l.sent();
                        assignmentGroupMap = {};
                        assignmentMap = {};
                        // iterate through each source assignment to determine the mapping
                        sourceAssignments.forEach(function (sourceAssignment) {
                            var destinationAssignment = destinationAssignments.find(function (assignment) {
                                return assignment.name === sourceAssignment.name;
                            });
                            if (destinationAssignment) {
                                assignmentMap[sourceAssignment.id] = destinationAssignment.id;
                            }
                            else {
                                throw new caccl_error_1.default({
                                    message: 'Could not find a migrated assignment in the destination course.',
                                    code: ErrorCode_1.default.CouldNotFindDestinationAssignment,
                                });
                            }
                        });
                        return [4 /*yield*/, this.api.course.assignmentGroup.list({
                                courseId: sourceCourseId,
                            })];
                    case 17:
                        sourceAssignmentGroups = _l.sent();
                        return [4 /*yield*/, this.api.course.assignmentGroup.list({
                                courseId: destinationCourseId,
                            })];
                    case 18:
                        destinationAssignmentGroups = _l.sent();
                        return [4 /*yield*/, this.api.course.get({
                                courseId: sourceCourseId,
                            })];
                    case 19:
                        sourceCourse = _l.sent();
                        applyAssignmentGroupWeights = sourceCourse.apply_assignment_group_weights;
                        _loop_1 = function (i) {
                            var sourceId, sourceAssignmentGroup, destinationAssignmentGroup;
                            return __generator(this, function (_m) {
                                switch (_m.label) {
                                    case 0:
                                        sourceId = sourceAssignmentGroups[i].id;
                                        return [4 /*yield*/, this_1.api.course.assignmentGroup.get({
                                                assignmentGroupId: sourceId,
                                                courseId: sourceCourseId,
                                            })];
                                    case 1:
                                        sourceAssignmentGroup = _m.sent();
                                        destinationAssignmentGroup = destinationAssignmentGroups.find(function (assignmentGroup) {
                                            return assignmentGroup.name === sourceAssignmentGroup.name;
                                        });
                                        if (!destinationAssignmentGroup) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_1.api.course.assignmentGroup.update({
                                                courseId: destinationCourseId,
                                                assignmentGroupId: destinationAssignmentGroup.id,
                                                weight: (applyAssignmentGroupWeights
                                                    ? sourceAssignmentGroup.group_weight
                                                    : undefined),
                                            })];
                                    case 2:
                                        // assignment group exists: update weights
                                        destinationAssignmentGroup = _m.sent();
                                        return [3 /*break*/, 5];
                                    case 3: return [4 /*yield*/, this_1.api.course.assignmentGroup.create({
                                            courseId: destinationCourseId,
                                            name: sourceAssignmentGroup.name,
                                            weight: (applyAssignmentGroupWeights
                                                ? sourceAssignmentGroup.group_weight
                                                : undefined),
                                        })];
                                    case 4:
                                        // assignment group doesn't exist: create it, start it off with the weights
                                        destinationAssignmentGroup = _m.sent();
                                        _m.label = 5;
                                    case 5: 
                                    // set apply_assignment_group_weights to true/false in the destination course
                                    return [4 /*yield*/, this_1.visitEndpoint({
                                            path: "".concat(API_PREFIX_1.default, "/courses/").concat(destinationCourseId),
                                            action: 'set apply_assignment_group_weights to true',
                                            method: 'PUT',
                                            params: {
                                                course: {
                                                    apply_assignment_group_weights: applyAssignmentGroupWeights,
                                                },
                                            },
                                        })];
                                    case 6:
                                        // set apply_assignment_group_weights to true/false in the destination course
                                        _m.sent();
                                        // add assignment group mapping
                                        assignmentGroupMap[sourceId] = destinationAssignmentGroup.id;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _l.label = 20;
                    case 20:
                        if (!(i < sourceAssignmentGroups.length)) return [3 /*break*/, 23];
                        return [5 /*yield**/, _loop_1(i)];
                    case 21:
                        _l.sent();
                        _l.label = 22;
                    case 22:
                        i++;
                        return [3 /*break*/, 20];
                    case 23:
                        i = 0;
                        _l.label = 24;
                    case 24:
                        if (!(i < sourceAssignments.length)) return [3 /*break*/, 28];
                        sourceAssignment = sourceAssignments[i];
                        assignmentGroupId = sourceAssignment.assignment_group_id;
                        destinationAssignmentGroupId = assignmentGroupMap[assignmentGroupId];
                        // throw an error if the assignment group id is not in the map
                        if (!destinationAssignmentGroupId) {
                            throw new caccl_error_1.default({
                                message: 'Could not find assignment group id in map',
                                code: ErrorCode_1.default.CouldNotFindDestinationAssignmentGroup,
                            });
                        }
                        destinationAssignmentId = assignmentMap[sourceAssignment.id];
                        // throw an error if the assignment id is not in the map
                        if (!destinationAssignmentId) {
                            throw new caccl_error_1.default({
                                message: 'Could not find assignment id in map',
                                code: ErrorCode_1.default.CouldNotFindDestinationAssignment,
                            });
                        }
                        parts = sourceAssignment.name.split('#');
                        tag = parts[parts.length - 1];
                        originalAssignmentName = sourceAssignment.name.substring(
                        // Start at beginning of name
                        0, 
                        // Cut off the tag from the end
                        sourceAssignment.name.length - ("".concat(assignmentTagPrefix).concat(tag)).length);
                        // Update the assignment group id of the assignment and remove the tag from the name in the destination course
                        return [4 /*yield*/, this.api.course.assignment.update({
                                courseId: destinationCourseId,
                                assignmentId: destinationAssignmentId,
                                assignmentGroupId: destinationAssignmentGroupId,
                                name: originalAssignmentName,
                            })];
                    case 25:
                        // Update the assignment group id of the assignment and remove the tag from the name in the destination course
                        _l.sent();
                        // remove tag from name in original course
                        return [4 /*yield*/, this.api.course.assignment.update({
                                courseId: sourceCourseId,
                                assignmentId: sourceAssignment.id,
                                name: originalAssignmentName,
                            })];
                    case 26:
                        // remove tag from name in original course
                        _l.sent();
                        _l.label = 27;
                    case 27:
                        i++;
                        return [3 /*break*/, 24];
                    case 28:
                        i = 0;
                        _l.label = 29;
                    case 29:
                        if (!(i < sourceAssignmentGroups.length)) return [3 /*break*/, 32];
                        sourceAssignmentGroup = sourceAssignmentGroups[i];
                        destinationAssignmentGroupId = assignmentGroupMap[sourceAssignmentGroup.id];
                        destinationNeverDrop = [];
                        if (sourceAssignmentGroup.rules.never_drop) {
                            destinationNeverDrop = sourceAssignmentGroup.rules.never_drop.map(function (id) { return assignmentMap[id]; });
                        }
                        // update destination assignment group
                        return [4 /*yield*/, this.api.course.assignmentGroup.update({
                                courseId: destinationCourseId,
                                assignmentGroupId: destinationAssignmentGroupId,
                                dropLowest: sourceAssignmentGroup.rules.drop_lowest,
                                dropHighest: sourceAssignmentGroup.rules.drop_highest,
                                neverDrop: destinationNeverDrop,
                            })];
                    case 30:
                        // update destination assignment group
                        _l.sent();
                        _l.label = 31;
                    case 31:
                        i++;
                        return [3 /*break*/, 29];
                    case 32: return [2 /*return*/];
                }
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