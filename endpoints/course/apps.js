/**
 * Apps endpoints module
 * @module endpoints/course/apps
 * @see module: endpoints/course/apps
 */
const utils = require('../common/utils.js');
const prefix = require('../common/prefix.js');

module.exports = [

  /**
   * Gets the list of apps installed into a course
   * @method listApps
   * @memberof module: endpoints/course
   * @param {number} courseId - Canvas course Id to query
   * @return {Promise.<Object[]>} list of external tools {@link https://canvas.instructure.com/doc/api/external_tools.html}
   */
  {
    name: 'listApps',
    action: 'get the list of apps installed into a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/external_tools`,
        method: 'GET',
      });
    },
  },

  /**
   * Gets info on a single LTI tool
   * @method getApp
   * @param {number} courseId - Canvas course Id
   * @param {number} appId - The LTI app Id to get
   * @return {Promise.<Object>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
   */
  {
    name: 'getApp',
    action: 'get info on a specific LTI app in a course',
    run(cg) {
      return cg.visitEndpoint({
        path: `${prefix.v1}/courses/${cg.options.courseId}/external_tools/${cg.options.appId}`,
        method: 'GET',
      });
    },
  },

  /**
   * Adds an LTI app to a Canvas course
   * @method addApp
   * @param {number} courseId - Canvas course Id to install into
   * @param {string} name - The app name (for settings app list)
   * @param {string} key - Installation consumer key
   * @param {string} secret - Installation consumer secret
   * @param {string} xml - XML configuration file, standard LTI format
   * @param {string} [description] - A human-readable description of the app
   * @param {string} [launchPrivacy] - 'public' by default
   * @return {Promise.<Object>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
   */
  {
    name: 'addApp',
    action: 'add an LTI app to a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/external_tools`,
        method: 'POST',
        params: {
          name: config.options.name,
          privacy_level: config.options.launchPrivacy || 'public',
          consumer_key: config.options.key,
          consumer_secret: config.options.secret,
          config_type: 'by_xml',
          config_xml: config.options.xml,
          description: utils.includeIfTruthy(config.options.description),
          icon_url: utils.includeIfTruthy(config.options.icon),
        },
      }).then((response) => {
        return config.uncache([
          // Uncache app list endpoint
          `${prefix.v1}/courses/${config.options.courseId}/external_tools`,
        ], response);
      });
    },
  },

  /**
   * Removes an LTI app from a Canvas course
   * @method removeApp
   * @param {number} courseId - Canvas course Id to remove app from
   * @param {number} appId - The LTI app Id to remove
   * @return {Promise.<Object>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
   */
  {
    name: 'removeApp',
    action: 'remove an LTI app from a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/external_tools/${config.options.appId}`,
        method: 'DELETE',
      }).then((response) => {
        return config.uncache([
          // Uncache get app endpoint
          `${prefix.v1}/courses/${config.options.courseId}/external_tools/${config.options.appId}`,
          // Uncache app list endpoint
          `${prefix.v1}/courses/${config.options.courseId}/external_tools`,
        ], response);
      });
    },
  },

];
