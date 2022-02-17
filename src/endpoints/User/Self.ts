/**
 * Functions for interacting with enrollment terms
 * @namespace api.enrollmentTerm
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasUserProfile from '../../types/CanvasUserProfile';
import CanvasCourse from '../../types/CanvasCourse';

class Self extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                               Endpoints:                               */
  /*------------------------------------------------------------------------*/

  /**
   * Gets info on the current user
   * @author Gabe Abrams
   * @method getProfile
   * @memberof api.user.self
   * @instance
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasUserProfile>} Canvas user profile object {@link https://canvas.instructure.com/doc/api/users.html#Profile}
   */
  public async getProfile(
    config?: APIConfig,
  ): Promise<CanvasUserProfile> {
    return this.visitEndpoint({
      config,
      action: 'get info on the current user',
      path: `${API_PREFIX}/users/self/profile`,
      method: 'GET',
    });
  }

  /**
   * Gets the list of courses associated with the current user
   * @author Gabe Abrams
   * @method listCourses
   * @memberof api.user.self
   * @instance
   * @param {object} opts - object containing all arguments
   * @param {boolean} [opts.includeTerm] - if truthy, term is included
   * @returns {Promise<CanvasCourse[]>} list of Canvas courses {@link https://canvas.instructure.com/doc/api/courses.html#Course}
   */
  public async listCourses(
    opts: {
      includeTerm?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasCourse[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of courses associated with the current user',
      path: `${API_PREFIX}/courses`,
      method: 'GET',
      params: {
        include: utils.genIncludesList({
          term: opts.includeTerm,
        }),
      },
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default Self;
