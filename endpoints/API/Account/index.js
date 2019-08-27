/**
 * Functions for interacting with accounts
 * @class api.account
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');

class Account extends EndpointCategory {
  constructor(config) {
    super(config, Account);
  }
}

/*------------------------------------------------------------------------*/
/*                             Subcategories:                             */
/*------------------------------------------------------------------------*/

/*------------------------------------------------------------------------*/
/*                               Endpoints:                               */
/*------------------------------------------------------------------------*/

/**
 * Gets info on a specific course
 * @author Gabriel Abrams
 * @method get
 * @memberof api.account
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.accountId - Canvas acount Id to get info on
 * @return {Promise.<Object>} Canvas account {@link https://canvas.instructure.com/doc/api/accounts.html#Account}
 */
Account.get = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/accounts/${options.accountId}`,
    method: 'GET',
  });
};
Account.get.action = 'get info on a specific account';

/**
 * Get the list of accounts
 * @author Gabriel Abrams
 * @method list
 * @memberof api.account
 * @instance
 * @return {Promise.<Object[]>} list of Canvas accounts {@link https://canvas.instructure.com/doc/api/accounts.html#Account}
 */
Account.list = function () {
  return this.visitEndpoint({
    path: `${prefix.v1}/accounts`,
    method: 'GET',
  });
};
Account.list.action = 'get the list of accounts';

/**
 * Gets the list of admins in an account
 * @author Gabriel Abrams
 * @method listAdmins
 * @memberof api.account
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.accountId - Canvas acount Id to get the list of
 *   admins from
 * @return {Promise.<Object[]>} List of Canvas admins {@link https://canvas.instructure.com/doc/api/admins.html#Admin}
 */
Account.listAdmins = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/accounts/${options.accountId}/admins`,
    method: 'GET',
  });
};
Account.listAdmins.action = 'get the list of admins in a specific account';

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Account;
