const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');

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
 * @author Gabriel Abrams
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
 * @author Gabriel Abrams
 * @method listCourses
 * @param {boolean} [includeTerm] - if truthy, term is included
 * @return {Promise.<Object>} Canvas course object {@link https://canvas.instructure.com/doc/api/courses.html#Course}
 */
Self.listCourses = (config) => {
  // @action: get the list of courses associated with the current user
  return config.visitEndpoint({
    path: `${prefix.v1}/courses`,
    method: 'GET',
    params: {
      include: utils.genIncludesList({
        term: config.options.includeTerm,
      }),
    },
  });
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Self;
