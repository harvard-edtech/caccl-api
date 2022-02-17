"use strict";
/**
 * Functions for interacting with gradebook columns within courses
 * @namespace api.course.gradebookColumn
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
var caccl_error_1 = __importDefault(require("caccl-error"));
var ErrorCode_1 = __importDefault(require("../../shared/types/ErrorCode"));
var waitForCompletion_1 = __importDefault(require("../../shared/helpers/waitForCompletion"));
// Endpoint category
var GradebookColumn = /** @class */ (function (_super) {
    __extends(GradebookColumn, _super);
    function GradebookColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                           Table of Contents:                           */
    /*                           - Gradebook Column                           */
    /*                           - Gradebook Column Data                      */
    /*------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------*/
    /*                       Gradebook Column Endpoints                       */
    /*------------------------------------------------------------------------*/
    /**
     * Gets the list of custom gradebook columns in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {boolean} [opts.includeHidden] - If truthy, includes hidden
     *   gradebook columns as well.
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCustomColumn[]>} List of Canvas CustomColumns {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
     */
    GradebookColumn.prototype.list = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of gradebook columns in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/custom_gradebook_columns"),
                        method: 'GET',
                        params: {
                            include_hidden: utils_1.default.isTruthy(opts.includeHidden),
                        },
                    })];
            });
        });
    };
    /**
     * Gets info on a specific gradebook column in a course. This is a simulated
     *   endpoint: it does not exist. We are just pulling the list of columns and
     *   returning one element.
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.columnId - Canvas column Id to return
     * @param {boolean} [opts.isHidden] - Must be set to true if the column
     *   you're retrieving is a hidden column.
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
     */
    GradebookColumn.prototype.get = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var columns, i, hiddenMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.course.gradebookColumn.list({
                            courseId: opts.courseId,
                            includeHidden: opts.includeHidden,
                        })];
                    case 1:
                        columns = _a.sent();
                        // Find the column
                        for (i = 0; i < columns.length; i++) {
                            if (columns[i].id === opts.columnId) {
                                // Found the column the caller was looking for
                                return [2 /*return*/, columns[i]];
                            }
                        }
                        hiddenMessage = '';
                        if (!opts.includeHidden) {
                            hiddenMessage = 'We were only searching through non-hidden columns. If the column you were looking for is hidden, you need to specify that.';
                        }
                        throw new caccl_error_1.default({
                            message: "We couldn't find the column you were looking for. ".concat(hiddenMessage),
                            code: ErrorCode_1.default.ColumnNotFound,
                        });
                }
            });
        });
    };
    /**
     * Updates a gradebook column's information
     * @author Gabe Abrams
     * @method update
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course ID
     * @param {number} opts.columnId - Canvas custom gradebook column ID to query
     * @param {string} [opts.title=current value] - New title for the column
     * @param {number} [opts.position=current value] - New position for the
     *   column in the list of custom gradebook columns
     * @param {boolean} [opts.hidden=current value] - If set, updates whether the
     *   custom gradebook column is hidden from everyone. Must be a boolean
     * @param {boolean} [opts.readOnly=current value] if set, updates whether the
     *   custom gradebook column is read-only in the UI
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
     */
    GradebookColumn.prototype.update = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update a gradebook column\'s information',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/custom_gradebook_columns/").concat(opts.columnId),
                        method: 'PUT',
                        params: {
                            'column[title]': utils_1.default.includeIfTruthy(opts.title),
                            'column[position]': utils_1.default.includeIfNumber(opts.position),
                            'column[hidden]': utils_1.default.includeIfBoolean(opts.hidden),
                            'column[read_only]': utils_1.default.includeIfBoolean(opts.readOnly),
                        },
                    })];
            });
        });
    };
    /**
     * Creates a new gradebook column in a course
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {string} [opts.title=Untitled Column] - Title of new custom
     *   gradebook column
     * @param {number} [opts.position=last] - Position of the gradebook column
     *   within the list of custom gradebook columns
     * @param {boolean} [opts.hidden] - If truthy, hides the gradebook
     *   column from everyone, not just instructor as usual
     * @param {boolean} [opts.readOnly] if truthy, makes column read-only in
     *   the Canvas UI
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
     */
    GradebookColumn.prototype.create = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a new gradebook column in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/custom_gradebook_columns"),
                        method: 'POST',
                        params: {
                            'column[title]': opts.title || 'Untitled Column',
                            'column[position]': utils_1.default.includeIfNumber(opts.position),
                            'column[hidden]': utils_1.default.isTruthy(opts.hidden),
                            'column[read_only]': utils_1.default.isTruthy(opts.readOnly),
                        },
                    })];
            });
        });
    };
    /**
     * Deletes a gradebook column from a course
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.columnId - Gradebook column Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCustomColumn>} Canvas CustomColumn {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn}
     */
    GradebookColumn.prototype.delete = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'delete a gradebook column from a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/custom_gradebook_columns/").concat(opts.columnId),
                        method: 'DELETE',
                    })];
            });
        });
    };
    /*------------------------------------------------------------------------*/
    /*                     Gradebook Column Data Endpoints                    */
    /*------------------------------------------------------------------------*/
    /**
     * Gets the list of entries in a specific gradebook column in a course
     * @author Gabe Abrams
     * @method listEntries
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.columnId - Gradebook column Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasColumnDatum[]>} list of Canvas ColumnDatum objects {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum}
     */
    GradebookColumn.prototype.listEntries = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of entries in a specific gradebook column in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/custom_gradebook_columns/").concat(opts.columnId, "/data"),
                        method: 'GET',
                        params: {
                            include_hidden: true,
                        },
                    })];
            });
        });
    };
    /**
     * Update a specific entry in a gradebook column
     * @author Gabe Abrams
     * @method updateEntry
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.columnId - Gradebook column Id
     * @param {number} opts.studentId - Canvas user id to update
     * @param {string} opts.content - the new text for the user's column cell
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasColumnDatum>} Canvas ColumnDatum object {@link https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum}
     */
    GradebookColumn.prototype.updateEntry = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Send batch update request
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update an entry in a gradebook column',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/custom_gradebook_columns/").concat(opts.columnId, "/data/").concat(opts.studentId),
                        method: 'PUT',
                        params: {
                            column_data: {
                                content: opts.content,
                            },
                        },
                    })];
            });
        });
    };
    /**
     * Update the list of entries in a specific gradebook column in a course
     * @author Gabe Abrams
     * @method updateEntries
     * @memberof api.course.gradebookColumn
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.columnId - Gradebook column Id
     * @param {CanvasColumnDatum[]} opts.entries - list of ColumnDatum objects:
     *   `[{user_id: <Canvas User Id>, content: <New Entry Text>}, ...]`
     * @param {boolean} [opts.waitForCompletion] - If truthy, waits for
     *   completion of batch update request
     * @param {number} [opts.waitForCompletionTimeout=2] - Number of minutes to
     *   wait for completion of batch upload
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasProgress>} Canvas progress object {@link https://canvas.instructure.com/doc/api/progress.html#Progress}
     */
    GradebookColumn.prototype.updateEntries = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var columnData, progress, finishedProgress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        columnData = opts.entries.map(function (entry) {
                            return __assign(__assign({}, entry), { column_id: opts.columnId });
                        });
                        return [4 /*yield*/, this.visitEndpoint({
                                config: config,
                                action: 'batch update entries in a gradebook column',
                                path: "".concat(API_PREFIX_1.default, "/courses/").concat(opts.courseId, "/custom_gradebook_column_data"),
                                method: 'PUT',
                                params: {
                                    column_data: columnData,
                                },
                            })];
                    case 1:
                        progress = _a.sent();
                        if (!opts.waitForCompletion) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, waitForCompletion_1.default)({
                                visitEndpoint: this.visitEndpoint,
                                progress: progress,
                                timeoutMin: opts.waitForCompletionTimeout,
                            })];
                    case 2:
                        finishedProgress = _a.sent();
                        return [2 /*return*/, finishedProgress];
                    case 3: 
                    // Return original progress
                    return [2 /*return*/, progress];
                }
            });
        });
    };
    return GradebookColumn;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = GradebookColumn;
//# sourceMappingURL=GradebookColumn.js.map