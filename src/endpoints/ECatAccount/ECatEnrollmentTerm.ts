/**
 * Functions for interacting with enrollment terms
 * @namespace api.enrollmentTerm
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import ErrorCode from '../../shared/types/ErrorCode';
import CanvasEnrollmentTerm from '../../types/CanvasEnrollmentTerm';

class ECatEnrollmentTerm extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                               Endpoints:                               */
  /*------------------------------------------------------------------------*/

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
  public async list(
    opts: {
      accountId: number,
      workflowState?: string,
      includeOverrides?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasEnrollmentTerm[]> {
    /**
     * Helper that gets enrollment terms for an account
     * @param [accountId=1] account id to query 
     * @returns enrollment terms
     */
    const attemptRequest = async (
      accountId: number = 1,
    ): Promise<CanvasEnrollmentTerm[]> => {
      return this.visitEndpoint({
        path: `${API_PREFIX}/accounts/${accountId}/terms`,
        method: 'GET',
        action: 'list enrollment terms for a Canvas account',
        params: {
          workflow_state: utils.includeIfTruthy(opts.workflowState),
          include: utils.genIncludesList({
            overrides: opts.includeOverrides,
          }),
        },
        pagePostProcessor: (page) => {
          return page.enrollment_terms;
        },
      });
    };

    // Try the first request
    try {
      const enrollmentTerms = await attemptRequest(opts.accountId);
      return enrollmentTerms;
    } catch (err) {
      // Detect root accounts error
      const isRootAccountError = (
        err.code
        && err.code === ErrorCode.TermsOnlyInRootAccounts
      );

      // Rethrow if this was a different error
      if (!isRootAccountError) {
        throw err;
      }

      // This is not a root account. Get the current account
      const account = await this.api.account.get({
        accountId: opts.accountId,
      });

      // Extract its root account id
      const rootAccountId = account.root_account_id;

      // Retry the request
      return attemptRequest(rootAccountId);
    }
  }

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
   * @returns {CanvasEnrollmentTerm} An enrollment term {@link https://canvas.instructure.com/doc/api/enrollment_terms.html#EnrollmentTerm}
   */
  public get(
    opts: {
      accountId: number,
      enrollmentTermId: number,
    },
    config?: APIConfig,
  ) {
    return this.visitEndpoint({
      config,
      action: 'get an enrollment term',
      path: `${API_PREFIX}/accounts/${opts.accountId}/terms/${opts.enrollmentTermId}`,
      method: 'GET',
    });
  };
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatEnrollmentTerm;
