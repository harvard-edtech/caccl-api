/**
 * Functions for interacting with enrollment terms
 * @namespace api.enrollmentTerm
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasUserProfile from '../../types/CanvasUserProfile';
import CanvasCourse from '../../types/CanvasCourse';
declare class ECatSelf extends EndpointCategory {
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
    getProfile(config?: APIConfig): Promise<CanvasUserProfile>;
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
    listCourses(opts: {
        includeTerm?: boolean;
    }, config?: APIConfig): Promise<CanvasCourse[]>;
}
export default ECatSelf;
