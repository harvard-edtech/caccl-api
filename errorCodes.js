/**
 * List of error codes
 * @module errorCodes
 * @see module: errorCodes
 */

// Highest errors:
// > SCE21
// > CANV14 (exclude 404, 500)

module.exports = {
  invalid_cache: 'SCE1',
  unnamedEndpointError: 'SCE2',
  endpointDidntReturnPromise: 'SCE3',

  // Errors for visitEndpoint/request sender
  // > /classes/request/genVisitEndpoint.js
  notConnected: 'SCE14',
  notFound: 'SCE15',
  invalidSyntax: 'SCE16',
  malformed: 'SCE17',
  // Canvas Errors:
  // > /classes/request/helpers/interpretCanvasError.js
  frontPageCannotBeUnpublished: 'CANV2',
  invalidAccessToken: 'CANV3',
  userNotAuthorized: 'CANV4',
  unauthenticated: 'CANV5',
  accessDenied: 'CANV6',
  throttled: 'CANV7',
  assignmentMissing: 'CANV8',
  studentMissing: 'CANV9',
  noValidFileIDs: 'CANV10',
  invalidSubmissionTypeFromCanvas: 'CANV11',
  unknown: 'CANV12',
  noSubmissionFiles: 'CANV13',
  quizSubmissionAlreadyExists: 'CANV14',
  endpointNotFound: 'CANV404',
  canvasInternalError: 'CANV500',

  // Errors for caches
  sessionCacheNoSession: 'SCE13',

  // Errors for helpers
  // > endpoints/waitForCompletion.js
  waitForCompletionTimeout: 'SCE11',
  waitForCompletionCheckError: 'SCE12',

  // Errors for specific endpoints

  // course.assignment
  // > createSubmission
  submissionFileUploadFailed: 'SCE4',
  submissionFileActivateFailed: 'SCE5',
  submissionFileCheckFailed: 'SCE6',
  submissionFileCheckParseFailed: 'SCE7',
  submissionFilePrepFailed: 'SCE8',
  invalidSubmissionType: 'SCE9',
  // > updateGrades
  noRubricOnBatchGradeUpload: 'SCE10',

  // course.gradebookcolumns.js
  // > get
  columnNotFound: 'SCE11',

  // course.app
  // > getMetadata
  noAppWithMetadataFound: 'SCE18',
  metadataMalformed: 'SCE19',
  noAppsToUpdateMetadata: 'SCE20',

  // course.quiz
  // > listQuestionGrades
  quizReportNoRows: 'SCE21',
};
