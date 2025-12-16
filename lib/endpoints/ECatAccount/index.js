"use strict";
/**
 * Functions for interacting with accounts
 * @namespace api.account
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
// Import shared classes
var EndpointCategory_1 = __importDefault(require("../../shared/EndpointCategory"));
// Import shared helpers
var utils_1 = __importDefault(require("../../shared/helpers/utils"));
// Import shared constants
var API_PREFIX_1 = __importDefault(require("../../shared/constants/API_PREFIX"));
// Subcategories
var ECatEnrollmentTerm_1 = __importDefault(require("./ECatEnrollmentTerm"));
// Endpoint category
var ECatAccount = /** @class */ (function (_super) {
    __extends(ECatAccount, _super);
    /**
     * Initialize endpoint category
     * @param initPack package of info for initializing the endpoint category
     */
    function ECatAccount(initPack) {
        var _this = _super.call(this, initPack) || this;
        // Initialize subcategory
        _this.enrollmentTerm = new ECatEnrollmentTerm_1.default(initPack);
        return _this;
    }
    /*------------------------------------------------------------------------*/
    /*                               Endpoints:                               */
    /*------------------------------------------------------------------------*/
    /**
     * Get info on a specific Canvas account
     * @author Gabe Abrams
     * @method get
     * @memberof api.account
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.accountId Canvas account Id to get info on
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAccount>} Canvas account {@link https://canvas.instructure.com/doc/api/accounts.html#Account}
     */
    ECatAccount.prototype.get = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on a specific account',
                        path: "".concat(API_PREFIX_1.default, "/accounts/").concat(opts.accountId),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Get the list of accounts in the Canvas instance
     * @author Gabe Abrams
     * @method list
     * @memberof api.account
     * @instance
     * @async
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAccount[]>} list of Canvas accounts {@link https://canvas.instructure.com/doc/api/accounts.html#Account}
     */
    ECatAccount.prototype.list = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of accounts',
                        path: "".concat(API_PREFIX_1.default, "/accounts"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Gets the list of admins in an account
     * @author Gabe Abrams
     * @method listAdmins
     * @memberof api.account
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.accountId Canvas account Id to get the list of
     *   admins from
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAdmin[]>} List of Canvas admins {@link https://canvas.instructure.com/doc/api/admins.html#Admin}
     */
    ECatAccount.prototype.listAdmins = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of admins in a specific account',
                        path: "".concat(API_PREFIX_1.default, "/accounts/").concat(opts.accountId, "/admins"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Gets the list of active courses in an account
     * @author Gabe Abrams
     * @method listCourses
     * @memberof api.account
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.accountId Canvas account Id to get the list of
     *   courses from
     * @param {number[]} [opts.teacherIds=all teachers] a list of teacher ids
     *   to limit the search to
     * @param {number[]} [opts.subaccountIds=all subaccounts] a list of
     *   subaccount ids to limit the search to
     * @param {boolean} [opts.hasEnrollments=no filter] if true, require that
     *   the course has at least one enrollment, if false, require that the course
     *   has no enrollments
     * @param {boolean} [opts.atLeastOneTeacher] if true, only show
     *   courses that have at least one teacher
     * @param {boolean} [opts.atLeastOneStudent] if true, only show
     *   courses that have at least one student
     * @param {boolean} [opts.atLeastOneTA] if true, only show
     *   courses that have at least one TA
     * @param {boolean} [opts.atLeastOneObserver] if true, only show
     *   courses that have at least one observer
     * @param {boolean} [opts.atLeastOneDesigner] if true, only show
     *   courses that have at least one designer
     * @param {boolean} [opts.published=no filter] if true, only show courses
     *   that are published, if false, only show courses that are unpublished
     * @param {boolean} [opts.completed=no filter] if true, only show courses
     *   that are completed, if false, only show courses that are not completed
     * @param {boolean} [opts.blueprint=no filter] if true, only include
     *   blueprint courses, if false, only show courses that are not blueprints
     * @param {boolean} [opts.blueprintAssociated=no filter] if true, require
     *   that the course be associated with a blueprint, if false, require that the
     *   course not be associated with a blueprint
     * @param {string[]} [opts.state=no filter] a list of states to limit the
     *   search to. Allowed values: created, claimed, available, completed, deleted,
     *   all
     * @param {number} [opts.enrollmentTermId=no filter] an enrollment term to
     *   limit the scope of the search to
     * @param {string} [opts.searchTerm] a minimum 3 character string to search
     *   the courses by (searches course name, code, or full id)
     * @param {string} [opts.sortColumn] the main data column to sort the
     *   results by. Allowed values: course_name, sis_course_id, teacher,
     *   account_name
     * @param {string} [opts.sortOrder] the sort order to use: "asc" or "desc"
     * @param {date} [opts.startsBefore] If set, only return courses that start
     *   before the value (inclusive) or their enrollment term starts before the
     *   value (inclusive) or both the course's start_at and the enrollment term's
     *   start_at are set to null. Format can be an ISO 8601 string or a Date
     *   instance
     * @param {date} [opts.endsAfter] If set, only return courses that end
     *   after the value (inclusive) or their enrollment term ends after the value
     *   (inclusive) or both the course's end_at and the enrollment term's end_at
     *   are set to null. Format can be an ISO 8601 string or a Date
     *   instance
     * @param {boolean} [opts.includeSyllabus] if true, for each course,
     *   include its syllabus
     * @param {boolean} [opts.includeTerm] if true, for each course,
     *   include its term
     * @param {boolean} [opts.includeCourseProgress] if true, for each course,
     *   include its progress
     * @param {boolean} [opts.includeStorageQuotaUsedMB] if true, for each
     *   courses, include the number of megabytes of storage used
     * @param {boolean} [opts.includeTotalStudents] if true, for each course,
     *   include the total number of students
     * @param {boolean} [opts.includeTeachers] if true, for each course,
     *   include the teachers
     * @param {boolean} [opts.includeAccountName] if true, for each course,
     *   include its parent account name
     * @param {boolean} [opts.includeConcluded] if true, for each course,
     *   include whether the course has been concluded
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCourse[]>} Array of Canvas courses {@link https://canvas.instructure.com/doc/api/courses.html#Course}
     */
    ECatAccount.prototype.listCourses = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var enrollmentTypes;
            return __generator(this, function (_a) {
                if (opts.atLeastOneStudent
                    || opts.atLeastOneTA
                    || opts.atLeastOneObserver
                    || opts.atLeastOneDesigner
                    || opts.atLeastOneTeacher) {
                    enrollmentTypes = [];
                }
                if (opts.atLeastOneStudent) {
                    enrollmentTypes.push('student');
                }
                if (opts.atLeastOneTA) {
                    enrollmentTypes.push('ta');
                }
                if (opts.atLeastOneObserver) {
                    enrollmentTypes.push('observer');
                }
                if (opts.atLeastOneDesigner) {
                    enrollmentTypes.push('designer');
                }
                if (opts.atLeastOneTeacher) {
                    enrollmentTypes.push('teacher');
                }
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        path: "".concat(API_PREFIX_1.default, "/accounts/").concat(opts.accountId, "/courses"),
                        method: 'GET',
                        action: 'get the list of courses in a specific account',
                        params: {
                            with_enrollments: utils_1.default.convertToBooleanIfDefined(opts.hasEnrollments),
                            enrollment_type: enrollmentTypes,
                            published: utils_1.default.convertToBooleanIfDefined(opts.published),
                            completed: utils_1.default.convertToBooleanIfDefined(opts.completed),
                            blueprint: utils_1.default.convertToBooleanIfDefined(opts.blueprint),
                            blueprint_associated: utils_1.default.convertToBooleanIfDefined(opts.blueprintAssociated),
                            by_teachers: utils_1.default.includeIfTruthy(opts.teacherIds),
                            by_subaccounts: utils_1.default.includeIfTruthy(opts.subaccountIds),
                            state: utils_1.default.includeIfTruthy(opts.state),
                            enrollment_term_id: utils_1.default.includeIfTruthy(opts.enrollmentTermId),
                            search_term: utils_1.default.includeIfTruthy(opts.searchTerm),
                            include: utils_1.default.genIncludesList({
                                syllabus_body: opts.includeSyllabus,
                                term: opts.includeTerm,
                                course_progress: opts.includeCourseProgress,
                                storage_quota_used_mb: opts.includeStorageQuotaUsedMB,
                                total_students: opts.includeTotalStudents,
                                teachers: opts.includeTeachers,
                                account_name: opts.includeAccountName,
                                concluded: opts.includeConcluded,
                            }),
                            sort: utils_1.default.includeIfTruthy(opts.sortColumn),
                            order: utils_1.default.includeIfTruthy(opts.sortOrder),
                            starts_before: utils_1.default.includeIfDate(opts.startsBefore),
                            ends_after: utils_1.default.includeIfDate(opts.endsAfter),
                        },
                    })];
            });
        });
    };
    return ECatAccount;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatAccount;
//# sourceMappingURL=index.js.map