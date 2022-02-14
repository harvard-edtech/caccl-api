"use strict";
/**
 * List of error codes
 * @author Gabe Abrams
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Highest errors =
// > CAPI27
// > CANV18 (exclude 404, 500)
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["InvalidCache"] = "CAPI1";
    ErrorCode["UnnamedEndpointError"] = "CAPI2";
    ErrorCode["EndpointDidntReturnPromise"] = "CAPI3";
    ErrorCode["EndpointCallExcludedRequiredParam"] = "CAP24";
    // Errors for request sender
    ErrorCode["NotFound"] = "CAPI15";
    ErrorCode["InvalidSyntax"] = "CAPI16";
    ErrorCode["Malformed"] = "CAPI17";
    ErrorCode["CouldNotProcessForErrors"] = "CAP26";
    ErrorCode["CouldNotBindEndpoint"] = "CAPI22";
    ErrorCode["Unauthorized"] = "CAPI27";
    // Canvas Errors
    ErrorCode["FrontPageCannotBeUnpublished"] = "CANV2";
    ErrorCode["InvalidAccessToken"] = "CANV3";
    ErrorCode["UserNotAuthorized"] = "CANV4";
    ErrorCode["Unauthenticated"] = "CANV5";
    ErrorCode["AccessDenied"] = "CANV6";
    ErrorCode["Throttled"] = "CANV7";
    ErrorCode["AssignmentMissing"] = "CANV8";
    ErrorCode["StudentMissing"] = "CANV9";
    ErrorCode["NoValidFileIDs"] = "CANV10";
    ErrorCode["InvalidSubmissionTypeFromCanvas"] = "CANV11";
    ErrorCode["Unknown"] = "CANV12";
    ErrorCode["NoSubmissionFiles"] = "CANV13";
    ErrorCode["QuizSubmissionAlreadyExists"] = "CANV14";
    ErrorCode["EndpointNotFound"] = "CANV404";
    ErrorCode["CanvasInternalError"] = "CANV500";
    ErrorCode["TermsOnlyInRootAccounts"] = "CANV15";
    ErrorCode["InvalidTabLocation"] = "CANV16";
    ErrorCode["TriedAllTabLocations"] = "CANV17";
    ErrorCode["CannotMasquerade"] = "CANV18";
    // Errors for caches
    ErrorCode["SessionCacheNoSession"] = "CAPI13";
    // Errors for helpers
    // > endpoints/waitForCompletion.js
    ErrorCode["WaitForCompletionTimeout"] = "CAPI11";
    ErrorCode["WaitForCompletionCheckError"] = "CAPI12";
    ErrorCode["WaitForCompletionFailure"] = "CAPI23";
    // Errors for specific endpoints
    // course.assignment
    // > createSubmission
    ErrorCode["SubmissionFileUploadFailed"] = "CAPI4";
    ErrorCode["SubmissionFileActivateFailed"] = "CAPI5";
    ErrorCode["SubmissionFileCheckFailed"] = "CAPI6";
    ErrorCode["SubmissionFileCheckParseFailed"] = "CAPI7";
    ErrorCode["SubmissionFilePrepFailed"] = "CAPI8";
    ErrorCode["InvalidSubmissionType"] = "CAPI9";
    // > updateGrades
    ErrorCode["NoRubricOnBatchGradeUpload"] = "CAPI10";
    // course.gradebookcolumns.js
    // > get
    ErrorCode["ColumnNotFound"] = "CAPI11";
    // course.app
    // > getMetadata
    ErrorCode["NoAppWithMetadataFound"] = "CAPI18";
    ErrorCode["MetadataMalformed"] = "CAPI19";
    ErrorCode["NoAppsToUpdateMetadata"] = "CAPI20";
    // course.quiz
    // > listQuestionGrades
    ErrorCode["QuizReportNoRows"] = "CAPI21";
    // course.navMenuItem
    // > update
    ErrorCode["NavItemNotFound"] = "CAPI25";
})(ErrorCode || (ErrorCode = {}));
;
exports.default = ErrorCode;
//# sourceMappingURL=ErrorCode.js.map