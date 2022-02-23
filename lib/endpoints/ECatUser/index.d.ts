/**
 * Functions for user endpoints
 * @namespace api.user
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasCourse from '../../types/CanvasCourse';
import CanvasUser from '../../types/CanvasUser';
import InitPack from '../../shared/types/InitPack';
import CACCLEmailEntry from '../../types/CACCLEmailEntry';
import ECatSelf from './ECatSelf';
declare class ECatUser extends EndpointCategory {
    self: ECatSelf;
    /**
     * Initialize endpoint category
     * @param initPack package of info for initializing the endpoint category
     */
    constructor(initPack: InitPack);
    /**
     * Get a user's list of email addresses. Masquerade (act as user) ability is
     *   required for this function
     * @author Gabe Abrams
     * @memberof api.user
     * @instance
     * @async
     * @method listEmails
     * @param {object} opts - object containing all arguments
     * @param {number} opts.userId - the id of the user to get emails for
     * @param {boolean} [opts.sortByDate] - if false then sort by ranked
     *   order of emails (primary email first), if true then sort by date
     *   created so the official emails should be first
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CACCLEmailEntry[]>}
     *   email address objects
     */
    listEmails(opts: {
        userId: number;
        sortByDate?: boolean;
    }, config: APIConfig): Promise<CACCLEmailEntry[]>;
    /**
     * Get a user's list of courses. Masquerade (act as user) ability is
     *   required for this function
     * @author Gabe Abrams
     * @memberof api.user
     * @instance
     * @async
     * @method listCourses
     * @param {object} opts - object containing all arguments
     * @param {number} opts.userId - the id of the user to get emails for
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCourse[]>} list of courses {@link https://canvas.instructure.com/doc/api/courses.html#Course}
     */
    listCourses(opts: {
        userId: number;
    }, config: APIConfig): Promise<CanvasCourse[]>;
    /**
     * Search users
     * @author Gabe Abrams
     * @memberof api.user
     * @instance
     * @async
     * @method search
     * @param {object} opts - object containing all arguments
     * @param {number} opts.accountId - the account to search through
     * @param {string} opts.searchTerm - a search term to apply (must be at
     *   least 3 chars). Can be a full ID or partial name. For admins, searches
     *   SIS ID, login ID, name, and email address.
     * @param {boolean} [opts.isStudent] - if true, only search for students.
     *   Only one user type boolean can be true
     * @param {boolean} [opts.isTeacher] - if true, only search for teachers.
     *   Only one user type boolean can be true
     * @param {boolean} [opts.isTA] - if true, only search for TAs.
     *   Only one user type boolean can be true
     * @param {boolean} [opts.isObserver] - if true, only search for observers.
     *   Only one user type boolean can be true
     * @param {boolean} [opts.isDesigner] - if true, only search for designers.
     *   Only one user type boolean can be true
     * @param {string} [opts.sortBy=username] - the item to sort by. Can be:
     *   "username" or "email" or "sis_id" or "last_login"
     * @param {boolean} [opts.sortDescending] - if true, sort descending
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of user objects {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    search(opts: {
        accountId: number;
        searchTerm: string;
        isStudent?: boolean;
        isTeacher?: boolean;
        isTA?: boolean;
        isObserver?: boolean;
        isDesigner?: boolean;
        sortBy?: ('username' | 'email' | 'sis_id' | 'last_login');
        sortDescending?: boolean;
    }, config: APIConfig): Promise<CanvasUser[]>;
}
export default ECatUser;
