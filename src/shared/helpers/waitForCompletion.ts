/**
 * Functionality to wait for Canvas progress object to complete
 * @author Gabe Abrams
 */

// Import libs
import CACCLError from 'caccl-error';

// Import shared types
import ErrorCode from '../types/ErrorCode';
import CanvasProgress from '../../types/CanvasProgress';
import VisitEndpointFunc from '../types/VisitEndpointFunc';

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
const waitForCompletion = async (
  opts: {
    progress: CanvasProgress,
    visitEndpoint: VisitEndpointFunc,
    timeoutMin?: number,
    refreshMs?: number,
  },
): Promise<CanvasProgress> => {
  // Prep for timeout
  const timeoutMs = (60000 * (opts.timeoutMin || 2));
  const stopTime = (Date.now() + timeoutMs);
  // Prep to check
  const urlNoQuery = String(opts.progress.url).split('?')[0].split('#')[0];
  const hostAndPath = (
    urlNoQuery
      // Remove protocol
      .replace('http://', '')
      .replace('https://', '')
  );
  const checkPath = (
    hostAndPath.substring(hostAndPath.split('/')[0].length, hostAndPath.length)
  );

  // Calculate the number of checks
  const refreshMs = (opts.refreshMs || 250);
  const maxNumChecks = Math.ceil(timeoutMs / opts.refreshMs);

  // Loop until checks run out
  for (let i = 0; i < maxNumChecks; i++) {
    // Check status
    const statusResponse = await opts.visitEndpoint({
      path: checkPath,
      method: 'GET',
      action: 'check the status on a Canvas request',
    }) as CanvasProgress;

    // Detect issues
    if (statusResponse.workflow_state === 'failed') {
      throw new CACCLError({
        message: statusResponse.message,
        code: ErrorCode.WaitForCompletionFailure,
      });
    }

    // If no success, keep trying
    if (statusResponse.workflow_state !== 'completed') {
      // Not yet completed
      if (Date.now() > stopTime) {
        // Timeout!
        throw new CACCLError({
          message: 'A queued job reached its timeout. This does not mean that the job did not complete (it might have). It just means that we reached a timeout while checking on the progress of the job. It may complete in the future.',
          code: ErrorCode.WaitForCompletionTimeout,
        });
      }

      // We have more time to try again. Wait then try again
      await new Promise((r) => {
        setTimeout(r, refreshMs);
      });
    } else {
      // Completed. Finish
      return statusResponse;
    }
  }
};

export default waitForCompletion;
