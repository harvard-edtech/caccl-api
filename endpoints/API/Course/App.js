const CACCLError = require('../../../../caccl-error/index.js'); // TODO: use actual library

const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');
const errorCodes = require('../../../errorCodes.js');

/* Endpoints for apps (external tools) */
class App extends EndpointCategory {
  constructor(config) {
    super(config, App);
  }
}

/*------------------------------------------------------------------------*/
/*                              App Endpoints                             */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of apps installed into a course
 * @author Gabriel Abrams
 * @method list
 * @memberof module: endpoints/course
 * @param {number} courseId - Canvas course Id to query
 * @param {boolean} [includeParents] - If truthy, includes tools installed in
 *   all accounts above the current context
 * @return {Promise.<Object[]>} list of external tools {@link https://canvas.instructure.com/doc/api/external_tools.html}
 */
App.list = (config) => {
  // @action: get the list of apps installed into a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/external_tools`,
    method: 'GET',
    params: {
      include_parents: utils.isTruthy(config.options.includeParents),
    },
  });
};

/**
 * Gets info on a single LTI tool
 * @author Gabriel Abrams
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
 * @author Gabriel Abrams
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
  })
    .then((response) => {
      return config.uncache([
        // Uncache app list endpoint
        `${prefix.v1}/courses/${config.options.courseId}/external_tools`,
      ], response);
    });
};

/**
 * Removes an LTI app from a Canvas course
 * @author Gabriel Abrams
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
  })
    .then((response) => {
      return config.uncache([
        // Uncache get app endpoint
        `${prefix.v1}/courses/${config.options.courseId}/external_tools/${config.options.appId}`,
        // Uncache app list endpoint
        `${prefix.v1}/courses/${config.options.courseId}/external_tools`,
      ], response);
    });
};

/*------------------------------------------------------------------------*/
/*                              App Metadata                              */
/*------------------------------------------------------------------------*/

/**
 * Gets the metadata for an LTI app in a course. Note: this endpoint requires
 *   that the app have a custom parameter called 'metadataId' with an identifier
 *   that we will use to refer to the metadata. If each installation of an app
 *   will have its own metadata, each installation should have a different
 *   metadataId. If all installations share the same metadata, they should all
 *   have the same metadataId. When getting metadata, we return the metadata
 *   for the first app we find that has this metadataId
 * @author Gabriel Abrams
 * @method getMetadata
 * @param {number} courseId - Canvas course Id that holds the app
 * @param {number} metadataId - metadata identifier (see endpoint description)
 * @return {Promise.<Object>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.getMetadata = (config) => {
  // @action: get metadata for an LTI app in a course

  // Get the list of apps
  return config.api.course.app.list({
    courseId: config.options.courseId,
  })
    .then((apps) => {
      // Find the first app that has this metadataId
      let firstAppWithMetadataId;
      for (let i = 0; i < apps.length; i++) {
        if (
          apps[i].custom_fields
          && apps[i].custom_fields.metadataId
          && apps[i].custom_fields.metadataId === config.options.metadataId
        ) {
          // Found an app with this metadata id!
          firstAppWithMetadataId = apps[i];
          break;
        }
      }
      if (!firstAppWithMetadataId) {
        // No apps with this metadataId could be found! Throw arror
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

/**
 * Updates the metadata for an LTI app in a course. Note: this endpoint requires
 *   that the app have a custom parameter called 'metadataId' with an identifier
 *   that we will use to refer to the metadata. If each installation of an app
 *   will have its own metadata, each installation should have a different
 *   metadataId. If all installations share the same metadata, they should all
 *   have the same metadataId. When updating metadata, we update the metadata
 *   for all apps with the given metadataId
 * @author Gabriel Abrams
 * @method updateMetadata
 * @param {number} courseId - Canvas course Id that holds the app
 * @param {number} metadataId - metadata identifier (see endpoint description)
 * @param {object} [metadata={}] – json metadata object
 * @return {Promise.<Object[]>} Array of external tools (the apps that were updated) {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
 */
App.updateMetadata = (config) => {
  // @action: get metadata for an LTI app in a course

  // Pre-process metadata
  const metadata = JSON.stringify(config.options.metadata || {});

  // Get the list of apps
  let appsToUpdate;
  return config.api.course.app.list({
    courseId: config.options.courseId,
  })
    .then((apps) => {
      // Find all apps with this metadataId
      appsToUpdate = apps.filter((app) => {
        return (
          app.custom_fields
          && app.custom_fields.metadataId
          && app.custom_fields.metadataId === config.options.metadataId
        );
      });
      if (appsToUpdate.length === 0) {
        // No apps with this metadataId could be found! Throw arror
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
          return config.visitEndpoint({
            params,
            path: `${prefix.v1}/courses/${config.options.courseId}/external_tools/${app.id}`,
            method: 'PUT',
          });
        })
      );
    })
    .then((response) => {
      // Uncache all apps that we modified
      const pathsToUncache = appsToUpdate.map((app) => {
        // Uncache get app endpoint
        return `${prefix.v1}/courses/${config.options.courseId}/external_tools/${app.id}`;
      });
      // Uncache app list endpoint
      pathsToUncache.push(`${prefix.v1}/courses/${config.options.courseId}/external_tools`);
      // Perform uncache
      return config.uncache(pathsToUncache, response);
    });
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = App;
