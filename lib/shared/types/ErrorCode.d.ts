/**
 * List of error codes
 * @author Gabe Abrams
 */
declare enum ErrorCode {
    InvalidCache = "CAPI1",
    UnnamedEndpointError = "CAPI2",
    EndpointDidntReturnPromise = "CAPI3",
    EndpointCallExcludedRequiredParam = "CAP24",
    NotFound = "CAPI15",
    InvalidSyntax = "CAPI16",
    Malformed = "CAPI17",
    CouldNotProcessForErrors = "CAP26",
    CouldNotBindEndpoint = "CAPI22",
    Unauthorized = "CAPI27",
    FrontPageCannotBeUnpublished = "CANV2",
    InvalidAccessToken = "CANV3",
    UserNotAuthorized = "CANV4",
    Unauthenticated = "CANV5",
    AccessDenied = "CANV6",
    Throttled = "CANV7",
    AssignmentMissing = "CANV8",
    StudentMissing = "CANV9",
    NoValidFileIDs = "CANV10",
    InvalidSubmissionTypeFromCanvas = "CANV11",
    Unknown = "CANV12",
    NoSubmissionFiles = "CANV13",
    QuizSubmissionAlreadyExists = "CANV14",
    EndpointNotFound = "CANV404",
    CanvasInternalError = "CANV500",
    TermsOnlyInRootAccounts = "CANV15",
    InvalidTabLocation = "CANV16",
    TriedAllTabLocations = "CANV17",
    CannotMasquerade = "CANV18",
    SessionCacheNoSession = "CAPI13",
    WaitForCompletionTimeout = "CAPI11",
    WaitForCompletionCheckError = "CAPI12",
    WaitForCompletionFailure = "CAPI23",
    SubmissionFileUploadFailed = "CAPI4",
    SubmissionFileActivateFailed = "CAPI5",
    SubmissionFileCheckFailed = "CAPI6",
    SubmissionFileCheckParseFailed = "CAPI7",
    SubmissionFilePrepFailed = "CAPI8",
    InvalidSubmissionType = "CAPI9",
    NoRubricOnBatchGradeUpload = "CAPI10",
    ColumnNotFound = "CAPI11",
    NoAppWithMetadataFound = "CAPI18",
    MetadataMalformed = "CAPI19",
    NoAppsToUpdateMetadata = "CAPI20",
    QuizReportNoRows = "CAPI21",
    NavItemNotFound = "CAPI25"
}
export default ErrorCode;
