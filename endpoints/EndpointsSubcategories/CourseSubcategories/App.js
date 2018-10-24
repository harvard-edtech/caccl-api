const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');

class App extends EndpointCategory {
  constructor(config) {
    super(config, App);
  }
}

/*------------------------------------------------------------------------*/
/*                               Endpoints:                               */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of apps installed into a course
 * @method list
 * @memberof module: endpoints/course
 * @param {number} courseId - Canvas course Id to query
 * @return {Promise.<Object[]>} list of external tools {@link https://canvas.instructure.com/doc/api/external_tools.html}
 */
App.list = (config) => {
  // @action: get the list of apps installed into a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/external_tools`,
    method: 'GET',
  });
};

/**
 * Gets info on a single LTI tool
 * @method get
 * @param {number} courseId - Canvas course Id
 * @param {number} appId - The LTI app Id to get
 * @return {Promise.<Object>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.get = (config) => {
  // @action: get info on a specific LTI app in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/external_tools/${config.options.appId}`,
    method: 'GET',
  });
};

/**
 * Adds an LTI app to a Canvas course
 * @method add
 * @param {number} courseId - Canvas course Id to install into
 * @param {string} name - The app name (for settings app list)
 * @param {string} key - Installation consumer key
 * @param {string} secret - Installation consumer secret
 * @param {string} xml - XML configuration file, standard LTI format
 * @param {string} [description] - A human-readable description of the app
 * @param {string} [launchPrivacy] - 'public' by default
 * @return {Promise.<Object>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.add = (config) => {
  // @action: add an LTI app to a course
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
};

/**
 * Removes an LTI app from a Canvas course
 * @method remove
 * @param {number} courseId - Canvas course Id to remove app from
 * @param {number} appId - The LTI app Id to remove
 * @return {Promise.<Object>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.remove = (config) => {
  // @action: remove an LTI app from a course
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
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = App;
