const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');

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
 * @method getProfile
 * @return {Promise.<Object>} Canvas user object {@link https://canvas.instructure.com/doc/api/users.html#User}
 */
Self.getProfile = (config) => {
  // @action: get info on the current user
  return config.visitEndpoint({
    path: `${prefix.v1}/users/self/profile`,
    method: 'GET',
  });
};

/**
 * Gets the list of courses associated with the current user
 * @method listCourses
 * @return {Promise.<Object>} Canvas course object {@link https://canvas.instructure.com/doc/api/courses.html#Course}
 */
Self.listCourses = (config) => {
  // @action: get the list of courses associated with the current user
  return config.visitEndpoint({
    path: `${prefix.v1}/courses`,
    method: 'GET',
  });
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Self;