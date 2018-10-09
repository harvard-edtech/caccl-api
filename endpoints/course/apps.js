const utils = require('../helpers/utils.js');

module.exports = [

  /**
   * Gets the list of apps installed into a course
   * @param {number} courseId - Canvas course Id to query
   * @return list of external tools (see: https://canvas.instructure.com/doc/api/external_tools.html)
   */
  {
    name: 'listApps',
    action: 'get the list of apps installed into a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/external_tools',
        method: 'GET',
      });
    },
  },

  /**
   * Gets info on a single LTI tool
   * @param {number} courseId - Canvas course Id
   * @param {number} appId - The LTI app Id to get
   * @return external tool (see: https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)
   */
  {
    name: 'getApp',
    action: 'get info on a specific LTI app in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId
          + '/external_tools/' + cg.options.appId,
        method: 'GET',
      });
    },
  },

  /**
   * Adds an LTI app to a Canvas course
   * @param {number} courseId - Canvas course Id to install into
   * @param {string} name - The app name (for settings app list)
   * @param {string} launchPrivacy - 'public' by default
   * @param {string} key - Installation consumer key
   * @param {string} secret - Installation consumer secret
   * @param {string} xml - XML configuration file, standard LTI format
   * @param {string} description - A human-readable description of the app
   * @return external tool (see: https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)
   */
  {
    name: 'addApp',
    action: 'add an LTI app to a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/external_tools',
        method: 'POST',
        params: {
          name: cg.options.name,
          privacy_level: cg.options.launchPrivacy || 'public',
          consumer_key: cg.options.key,
          consumer_secret: cg.options.secret,
          config_type: 'by_xml',
          config_xml: cg.options.xml,
          description: utils.includeIfTruthy(cg.options.description),
          icon_url: utils.includeIfTruthy(cg.options.icon),
        },
      }).then((response) => {
        cg.uncache([
          // Uncache app list endpoint
          '/api/v1/courses/' + cg.options.courseId + '/external_tools',
        ]);
        return Promise.resolve(response);
      });
    },
  },

  /**
   * Removes an LTI app from a Canvas course
   * @param {number} courseId - Canvas course Id to remove app from
   * @param {number} appId - The LTI app Id to remove
   * @return external tool (see: https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)
   */
  {
    name: 'removeApp',
    action: 'remove an LTI app from a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId
          + '/external_tools/' + cg.options.appId,
        method: 'DELETE',
      }).then((response) => {
        cg.uncache([
          // Uncache get app endpoint
          '/api/v1/courses/' + cg.options.courseId
            + '/external_tools/' + cg.options.appId,
          // Uncache app list endpoint
          '/api/v1/courses/' + cg.options.courseId + '/external_tools',
        ]);
        return Promise.resolve(response);
      });
    },
  },

];
