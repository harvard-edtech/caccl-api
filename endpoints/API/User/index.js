/**
 * Functions for users
 * @namespace api.user
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');

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

/**
 * Get a user's list of courses. Masquerade (act as user) ability is
 *   required for this function
 * @author Gabe Abrams
 * @memberof api.user
 * @instance
 * @async
 * @method listCourses
 * @param {object} options - object containing all arguments
 * @param {number} options.userId - the id of the user to get emails for
 * @return {object[]} list of courses {@link https://canvas.instructure.com/doc/api/courses.html#Course}
 */
User.listCourses = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses`,
    method: 'GET',
    params: {
      as_user_id: options.userId,
    },
  });
};
User.listCourses.action = 'get the list of courses for a user';
User.listCourses.requiredParams = ['userId'];
User.listCourses.scopes = [
  'url:GET|/api/v1/users/:user_id/courses',
];

/**
 * Search a user
 * @author Gabe Abrams
 * @memberof api.user
 * @instance
 * @async
 * @method search
 * @param {object} options - object containing all arguments
 * @param {number} options.accountId - the account to search through
 * @param {string} options.searchTerm - a search term to apply (must be at
 *   least 3 chars). Can be a full ID or partial name. For admins, searches
 *   SIS ID, login ID, name, and email address.
 * @param {boolean} [options.isStudent] - if true, only search for students.
 *   Only one user type boolean can be true
 * @param {boolean} [options.isTeacher] - if true, only search for teachers.
 *   Only one user type boolean can be true
 * @param {boolean} [options.isTA] - if true, only search for TAs.
 *   Only one user type boolean can be true
 * @param {boolean} [options.isObserver] - if true, only search for observers.
 *   Only one user type boolean can be true
 * @param {boolean} [options.isDesigner] - if true, only search for designers.
 *   Only one user type boolean can be true
 * @param {string} [options.sortBy=username] - the item to sort by. Can be:
 *   "username" or "email" or "sis_id" or "last_login"
 * @param {boolean} [options.sortDescending] - if true, sort descending
 * @return {object[]} list of user objects {@link https://canvas.instructure.com/doc/api/users.html#User}
 */
User.search = function (options) {
  // Get search term
  const searchTerm = String(options.searchTerm);

  // Figure out enrollment type
  let enrollmentType;
  if (options.isStudent) {
    enrollmentType = 'student';
  } else if (options.isTeacher) {
    enrollmentType = 'teacher';
  } else if (options.isTA) {
    enrollmentType = 'ta';
  } else if (options.isObserver) {
    enrollmentType = 'observer';
  } else if (options.isDesigner) {
    enrollmentType = 'designer';
  }

  // Figure out other parameters
  const sort = options.sortBy || 'username';
  const order = (options.sortDescending ? 'desc' : 'asc');

  // Send request
  return this.visitEndpoint({
    path: `${prefix.v1}/accounts/${options.accountId}/users`,
    method: 'GET',
    params: {
      sort,
      order,
      search_term: searchTerm,
      enrollment_type: enrollmentType,
    },
  });
};
User.search.action = 'search for a user or a list of users';
User.search.requiredParams = ['accountId', 'searchTerm'];
User.search.scopes = [
  'url:GET|/api/v1/accounts/:account_id/users',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = User;
