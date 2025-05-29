"use strict";
/**
 * Functions for interacting with quizzes within courses
 * @namespace api.course.quiz
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
// eslint-disable-next-line import/no-cycle
var EndpointCategory_1 = __importDefault(require("../../shared/EndpointCategory"));
var ErrorCode_1 = __importDefault(require("../../shared/types/ErrorCode"));
// Import shared helpers
var utils_1 = __importDefault(require("../../shared/helpers/utils"));
var waitForCompletion_1 = __importDefault(require("../../shared/helpers/waitForCompletion"));
// Import shared constants
var API_PREFIX_1 = __importDefault(require("../../shared/constants/API_PREFIX"));
// Endpoint category
var ECatQuiz = /** @class */ (function (_super) {
    __extends(ECatQuiz, _super);
    function ECatQuiz() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                           Table of Contents:                           */
    /*                           - Quizzes                                    */
    /*                           - Quiz Questions                             */
    /*                           - Quiz Submissions                           */
    /*------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------*/
    /*                             Quiz Endpoints                             */
    /*------------------------------------------------------------------------*/
    /**
     * Lists the quizzes in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuiz[]>} list of Canvas Quizzes {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
     */
    ECatQuiz.prototype.list = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of quizzes in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Get info on a specific quiz in a course
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
     */
    ECatQuiz.prototype.get = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on a specific quiz in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Updates a specific quiz in a course
     * @author Gabe Abrams
     * @method update
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas course Id to create the quiz in
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   create the quiz in
     * @param {boolean} [opts.suppressNotification] If true, does not
     *   notify users that the quiz has been updated
     * @param {string} [opts.title=current value] New title of the quiz
     * @param {string} [opts.description=current value] New HTML description of
     *   the quiz
     * @param {string} [opts.type=current value] Quiz type. Allowed values: [
     *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
     * @param {date} [opts.dueAt=current value] Date the quiz is due
     * @param {date} [opts.lockAt=current value] Date the quiz is lock
     * @param {date} [opts.unlockAt=current value] Date the quiz is unlock
     * @param {boolean} [opts.published=current value] If true, quiz is
     *   published
     * @param {number} [opts.allowedAttempts=current value] Number of times a
     *   student is allowed to take the quiz. Set to1 for unlimited attempts
     * @param {string} [opts.scoringPolicy=current value] Only valid if
     *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
     * @param {boolean} [opts.oneQuestionAtATime=current value] If true, shows
     *   quiz to student one question at a time. Must be a boolean
     * @param {boolean} [opts.cantGoBack=current value] If true, shows quiz to
     *   student one question at a time. Must be a boolean
     * @param {string} [opts.accessCode=current value] If defined, restricts
     *   access to the quiz only to those with this access code
     * @param {string} [opts.ipFilter=current value] If defined, restricts
     *   access to the quiz to computers in a specified IP range. Filters can be a
     *   comma-separated list of addresses, or an address followed by a mask
     * @param {number} [opts.assignmentGroupId=current value] The assignment
     *   group to put the quiz into. Only valid if type is "assignment" or
     *   "graded_survey"
     * @param {number} [opts.timeLimitMins=current value] Time limit for the
     *   quiz in minutes
     * @param {boolean} [opts.shuffleAnswers=current value] If true, quiz
     *   answers for multiple choice questions will be randomized for each student
     * @param {string} [opts.hideResults=current value] Allowed values:
     *   ['always', 'until_after_last_attempt'], determines whether the student can
     *   see their own submission and other results
     * @param {boolean} [opts.hideCorrectAnswers=current value] Only valid if
     *   hideResults is not defined. If true, hides correct answers from students
     *   when results are viewed
     * @param {boolean} [opts.showCorrectAnswersAfterLastAttempt=current value]
     *   Only valid if hideCorrectAnswers is not true and allowedAttemptes > 1. If
     *   true, hides correct answers from students when quiz results are viewed
     *   until they submit the last attempt for the quiz. Must be a boolean
     * @param {date} [opts.showCorrectAnswersAt=current value] Only valid if
     *   hideCorrectAnswers is not true. If set, correct answers will only be
     *   visible after this date
     * @param {date} [opts.hideCorrectAnswersAt=current value] Only valid if
     *   hideCorrectAnswers is not true. If set, correct answers will stop being
     *   visible after this date has passed
     * @param {boolean} [opts.oneTimeResults=current value] Whether students
     *   should be prevented from viewing their quiz results past the first time
     *   (right after they turn in the quiz)
     * @param {boolean} [opts.onlyVisibleToOverrides=current value] If true,
     *   the quiz is only visible to students with overrides
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
     */
    ECatQuiz.prototype.update = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update a specific quiz in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId),
                        method: 'PUT',
                        params: {
                            'quiz[title]': opts.title,
                            'quiz[description]': utils_1.default.includeIfTruthy(opts.description),
                            'quiz[quiz_type]': utils_1.default.includeIfTruthy(opts.type),
                            'quiz[assignment_group_id]': utils_1.default.includeIfNumber(opts.assignmentGroupId),
                            'quiz[time_limit]': utils_1.default.includeIfNumber(opts.timeLimitMins),
                            'quiz[shuffle_answers]': utils_1.default.includeIfBoolean(opts.shuffleAnswers),
                            'quiz[hide_results]': utils_1.default.includeIfTruthy(opts.hideResults),
                            'quiz[show_correct_answers]': !utils_1.default.includeIfBoolean(opts.hideCorrectAnswers),
                            'quiz[show_correct_answers_last_attempt]': utils_1.default.includeIfBoolean(opts.showCorrectAnswersAfterLastAttempt),
                            'quiz[show_correct_answers_at]': utils_1.default.includeIfDate(opts.showCorrectAnswersAt),
                            'quiz[hide_correct_answers_at]': utils_1.default.includeIfDate(opts.hideCorrectAnswersAt),
                            'quiz[allowed_attempts]': utils_1.default.includeIfNumber(opts.allowedAttempts),
                            'quiz[scoring_policy]': utils_1.default.includeIfTruthy(opts.scoringPolicy),
                            'quiz[one_question_at_a_time]': utils_1.default.includeIfBoolean(opts.oneQuestionAtATime),
                            'quiz[cant_go_back]': utils_1.default.includeIfBoolean(opts.cantGoBack),
                            'quiz[access_code]': utils_1.default.includeIfTruthy(opts.accessCode),
                            'quiz[ip_filter]': utils_1.default.includeIfTruthy(opts.ipFilter),
                            'quiz[due_at]': utils_1.default.includeIfDate(opts.dueAt),
                            'quiz[lock_at]': utils_1.default.includeIfDate(opts.lockAt),
                            'quiz[unlock_at]': utils_1.default.includeIfDate(opts.unlockAt),
                            'quiz[published]': utils_1.default.includeIfBoolean(opts.published),
                            'quiz[one_time_results]': utils_1.default.includeIfBoolean(opts.oneTimeResults),
                            'quiz[only_visible_to_overrides]': utils_1.default.includeIfBoolean(opts.onlyVisibleToOverrides),
                            'quiz[notify_of_update]': !utils_1.default.isTruthy(opts.suppressNotification),
                        },
                    })];
            });
        });
    };
    /**
     * Creates a new quiz in a course
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {string} opts.title Title of the new quiz
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   create the quiz in
     * @param {string} [opts.description=null] HTML description of the quiz
     * @param {string} [opts.type=null] Quiz type. Allowed values: [
     *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
     * @param {date} [opts.dueAt=null] Date the quiz is due
     * @param {date} [opts.lockAt=null] Date the quiz is lock
     * @param {date} [opts.unlockAt=null] Date the quiz is unlock
     * @param {boolean} [opts.published] If true, quiz is published
     * @param {number} [opts.allowedAttempts=1] Number of times a student is
     *   allowed to take the quiz. Set to1 for unlimited attempts
     * @param {string} [opts.scoringPolicy=keep_highest] Only valid if
     *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
     * @param {boolean} [opts.oneQuestionAtATime] If true, shows quiz to
     *   student one question at a time
     * @param {boolean} [opts.cantGoBack] If true, shows quiz to student
     *   one question at a time
     * @param {string} [opts.accessCode] If defined, restricts access to
     *   the quiz only to those with this access code
     * @param {string} [opts.ipFilter] If defined, restricts access to
     *   the quiz to computers in a specified IP range. Filters can be a
     *   comma-separated list of addresses, or an address followed by a mask
     * @param {number} [opts.assignmentGroupId=top assignment group] The
     *   assignment group to put the quiz into. Only valid if type is "assignment"
     *   or "graded_survey"
     * @param {number} [opts.timeLimitMins=null] Time limit for the quiz in
     *   minutes
     * @param {boolean} [opts.shuffleAnswers] If true, quiz answers for
     *   multiple choice questions will be randomized for each student
     * @param {string} [opts.hideResults=not hidden] Allowed values: ['always',
     *   'until_after_last_attempt'], determines whether the student can see their
     *   own submission and other results
     * @param {boolean} [opts.hideCorrectAnswers] Only valid if
     *   hideResults is not defined. If true, hides correct answers from students
     *   when results are viewed
     * @param {boolean} [opts.showCorrectAnswersAfterLastAttempt] Only
     *   valid if hideCorrectAnswers is not true and allowedAttemptes > 1. If true,
     *   hides correct answers from students when quiz results are viewed until
     *   they submit the last attempt for the quiz
     * @param {date} [opts.showCorrectAnswersAt=null] Only valid if
     *   hideCorrectAnswers is not true. If set, correct answers will only be
     *   visible after this date
     * @param {date} [opts.hideCorrectAnswersAt=null] Only valid if
     *   hideCorrectAnswers is not true. If set, correct answers will stop being
     *   visible after this date has passed
     * @param {boolean} [opts.oneTimeResults] Whether students should be
     *   prevented from viewing their quiz results past the first time (right
     *   after they turn in the quiz)
     * @param {boolean} [opts.onlyVisibleToOverrides] If true, the quiz
     *   is only visible to students with overrides
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
     */
    ECatQuiz.prototype.create = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update a specific quiz in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes"),
                        method: 'POST',
                        params: {
                            'quiz[title]': opts.title,
                            'quiz[description]': utils_1.default.includeIfTruthy(opts.description),
                            'quiz[quiz_type]': utils_1.default.includeIfTruthy(opts.type),
                            'quiz[assignment_group_id]': utils_1.default.includeIfNumber(opts.assignmentGroupId),
                            'quiz[time_limit]': utils_1.default.includeIfNumber(opts.timeLimitMins),
                            'quiz[shuffle_answers]': utils_1.default.isTruthy(opts.shuffleAnswers),
                            'quiz[hide_results]': utils_1.default.includeIfTruthy(opts.hideResults),
                            'quiz[show_correct_answers]': !utils_1.default.isTruthy(opts.hideCorrectAnswers),
                            'quiz[show_correct_answers_last_attempt]': utils_1.default.isTruthy(opts.showCorrectAnswersAfterLastAttempt),
                            'quiz[show_correct_answers_at]': utils_1.default.includeIfDate(opts.showCorrectAnswersAt),
                            'quiz[hide_correct_answers_at]': utils_1.default.includeIfDate(opts.hideCorrectAnswersAt),
                            'quiz[allowed_attempts]': utils_1.default.includeIfNumber(opts.allowedAttempts),
                            'quiz[scoring_policy]': utils_1.default.includeIfTruthy(opts.scoringPolicy),
                            'quiz[one_question_at_a_time]': utils_1.default.isTruthy(opts.oneQuestionAtATime),
                            'quiz[cant_go_back]': utils_1.default.isTruthy(opts.cantGoBack),
                            'quiz[access_code]': utils_1.default.includeIfTruthy(opts.accessCode),
                            'quiz[ip_filter]': utils_1.default.includeIfTruthy(opts.ipFilter),
                            'quiz[due_at]': utils_1.default.includeIfDate(opts.dueAt),
                            'quiz[lock_at]': utils_1.default.includeIfDate(opts.lockAt),
                            'quiz[unlock_at]': utils_1.default.includeIfDate(opts.unlockAt),
                            'quiz[published]': utils_1.default.isTruthy(opts.published),
                            'quiz[one_time_results]': utils_1.default.isTruthy(opts.oneTimeResults),
                            'quiz[only_visible_to_overrides]': utils_1.default.isTruthy(opts.onlyVisibleToOverrides),
                        },
                    })];
            });
        });
    };
    /**
     * Deletes a quiz from a course
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
     */
    ECatQuiz.prototype.delete = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'delete a specific quiz from a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId),
                        method: 'DELETE',
                    })];
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                         Quiz Question Endpoints                        */
    /*------------------------------------------------------------------------*/
    /**
     * Lists the questions in a specific quiz in a course
     * @author Gabe Abrams
     * @method listQuestions
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizQuestion[]>} list of Canvas Quiz Questions {@link https://canvas.instructure.com/doc/api/quiz_questions.html}
     */
    ECatQuiz.prototype.listQuestions = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of questions in a specific quiz in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/questions"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Creates a new multiple choice question and adds it to a quiz in a course
     * @author Gabe Abrams
     * @method createMultipleChoiceQuestion
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {string} opts.name Name of the question
     * @param {string} opts.text The text of the question, as displayed to the
     *   quiz taker
     * @param {number} opts.pointsPossible Maximum number of points
     * @param {Array} opts.answers Array of answers: [{ text, isCorrect,
     *   comment }]
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {number} [opts.position=last] Optional. Position of the question
     *   with respect to the other questions in the quiz
     * @param {string} [opts.correctComment] Comment to display if the
     *   student answers correctly
     * @param {string} [opts.incorrectComment] Comment to display if the
     *   student answers incorrectly
     * @param {string} [opts.neutralComment] Comment to display regardless
     *   of how the student answers
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizQuestion>} Canvas QuizQuestion {@link https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion}
     */
    ECatQuiz.prototype.createMultipleChoiceQuestion = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_b) {
                params = {
                    'question[question_name]': opts.name,
                    'question[question_text]': opts.text,
                    'question[question_type]': 'multiple_choice_question',
                    'question[position]': utils_1.default.includeIfNumber(opts.position),
                    'question[points_possible]': opts.pointsPossible,
                    'question[correct_comments]': utils_1.default.includeIfTruthy(opts.correctComment),
                    'question[incorrect_comments]': utils_1.default.includeIfTruthy(opts.incorrectComment),
                    'question[neutralComment]': utils_1.default.includeIfTruthy(opts.neutralComment),
                };
                // Add answers
                (opts.answers || []).forEach(function (answer, i) {
                    var answerPrefix = "question[answers][".concat(i, "]");
                    params["".concat(answerPrefix, "[answer_precision]")] = 10;
                    params["".concat(answerPrefix, "[answer_weight]")] = (answer.isCorrect ? 100 : 0);
                    params["".concat(answerPrefix, "[numerical_answer_type]")] = 'exact_answer';
                    params["".concat(answerPrefix, "[answer_text]")] = answer.text;
                    params["".concat(answerPrefix, "[answer_comment]")] = answer.comment;
                });
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a new multiple choice question and add it to a quiz in a course',
                        params: params,
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/questions"),
                        method: 'POST',
                    })];
            });
        });
    };
    /**
     * Creates a new essay question and adds it to a quiz in a course
     * @author Gabe Abrams
     * @method createEssayQuestion
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {string} opts.name Name of the question
     * @param {string} opts.text The text of the question, as displayed to the
     *   quiz taker
     * @param {number} opts.pointsPossible Maximum number of points
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {number} [opts.position=last] Optional. Position of the question
     *   with respect to the other questions in the quiz
     * @param {string} [opts.correctComment] Comment to display if the
     *   student answers correctly
     * @param {string} [opts.incorrectComment] Comment to display if the
     *   student answers incorrectly
     * @param {string} [opts.neutralComment] Comment to display regardless
     *   of how the student answers
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizQuestion>} Canvas QuizQuestion {@link https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion}
     */
    ECatQuiz.prototype.createEssayQuestion = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_b) {
                params = {
                    'question[question_name]': opts.name,
                    'question[question_text]': opts.text,
                    'question[question_type]': 'essay_question',
                    'question[position]': utils_1.default.includeIfNumber(opts.position),
                    'question[points_possible]': opts.pointsPossible,
                    'question[correct_comments]': utils_1.default.includeIfTruthy(opts.correctComment),
                    'question[incorrect_comments]': utils_1.default.includeIfTruthy(opts.incorrectComment),
                    'question[neutralComment]': utils_1.default.includeIfTruthy(opts.neutralComment),
                };
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a new essay question and add it to a quiz in a course',
                        params: params,
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/questions"),
                        method: 'POST',
                    })];
            });
        });
    };
    /**
     * Creates a new short answer question and adds it to a quiz in a course
     * @author Gabe Abrams
     * @method createShortAnswerQuestion
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {string} opts.name Name of the question
     * @param {string} opts.text The text of the question, as displayed to the
     *   quiz taker
     * @param {number} opts.pointsPossible Maximum number of points
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {number} [opts.position=last] Optional. Position of the question
     *   with respect to the other questions in the quiz
     * @param {string} [opts.correctComment] Comment to display if the
     *   student answers correctly
     * @param {string} [opts.incorrectComment] Comment to display if the
     *   student answers incorrectly
     * @param {string} [opts.neutralComment] Comment to display regardless
     *   of how the student answers
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizQuestion>} Canvas QuizQuestion {@link https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion}
     */
    ECatQuiz.prototype.createShortAnswerQuestion = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_b) {
                params = {
                    'question[question_name]': opts.name,
                    'question[question_text]': opts.text,
                    'question[question_type]': 'short_answer_question',
                    'question[position]': utils_1.default.includeIfNumber(opts.position),
                    'question[points_possible]': opts.pointsPossible,
                    'question[correct_comments]': utils_1.default.includeIfTruthy(opts.correctComment),
                    'question[incorrect_comments]': utils_1.default.includeIfTruthy(opts.incorrectComment),
                    'question[neutralComment]': utils_1.default.includeIfTruthy(opts.neutralComment),
                };
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a new short answer question and add it to a quiz in a course',
                        params: params,
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/questions"),
                        method: 'POST',
                    })];
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                        Quiz Submission Endpoints                       */
    /*------------------------------------------------------------------------*/
    /**
     * Lists the submissions to a quiz in a course
     * @author Gabe Abrams
     * @method listSubmissions
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizSubmission[]>} list of Canvas QuizSubmissions {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
     */
    ECatQuiz.prototype.listSubmissions = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'get the list of submissions to a specific quiz in a course',
                            path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/submissions"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response.quiz_submissions];
                }
            });
        });
    };
    /**
     * Gets info on a specific submission to a quiz in a course
     * @author Gabe Abrams
     * @method getSubmission
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} opts.submissionId Canvas quiz submission Id
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizSubmission>} Canvas QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
     */
    ECatQuiz.prototype.getSubmission = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'get the list of submissions to a specific quiz in a course',
                            path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/submissions/").concat(opts.submissionId),
                            method: 'GET',
                        })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response.quiz_submissions[0]];
                }
            });
        });
    };
    /**
     * Creates a new submission to a specific quiz in a course on behalf of the
     *   current user
     * @author Gabe Abrams
     * @method createSubmission
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {object[]} opts.answers List of answers to quiz questions:
     *   [{id: <quiz_question_id>, answer: <answer_object>},...] where the answer
     *   object is explained here: {@link https://canvas.instructure.com/doc/api/quiz_submission_questions.html#Question+Answer+Formats-appendix}
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {string} [opts.accessCode] Access code for the quiz if it is
     *   locked
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizSubmission>} Canvas QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
     */
    ECatQuiz.prototype.createSubmission = function (opts, config) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var startResponse, openSubmission, submissionId, validationToken, attempt;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'start a new quiz-taking session',
                            path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/submissions"),
                            method: 'POST',
                            params: {
                                access_code: utils_1.default.includeIfTruthy(opts.accessCode),
                            },
                        })];
                    case 1:
                        startResponse = _c.sent();
                        openSubmission = startResponse.quiz_submissions[0];
                        submissionId = openSubmission.id;
                        validationToken = openSubmission.validation_token;
                        attempt = openSubmission.attempt;
                        // Answer questions
                        return [4 /*yield*/, this.visitEndpoint({
                                config: config,
                                action: 'add quiz question responses',
                                params: {
                                    attempt: attempt,
                                    validation_token: validationToken,
                                    access_code: utils_1.default.includeIfTruthy(opts.accessCode),
                                    quiz_questions: opts.answers,
                                },
                                path: "".concat(API_PREFIX_1.default, "/quiz_submissions/").concat(submissionId, "/questions"),
                                method: 'POST',
                            })];
                    case 2:
                        // Answer questions
                        _c.sent();
                        // Complete the student's submission
                        return [2 /*return*/, this.visitEndpoint({
                                config: config,
                                action: 'wrap up a quiz submission',
                                path: "".concat(API_PREFIX_1.default, "/courses/").concat((_b = opts.courseId) !== null && _b !== void 0 ? _b : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/submissions/").concat(submissionId, "/complete"),
                                method: 'POST',
                                params: {
                                    attempt: attempt,
                                    validation_token: validationToken,
                                    access_code: utils_1.default.includeIfTruthy(opts.accessCode),
                                },
                            })];
                }
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                         Quiz Grading Endpoints                         */
    /*------------------------------------------------------------------------*/
    /**
     * Updates the question grades for a specific submission to a quiz in a course
     * @author Gabe Abrams
     * @method updateQuestionGrades
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} opts.submissionId Canvas submission Id for a quiz
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {number} [opts.fudgePoints=current value] The amount of
     *   positive/negative fudge points to apply to this submission
     * @param {object} [opts.questions] A map questionId => { score, comment }
     *   of the question score/comment updates
     * @param {number} [opts.attempt=most recent] The attempt to update grades
     *   for. If excluded, we pull the user's submission to get the attempt number
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizSubmission>} QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
     */
    ECatQuiz.prototype.updateQuestionGrades = function (opts, config) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var attempt, sub, params, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        attempt = opts.attempt;
                        if (!(attempt === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api.course.quiz.getSubmission({
                                courseId: ((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId),
                                quizId: opts.quizId,
                                submissionId: opts.submissionId,
                            }, config)];
                    case 1:
                        sub = _c.sent();
                        attempt = sub.attempt;
                        _c.label = 2;
                    case 2:
                        params = {
                            'quiz_submissions[][attempt]': attempt,
                            'quiz_submissions[][fudge_points]': (utils_1.default.includeIfNumber(opts.fudgePoints)),
                        };
                        // Add question values
                        Object.entries(opts.questions).forEach(function (_a) {
                            var questionId = _a[0], info = _a[1];
                            var score = info.score, comment = info.comment;
                            if (score !== undefined) {
                                params["quiz_submissions[][questions][".concat(questionId, "][score]")] = score;
                            }
                            if (comment !== undefined) {
                                params["quiz_submissions[][questions][".concat(questionId, "][comment]")] = (comment);
                            }
                        });
                        return [4 /*yield*/, this.visitEndpoint({
                                config: config,
                                action: 'update the question grades for a specific submission to a quiz in a course',
                                params: params,
                                path: "".concat(API_PREFIX_1.default, "/courses/").concat((_b = opts.courseId) !== null && _b !== void 0 ? _b : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/submissions/").concat(opts.submissionId),
                                method: 'PUT',
                            })];
                    case 3:
                        response = _c.sent();
                        return [2 /*return*/, response.quiz_submissions[0]];
                }
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Reports ------------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Get a student quiz report
     * @author Gabe Abrams
     * @method getQuizStudentReport
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} [opts.courseId] Canvas course Id to query
     * @param {number} [opts.waitForCompletionTimeout=2] Number of minutes to
     *   wait for completion of batch upload
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasParsedStudentAnalysisQuizReport>} a parsed student quiz report in JSON form
     */
    ECatQuiz.prototype.getQuizStudentAnalysisReport = function (opts, config) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var quizReport, progressId, progress, err_1, generatedReport, fileURL, reportData, headers, rows, nameColIndex, idColIndex, submittedColIndex, attemptColIndex, numCorrectColIndex, numIncorrectColIndex, scoreColIndex, ignoredHeaders, questionHeaders, i, header, questionCols, i, _d, index, text, questionId, questionColIndex, questionText, questionScoreColIndex, questionTotalScore, studentReports, parsedReport;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'create a new quiz report',
                            params: {
                                'quiz_report[report_type]': 'student_analysis',
                                include: ['progress'],
                            },
                            path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/reports"),
                            method: 'POST',
                        })];
                    case 1:
                        quizReport = _e.sent();
                        progressId = (_b = quizReport.progress_url) === null || _b === void 0 ? void 0 : _b.split('/').pop();
                        return [4 /*yield*/, this.visitEndpoint({
                                config: config,
                                action: 'get the progress of a quiz report',
                                method: 'GET',
                                path: "".concat(API_PREFIX_1.default, "/progress/").concat(progressId),
                            })];
                    case 2:
                        progress = _e.sent();
                        // Get progress for the report
                        if (!progress) {
                            throw new caccl_error_1.default({
                                message: 'Quiz report progress not found',
                                code: ErrorCode_1.default.QuizReportNoProgress,
                            });
                        }
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, (0, waitForCompletion_1.default)({
                                visitEndpoint: this.visitEndpoint,
                                progress: progress,
                                timeoutMin: opts.waitForCompletionTimeout,
                            })];
                    case 4:
                        _e.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _e.sent();
                        // Handle error
                        throw new caccl_error_1.default({
                            message: 'Quiz report generation failed',
                            code: ErrorCode_1.default.QuizReportGenerationFailed,
                        });
                    case 6: return [4 /*yield*/, this.visitEndpoint({
                            config: config,
                            action: 'retrieve a generated quiz report',
                            params: {
                                include: ['file'],
                            },
                            path: "/api/v1/courses/".concat((_c = opts.courseId) !== null && _c !== void 0 ? _c : this.defaultCourseId, "/quizzes/").concat(opts.quizId, "/reports/").concat(quizReport.id),
                            method: 'GET',
                        })];
                    case 7:
                        generatedReport = _e.sent();
                        fileURL = generatedReport.file.url;
                        return [4 /*yield*/, fetch(fileURL)];
                    case 8: return [4 /*yield*/, (_e.sent()).text()];
                    case 9:
                        reportData = _e.sent();
                        headers = [];
                        rows = [];
                        console.log('Data', reportData);
                        ignoredHeaders = [
                            'section',
                            'section_id',
                            'section_sis_id',
                        ];
                        questionHeaders = [];
                        for (i = 0; i < headers.length; i++) {
                            header = headers[i];
                            if (header === 'name') {
                                nameColIndex = i;
                            }
                            else if (header === 'id') {
                                idColIndex = i;
                            }
                            else if (header === 'submitted') {
                                submittedColIndex = i;
                            }
                            else if (header === 'attempt') {
                                attemptColIndex = i;
                            }
                            else if (header === 'n correct') {
                                numCorrectColIndex = i;
                            }
                            else if (header === 'n incorrect') {
                                numIncorrectColIndex = i;
                            }
                            else if (header === 'score') {
                                scoreColIndex = i;
                            }
                            else if (!ignoredHeaders.includes(header)) {
                                questionHeaders.push({
                                    index: i,
                                    text: header,
                                });
                            }
                        }
                        // Weird parsing error if required columns aren't present
                        if (nameColIndex === undefined
                            || idColIndex === undefined
                            || submittedColIndex === undefined
                            || numCorrectColIndex === undefined
                            || numIncorrectColIndex === undefined
                            || scoreColIndex === undefined) {
                            throw new caccl_error_1.default({
                                message: 'The quiz report was missing some expected information.',
                                code: ErrorCode_1.default.QuizReportFormattingUnexpected,
                            });
                        }
                        // Weird parsing error if question headers aren't an even number
                        if (questionHeaders.length % 2 !== 0) {
                            throw new caccl_error_1.default({
                                message: 'The quiz report was formatted in an unexpected way.',
                                code: ErrorCode_1.default.QuizReportFormattingUnexpected,
                            });
                        }
                        questionCols = [];
                        for (i = 0; i < questionHeaders.length - 1; i += 2) {
                            _d = questionHeaders[i], index = _d.index, text = _d.text;
                            questionId = Number.parseInt(text.split(': ')[0], 10);
                            if (Number.isNaN(questionId)) {
                                throw new caccl_error_1.default({
                                    message: 'The quiz report had an invalid question ID.',
                                    code: ErrorCode_1.default.QuizReportFormattingUnexpected,
                                });
                            }
                            questionColIndex = index;
                            questionText = text.split(': ')[1];
                            questionScoreColIndex = index + 1;
                            questionTotalScore = parseFloat(questionHeaders[i + 1].text);
                            questionCols.push({
                                questionId: questionId,
                                questionColIndex: questionColIndex,
                                questionText: questionText,
                                questionScoreColIndex: questionScoreColIndex,
                                questionTotalScore: questionTotalScore,
                            });
                        }
                        studentReports = rows.map(function (row) {
                            // Get the student's userId
                            var userId = Number.parseInt(row[idColIndex], 10);
                            if (Number.isNaN(userId)) {
                                throw new caccl_error_1.default({
                                    message: 'The quiz report had an invalid CanvasId for a student.',
                                    code: ErrorCode_1.default.QuizReportFormattingUnexpected,
                                });
                            }
                            // Get the student's full name
                            var userFullName = row[nameColIndex];
                            if (!userFullName) {
                                throw new caccl_error_1.default({
                                    message: 'The quiz report had an invalid name for a student.',
                                    code: ErrorCode_1.default.QuizReportFormattingUnexpected,
                                });
                            }
                            // Get the timestamp that the student submitted their quiz
                            var submittedAt = (new Date(row[submittedColIndex])).getTime();
                            if (Number.isNaN(submittedAt)) {
                                throw new caccl_error_1.default({
                                    message: 'The quiz report had an invalid submission time for a student.',
                                    code: ErrorCode_1.default.QuizReportFormattingUnexpected,
                                });
                            }
                            // Get the student's score
                            var score = parseFloat(row[scoreColIndex]);
                            if (Number.isNaN(score)) {
                                score = 0;
                            }
                            // Get the number of correct questions
                            var numCorrect = Number.parseInt(row[numCorrectColIndex], 10);
                            if (Number.isNaN(numCorrect)) {
                                throw new caccl_error_1.default({
                                    message: 'The quiz report had an invalid number of correct questions for a student.',
                                    code: ErrorCode_1.default.QuizReportFormattingUnexpected,
                                });
                            }
                            // Get the number of incorrect questions
                            var numIncorrect = Number.parseInt(row[numIncorrectColIndex], 10);
                            if (Number.isNaN(numIncorrect)) {
                                throw new caccl_error_1.default({
                                    message: 'The quiz report had an invalid number of incorrect questions for a student.',
                                    code: ErrorCode_1.default.QuizReportFormattingUnexpected,
                                });
                            }
                            // Get the student's attempt number
                            var attempt = (attemptColIndex !== undefined
                                ? Number.parseInt(row[attemptColIndex], 10)
                                : 1);
                            if (Number.isNaN(attempt)) {
                                throw new caccl_error_1.default({
                                    message: 'The quiz report had an invalid attempt number for a student.',
                                    code: ErrorCode_1.default.QuizReportFormattingUnexpected,
                                });
                            }
                            // Parse the student's responses
                            var responses = [];
                            questionCols.forEach(function (questionCol) {
                                var response = row[questionCol.questionColIndex] || '';
                                var points = parseFloat(row[questionCol.questionScoreColIndex]);
                                if (Number.isNaN(points)) {
                                    throw new caccl_error_1.default({
                                        message: 'The quiz report had an invalid score for a student on a question.',
                                        code: ErrorCode_1.default.QuizReportFormattingUnexpected,
                                    });
                                }
                                responses.push({
                                    questionId: questionCol.questionId,
                                    response: response,
                                    points: points,
                                });
                            });
                            // Return the student report
                            return {
                                userId: userId,
                                userFullName: userFullName,
                                submittedAt: submittedAt,
                                score: score,
                                numCorrect: numCorrect,
                                numIncorrect: numIncorrect,
                                attempt: attempt,
                                responses: responses,
                            };
                        });
                        parsedReport = {
                            quizId: opts.quizId,
                            questions: questionCols.map(function (questionCol) {
                                return {
                                    questionId: questionCol.questionId,
                                    questionText: questionCol.questionText,
                                };
                            }),
                            studentReports: studentReports,
                        };
                        return [2 /*return*/, parsedReport];
                }
            });
        });
    };
    return ECatQuiz;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatQuiz;
//# sourceMappingURL=ECatQuiz.js.map