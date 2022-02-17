/**
 * Functionality to wait for Canvas progress object to complete
 * @author Gabe Abrams
 */
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
declare const waitForCompletion: (opts: {
    progress: CanvasProgress;
    visitEndpoint: VisitEndpointFunc;
    timeoutMin?: number;
    refreshMs?: number;
}) => Promise<CanvasProgress>;
export default waitForCompletion;
