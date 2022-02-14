"use strict";
/**
 * Function that interprets a Canvas response and detects errors and turns them
 *   into human-readable errors
 * @author Gabe Abrams
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import libs
var caccl_error_1 = __importDefault(require("caccl-error"));
// Import shared types
var ErrorCode_1 = __importDefault(require("../types/ErrorCode"));
/**
 * Detects errors and turns them into human-readable errors
 * @author Gabe Abrams
 * @param {object} body - The JSON body of the Canvas response
 * @param {number} status - The https status of the response
 * @return {CACCLError|null} error if one was detected, null if no error
 */
var interpretCanvasError = function (body, status) {
    try {
        if (status > 300 || status < 200) {
            // Status indicates that an error occurred. Try to detect the error type
            // Do some pre-processing to help with detection
            var firstErrorMessage = void 0;
            var firstErrorCode = void 0;
            try {
                firstErrorMessage = body.errors[0].message || '';
                firstErrorCode = body.errors[0].error_code || '';
            }
            catch (err) {
                firstErrorMessage = '';
                firstErrorCode = '';
            }
            // 404
            if (body.status === '404 Not Found'
                || firstErrorMessage === 'The specified resource does not exist.') {
                return new caccl_error_1.default({
                    message: 'We could not find the Canvas resource we were looking for.',
                    code: ErrorCode_1.default.EndpointNotFound,
                });
            }
            // Front page error
            if (body.errors
                && body.errors.front_page
                && body.errors.front_page[0]
                && body.errors.front_page[0].type
                && body.errors.front_page[0].type === 'The front page cannot be unpublished') {
                return new caccl_error_1.default({
                    message: 'The front page cannot be unpublished',
                    code: ErrorCode_1.default.FrontPageCannotBeUnpublished,
                });
            }
            // Canvas internal error
            if (firstErrorCode === 'internal_server_error') {
                return new caccl_error_1.default({
                    message: 'Canvas experienced an internal error. If this continues to occur, contact academic technologies and/or an admin.',
                    code: ErrorCode_1.default.CanvasInternalError,
                });
            }
            // Unauthenticated
            if (body.status === 'unauthenticated') {
                return new caccl_error_1.default({
                    message: 'Your session has expired, we no longer have access to Canvas (no access token).',
                    code: ErrorCode_1.default.Unauthenticated,
                });
            }
            // Unauthorized
            if (status === 401
                || body.status === 'unauthorized'
                || firstErrorCode === 'unauthorized') {
                // Check for invalid access token
                if (body.message === 'Invalid access token.') {
                    return new caccl_error_1.default({
                        message: 'Unfortunately, Canvas revoked our access to the API. This can happen if our authorization expires. Please re-launch the app.',
                        code: ErrorCode_1.default.InvalidAccessToken,
                    });
                }
                // Check if the user is not authorized
                if (firstErrorMessage.startsWith('user not authorized')) {
                    return new caccl_error_1.default({
                        message: 'Unfortunately, we couldn\'t complete a task because the current user does not have the correct permissions. If you think this is an error, please try again.',
                        code: ErrorCode_1.default.UserNotAuthorized,
                    });
                }
                // Invalid masquerade
                if (body.errors && body.errors === 'Invalid as_user_id') {
                    return new caccl_error_1.default({
                        message: 'Either the user does not exist or you are not allowed to act as that user.',
                        code: ErrorCode_1.default.CannotMasquerade,
                    });
                }
                // User doesn't have the proper privileges. We don't know why.
                return new caccl_error_1.default({
                    message: 'Canvas denied us access to a resource because you do not have the proper privileges.',
                    code: ErrorCode_1.default.Unauthorized,
                });
            }
            // Access Denied
            if (body.error && body.error === 'access_denied') {
                return new caccl_error_1.default({
                    message: 'Canvas denied our access. Please try again or re-install the tool. If this issue persists, please contact an admin.',
                    code: ErrorCode_1.default.AccessDenied,
                });
            }
            // Throttling
            if (body.status && body.status === 'throttled') {
                return new caccl_error_1.default({
                    message: 'Canvas is receiving high traffic and has throttled our access. Please wait a few minutes and try again.',
                    code: ErrorCode_1.default.Throttled,
                });
            }
            // Missing assignment
            if (firstErrorMessage.startsWith('assignment is missing')) {
                return new caccl_error_1.default({
                    message: 'We couldn\'t find the assignment we were looking for.',
                    code: ErrorCode_1.default.AssignmentMissing,
                });
            }
            // Unknown student IDs
            if (firstErrorMessage.startsWith('unknown student ids')) {
                return new caccl_error_1.default({
                    message: 'We couldn\'t find the student we were looking for.',
                    code: ErrorCode_1.default.StudentMissing,
                });
            }
            // Invalid file IDs
            if (body.message === 'No valid file ids given') {
                return new caccl_error_1.default({
                    message: 'We couldn\'t upload files because no valid file IDs were given',
                    code: ErrorCode_1.default.NoValidFileIDs,
                });
            }
            // Invalid submission type
            if (body.message === 'Invalid submission[submission_type] given') {
                return new caccl_error_1.default({
                    message: 'Invalid submission type given',
                    code: ErrorCode_1.default.InvalidSubmissionTypeFromCanvas,
                });
            }
            // Conflicting quiz submission
            if (body.message === 'a quiz submission already exists') {
                return new caccl_error_1.default({
                    message: 'A quiz submission already exists or a submission is already currently in progress. If a submission is open and in progress, please end it before trying to start another.',
                    code: ErrorCode_1.default.QuizSubmissionAlreadyExists,
                });
            }
            // We couldn't identify this error. Report this as "unknown"
            return new caccl_error_1.default({
                message: 'Canvas responded with an unknown error.',
                code: ErrorCode_1.default.Unknown,
            });
        }
    }
    catch (err) {
        // Encountered error while trying to find an error
        return new caccl_error_1.default({
            message: 'We ran into an issue while trying to interpret the Canvas response and detect Canvas errors.',
            code: ErrorCode_1.default.CouldNotProcessForErrors,
        });
    }
    // No error found
    return null;
};
exports.default = interpretCanvasError;
//# sourceMappingURL=interpretCanvasError.js.map