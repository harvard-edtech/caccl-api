"use strict";
/**
 * Functions for interacting with rubrics within courses
 * @namespace api.course.rubric
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
// Endpoint category
var ECatRubric = /** @class */ (function (_super) {
    __extends(ECatRubric, _super);
    function ECatRubric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                            Rubric Endpoints                            */
    /*------------------------------------------------------------------------*/
    /**
     * Lists the set of rubrics in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.rubric
     * @instance
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to add
     *   the rubric to
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasRubric[]>} list of Canvas Rubrics {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
     */
    ECatRubric.prototype.list = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'list all the rubrics in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/rubrics"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Gets info on a specific rubric in a course
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.rubric
     * @instance
     * @param {object} opts object containing all arguments
     * @param {number} opts.rubricId Canvas course Id to add the rubric to
     * @param {number} [opts.courseId=default course id] Canvas course Id to add
     *   the rubric to
     * @param {string} [opts.include] Allowed values: ['assessments',
     *   'graded_assessments', 'peer_assessments']. If excluded, no assessments
     *   will be included (default: none)
     * @param {string} [opts.assessmentStyle=both omitted] Allowed values:
     *   ['full','comments_only']
     *   (full = entire assessment, comments_only = only comment part of
     *   assessment). Only valid if including assessments
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasRubric>} Canvas Rubric {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
     */
    ECatRubric.prototype.get = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on a specific rubric in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/rubrics/").concat(opts.rubricId),
                        method: 'GET',
                        params: {
                            include: utils_1.default.includeIfTruthy(opts.include),
                            style: utils_1.default.includeIfTruthy(opts.assessmentStyle),
                        },
                    })];
            });
        });
    };
    /**
     * Creates a new rubric for grading with free form comments enabled and add it
     *   to an assignment in a course.
     * @author Gabe Abrams
     * @method createFreeFormGradingRubricInAssignment
     * @memberof api.course.rubric
     * @instance
     * @param {object} opts object containing all arguments
     * @param {number} opts.assignmentId Canvas course Id to add the rubric to
     * @param {Array} opts.rubricItems List of rubric item objects:
     *   [{description, points, [longDescription]}, ...]
     * @param {number} [opts.courseId=default course id] Canvas course Id to add the rubric to
     * @param {string} [opts.title=generated title] Title of the new rubric
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasRubric>} Canvas Rubric {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
     */
    ECatRubric.prototype.createFreeFormGradingRubricInAssignment = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var pointsPossible, title, params, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pointsPossible = 0;
                        opts.rubricItems.forEach(function (rubricItem) {
                            pointsPossible += rubricItem.points;
                        });
                        title = (opts.title
                            || 'Unnamed-rubric-' + Date.now());
                        params = {
                            title: title,
                            'rubric[title]': title,
                            'rubric[points_possible]': pointsPossible,
                            'rubric_association[use_for_grading]': 1,
                            'rubric_association[hide_score_total]': 0,
                            'rubric_association[hide_points]': 0,
                            'rubric_association[hide_outcome_results]': 0,
                            'rubric[free_form_criterion_comments]': 1,
                            points_possible: pointsPossible,
                            rubric_id: 'new',
                            'rubric_association[association_type]': 'Assignment',
                            'rubric_association[association_id]': opts.assignmentId,
                            'rubric_association[purpose]': 'grading',
                            skip_updating_points_possible: false,
                        };
                        opts.rubricItems.forEach(function (rubricItem, i) {
                            params["rubric[criteria][".concat(i, "][description]")] = (rubricItem.description);
                            params["rubric[criteria][".concat(i, "][points]")] = (rubricItem.points);
                            params["rubric[criteria][".concat(i, "][long_description]")] = (rubricItem.longDescription);
                            params["rubric[criteria][".concat(i, "][criterion_use_range]")] = false;
                            params["rubric[criteria][".concat(i, "][ratings][0][description]")] = ('Full Marks');
                            params["rubric[criteria][".concat(i, "][ratings][0][points]")] = (rubricItem.points);
                            params["rubric[criteria][".concat(i, "][ratings][0][id]")] = 'blank';
                            params["rubric[criteria][".concat(i, "][ratings][1][description]")] = ('No Marks');
                            params["rubric[criteria][".concat(i, "][ratings][1][points]")] = 0;
                            params["rubric[criteria][".concat(i, "][ratings][1][id]")] = 'blank_2';
                        });
                        return [4 /*yield*/, this.visitEndpoint({
                                config: config,
                                action: 'create a new free form grading rubric and add it to a specific assignment in a course',
                                params: params,
                                path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/rubrics"),
                                method: 'POST',
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response.rubric];
                }
            });
        });
    };
    return ECatRubric;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatRubric;
//# sourceMappingURL=ECatRubric.js.map