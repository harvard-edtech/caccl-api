/**
 * List of error codes
 * @author Gabe Abrams
 */

// Highest errors =
// > CAPI35
// > CANV18 (exclude 404, 500)

enum ErrorCode {
  InvalidCache = 'CAPI1',
  UnnamedEndpointError = 'CAPI2',
  EndpointDidntReturnPromise = 'CAPI3',
  EndpointCallExcludedRequiredParam = 'CAP24',

  // Errors for request sender
  NotFound = 'CAPI15',
  InvalidSyntax = 'CAPI16',
  Malformed = 'CAPI17',
  CouldNotProcessForErrors = 'CAP26',
  CouldNotBindEndpoint = 'CAPI22',
  Unauthorized = 'CAPI27',
  // Canvas Errors
  FrontPageCannotBeUnpublished = 'CANV2',
  InvalidAccessToken = 'CANV3',
  UserNotAuthorized = 'CANV4',
  Unauthenticated = 'CANV5',
  AccessDenied = 'CANV6',
  Throttled = 'CANV7',
  AssignmentMissing = 'CANV8',
  StudentMissing = 'CANV9',
  NoValidFileIDs = 'CANV10',
  InvalidSubmissionTypeFromCanvas = 'CANV11',
  Unknown = 'CANV12',
  NoSubmissionFiles = 'CANV13',
  QuizSubmissionAlreadyExists = 'CANV14',
  EndpointNotFound = 'CANV404',
  CanvasInternalError = 'CANV500',
  TermsOnlyInRootAccounts = 'CANV15',
  InvalidTabLocation = 'CANV16',
  TriedAllTabLocations = 'CANV17',
  CannotMasquerade = 'CANV18',

  // Errors for caches
  SessionCacheNoSession = 'CAPI13',

  // Errors for helpers
  // > endpoints/waitForCompletion.js
  WaitForCompletionTimeout = 'CAPI11',
  WaitForCompletionCheckError = 'CAPI12',
  WaitForCompletionFailure = 'CAPI23',

  // Errors for specific endpoints

  // course
  // > updatePublishState
  CoursePublishedStateNotUpdated = 'CAPI31',
  // course.assignment
  // > createSubmission
  SubmissionFileUploadFailed = 'CAPI4',
  SubmissionFileActivateFailed = 'CAPI5',
  SubmissionFileCheckFailed = 'CAPI6',
  SubmissionFileCheckParseFailed = 'CAPI7',
  SubmissionFilePrepFailed = 'CAPI8',
  InvalidSubmissionType = 'CAPI9',
  // > updateGrades
  NoRubricOnBatchGradeUpload = 'CAPI10',

  // course.gradebookcolumns.js
  // > get
  ColumnNotFound = 'CAPI11',

  // course.app
  // > getMetadata
  NoAppWithMetadataFound = 'CAPI18',
  MetadataMalformed = 'CAPI19',
  NoAppsToUpdateMetadata = 'CAPI20',

  // course.quiz
  // > listQuestionGrades
  QuizReportNoRows = 'CAPI21',

  // course.navMenuItem
  // > update
  NavItemNotFound = 'CAPI25',

  MigrationTimeout = 'CAPI26',
  MigrationIssue = 'CAPI28',
  CouldNotFindDestinationAssignment = 'CAPI29',
  CouldNotFindDestinationAssignmentGroup = 'CAPI30',

  // course.quiz reports
  QuizReportNoProgress = 'CAPI32',
  QuizReportGenerationFailed = 'CAPI33',
  QuizReportFormattingUnexpected = 'CAPI34',
  QuizReportGenerationTimeout = 'CAPI35',
}

export default ErrorCode;
