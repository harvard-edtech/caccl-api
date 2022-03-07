/**
 * Functions for interacting with external LTI apps within courses
 * @namespace api.course.app
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import CACCLError from 'caccl-error';
import ErrorCode from '../../shared/types/ErrorCode';
import CanvasExternalTool from '../../types/CanvasExternalTool';
import CanvasTab from '../../types/CanvasTab';
import APIConfig from '../../shared/types/APIConfig';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatApp extends EndpointCategory {
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
   * @param {object} [opts] object containing all arguments
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {boolean} [opts.excludeParents] If true, excludes tools
   *   installed in all accounts above the current context
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasExternalTool[]>} list of external tools {@link https://canvas.instructure.com/doc/api/external_tools.html}
   */
  public async list(
    opts: {
      courseId?: number,
      excludeParents?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasExternalTool[]> {
    const params = (
      !opts.excludeParents
        ? { include_parents: false }
        : {}
    );
    return this.visitEndpoint({
      config,
      action: 'get the list of apps installed into a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/external_tools`,
      method: 'GET',
      params,
    });
  }

  /**
   * Gets info on a single LTI tool
   * @author Gabe Abrams
   * @memberof api.course.app
   * @instance
   * @async
   * @method get
   * @param {object} opts object containing all arguments
   * @param {number} opts.appId The LTI app Id to get
   * @param {number} [opts.courseId=default course id] Canvas course Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasExternalTool>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
   */
  public async get(
    opts: {
      appId: number,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasExternalTool> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific LTI app in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/external_tools/${opts.appId}`,
      method: 'GET',
    });
  }

  /**
   * Adds an LTI app to a Canvas course
   * @author Gabe Abrams
   * @memberof api.course.app
   * @instance
   * @async
   * @method add
   * @param {object} opts object containing all arguments
   * @param {string} opts.name The app name (for settings app list)
   * @param {string} opts.key Installation consumer key
   * @param {string} opts.secret Installation consumer secret
   * @param {string} opts.xml XML configuration file, standard LTI format
   * @param {string} [opts.description] A human-readable description of the
   *   app
   * @param {string} [opts.launchPrivacy] 'public' by default
   * @param {number} [opts.courseId=default course id] Canvas course Id to install into
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasExternalTool>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
   */
  public async add(
    opts: {
      name: string,
      key: string,
      secret: string,
      xml: string,
      description?: string,
      launchPrivacy?: ('public' | 'anonymous' | 'members'),
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasExternalTool> {
    return this.visitEndpoint({
      config,
      action: 'add an LTI app to a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/external_tools`,
      method: 'POST',
      params: {
        name: opts.name,
        privacy_level: opts.launchPrivacy || 'public',
        consumer_key: opts.key,
        shared_secret: opts.secret,
        config_type: 'by_xml',
        config_xml: opts.xml,
        description: utils.includeIfTruthy(opts.description),
      },
    });
  }

  /**
   * Removes an LTI app from a Canvas course
   * @author Gabe Abrams
   * @memberof api.course.app
   * @instance
   * @async
   * @method remove
   * @param {object} opts object containing all arguments
   * @param {number} opts.appId The LTI app Id to remove
   * @param {number} [opts.courseId=default course id] Canvas course Id to
   *   remove app from
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasExternalTool>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
   */
  public async remove(
    opts: {
      appId: number,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasExternalTool> {
    return this.visitEndpoint({
      config,
      action: 'remove an LTI app from a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/external_tools/${opts.appId}`,
      method: 'DELETE',
    });
  }

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
   * @param {object} opts object containing all arguments
   * @param {number} opts.metadata_id metadata identifier (see endpoint
   *   description)
   * @param {number} [opts.courseId=default course id] Canvas course Id that
   *   holds the app
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<object>} the metadata for the first app that has the given
   *   metadata_id
   */
  public async getMetadata(
    opts: {
      metadata_id: string,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<{ [k: string]: any }> {
    // Get the list of apps
    const apps = await this.api.course.app.list(
      {
        courseId: (opts.courseId ?? this.defaultCourseId),
      },
      config,
    );

    // Find the first app that has this metadata_id
    let firstAppWithMetadataId;
    for (let i = 0; i < apps.length; i++) {
      if (
        apps[i].custom_fields
        && apps[i].custom_fields.metadata_id
        && apps[i].custom_fields.metadata_id === opts.metadata_id
      ) {
        // Found an app with this metadata id!
        firstAppWithMetadataId = apps[i];
        break;
      }
    }
    if (!firstAppWithMetadataId) {
      // No apps with this metadata_id could be found! Throw error
      throw new CACCLError({
        message: 'We could not find any apps with the given metadata id.',
        code: ErrorCode.NoAppWithMetadataFound,
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
        code: ErrorCode.MetadataMalformed,
      });
    }
  }

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
   * @param {object} opts object containing all arguments
   * @param {number} opts.metadata_id metadata identifier (see endpoint
   *   description)
   * @param {object} [opts.metadata={}] json metadata object
   * @param {number} [opts.courseId=default course id] Canvas course Id that holds the app
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasExternalTool[]>} Array of external tools (the apps that were updated) {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
   */
  public async updateMetadata(
    opts: {
      metadata_id: string,
      metadata?: { [k: string]: any },
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasExternalTool[]> {
    // Pre-process metadata
    const metadata = JSON.stringify(opts.metadata || {});

    // Get the list of apps
    const apps = await this.api.course.app.list(
      {
        courseId: (opts.courseId ?? this.defaultCourseId),
      },
      config,
    );
    
    // Find all apps with this metadata_id
    const appsToUpdate = apps.filter((app) => {
      return (
        app.custom_fields
        && app.custom_fields.metadata_id
        && app.custom_fields.metadata_id === opts.metadata_id
      );
    });
    if (appsToUpdate.length === 0) {
      // No apps with this metadata_id could be found! Throw arror
      throw new CACCLError({
        message: 'We could not find any apps with the given metadata id.',
        code: ErrorCode.NoAppsToUpdateMetadata,
      });
    }

    // Update all app metadata objects in parallel
    return Promise.all(
      appsToUpdate.map((app) => {
        // Perform merge for custom fields so we don't lose other custom vals
        const params: { [k: string]: any } = {
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
          config,
          action: 'update metadata for an LTI app in a course',
          params,
          path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/external_tools/${app.id}`,
          method: 'PUT',
        });
      })
    );
  }

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
   * @param {object} opts object containing all arguments
   * @param {number} opts.appId The LTI app Id to get a launch URL for
   * @param {number} [opts.courseId=default course id] Canvas course Id that
   *   holds the app
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<string>} launch URL
   */
  public async getNavLaunchURL(
    opts: {
      appId: number,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<string> {
    const response = await this.visitEndpoint({
      config,
      action: 'get a sessionless navigation LTI launch url for an app in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/external_tools/sessionless_launch`,
      method: 'GET',
      params: {
        id: opts.appId,
      },
    });

    return response.url;
  }

  /**
   * Gets a sessionless navigation LTI launch URL
   * @author Gabe Abrams
   * @memberof api.course.app
   * @instance
   * @async
   * @method getAssignmentLaunchURL
   * @param {object} opts object containing all arguments
   * @param {number} opts.appId The LTI app Id to get a launch URL for
   * @param {number} opts.assignmentId the Canvas assignment id to launch
   * @param {number} [opts.courseId=default course id] Canvas course Id that holds the app
   *   from
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<string>} launch url
   */
  public async getAssignmentLaunchURL(
    opts: {
      appId: number,
      assignmentId: number,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<string> {
    const response = await this.visitEndpoint({
      config,
      action: 'get a sessionless assignment LTI launch url for an app in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/external_tools/sessionless_launch`,
      method: 'GET',
      params: {
        id: opts.appId,
        assignment_id: opts.assignmentId,
        launch_type: 'assessment',
      },
    });

    return response.url;
  }

  /*------------------------------------------------------------------------*/
  /*                               Navigation                               */
  /*------------------------------------------------------------------------*/

  /**
   * Move an app near the top of the nav menu and make sure it's visible
   * @author Gabe Abrams
   * @memberof api.course.app
   * @instance
   * @async
   * @method moveToTopOfNavMenu
   * @param {object} opts object containing all arguments
   * @param {number} opts.appId The LTI app Id to make visible and move near
   *   the top of the nav menu
   * @param {number} [opts.courseId=default course id] Canvas course Id that
   *   holds the app
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasTab>} Canvas tab {@link https://canvas.instructure.com/doc/api/tabs.html#Tab}
   */
  public async moveToTopOfNavMenu(
    opts: {
      appId: number,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasTab> {
    return this.visitEndpoint({
      config,
      action: 'move an app near the top of the nav menu and make sure it\'s visible',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/tabs/context_external_tool_${opts.appId}`,
      method: 'PUT',
      params: {
        position: 2,
        hidden: false,
      },
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatApp;
