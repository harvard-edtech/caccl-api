/**
 * Self endpoints module
 * @module endpoints/user/self
 * @see module: endpoints/user/self
 */

const prefix = require('../helpers/prefix.js');

module.exports = [

  /**
   * Gets info on the current user
   * @return {Promise.<Object>} Canvas user object {@link https://canvas.instructure.com/doc/api/users.html#User}
   */
  {
    name: 'getCurrentUser',
    action: 'get info on the current user',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/users/self/profile`,
        method: 'GET',
      });
    },
  },

];
