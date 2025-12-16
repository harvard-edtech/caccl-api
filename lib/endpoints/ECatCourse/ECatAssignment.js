"use strict";
/**
 * Functions for interacting with assignments within courses
 * @namespace api.course.assignment
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
// Import caccl
var caccl_error_1 = __importDefault(require("caccl-error"));
// Import shared classes
var EndpointCategory_1 = __importDefault(require("../../shared/EndpointCategory"));
var ErrorCode_1 = __importDefault(require("../../shared/types/ErrorCode"));
// Import shared helpers
var utils_1 = __importDefault(require("../../shared/helpers/utils"));
var waitForCompletion_1 = __importDefault(require("../../shared/helpers/waitForCompletion"));
var parallelLimit_1 = __importDefault(require("../../shared/helpers/parallelLimit"));
// Import shared constants
var API_PREFIX_1 = __importDefault(require("../../shared/constants/API_PREFIX"));
// Endpoint category
var ECatAssignment = /** @class */ (function (_super) {
    __extends(ECatAssignment, _super);
    function ECatAssignment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                           Table of Contents:                           */
    /*                           - Assignments                                */
    /*                           - Grading                                    */
    /*                           - Overrides                                  */
    /*                           - Submissions                                */
    /*------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------*/
    /*                          Assignment Endpoints                          */
    /*------------------------------------------------------------------------*/
    /**
     * Lists the assignments in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   query
     * @param {boolean} [opts.ignoreOverridesForDates] if true, assignment
     *   dates are taken from the default dates instead of from the ones in
     *   overrides
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignment[]>} list of Canvas Assignments {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
     */
    ECatAssignment.prototype.list = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of assignments in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments"),
                        method: 'GET',
                        params: {
                            override_assignment_dates: !opts.ignoreOverridesForDates,
                        },
                    })];
            });
        });
    };
    /**
     * Get info on a specific assignment in a course
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts  object containing all arguments
     * @param {number} opts.assignmentId  Canvas assignment Id
     * @param {number} [opts.courseId=default course id]  Canvas course Id to query
     * @param {boolean} [opts.ignoreOverridesForDates]  if true, assignment
     *   dates are taken from the default dates instead of from the ones in
     *   overrides
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
     */
    ECatAssignment.prototype.get = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on a specific assignment in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId),
                        method: 'GET',
                        params: {
                            override_assignment_dates: !opts.ignoreOverridesForDates,
                        },
                    })];
            });
        });
    };
    /**
     * Updates a Canvas assignment
     * @author Gabe Abrams
     * @method update
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.assignmentId Canvas assignment Id to update
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.name=current value] The name of the assignment
     * @param {number} [opts.pointsPossible=current value] Points possible
     * @param {date} [opts.dueAt=current value] Due at datetime
     * @param {date} [opts.lockAt=current value] Due at datetime
     * @param {date} [opts.unlockAt=current value] Due at datetime
     * @param {string} [opts.description=current value] html description of
     *   the assignment
     * @param {string[]} [opts.submissionTypes=current value] Submission type(s)
     * @param {string} [opts.allowedExtensions=current value] List of allowed
     *   file extensions (exclude period). Online upload must be enabled
     * @param {string} [opts.gradingType=current value] Grading type
     * @param {number} [opts.position=current value] Position in assignment
     *   list
     * @param {boolean} [opts.published=current value] If true, publish page
     *   upon creation. Must be a boolean
     * @param {boolean} [opts.muted=current value] If true, assignment is
     *   muted. Must be a boolean
     * @param {number} [opts.groupSetId=current value] Student group set Id
     * @param {number} [opts.assignmentGroupId=current value] Assignment group
     *   Id
     * @param {boolean} [opts.peerReviewsEnabled=current value] If true, users
     *   asked to submit peer reviews. Must be a boolean
     * @param {boolean} [opts.automaticPeerReviewsEnabled=current value] If
     *   true, Canvas will automatically assign peer reviews. Must be a boolean
     * @param {boolean} [opts.omitFromFinalGrade=current value] If true,
     *   assignment is omitted from the final grade. Must be a boolean
     * @param {boolean} [opts.gradeGroupStudentsIndividually=current value] If
     *   true, students in groups can be given separate grades and when one student
     *   in a group gets a grade, other students do not get graded. Must be a
     *   boolean
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
     */
    ECatAssignment.prototype.update = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update an assignment in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId),
                        method: 'PUT',
                        params: {
                            'assignment[name]': utils_1.default.includeIfTruthy(opts.name),
                            'assignment[submission_types]': utils_1.default.includeIfTruthy(opts.submissionTypes),
                            'assignment[grading_type]': utils_1.default.includeIfTruthy(opts.gradingType),
                            position: utils_1.default.includeIfTruthy(opts.position),
                            'assignment[peer_reviews]': utils_1.default.includeIfBoolean(opts.peerReviewsEnabled),
                            'assignment[automatic_peer_reviews]': utils_1.default.includeIfBoolean(opts.automaticPeerReviewsEnabled),
                            'assignment[grade_group_students_individually]': utils_1.default.includeIfBoolean(opts.gradeGroupStudentsIndividually),
                            'assignment[description]': utils_1.default.includeIfTruthy(opts.description),
                            'assignment[allowed_extensions]': utils_1.default.includeIfTruthy(opts.allowedExtensions),
                            'assignment[group_category_id]': utils_1.default.includeIfTruthy(opts.groupSetId),
                            'assignment[points_possible]': utils_1.default.includeIfNumber(opts.pointsPossible),
                            'assignment[due_at]': utils_1.default.includeIfDate(opts.dueAt),
                            'assignment[lock_at]': utils_1.default.includeIfDate(opts.lockAt),
                            'assignment[unlock_at]': utils_1.default.includeIfDate(opts.unlockAt),
                            'assignment[published]': utils_1.default.includeIfBoolean(opts.published),
                            'assignment[assignment_group_id]': utils_1.default.includeIfNumber(opts.assignmentGroupId),
                            'assignment[omit_from_final_grade]': utils_1.default.includeIfBoolean(opts.omitFromFinalGrade),
                            'assignment[muted]': utils_1.default.includeIfBoolean(opts.muted),
                        },
                    })];
            });
        });
    };
    /**
     * Creates a Canvas assignment
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   create an assignment in
     * @param {string} [opts.name=Unnamed Assignment] The name of the
     *   assignment
     * @param {number} [opts.pointsPossible=null] Points possible
     * @param {date} [opts.dueAt=null] Due at datetime
     * @param {date} [opts.lockAt=null] Due at datetime
     * @param {date} [opts.unlockAt=null] Due at datetime
     * @param {string} [opts.description=null] html description of
     *   the assignment
     * @param {string} [opts.submissionTypes=null] Submission type(s)
     * @param {string} [opts.allowedExtensions=any] List of allowed file
     *   extensions (exclude period). Online upload must be enabled
     * @param {string} [opts.gradingType=points] Grading type
     * @param {number} [opts.position=last] Position in assignment list
     * @param {boolean} [opts.published] If true, publish page upon
     *   creation
     * @param {boolean} [opts.muted] If true, assignment is muted
     * @param {number} [opts.groupSetId=null] Student group set Id
     * @param {number} [opts.assignmentGroupId=top assignment group] Assignment
     *   group Id
     * @param {boolean} [opts.peerReviewsEnabled] If true, users asked to
     *   submit peer reviews
     * @param {boolean} [opts.automaticPeerReviewsEnabled] If true,
     *   Canvas will automatically assign peer reviews
     * @param {boolean} [opts.omitFromFinalGrade] If true, assignment is
     *   omitted from the final grade
     * @param {boolean} [opts.gradeGroupStudentsIndividually] If true,
     *   students in groups can be given separate grades and when one student in a
     *   group gets a grade, other students do not get graded
     * @param {string} [opts.assignmentAppId=null] If defined, the external
     *   tool that matches this id will be used for submissions. Also, the
     *   submission types will be overwritten with ['external_tool'] and the
     *   student will be redirected via LTI to the assignmentAppURL when they
     *   launch the assignment
     * @param {string} [opts.assignmentAppURL=tool launch url] The launch URL
     *   of the external tool. If not included and assignmentAppId is defined, we
     *   will first request info on the external tool to get its launchURL and
     *   will use that value here. Only relevant if assignmentAppId is defined.
     * @param {boolean} [opts.assignmentAppNewTab] Only relevant if
     *   assignmentAppId is defined. If true, when a student clicks the
     *   assignment, their LTI session with the external tool will be opened in a
     *   new tab
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
     */
    ECatAssignment.prototype.create = function (opts, config) {
        var _a, _b;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var params, app;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        params = {
                            'assignment[name]': (opts.name || 'Unnamed Assignment'),
                            'assignment[grading_type]': (opts.gradingType || 'points'),
                            position: utils_1.default.includeIfTruthy(opts.position),
                            'assignment[peer_reviews]': (utils_1.default.isTruthy(opts.peerReviewsEnabled)),
                            'assignment[automatic_peer_reviews]': utils_1.default.isTruthy(opts.automaticPeerReviewsEnabled),
                            'assignment[grade_group_students_individually]': utils_1.default.isTruthy(opts.gradeGroupStudentsIndividually),
                            'assignment[description]': (utils_1.default.includeIfTruthy(opts.description)),
                            'assignment[allowed_extensions]': (utils_1.default.includeIfTruthy(opts.allowedExtensions)),
                            'assignment[group_category_id]': (utils_1.default.includeIfTruthy(opts.groupSetId)),
                            'assignment[points_possible]': (utils_1.default.includeIfNumber(opts.pointsPossible)),
                            'assignment[due_at]': utils_1.default.includeIfDate(opts.dueAt),
                            'assignment[lock_at]': utils_1.default.includeIfDate(opts.lockAt),
                            'assignment[unlock_at]': utils_1.default.includeIfDate(opts.unlockAt),
                            'assignment[published]': (utils_1.default.isTruthy(opts.published)),
                            'assignment[assignment_group_id]': (utils_1.default.includeIfNumber(opts.assignmentGroupId)),
                            'assignment[omit_from_final_grade]': (utils_1.default.isTruthy(opts.omitFromFinalGrade)),
                            'assignment[muted]': utils_1.default.isTruthy(opts.muted),
                        };
                        if (!opts.assignmentAppId) return [3 /*break*/, 4];
                        // Using an external tool
                        params['assignment[external_tool_tag_attributes][new_tab]'] = (!!opts.assignmentAppNewTab);
                        params['assignment[external_tool_tag_attributes][content_type]'] = ('context_external_tool');
                        params['assignment[external_tool_tag_attributes][content_id]'] = (opts.assignmentAppId);
                        params['assignment[submission_types]'] = ['external_tool'];
                        if (!opts.assignmentAppURL) return [3 /*break*/, 1];
                        // No need to fetch the launchURL
                        params['assignment[external_tool_tag_attributes][url]'] = (opts.assignmentAppURL);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.api.course.app.get({
                            courseId: ((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId),
                            appId: opts.assignmentAppId,
                        }, config)];
                    case 2:
                        app = _c.sent();
                        params['assignment[external_tool_tag_attributes][url]'] = app.url;
                        _c.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        params['assignment[submission_types]'] = (opts.submissionTypes || ['none']);
                        _c.label = 5;
                    case 5: return [2 /*return*/, this.visitEndpoint({
                            config: config,
                            action: 'create a new assignment in a course',
                            params: params,
                            path: "".concat(API_PREFIX_1.default, "/courses/").concat((_b = opts.courseId) !== null && _b !== void 0 ? _b : this.defaultCourseId, "/assignments"),
                            method: 'POST',
                        })];
                }
            });
        });
    };
    /**
     * Delete an assignment
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas assignment Id
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
     */
    ECatAssignment.prototype.delete = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'delete an assignment from a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId),
                        method: 'DELETE',
                    })];
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                            Grading Endpoints                           */
    /*------------------------------------------------------------------------*/
    /**
     * List gradeable students for a specific assignment
     * @author Gabe Abrams
     * @method listGradeableStudents
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas assignment Id to query
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    ECatAssignment.prototype.listGradeableStudents = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var students;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'get the list of students who are gradeable in a specific assignment in a course',
                            path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/gradeable_students"),
                            method: 'GET',
                        })];
                    case 1:
                        students = _b.sent();
                        return [2 /*return*/, students.filter(function (s) {
                                return !s.fake_student;
                            })];
                }
            });
        });
    };
    /**
     * Adds a comment to a submission
     * @author Gabe Abrams
     * @method createSubmissionComment
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas course Id
     * @param {number} opts.studentId Canvas student Id of the sub to comment
     *   on
     * @param {string} opts.comment The text of the comment
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    ECatAssignment.prototype.createSubmissionComment = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a new comment on a submission',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/submissions/").concat(opts.studentId),
                        method: 'PUT',
                        params: {
                            'comment[text_comment]': opts.comment,
                        },
                    })];
            });
        });
    };
    /**
     * Updates a student's grade and/or comment
     * @author Gabe Abrams
     * @method updateGrade
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas assignment id
     * @param {number} opts.studentId Canvas student id
     * @param {number} [opts.courseId=default course id] Canvas course id
     * @param {number} [opts.points] the overall points to assign to the
     *   student
     * @param {string} [opts.comment] the grader comment to leave on the
     *   submission
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    ECatAssignment.prototype.updateGrade = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update student grade and/or comments for a specific assignment in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/submissions/").concat(opts.studentId),
                        method: 'PUT',
                        params: {
                            'comment[text_comment]': utils_1.default.includeIfTruthy(opts.comment),
                            'submission[posted_grade]': utils_1.default.includeIfNumber(opts.points),
                        },
                    })];
            });
        });
    };
    /**
     * Batch updates grades and/or comments. Also supports updating rubric items
     * @author Gabe Abrams
     * @method updateGrades
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas assignment Id
     * @param {Array} opts.gradeItems List of grade items to upload to Canvas:
     *   [{
     *     studentId: <student id>,
     *     points: <optional, points to overwrite with>,
     *     comment: <optional, comment to append (or overwrite if rubric comment)>,
     *     rubricId: <optional, rubric item (overall grade/comment if excluded)>
     *   },...]
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {boolean} [opts.waitForCompletion] If true, promise won't
     *   resolve until Canvas has finished updating the grades, instead of resolving
     *   once the grade changes have been queued
     * @param {number} [opts.waitForCompletionTimeout=2] The number of minutes
     *   to wait before timing out the grade update job
     * @param {boolean} [opts.dontMergeRubricItemUpdates] When uploading
     *   grades to a rubric item, we intelligently merge rubric item updates with
     *   previous rubric assessments. For instance, if the assignment's rubric is:
     *     { grammar, argument, formatting }
     *   And the student of interest has the following rubric assessment so far:
     *     { grammar: 10/10, argument: 8/10, formatting: ungraded }
     *   When we upload a new gradeItem (9/10 points) to the student's
     *   formatting rubric item, the result is:
     *     { grammar: 10/10, argument: 8/10, formatting: 9/10 }
     *   However, if dontMergeRubricItemUpdates=true, the result is:
     *     { grammar: ungraded, argument: ungraded, formatting: 9/10 }
     *   Note: merging is an added feature. By default, the Canvas API does not
     *   merge rubric assessments.
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasProgress>} Canvas Progress object {@link https://canvas.instructure.com/doc/api/progress.html#Progress}
     */
    ECatAssignment.prototype.updateGrades = function (opts, config) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var studentsToMerge, performRubricItemMerge, assignment, realRubricItemIds_1, numRubricItems_1, studentToRubricItemsOverwritten_1, allStudentsWithRubricItems_1, subs, params, overwritingMap_1, progress, finishedProgress;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        studentsToMerge = [];
                        performRubricItemMerge = false;
                        if (!opts.dontMergeRubricItemUpdates) {
                            performRubricItemMerge = opts.gradeItems.some(function (item) {
                                return item.rubricId;
                            });
                        }
                        if (!performRubricItemMerge) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api.course.assignment.get({
                                courseId: ((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId),
                                assignmentId: opts.assignmentId,
                            }, config)];
                    case 1:
                        assignment = _c.sent();
                        // Make sure the assignment has a rubric
                        if (!assignment.rubric) {
                            // This assignment doesn't have a rubric
                            throw new caccl_error_1.default({
                                message: 'We could not upload grades because the rubric we were trying to upload to didn\'t exist.',
                                code: ErrorCode_1.default.NoRubricOnBatchGradeUpload,
                            });
                        }
                        realRubricItemIds_1 = new Set();
                        numRubricItems_1 = assignment.rubric.length;
                        assignment.rubric.forEach(function (rubricItem) {
                            realRubricItemIds_1.add(rubricItem.id);
                        });
                        studentToRubricItemsOverwritten_1 = (new Map());
                        allStudentsWithRubricItems_1 = new Set();
                        // ^ {studentId => { Set of rubric ids being uploaded }}
                        opts.gradeItems.forEach(function (gradeItem) {
                            var rubricId = gradeItem.rubricId, studentId = gradeItem.studentId;
                            allStudentsWithRubricItems_1.add(studentId);
                            // Skip if this item isn't a (real) rubric item
                            if (!rubricId || realRubricItemIds_1.has(rubricId)) {
                                return;
                            }
                            // Only mark this rubric item as being overwritten if both points and
                            // comments are being overwritten
                            if (gradeItem.points === undefined
                                || gradeItem.points === null
                                || !gradeItem.comment) {
                                // Not completely overwriting
                                return;
                            }
                            // Keep track of rubric items that are found
                            if (!studentToRubricItemsOverwritten_1.has(studentId)) {
                                // Initialize student map
                                studentToRubricItemsOverwritten_1.set(studentId, new Set());
                            }
                            studentToRubricItemsOverwritten_1.get(studentId).add(rubricId);
                        });
                        // > Find students that need to be merged (has some rubric items but not
                        // completely overwriting all of them)
                        allStudentsWithRubricItems_1.forEach(function (studentId) {
                            var numOverwrittenItems = ((studentToRubricItemsOverwritten_1.get(studentId)
                                || { size: 0 }).size);
                            if (numOverwrittenItems < numRubricItems_1) {
                                // Need to merge this student
                                studentsToMerge.push(studentId);
                            }
                        });
                        _c.label = 2;
                    case 2: return [4 /*yield*/, (0, parallelLimit_1.default)(studentsToMerge.map(function (studentId) {
                            return function () { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    return [2 /*return*/, this.api.course.assignment.getSubmission({
                                            studentId: studentId,
                                            courseId: ((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId),
                                            assignmentId: opts.assignmentId,
                                            includeRubricAssessment: true,
                                            excludeUser: true, // Save request space
                                        }, config)];
                                });
                            }); };
                        }), 10)];
                    case 3:
                        subs = _c.sent();
                        params = {};
                        if (subs.length > 0) {
                            overwritingMap_1 = {};
                            // ^ {studentId => rubricId => {
                            //      points: true/false, is being overwritten,
                            //      comment: true/false, is being overwritten
                            //    }}
                            opts.gradeItems.forEach(function (gradeItem) {
                                if (!gradeItem.rubricId) {
                                    // No need to keep track of non-rubric item updates
                                    // (these are not being merged)
                                    return;
                                }
                                var sid = gradeItem.studentId;
                                var rid = gradeItem.rubricId;
                                // Initialize map if needed
                                if (!overwritingMap_1[sid]) {
                                    overwritingMap_1[sid] = {};
                                }
                                if (!overwritingMap_1[sid][rid]) {
                                    overwritingMap_1[sid][rid] = { points: false, comment: false };
                                }
                                // Save points and comments
                                if (gradeItem.points !== undefined) {
                                    overwritingMap_1[sid][rid].points = true;
                                }
                                if (gradeItem.comment !== undefined) {
                                    overwritingMap_1[sid][rid].comment = true;
                                }
                            });
                            // Perform actual merge
                            subs.forEach(function (sub) {
                                if (!sub.rubric_assessment) {
                                    // No need to merge: submission has no rubric content yet
                                    return;
                                }
                                var sid = sub.user_id;
                                // Loop through rubric items and merge
                                Object.keys(sub.rubric_assessment).forEach(function (rubricId) {
                                    // Get previous values
                                    var oldPoints = sub.rubric_assessment[rubricId].points;
                                    var oldComment = sub.rubric_assessment[rubricId].comments;
                                    // Check if we're overwriting these values
                                    var overwritePoints;
                                    var overwriteComment;
                                    if (overwritingMap_1[sid] && overwritingMap_1[sid][rubricId]) {
                                        overwritePoints = overwritingMap_1[sid][rubricId].points;
                                        overwriteComment = overwritingMap_1[sid][rubricId].comment;
                                    }
                                    // Add old value
                                    if (oldPoints !== undefined
                                        && oldPoints !== null
                                        && !overwritePoints) {
                                        // We have an old points val and we're not overwriting it
                                        // (include the old points value)
                                        params["grade_data[".concat(sid, "][rubric_assessment][").concat(rubricId, "][points]")] = oldPoints;
                                    }
                                    if (oldComment && !overwriteComment) {
                                        // We have an old comment and we're not overwriting it
                                        // (include the old comment)
                                        params["grade_data[".concat(sid, "][rubric_assessment][").concat(rubricId, "][comments]")] = oldComment;
                                    }
                                });
                            });
                        }
                        // Add rest of grade item updates to params
                        opts.gradeItems.forEach(function (gradeItem) {
                            if (gradeItem.rubricId) {
                                if (gradeItem.points !== undefined) {
                                    params["grade_data[".concat(gradeItem.studentId, "][rubric_assessment][").concat(gradeItem.rubricId, "][points]")] = gradeItem.points;
                                }
                                if (gradeItem.comment) {
                                    params["grade_data[".concat(gradeItem.studentId, "][rubric_assessment][").concat(gradeItem.rubricId, "][comments]")] = gradeItem.comment;
                                }
                            }
                            else {
                                if (gradeItem.points !== undefined) {
                                    params["grade_data[".concat(gradeItem.studentId, "][posted_grade]")] = gradeItem.points;
                                }
                                if (gradeItem.comment) {
                                    params["grade_data[".concat(gradeItem.studentId, "][text_comment]")] = gradeItem.comment;
                                }
                            }
                        });
                        return [4 /*yield*/, this.visitEndpoint({
                                params: params,
                                config: config,
                                action: 'update student grades, comments, and/or rubric assessments for a specific assignment in a course',
                                path: "".concat(API_PREFIX_1.default, "/courses/").concat((_b = opts.courseId) !== null && _b !== void 0 ? _b : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/submissions/update_grades"),
                                method: 'POST',
                            })];
                    case 4:
                        progress = _c.sent();
                        if (!opts.waitForCompletion) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, waitForCompletion_1.default)({
                                progress: progress,
                                visitEndpoint: this.visitEndpoint,
                                timeoutMin: opts.waitForCompletionTimeout,
                            })];
                    case 5:
                        finishedProgress = _c.sent();
                        return [2 /*return*/, finishedProgress];
                    case 6: return [2 /*return*/, progress];
                }
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                      Assignment Override Endpoints                     */
    /*------------------------------------------------------------------------*/
    /**
     * Gets the list of overrides for an assignment
     * @author Gabe Abrams
     * @method listOverrides
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas assignment id to look up
     * @param {number} [opts.courseId=default course id] Canvas course id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentOverride[]>} list of Canvas AssignmentOverrides {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
     */
    ECatAssignment.prototype.listOverrides = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get a list of assignment overrides for a specific assignment in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/overrides"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Get a specific override on an assignment in a course
     * @author Gabe Abrams
     * @method getOverride
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas assignment id to query
     * @param {number} opts.overrideId Canvas override id to look up
     * @param {number} [opts.courseId=default course id] Canvas course id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
     */
    ECatAssignment.prototype.getOverride = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get a list of assignment overrides for a specific assignment in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/overrides/").concat(opts.overrideId),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Create assignment override. Note that if any dates (dueAt, unlockAt, or
     *   lockAt) are left out, they will be set to "none" for the target(s) of this
     *   override. If dueAt is omitted, the target(s) will have no deadline. If
     *   unlockAt is omitted, the target(s) will immediately be able to see the
     *   assignment (even if everyone else has to wait until the unlockAt date). If
     *   lockAt is omitted, the target(s) will be able to submit at any
     *   time in the future (even if everyone else can't submit because their lock
     *   date has passed). In short, it is not recommended to omit dates that are
     *   defined in the assignment.
     * @author Gabe Abrams
     * @method createOverride
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas assignment id
     * @param {number} [opts.courseId=default course id] Canvas course id
     * @param {number[]} [opts.studentIds] List of Canvas student IDs to override
     *   (Note: either studentIds, groupId, or sectionId must be included)
     * @param {number} [opts.groupId] Group to override, must be a group
     *   assignment (Note: either studentIds, groupId, or sectionId must be
     *   included)
     * @param {number} [opts.sectionId] Section to override (Note: either
     *   studentIds, groupId, or sectionId must be included)
     * @param {string} [opts.title=Override for X students] Title of the
     *   override
     * @param {date} [opts.dueAt=no due date] New due date. If excluded, the
     *   target(s) of this override have no due date (they can submit whenever they
     *   want without being marked as late)
     * @param {date} [opts.unlockAt=no unlock date] New unlock date. If
     *   excluded, the target(s) of this override can immediately see the assignment
     *   (their unlock date is the beginning of time)
     * @param {date} [opts.lockAt=no lock date] New lock date. If excluded,
     *   the target(s) of this override can see and submit the assignment at
     *   any point in the future (their lock date is the end of time)
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
     */
    ECatAssignment.prototype.createOverride = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var title, dueAt, unlockAt, lockAt;
            return __generator(this, function (_b) {
                title = opts.title;
                if (!title) {
                    title = "Override for ".concat(opts.studentIds.length, " student").concat(utils_1.default.sIfPlural(opts.studentIds.length));
                }
                dueAt = utils_1.default.includeIfDate(opts.dueAt) || null;
                unlockAt = utils_1.default.includeIfDate(opts.unlockAt) || null;
                lockAt = utils_1.default.includeIfDate(opts.lockAt) || null;
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a new override for a specific assignment in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/overrides"),
                        method: 'POST',
                        params: {
                            'assignment_override[title]': utils_1.default.includeIfTruthy(title),
                            'assignment_override[student_ids]': utils_1.default.includeIfTruthy(opts.studentIds),
                            'assignment_override[group_id]': utils_1.default.includeIfTruthy(opts.groupId),
                            'assignment_override[course_section_id]': utils_1.default.includeIfTruthy(opts.sectionId),
                            'assignment_override[due_at]': dueAt,
                            'assignment_override[unlock_at]': unlockAt,
                            'assignment_override[lock_at]': lockAt,
                        },
                    })];
            });
        });
    };
    /**
     * Update an assignment override. Note: target can only be updated if the
     *   override is a student override (if this is a group or section override,
     *   the target remains unchanged).
     *   Also, note that if any dates (dueAt, unlockAt, or lockAt) are omitted,
     *   their previous override values will be changed to "none." For instance,
     *   if the previous override has a dueAt and the update does not, the updated
     *   override will have no dueAt date (the target(s) of the override will have
     *   no deadline).
     * @author Gabe Abrams
     * @method updateOverride
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas assignment id
     * @param {number} opts.overrideId the override id to update
     * @param {number[]} opts.studentIds List of Canvas student IDs being
     *   overridden
     * @param {number} [opts.courseId=default course id] Canvas course id
     * @param {string} [opts.title=current value] New title of the
     *   override
     * @param {date} [opts.dueAt=no due date] New due date. If excluded, the
     *   target(s) of this override have no due date (they can submit whenever they
     *   want without being marked as late)
     * @param {date} [opts.unlockAt=no unlock date] New unlock date. If
     *   excluded, the target(s) of this override can immediately see the assignment
     *   (their unlock date is the beginning of time)
     * @param {date} [opts.lockAt=no lock date] New lock date. If excluded,
     *   the target(s) of this override can see and submit the assignment at
     *   any point in the future (their lock date is the end of time)
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
     */
    ECatAssignment.prototype.updateOverride = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var dueAt, unlockAt, lockAt;
            return __generator(this, function (_b) {
                dueAt = utils_1.default.includeIfDate(opts.dueAt) || null;
                unlockAt = utils_1.default.includeIfDate(opts.unlockAt) || null;
                lockAt = utils_1.default.includeIfDate(opts.lockAt) || null;
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update an override for a specific assignment in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/overrides/").concat(opts.overrideId),
                        method: 'PUT',
                        params: {
                            'assignment_override[title]': utils_1.default.includeIfTruthy(opts.title),
                            'assignment_override[student_ids]': utils_1.default.includeIfTruthy(opts.studentIds),
                            'assignment_override[due_at]': dueAt,
                            'assignment_override[unlock_at]': unlockAt,
                            'assignment_override[lock_at]': lockAt,
                        },
                    })];
            });
        });
    };
    /**
     * Deletes an assignment override
     * @author Gabe Abrams
     * @method deleteOverride
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas assignment id to query
     * @param {number} opts.overrideId Canvas override id to look up
     * @param {number} [opts.courseId=default course id] Canvas course id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
     */
    ECatAssignment.prototype.deleteOverride = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'delete an override for a specific assignment in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/overrides/").concat(opts.overrideId),
                        method: 'DELETE',
                    })];
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                     Assignment Submission Endpoints                    */
    /*------------------------------------------------------------------------*/
    /**
     * Lists the submissions to a specific assignment in a course. If the assignment
     *   has anonymous grading turned on, to exclude the test user, we will also
     *   pull the list of students in the course. If including the user object for
     *   an anonymously graded assignment, fake user objects will be created where
     *   each submissions[i].user object contains a isAnonymousUser boolean that is
     *   true
     * @author Gabe Abrams
     * @method listSubmissions
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId The Canvas assignment Id to query
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {boolean} [opts.includeComments] If truthy, includes all
     *   comments on submissions
     * @param {boolean} [opts.includeRubricAssessment] If truthy,
     *   includes rubric assessments: breakdown of score for each rubric item
     * @param {boolean} [opts.excludeUser] If truthy, excludes
     *   submission[i].user value with the submission's user information
     * @param {boolean} [opts.includeTestStudent] If truthy, includes
     *   dummy submission by test student (student view) if there is one. Note:
     *   if anonymous grading is enabled for this assignment, includeTestStudent
     *   will be true because we don't know which student is the test student
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission[]>} list of Canvas submissions {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    ECatAssignment.prototype.listSubmissions = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var fetchUser, subs, realSubs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fetchUser = (!opts.includeTestStudent
                            || !opts.excludeUser);
                        return [4 /*yield*/, this.visitEndpoint({
                                config: config,
                                action: 'list the submissions to a specific assignment in a course',
                                path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/submissions"),
                                method: 'GET',
                                params: {
                                    include: utils_1.default.genIncludesList({
                                        submission_comments: opts.includeComments,
                                        rubric_assessment: opts.includeRubricAssessment,
                                        user: fetchUser,
                                    }),
                                },
                            })];
                    case 1:
                        subs = _b.sent();
                        // Filter test student if applicable
                        if (!opts.includeTestStudent) {
                            // Handle empty list case
                            if (!subs || subs.length === 0) {
                                return [2 /*return*/, []];
                            }
                            realSubs = subs.filter(function (sub) {
                                return (!sub.user
                                    || sub.user.name !== 'Test Student');
                            });
                            // Finish
                            return [2 /*return*/, realSubs];
                        }
                        // Not filtering out test student. Just return subs
                        return [2 /*return*/, subs];
                }
            });
        });
    };
    /**
     * Lists the submissions for a batch of assignment/students in a course
     * @author Gabe Abrams
     * @method listAllSubmissions
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {number[]} [opts.studentIds=all students] a list of
     *   specific students to pull submissions for
     * @param {number[]} [opts.assignmentIds=all assignments] a list of
     *   assignments to get submissions for
     * @param {Date} [opts.submittedSince=beginning of time] Exclude
     *   submissions that were not submitted or were submitted before this date
     * @param {Date} [opts.gradedSince=beginning of time] Exclude
     *   submissions that were not graded or were graded before this date
     * @param {string} [opts.workflowState=all workflows] a workflow state
     *   to filter by. Allowed values: 'submitted', 'unsubmitted', 'graded', or
     *   'pending_review'
     * @param {string} [opts.enrollmentState=all states except deleted] an
     *   enrollment state to filter by. Allowed values: 'active' or 'concluded'
     * @param {boolean} [opts.includeSubmissionHistory] if true, submission
     *   history is included
     * @param {boolean} [opts.includeComments] if true, includes all comments
     *   on submissions
     * @param {boolean} [opts.includeRubricAssessment] if true,
     *   rubric assessment is included
     * @param {boolean} [opts.includeAssignment] if true, the assignment is
     *   included for each submission
     * @param {boolean} [opts.includeTotalScores] if true, include the total
     *   scores
     * @param {boolean} [opts.includeVisibility] if true, include visibility
     * @param {boolean} [opts.includeUser] if true, include the user info
     *   with each submission
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission[]>} list of submissions {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    ECatAssignment.prototype.listAllSubmissions = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'list a batch of submissions in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/students/submissions"),
                        method: 'GET',
                        params: {
                            student_ids: (opts.studentIds
                                ? opts.studentIds
                                : ['all']),
                            assignment_ids: opts.assignmentIds,
                            submitted_since: utils_1.default.includeIfDate(opts.submittedSince),
                            graded_since: utils_1.default.includeIfDate(opts.gradedSince),
                            workflow_state: utils_1.default.includeIfTruthy(opts.workflowState),
                            enrollment_state: utils_1.default.includeIfTruthy(opts.enrollmentState),
                            include: utils_1.default.genIncludesList({
                                submission_history: opts.includeSubmissionHistory,
                                submission_comments: opts.includeComments,
                                rubric_assessment: opts.includeRubricAssessment,
                                assignment: opts.includeAssignment,
                                total_scores: opts.includeTotalScores,
                                visibility: opts.includeVisibility,
                                user: opts.includeUser,
                            }),
                        },
                    })];
            });
        });
    };
    /**
     * Gets a single submission for an assignment
     * @author Gabe Abrams
     * @method getSubmission
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId The Canvas assignment Id
     * @param {number} opts.studentId The Canvas student Id
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {boolean} [opts.includeComments] If truthy, includes all
     *   comments on submissions
     * @param {boolean} [opts.includeRubricAssessment] If truthy,
     *   includes rubric assessments: breakdown of score for each rubric item
     * @param {boolean} [opts.excludeUser] If truthy, excludes
     *   submission[i].user value with the submission's user information
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    ECatAssignment.prototype.getSubmission = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get a specific submission to an assignment in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/submissions/").concat(opts.studentId),
                        method: 'GET',
                        params: {
                            include: utils_1.default.genIncludesList({
                                submission_comments: opts.includeComments,
                                rubric_assessment: opts.includeRubricAssessment,
                                user: !opts.excludeUser,
                            }),
                        },
                    })];
            });
        });
    };
    /**
     * Creates a text submission on behalf of the current user
     * @author Gabe Abrams
     * @method createTextSubmission
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId The Canvas assignment Id
     * @param {string} opts.text The text body of the submission
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {string} [opts.comment] A text student comment to include
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    ECatAssignment.prototype.createTextSubmission = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a text submission to a specific assignment in a course on behalf of the current user',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/submissions"),
                        method: 'POST',
                        params: {
                            'comment[text_comment]': utils_1.default.includeIfTruthy(opts.comment),
                            'submission[body]': opts.text,
                            'submission[submission_type]': 'online_text_entry',
                        },
                    })];
            });
        });
    };
    /**
     * Creates a url submission on behalf of the current user
     * @author Gabe Abrams
     * @method createURLSubmission
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId The Canvas assignment Id
     * @param {string} opts.url The url of the submission
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {string} [opts.comment] A text student comment to include
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    ECatAssignment.prototype.createURLSubmission = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a url submission to a specific assignment in a course on behalf of the current user',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/assignments/").concat(opts.assignmentId, "/submissions"),
                        method: 'POST',
                        params: {
                            'comment[text_comment]': utils_1.default.includeIfTruthy(opts.comment),
                            'submission[url]': opts.url,
                            'submission[submission_type]': 'online_url',
                        },
                    })];
            });
        });
    };
    return ECatAssignment;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatAssignment;
//# sourceMappingURL=ECatAssignment.js.map