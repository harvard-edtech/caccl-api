/**
 * Functions for other endpoints
 * @namespace api.other
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';

// Endpoint category
class ECatOther extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                               Endpoints:                               */
  /*------------------------------------------------------------------------*/

  /**
   * Send a request to a Canvas endpoint that's not in this library. Note:
   *   use this sparingly. Instead, please request that we add the endpoint to
   *   caccl.
   * @author Gabe Abrams
   * @method endpoint
   * @memberof api.other
   * @instance
   * @param {object} opts object containing all arguments
   * @param {string} opts.path - the path of the endpoint to call
   *   (e.g. /api/v1/courses), just the path: not the host or protocol
   * @param {string} [opts.method=GET] - the http method to use
   * @param {object} [opts.params={}] - the get query params or the post/put/delete
   *   body params
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<any>} body of Canvas response
   */
  public async endpoint(
    opts: {
      path: string,
      method?: ('GET' | 'PUT' | 'DELETE' | 'POST'),
      params?: { [k: string]: any },
    },
    config?: APIConfig,
  ): Promise<any> {
    return this.visitEndpoint({
      config,
      action: 'interact with Canvas',
      path: opts.path,
      method: opts.method || 'GET',
      params: opts.params,
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatOther;
