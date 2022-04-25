/**
 * Functions for interacting with external LTI apps within courses
 * @namespace api.course.app
 */
import EndpointCategory from '../../shared/EndpointCategory';
import CanvasExternalTool from '../../types/CanvasExternalTool';
import CanvasTab from '../../types/CanvasTab';
import APIConfig from '../../shared/types/APIConfig';
declare class ECatApp extends EndpointCategory {
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
    list(opts?: {
        courseId?: number;
        excludeParents?: boolean;
    }, config?: APIConfig): Promise<CanvasExternalTool[]>;
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
    get(opts: {
        appId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasExternalTool>;
    /**
     * Adds an LTi app by its XML to a Canvas course
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method addByXML
     * @param {object} opts object containing all arguments
     * @param {string} opts.name The app name (for settings app list)
     * @param {string} opts.key Installation consumer key
     * @param {string} opts.secret Installation consumer secret
     * @param {string} opts.xml XML configuration file, standard LTI format
     * @param {string} opts.description A human-readable description of the
     *   app
     * @param {number} [opts.courseId=default course id] Canvas course Id to install into
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasExternalTool>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
     */
    addByXML(opts: {
        name: string;
        key: string;
        secret: string;
        xml: string;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasExternalTool>;
    /**
     * Adds an LTi app by its clientId to a Canvas course
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method addByClientId
     * @param {object} opts object containing all arguments
     * @param {string} opts.clientId the client id of the app that is associated
     *   with the Canvas instance containing the course of interest
     * @param {number} [opts.courseId=default course id] Canvas course Id to install into
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasExternalTool>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
     */
    addByClientId(opts: {
        clientId: string;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasExternalTool>;
    /**
     * Add a redirect app to the navigation menu
     * @author Gabe Abrams
     * @memberof api.course.app
     * @instance
     * @async
     * @method addRedirect
     * @param {object} opts object containing all arguments
     * @param {string} opts.name the name of the app as it shows up in the nav
     *   menu
     * @param {string} opts.url the url to direct the course to when they click the
     *   redirect app
     * @param {boolean} [opts.hiddenFromStudents] if true, hide the link from
     *   students
     * @param {boolean} [opts.dontOpenInNewTab] if true, redirect does not open in
     *   another tab
     * @param {number} [opts.courseId=default course id] Canvas course Id to install into
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasExternalTool>} Canvas external tool {@link https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show}
     */
    addRedirect(opts: {
        name: string;
        url: string;
        hiddenFromStudents?: boolean;
        dontOpenInNewTab?: boolean;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasExternalTool>;
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
    remove(opts: {
        appId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasExternalTool>;
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
    getMetadata(opts: {
        metadata_id: string;
        courseId?: number;
    }, config?: APIConfig): Promise<{
        [k: string]: any;
    }>;
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
    updateMetadata(opts: {
        metadata_id: string;
        metadata?: {
            [k: string]: any;
        };
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasExternalTool[]>;
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
    getNavLaunchURL(opts: {
        appId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<string>;
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
    getAssignmentLaunchURL(opts: {
        appId: number;
        assignmentId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<string>;
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
    moveToTopOfNavMenu(opts: {
        appId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasTab>;
}
export default ECatApp;
