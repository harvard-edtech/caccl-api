/**
 * Functions for interacting with external LTI apps within courses
 * @namespace api.course.app
 */

const CACCLError = require('caccl-error');

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');
const errorCodes = require('../../../errorCodes');

class App extends EndpointCategory {
  constructor(config) {
    super(config, App);
  }
}

/*------------------------------------------------------------------------*/
/*                           Table of Contents:                           */
/*                           - Apps                                       */
/*                           - Metadata                                   */
/*------------------------------------------------------------------------*/

/*------------------------------------------------------------------------*/
/*                               Endpoints:                               */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of apps installed into a course
 * @author Gabe Abrams
 * @memberof api.course.app
 * @instance
 * @async
 * @method list
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {boolean} [options.excludeParents] - If true, excludes tools
 *   installed in all accounts above the current context
 * @return {ExternalTool[]} list of external tools {@link https://canvas.instructure.com/doc/api/external_tools.html}
 */
App.list = function (options) {
  const params = (
    !options.excludeParents
      ? { include_parents: false }
      : {}
  );
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/external_tools`,
    method: 'GET',
    params,
  });
};
App.list.action = 'get the list of apps installed into a course';
App.list.requiredParams = ['courseId'];
App.list.scopes = [
  'url:GET|/api/v1/courses/:course_id/external_tools',
];

/**
 * Gets info on a single LTI tool
 * @author Gabe Abrams
 * @memberof api.course.app
 * @instance
 * @async
 * @method get
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id
 * @param {number} options.appId - The LTI app Id to get
 * @return {ExternalTool} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.get = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/external_tools/${options.appId}`,
    method: 'GET',
  });
};
App.get.action = 'get info on a specific LTI app in a course';
App.get.requiredParams = ['courseId', 'appId'];
App.get.scopes = [
  'url:GET|/api/v1/courses/:course_id/external_tools/:external_tool_id',
];

/**
 * Adds an LTI app to a Canvas course
 * @author Gabe Abrams
 * @memberof api.course.app
 * @instance
 * @async
 * @method add
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to install into
 * @param {string} options.name - The app name (for settings app list)
 * @param {string} options.key - Installation consumer key
 * @param {string} options.secret - Installation consumer secret
 * @param {string} options.xml - XML configuration file, standard LTI format
 * @param {string} [options.description] - A human-readable description of the
 *   app
 * @param {string} [options.launchPrivacy] - 'public' by default
 * @return {ExternalTool} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.add = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/external_tools`,
    method: 'POST',
    params: {
      name: options.name,
      privacy_level: options.launchPrivacy || 'public',
      consumer_key: options.key,
      shared_secret: options.secret,
      config_type: 'by_xml',
      config_xml: options.xml,
      description: utils.includeIfTruthy(options.description),
      icon_url: utils.includeIfTruthy(options.icon),
    },
  });
};
App.add.action = 'add an LTI app to a course';
App.add.requiredParams = [
  'courseId',
  'name',
  'key',
  'secret',
  'xml',
];
App.add.scopes = [
  'url:POST|/api/v1/courses/:course_id/external_tools',
];

/**
 * Removes an LTI app from a Canvas course
 * @author Gabe Abrams
 * @memberof api.course.app
 * @instance
 * @async
 * @method remove
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to remove app from
 * @param {number} options.appId - The LTI app Id to remove
 * @return {ExternalTool} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.remove = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/external_tools/${options.appId}`,
    method: 'DELETE',
  });
};
App.remove.action = 'remove an LTI app from a course';
App.remove.requiredParams = ['courseId', 'appId'];
App.remove.scopes = [
  'url:DELETE|/api/v1/courses/:course_id/external_tools/:external_tool_id',
];

/*------------------------------------------------------------------------*/
/*                                Metadata                                */
/*------------------------------------------------------------------------*/

/**
 * Gets the metadata for an LTI app in a course. Note: this endpoint requires
 *   that the app have a custom parameter called 'metadata_id' with an
 *   identifier that we will use to refer to the metadata. If each installation
 *   of an app will have its own metadata, each installation should have a
 *   different metadata_id. If all installations share the same metadata, they
 *   should all have the same metadata_id. When getting metadata, we return the
 *   metadata for the first app we find that has this metadata_id.
 *   Also note that the variable is 'metadata_id' all lowercase because launch
 *   params are made lowercase.
 * @author Gabe Abrams
 * @memberof api.course.app
 * @instance
 * @async
 * @method getMetadata
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id that holds the app
 * @param {number} options.metadata_id - metadata identifier (see endpoint
 *   description)
 * @return {object} the metadata for the first app that has the given
 *   metadata_id
 */
App.getMetadata = function (options) {
  // Get the list of apps
  return this.api.course.app.list({
    courseId: options.courseId,
  })
    .then((apps) => {
      // Find the first app that has this metadata_id
      let firstAppWithMetadataId;
      for (let i = 0; i < apps.length; i++) {
        if (
          apps[i].custom_fields
          && apps[i].custom_fields.metadata_id
          && apps[i].custom_fields.metadata_id === options.metadata_id
        ) {
          // Found an app with this metadata id!
          firstAppWithMetadataId = apps[i];
          break;
        }
      }
      if (!firstAppWithMetadataId) {
        // No apps with this metadata_id could be found! Throw arror
        throw new CACCLError({
          message: 'We could not find any apps with the given metadata id.',
          code: errorCodes.noAppWithMetadataFound,
        });
      }

      // Check if metadata is empty
      if (
        !firstAppWithMetadataId.custom_fields.metadata
        || firstAppWithMetadataId.custom_fields.metadata === ''
        || firstAppWithMetadataId.custom_fields.metadata.trim().length === 0
      ) {
        // Metadata empty
        return Promise.resolve({});
      }

      // Parse metadata
      try {
        const metadata = JSON.parse(
          firstAppWithMetadataId.custom_fields.metadata
        );
        return Promise.resolve(metadata);
      } catch (err) {
        // Metadata malformed
        throw new CACCLError({
          message: 'Metadata was malformed.',
          code: errorCodes.metadataMalformed,
        });
      }
    });
};
App.getMetadata.action = 'get metadata for an LTI app in a course';
App.getMetadata.requiredParams = ['courseId', 'metadata_id'];
App.getMetadata.scopes = [App.list];

/**
 * Updates the metadata for an LTI app in a course. Note: this endpoint requires
 *   that the app have a custom parameter called 'metadata_id' with an
 *   identifier that we will use to refer to the metadata. If each installation
 *   of an app will have its own metadata, each installation should have a
 *   different metadata_id. If all installations share the same metadata, they
 *   should all have the same metadata_id. When getting metadata, we return the
 *   metadata for the first app we find that has this metadata_id.
 *   Also note that the variable is 'metadata_id' all lowercase because launch
 *   params are made lowercase.
 * @author Gabe Abrams
 * @memberof api.course.app
 * @instance
 * @async
 * @method updateMetadata
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id that holds the app
 * @param {number} options.metadata_id - metadata identifier (see endpoint
 *   description)
 * @param {object} [options.metadata={}] - json metadata object
 * @return {ExternalTool[]} Array of external tools (the apps that were updated) {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.updateMetadata = function (options) {
  // Pre-process metadata
  const metadata = JSON.stringify(options.metadata || {});

  // Get the list of apps
  let appsToUpdate;
  return this.api.course.app.list({
    courseId: options.courseId,
  })
    .then((apps) => {
      // Find all apps with this metadata_id
      appsToUpdate = apps.filter((app) => {
        return (
          app.custom_fields
          && app.custom_fields.metadata_id
          && app.custom_fields.metadata_id === options.metadata_id
        );
      });
      if (appsToUpdate.length === 0) {
        // No apps with this metadata_id could be found! Throw arror
        throw new CACCLError({
          message: 'We could not find any apps with the given metadata id.',
          code: errorCodes.noAppsToUpdateMetadata,
        });
      }

      // Update all app metadata objects in parallel
      return Promise.all(
        appsToUpdate.map((app) => {
          // Perform merge for custom fields so we don't lose other custom vals
          const params = {
            'custom_fields[metadata]': metadata,
          };
          Object.keys(app.custom_fields).forEach((customPropName) => {
            // Don't let old metadata overwrite new metadata
            if (customPropName === 'metadata') {
              return;
            }
            const customVal = app.custom_fields[customPropName];
            params[`custom_fields[${customPropName}]`] = customVal;
          });
          // Update custom params
          return this.visitEndpoint({
            params,
            path: `${prefix.v1}/courses/${options.courseId}/external_tools/${app.id}`,
            method: 'PUT',
          });
        })
      );
    });
};
App.updateMetadata.action = 'get metadata for an LTI app in a course';
App.updateMetadata.requiredParams = ['courseId', 'metadata_id'];
App.updateMetadata.scopes = [
  App.list,
  'url:PUT|/api/v1/courses/:course_id/external_tools/:external_tool_id',
];

/*------------------------------------------------------------------------*/
/*                           Sessionless Launch                           */
/*------------------------------------------------------------------------*/

/**
 * Gets a sessionless navigation LTI launch URL
 * @author Gabe Abrams
 * @memberof api.course.app
 * @instance
 * @async
 * @method getNavLaunchURL
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id that holds the app
 * @param {number} options.appId - The LTI app Id to get a launch URL for
 * @return {ExternalTool} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.getNavLaunchURL = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/external_tools/sessionless_launch`,
    method: 'GET',
    params: {
      id: options.appId,
    },
  })
    .then((response) => {
      return response.url;
    });
};
App.getNavLaunchURL.action = 'get a sessionless navigation LTI launch url for an app in a course';
App.getNavLaunchURL.requiredParams = ['courseId', 'appId'];
App.getNavLaunchURL.scopes = [
  'url:GET|/api/v1/courses/:course_id/external_tools/sessionless_launch',
];

/**
 * Gets a sessionless navigation LTI launch URL
 * @author Gabe Abrams
 * @memberof api.course.app
 * @instance
 * @async
 * @method getAssignmentLaunchURL
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id that holds the app
 * @param {number} options.appId - The LTI app Id to get a launch URL for
 * @param {number} options.assignmentId - the Canvas assignment id to launch
 *   from
 * @return {ExternalTool} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.getAssignmentLaunchURL = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/external_tools/sessionless_launch`,
    method: 'GET',
    params: {
      id: options.appId,
      assignment_id: options.assignmentId,
      launch_type: 'assessment',
    },
  })
    .then((response) => {
      return response.url;
    });
};
App.getAssignmentLaunchURL.action = 'get a sessionless assignment LTI launch url for an app in a course';
App.getAssignmentLaunchURL.requiredParams = ['courseId', 'appId'];
App.getAssignmentLaunchURL.scopes = [
  'url:GET|/api/v1/courses/:course_id/external_tools/sessionless_launch',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = App;
