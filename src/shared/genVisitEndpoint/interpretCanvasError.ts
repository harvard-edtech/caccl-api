/**
 * Function that interprets a Canvas response and detects errors and turns them
 *   into human-readable errors
 * @author Gabe Abrams
 */

// Import libs
import CACCLError from 'caccl-error';

// Import shared types
import ErrorCode from '../types/ErrorCode';

/**
 * Detects errors and turns them into human-readable errors
 * @author Gabe Abrams
 * @param {object} body - The JSON body of the Canvas response
 * @param {number} status - The https status of the response
 * @return {CACCLError|null} error if one was detected, null if no error
 */
const interpretCanvasError = (body: any, status: number) => {
  try {
    if (status > 300 || status < 200) {
      // Status indicates that an error occurred. Try to detect the error type

      // Do some pre-processing to help with detection
      let firstErrorMessage;
      let firstErrorCode;
      try {
        firstErrorMessage = body.errors[0].message || '';
        firstErrorCode = body.errors[0].error_code || '';
      } catch (err) {
        firstErrorMessage = '';
        firstErrorCode = '';
      }

      // 404
      if (
        body.status === '404 Not Found'
        || firstErrorMessage === 'The specified resource does not exist.'
      ) {
        return new CACCLError({
          message: 'We could not find the Canvas resource we were looking for.',
          code: ErrorCode.EndpointNotFound,
        });
      }

      // Front page error
      if (
        body.errors
        && body.errors.front_page
        && body.errors.front_page[0]
        && body.errors.front_page[0].type
        && body.errors.front_page[0].type === 'The front page cannot be unpublished'
      ) {
        return new CACCLError({
          message: 'The front page cannot be unpublished',
          code: ErrorCode.FrontPageCannotBeUnpublished,
        });
      }

      // Canvas internal error
      if (firstErrorCode === 'internal_server_error') {
        return new CACCLError({
          message: 'Canvas experienced an internal error. If this continues to occur, contact academic technologies and/or an admin.',
          code: ErrorCode.CanvasInternalError,
        });
      }

      // Unauthenticated
      if (body.status === 'unauthenticated') {
        return new CACCLError({
          message: 'Your session has expired, we no longer have access to Canvas (no access token).',
          code: ErrorCode.Unauthenticated,
        });
      }

      // Unauthorized
      if (
        status === 401
        || body.status === 'unauthorized'
        || firstErrorCode === 'unauthorized'
      ) {
        // Check for invalid access token
        if (body.message === 'Invalid access token.') {
          return new CACCLError({
            message: 'Unfortunately, Canvas revoked our access to the API. This can happen if our authorization expires. Please re-launch the app.',
            code: ErrorCode.InvalidAccessToken,
          });
        }

        // Check if the user is not authorized
        if (firstErrorMessage.startsWith('user not authorized')) {
          return new CACCLError({
            message: 'Unfortunately, we couldn\'t complete a task because the current user does not have the correct permissions. If you think this is an error, please try again.',
            code: ErrorCode.UserNotAuthorized,
          });
        }

        // Invalid masquerade
        if (body.errors && body.errors === 'Invalid as_user_id') {
          return new CACCLError({
            message: 'Either the user does not exist or you are not allowed to act as that user.',
            code: ErrorCode.CannotMasquerade,
          });
        }

        // User doesn't have the proper privileges. We don't know why.
        return new CACCLError({
          message: 'Canvas denied us access to a resource because you do not have the proper privileges.',
          code: ErrorCode.Unauthorized,
        });
      }

      // Access Denied
      if (body.error && body.error === 'access_denied') {
        return new CACCLError({
          message: 'Canvas denied our access. Please try again or re-install the tool. If this issue persists, please contact an admin.',
          code: ErrorCode.AccessDenied,
        });
      }

      // Throttling
      if (body.status && body.status === 'throttled') {
        return new CACCLError({
          message: 'Canvas is receiving high traffic and has throttled our access. Please wait a few minutes and try again.',
          code: ErrorCode.Throttled,
        });
      }

      // Missing assignment
      if (firstErrorMessage.startsWith('assignment is missing')) {
        return new CACCLError({
          message: 'We couldn\'t find the assignment we were looking for.',
          code: ErrorCode.AssignmentMissing,
        });
      }

      // Unknown student IDs
      if (firstErrorMessage.startsWith('unknown student ids')) {
        return new CACCLError({
          message: 'We couldn\'t find the student we were looking for.',
          code: ErrorCode.StudentMissing,
        });
      }

      // Invalid file IDs
      if (body.message === 'No valid file ids given') {
        return new CACCLError({
          message: 'We couldn\'t upload files because no valid file IDs were given',
          code: ErrorCode.NoValidFileIDs,
        });
      }

      // Invalid submission type
      if (body.message === 'Invalid submission[submission_type] given') {
        return new CACCLError({
          message: 'Invalid submission type given',
          code: ErrorCode.InvalidSubmissionTypeFromCanvas,
        });
      }

      // Conflicting quiz submission
      if (body.message === 'a quiz submission already exists') {
        return new CACCLError({
          message: 'A quiz submission already exists or a submission is already currently in progress. If a submission is open and in progress, please end it before trying to start another.',
          code: ErrorCode.QuizSubmissionAlreadyExists,
        });
      }

      // We couldn't identify this error. Report this as "unknown"
      return new CACCLError({
        message: 'Canvas responded with an unknown error.',
        code: ErrorCode.Unknown,
      });
    }
  } catch (err) {
    // Encountered error while trying to find an error
    return new CACCLError({
      message: 'We ran into an issue while trying to interpret the Canvas response and detect Canvas errors.',
      code: ErrorCode.CouldNotProcessForErrors,
    });
  }

  // No error found
  return null;
};

export default interpretCanvasError;
