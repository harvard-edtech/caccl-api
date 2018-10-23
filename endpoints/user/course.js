/**
 * Course endpoints module
 * @module endpoints/user/course
 * @see module: endpoints/user/course
 */

const prefix = require('../helpers/prefix.js');

module.exports = [

  /**
   * Gets the list of courses associated with the current user
   * @return {Promise.<Object>} Canvas course object {@link https://canvas.instructure.com/doc/api/courses.html#Course}
   */
  {
    name: 'listCourses',
    action: 'get the list of courses associated with the current user',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses`,
        method: 'GET',
      });
    },
  },

];
