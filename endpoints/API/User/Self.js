/**
 * Functions for getting info on current user
 * @namespace api.user.self
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');

class Self extends EndpointCategory {
  constructor(config) {
    super(config, Self);
  }
}

/*------------------------------------------------------------------------*/
/*                             Self Endpoints                             */
/*------------------------------------------------------------------------*/

/**
 * Gets info on the current user
 * @author Gabe Abrams
 * @method getProfile
 * @memberof api.user.self
 * @instance
 * @return {User} Canvas user object {@link https://canvas.instructure.com/doc/api/users.html#User}
 */
Self.getProfile = function () {
  return this.visitEndpoint({
    path: `${prefix.v1}/users/self/profile`,
    method: 'GET',
  });
};
Self.getProfile.action = 'get info on the current user';
Self.getProfile.scopes = [
  'url:GET|/api/v1/users/:user_id/profile',
];

/**
 * Gets the list of courses associated with the current user
 * @author Gabe Abrams
 * @method listCourses
 * @memberof api.user.self
 * @instance
 * @param {object} options - object containing all arguments
 * @param {boolean} [options.includeTerm] - if truthy, term is included
 * @return {Course[]} list of Canvas courses {@link https://canvas.instructure.com/doc/api/courses.html#Course}
 */
Self.listCourses = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses`,
    method: 'GET',
    params: {
      include: utils.genIncludesList({
        term: options.includeTerm,
      }),
    },
  });
};
Self.listCourses.action = 'get the list of courses associated with the current user';
Self.listCourses.scopes = [
  'url:GET|/api/v1/courses',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Self;
