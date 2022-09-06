/**
 * Functions for interacting with folders within courses
 * @namespace api.course.folder
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasFolder from '../../types/CanvasFolder';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatFolder extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                                Endpoints                               */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the folders in a course
   * @author Yuen Ler Chow
   * @method list
   * @memberof api.course.folder
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasFolder>} A Canvas Folder {@link https://canvas.instructure.com/doc/api/folders.html}
   */
  public async list(
    opts: {
      courseId?: number,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasFolder> {
    return this.visitEndpoint({
      config,
      action: 'get the list of folders in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/folders`,
      method: 'GET',
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatFolder;
