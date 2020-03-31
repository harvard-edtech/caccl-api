/**
 * Functions for interacting with accounts
 * @class api.enrollmentTerm
 */

const EndpointCategory = require('../../../../classes/EndpointCategory');
const prefix = require('../../../common/prefix');
const utils = require('../../../common/utils');
const errorCodes = require('../../../../errorCodes');

class EnrollmentTerm extends EndpointCategory {
  constructor(config) {
    super(config, EnrollmentTerm);
  }
}

/*------------------------------------------------------------------------*/
/*                               Endpoints:                               */
/*------------------------------------------------------------------------*/

/**
 * List enrollment terms for a specific account
 * @author Gabriel Abrams
 * @method list
 * @memberof api.enrollmentTerm
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} [options.accountId=1] - Canvas account Id to list enrollment
 *   terms. If account is not a root account, we get info on the provided
 *   account (one extra request) and get its root account, then we request
 *   terms for that root account. Only root accounts have enrollment terms, so
 *   this is a required step. You can also provide a root account id when
 *   calling this function and this step is unnecessary
 * @param {string} [options.workflowState=active] - If set, only returns terms
 *   that are in the given state
 * @param {boolean} [options.includeOverrides] - If true, include term start/end
 *   dates overridden for different enrollment types
 * @return {Promise.<Object[]>} List of enrollment terms {@link https://canvas.instructure.com/doc/api/enrollment_terms.html#EnrollmentTerm}
 */
EnrollmentTerm.list = function (options) {
  const attemptRequest = (accountId) => {
    return this.visitEndpoint({
      path: `${prefix.v1}/accounts/${accountId || 1}/terms`,
      method: 'GET',
      params: {
        workflow_state: utils.includeIfTruthy(options.workflowState),
        include: utils.genIncludesList({
          overrides: options.includeOverrides,
        }),
      },
      pagePostProcessor: (page) => {
        return page.enrollment_terms;
      },
    });
  };

  // Try the first request
  return attemptRequest(options.accountId)
    .catch((err) => {
      // Detect root accounts error
      const isRootAccountError = (
        err.code
        && err.code === errorCodes.termsOnlyInRootAccounts
      );

      // Rethrow if this was a different error
      if (!isRootAccountError) {
        throw err;
      }

      // This is not a root account. Get the current account
      return this.api.account.get({
        accountId: options.accountId,
      })
        .then((account) => {
          // Extract its root account id
          const rootAccountId = account.root_account_id;

          // Retry the request
          return attemptRequest(rootAccountId);
        });
    });
};
EnrollmentTerm.list.action = 'list enrollment terms for a Canvas account';
EnrollmentTerm.list.requiredParams = ['accountId'];
EnrollmentTerm.list.scopes = ['url:GET|/api/v1/accounts/:account_id/terms'];

/**
 * Get an enrollment term
 * @author Gabriel Abrams
 * @method get
 * @memberof api.enrollmentTerm
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.accountId - the id for the Canvas account containing
 *   enrollment term
 * @param {number} options.enrollmentTermId - Canvas enrollment term id
 * @return {Promise.<Object>} An enrollment term {@link https://canvas.instructure.com/doc/api/enrollment_terms.html#EnrollmentTerm}
 */
EnrollmentTerm.get = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/accounts/${options.accountId}/terms/${options.enrollmentTermId}`,
    method: 'GET',
  });
};
EnrollmentTerm.get.action = 'get an enrollment term';
EnrollmentTerm.get.requiredParams = ['accountId', 'enrollmentTermId'];
EnrollmentTerm.get.scopes = ['url:GET|/api/v1/accounts/:account_id/terms/:id'];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = EnrollmentTerm;
