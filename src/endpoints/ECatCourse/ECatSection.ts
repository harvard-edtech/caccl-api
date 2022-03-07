/**
 * Functions for interacting with sections within courses
 * @namespace api.course.section
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasSection from '../../types/CanvasSection';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatSection extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                            Section Endpoints                           */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of sections in a course
   * @author Gabe Abrams
   * @method list
   * @memberof api.course.section
   * @instance
   * @param {object} [opts] object containing all arguments
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {boolean} [opts.includeStudents] if true, the list of students
   *   from each section are included
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasSection[]>} list of Canvas Sections {@link https://canvas.instructure.com/doc/api/sections.html#Section}
   */
  public async list(
    opts: {
      courseId?: number,
      includeStudents?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasSection[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of sections in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/sections`,
      method: 'GET',
      params: {
        include: utils.genIncludesList({
          students: opts.includeStudents,
        }),
      },
    });
  }

  /**
   * Gets info on a specific section
   * @author Gabe Abrams
   * @method get
   * @memberof api.course.section
   * @instance
   * @param {object} opts object containing all arguments
   * @param {number} opts.sectionId Section Id to retrieve
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {boolean} [opts.includeStudents] if true, the list of students
   *   in the section are included
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasSection>} Canvas Section {@link https://canvas.instructure.com/doc/api/sections.html#Section}
   */
  public async get(
    opts: {
      sectionId: number,
      courseId?: number,
      includeStudents?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasSection> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific section in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/sections/${opts.sectionId}`,
      method: 'GET',
      params: {
        include: utils.genIncludesList({
          students: opts.includeStudents,
        }),
      },
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatSection;
