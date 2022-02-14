/**
 * Function that interprets a Canvas response and detects errors and turns them
 *   into human-readable errors
 * @author Gabe Abrams
 */
import CACCLError from 'caccl-error';
/**
 * Detects errors and turns them into human-readable errors
 * @author Gabe Abrams
 * @param {object} body - The JSON body of the Canvas response
 * @param {number} status - The https status of the response
 * @return {CACCLError|null} error if one was detected, null if no error
 */
declare const interpretCanvasError: (body: any, status: number) => CACCLError;
export default interpretCanvasError;
