const utils = require('../helpers/utils.js');

module.exports = () => {
  return [

    /**
     * Gets the list of apps installed into a course
     * @param {number} courseId - Canvas course Id to query
     * @return list of external tools (see: https://canvas.instructure.com/doc/api/external_tools.html)
     */
    {
      name: 'listApps',
      action: 'get the list of apps installed into a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/external_tools',
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
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId
            + '/external_tools/' + options.appId,
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
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/external_tools',
          method: 'POST',
          params: {
            name: options.name,
            privacy_level: options.launchPrivacy || 'public',
            consumer_key: options.key,
            consumer_secret: options.secret,
            config_type: 'by_xml',
            config_xml: options.xml,
            description: utils.includeIfTruthy(options.description),
            icon_url: utils.includeIfTruthy(options.icon),
          },
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache app list endpoint
              '/api/v1/courses/' + options.courseId + '/external_tools',
            ],
          };
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
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId
            + '/external_tools/' + options.appId,
          method: 'DELETE',
        }).then((response) => {
          return {
            response,
            uncache: [
              // Uncache get app endpoint
              '/api/v1/courses/' + options.courseId
                + '/external_tools/' + options.appId,
              // Uncache app list endpoint
              '/api/v1/courses/' + options.courseId + '/external_tools',
            ],
          };
        });
      },
    },

  ];
};
