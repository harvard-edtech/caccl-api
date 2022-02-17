/**
 * Functions for interacting with enrollment terms
 * @namespace api.enrollmentTerm
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasEnrollmentTerm from '../../types/CanvasEnrollmentTerm';
declare class EnrollmentTerm extends EndpointCategory {
    /**
     * List enrollment terms for a specific account
     * @author Gabe Abrams
     * @method list
     * @memberof api.account.enrollmentTerm
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} [opts.accountId=1] Canvas account Id to list enrollment
     *   terms. If account is not a root account, we get info on the provided
     *   account (one extra request) and get its root account, then we request
     *   terms for that root account. Only root accounts have enrollment terms, so
     *   this is a required step. You can also provide a root account id when
     *   calling this function and this step is unnecessary
     * @param {string} [opts.workflowState=active] If set, only returns terms
     *   that are in the given state
     * @param {boolean} [opts.includeOverrides] If true, include term start/end
     *   dates overridden for different enrollment types
     * @returns {CanvasEnrollmentTerm[]} List of enrollment terms {@link https://canvas.instructure.com/doc/api/enrollment_terms.html#EnrollmentTerm}
     */
    list(opts: {
        accountId: number;
        workflowState?: string;
        includeOverrides?: boolean;
    }, config?: APIConfig): Promise<CanvasEnrollmentTerm[]>;
    /**
     * Get an enrollment term
     * @author Gabe Abrams
     * @method get
     * @memberof api.account.enrollmentTerm
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.accountId the id for the Canvas account containing
     *   enrollment term
     * @param {number} opts.enrollmentTermId Canvas enrollment term id
     * @returns {EnrollmentTerm} An enrollment term {@link https://canvas.instructure.com/doc/api/enrollment_terms.html#EnrollmentTerm}
     */
    get(opts: {
        accountId: number;
        enrollmentTermId: number;
    }, config?: APIConfig): Promise<any>;
}
export default EnrollmentTerm;
