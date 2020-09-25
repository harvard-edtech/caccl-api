/**
 * Functions for users
 * @namespace api.user
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');

// Import subcategories:
const Self = require('./Self');

class User extends EndpointCategory {
  constructor(config) {
    super(config, User);
  }
}

/*------------------------------------------------------------------------*/
/*                             Subcategories:                             */
/*------------------------------------------------------------------------*/

User.self = Self;

/*------------------------------------------------------------------------*/
/*                               Endpoints:                               */
/*------------------------------------------------------------------------*/

/**
 * Get a user's list of email addresses. Masquerade (act as user) ability is
 *   required for this function
 * @author Gabe Abrams
 * @memberof api.user
 * @instance
 * @async
 * @method listEmails
 * @param {object} options - object containing all arguments
 * @param {number} options.userId - the id of the user to get emails for
 * @param {boolean} [options.sortByDate] - if false then sort by ranked
 *   order of emails (primary email first), if true then sort by date
 *   created so the official emails should be first
 * @return {object[]} list of email address objects in the form:
 *   { email, createdAt, position }
 */
User.listEmails = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/users/self/communication_channels`,
    method: 'GET',
    params: {
      as_user_id: options.userId,
    },
  })
    .then((channels) => {
      // Filter out non-email communication channels
      const emailChannels = channels.filter((channel) => {
        return (channel.type === 'email');
      });

      // Create email objects
      const emailObjects = emailChannels.map((channel) => {
        return {
          position: channel.position,
          email: channel.address,
          createdAt: new Date(channel.created_at),
        };
      });

      // Sort
      if (options.sortByDate) {
        emailObjects.sort((a, b) => {
          const aT = a.createdAt.getTime();
          const bT = b.createdAt.getTime();

          if (aT < bT) {
            return -1;
          }
          if (aT > bT) {
            return 1;
          }
          return 0;
        });
      }

      // Return
      return emailObjects;
    });
};
User.listEmails.action = 'get the list of email addresses for a user';
User.listEmails.requiredParams = ['userId'];
User.listEmails.scopes = [
  'url:GET|/api/v1/users/:user_id/communication_channels',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = User;
