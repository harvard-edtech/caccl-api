/**
 * Functions for interacting with files within courses
 * @namespace api.course.file
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasFile from '../../types/CanvasFile';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatFile extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                                Endpoints                               */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the files in a course
   * @author Gabe Abrams
   * @method list
   * @memberof api.course.file
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasFile>} A Canvas File {@link https://canvas.instructure.com/doc/api/files.html}
   */
  public async list(
    opts: {
      courseId?: number,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasFile> {
    return this.visitEndpoint({
      config,
      action: 'get the list of files in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/files`,
      method: 'GET',
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatFile;
