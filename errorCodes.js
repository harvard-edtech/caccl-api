module.exports = {
  invalid_cache: 'SCE1',
  unnamedEndpointError: 'SCE2',
  endpointDidntReturnPromise: 'SCE3',

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
  gradeUploadTimeout: 'SCE11',
  gradeUploadStatusError: 'SCE12',
};
