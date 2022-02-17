"use strict";
/**
 * Functionality to wait for Canvas progress object to complete
 * @author Gabe Abrams
 */
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
// Import libs
var url_1 = __importDefault(require("url"));
var caccl_error_1 = __importDefault(require("caccl-error"));
// Import shared types
var ErrorCode_1 = __importDefault(require("../types/ErrorCode"));
/**
 * Creates a new promise that resolves when the task has been completed. The
 *   process pings Canvas every refreshMs milliseconds.
 * @author Gabe Abrams
 * @param progress a Canvas Progress object {@link https://canvas.instructure.com/doc/api/progress.html#Progress}
 *   that was returned from a request for a large change in Canvas (e.g., batch
 *   grade upload, batch gradebook column data change)
 * @param visitEndpoint the current visitEndpoint function
 * @param {number} [timeout=2] - Number of minutes to wait before timing out
 * @param {number} [refreshMs=250] - Number of milliseconds to wait between
 *   progress checks
 * @returns final state of the Progress object {@link https://canvas.instructure.com/doc/api/progress.html#Progress}
 *   upon successful completion, or rejects with a CACCLError
 */
var waitForCompletion = function (opts) { return __awaiter(void 0, void 0, void 0, function () {
    var timeoutMs, stopTime, checkPath, refreshMs, maxNumChecks, i, statusResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                timeoutMs = (60000 * (opts.timeoutMin || 2));
                stopTime = (Date.now() + timeoutMs);
                checkPath = url_1.default.parse(opts.progress.url).path;
                refreshMs = (opts.refreshMs || 250);
                maxNumChecks = Math.ceil(timeoutMs / opts.refreshMs);
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < maxNumChecks)) return [3 /*break*/, 6];
                return [4 /*yield*/, opts.visitEndpoint({
                        path: checkPath,
                        method: 'GET',
                        action: 'check the status on a Canvas request',
                    })];
            case 2:
                statusResponse = _a.sent();
                // Detect issues
                if (statusResponse.workflow_state === 'failed') {
                    throw new caccl_error_1.default({
                        message: statusResponse.message,
                        code: ErrorCode_1.default.WaitForCompletionFailure,
                    });
                }
                if (!(statusResponse.workflow_state !== 'completed')) return [3 /*break*/, 4];
                // Not yet completed
                if (Date.now() > stopTime) {
                    // Timeout!
                    throw new caccl_error_1.default({
                        message: 'A queued job reached its timeout. This does not mean that the job did not complete (it might have). It just means that we reached a timeout while checking on the progress of the job. It may complete in the future.',
                        code: ErrorCode_1.default.WaitForCompletionTimeout,
                    });
                }
                // We have more time to try again. Wait then try again
                return [4 /*yield*/, new Promise(function (r) {
                        setTimeout(r, refreshMs);
                    })];
            case 3:
                // We have more time to try again. Wait then try again
                _a.sent();
                return [3 /*break*/, 5];
            case 4: 
            // Completed. Finish
            return [2 /*return*/, statusResponse];
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.default = waitForCompletion;
//# sourceMappingURL=waitForCompletion.js.map