"use strict";
/**
 * Functions for interacting with enrollment terms
 * @namespace api.enrollmentTerm
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
var ErrorCode_1 = __importDefault(require("../../shared/types/ErrorCode"));
var EnrollmentTerm = /** @class */ (function (_super) {
    __extends(EnrollmentTerm, _super);
    function EnrollmentTerm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                               Endpoints:                               */
    /*------------------------------------------------------------------------*/
    /**
     * List enrollment terms for a specific account
     * @author Gabe Abrams
     * @method list
     * @memberof api.account.enrollmentTerm
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} [opts.accountId=1] Canvas account Id to list enrollment
     *   terms. If account is not a root account, we get info on the provided
     *   account (one extra request) and get its root account, then we request
     *   terms for that root account. Only root accounts have enrollment terms, so
     *   this is a required step. You can also provide a root account id when
     *   calling this function and this step is unnecessary
     * @param {string} [opts.workflowState=active] If set, only returns terms
     *   that are in the given state
     * @param {boolean} [opts.includeOverrides] If true, include term start/end
     *   dates overridden for different enrollment types
     * @returns {CanvasEnrollmentTerm[]} List of enrollment terms {@link https://canvas.instructure.com/doc/api/enrollment_terms.html#EnrollmentTerm}
     */
    EnrollmentTerm.prototype.list = function (opts, config) {
        return __awaiter(this, void 0, void 0, function () {
            var attemptRequest, enrollmentTerms, err_1, isRootAccountError, account, rootAccountId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attemptRequest = function (accountId) {
                            if (accountId === void 0) { accountId = 1; }
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, this.visitEndpoint({
                                            path: "".concat(API_PREFIX_1.default, "/accounts/").concat(accountId, "/terms"),
                                            method: 'GET',
                                            action: 'list enrollment terms for a Canvas account',
                                            params: {
                                                workflow_state: utils_1.default.includeIfTruthy(opts.workflowState),
                                                include: utils_1.default.genIncludesList({
                                                    overrides: opts.includeOverrides,
                                                }),
                                            },
                                            pagePostProcessor: function (page) {
                                                return page.enrollment_terms;
                                            },
                                        })];
                                });
                            });
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, attemptRequest(opts.accountId)];
                    case 2:
                        enrollmentTerms = _a.sent();
                        return [2 /*return*/, enrollmentTerms];
                    case 3:
                        err_1 = _a.sent();
                        isRootAccountError = (err_1.code
                            && err_1.code === ErrorCode_1.default.TermsOnlyInRootAccounts);
                        // Rethrow if this was a different error
                        if (!isRootAccountError) {
                            throw err_1;
                        }
                        return [4 /*yield*/, this.api.account.get({
                                accountId: opts.accountId,
                            })];
                    case 4:
                        account = _a.sent();
                        rootAccountId = account.root_account_id;
                        // Retry the request
                        return [2 /*return*/, attemptRequest(rootAccountId)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get an enrollment term
     * @author Gabe Abrams
     * @method get
     * @memberof api.account.enrollmentTerm
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.accountId the id for the Canvas account containing
     *   enrollment term
     * @param {number} opts.enrollmentTermId Canvas enrollment term id
     * @returns {EnrollmentTerm} An enrollment term {@link https://canvas.instructure.com/doc/api/enrollment_terms.html#EnrollmentTerm}
     */
    EnrollmentTerm.prototype.get = function (opts, config) {
        return this.visitEndpoint({
            config: config,
            action: 'get an enrollment term',
            path: "".concat(API_PREFIX_1.default, "/accounts/").concat(opts.accountId, "/terms/").concat(opts.enrollmentTermId),
            method: 'GET',
        });
    };
    ;
    return EnrollmentTerm;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = EnrollmentTerm;
//# sourceMappingURL=EnrollmentTerm.js.map