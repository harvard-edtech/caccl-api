// Highest error: SCE13

module.exports = {
  invalid_cache: 'SCE1',
  unnamedEndpointError: 'SCE2',
  endpointDidntReturnPromise: 'SCE3',

  // Errors for caches
  sessionCacheNoSession: 'SCE13',

  // Errors for helpers
  // > endpoints/waitForCompletion.js
  waitForCompletionTimeout: 'SCE11',
  waitForCompletionCheckError: 'SCE12',

  // Errors for specific endpoints

  // course/assignments.js
  // > createAssignmentSubmission
  submissionFileUploadFailed: 'SCE4',
  submissionFileActivateFailed: 'SCE5',
  submissionFileCheckFailed: 'SCE6',
  submissionFileCheckParseFailed: 'SCE7',
  submissionFilePrepFailed: 'SCE8',
  invalidSubmissionType: 'SCE9',
  // > updateAssignmentGrades
  noRubricOnBatchGradeUpload: 'SCE10',
};
