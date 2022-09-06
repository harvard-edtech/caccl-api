/**
 * Functions for interacting with modules within courses
 * @namespace api.course.module
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasModule from '../../types/CanvasModule';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatModule extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                                Endpoints                               */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the modules in a course
   * @author Yuen Ler Chow
   * @method list
   * @memberof api.course.module
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasModule>} A Canvas Module {@link https://canvas.instructure.com/doc/api/modules.html}
   */
  public async list(
    opts: {
      courseId?: number,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasModule> {
    return this.visitEndpoint({
      config,
      action: 'get the list of modules in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/modules`,
      method: 'GET',
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatModule;
