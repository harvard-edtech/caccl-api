"use strict";
/**
 * Functions for interacting with assignment groups within courses
 * @namespace api.course.assignmentGroup
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
// Import shared helpers
var utils_1 = __importDefault(require("../../shared/helpers/utils"));
// Import shared constants
var API_PREFIX_1 = __importDefault(require("../../shared/constants/API_PREFIX"));
var AssignmentGroup = /** @class */ (function (_super) {
    __extends(AssignmentGroup, _super);
    function AssignmentGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                                Endpoints                               */
    /*------------------------------------------------------------------------*/
    /**
     * Lists assignment groups in a course
     * @author Gabe Abrams
     * @memberof api.course.assignmentGroup
     * @instance
     * @async
     * @method list
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<AssignmentGroup[]>} list of Canvas AssignmentGroups {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
     */
    AssignmentGroup.prototype.list = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'list the assignment groups in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/assignment_groups"),
                        method: 'GET',
                    })];
            });
        });
    };
    /**
     * Gets info on a specific assignment group in a course
     * @author Gabe Abrams
     * @memberof api.course.assignmentGroup
     * @instance
     * @async
     * @method get
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.assignmentGroupId - Assignment group to get
     * @param {boolean} [opts.includeAssignments] - if true, the list of
     *   assignments inside the group is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
     */
    AssignmentGroup.prototype.get = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get info on a specific assignment group in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/assignment_groups/").concat(opts.assignmentGroupId),
                        method: 'GET',
                        params: {
                            include: utils_1.default.genIncludesList({
                                assignments: opts.includeAssignments,
                            }),
                        },
                    })];
            });
        });
    };
    /**
     * Updates an assignment group in a course
     * @author Gabe Abrams
     * @memberof api.course.assignmentGroup
     * @instance
     * @async
     * @method update
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.assignmentGroupId - Assignment group to update
     * @param {string} [opts.name=current value] - New assignment group name
     * @param {number} [opts.weight=current value] - New weight
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
     */
    AssignmentGroup.prototype.update = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update an assignment group in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/assignment_groups/").concat(opts.assignmentGroupId),
                        method: 'PUT',
                        params: {
                            name: utils_1.default.includeIfTruthy(opts.name),
                            group_weight: utils_1.default.includeIfNumber(opts.weight),
                        },
                    })];
            });
        });
    };
    /**
     * Create a new assignment group in a course
     * @author Gabe Abrams
     * @memberof api.course.assignmentGroup
     * @instance
     * @async
     * @method create
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {string} opts.name - New assignment group name
     * @param {number} [opts.weight=0] - Assignment group weight
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
     */
    AssignmentGroup.prototype.create = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a new assignment group in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/assignment_groups"),
                        method: 'POST',
                        params: {
                            name: utils_1.default.includeIfTruthy(opts.name),
                            group_weight: utils_1.default.includeIfNumber(opts.weight),
                        },
                    })];
            });
        });
    };
    /**
     * Deletes an assignment group from a course
     * @author Gabe Abrams
     * @memberof api.course.assignmentGroup
     * @instance
     * @async
     * @method delete
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.assignmentGroupId - Assignment group to delete
     * @param {number} [opts.moveAssignmentsTo] - Assignment group to move
     *   assignments to. If this parameter isn't included, assignments in the
     *   assignment group will be deleted.
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
     */
    AssignmentGroup.prototype.delete = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'delete an assignment group from a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/assignment_groups/").concat(opts.assignmentGroupId),
                        method: 'DELETE',
                        params: {
                            move_assignments_to: utils_1.default.includeIfNumber(opts.moveAssignmentsTo),
                        },
                    })];
            });
        });
    };
    return AssignmentGroup;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = AssignmentGroup;
//# sourceMappingURL=AssignmentGroup.js.map