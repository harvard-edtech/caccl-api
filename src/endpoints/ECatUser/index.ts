/**
 * Functions for user endpoints
 * @namespace api.user
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';
import CanvasCourse from '../../types/CanvasCourse';
import CanvasCommunicationChannel from '../../types/CanvasCommunicationChannel';
import CanvasUser from '../../types/CanvasUser';
import InitPack from '../../shared/types/InitPack';
import CACCLEmailEntry from '../../types/CACCLEmailEntry';

// Import subcategories
import ECatSelf from './ECatSelf';

// Endpoint category
class ECatUser extends EndpointCategory {
  // Sub-categories
  public self: ECatSelf;

  /**
   * Initialize endpoint category
   * @param initPack package of info for initializing the endpoint category
   */
  constructor(initPack: InitPack) {
    super(initPack);

    // Initialize subcategory
    this.self = new ECatSelf(initPack);
  }

  /*------------------------------------------------------------------------*/
  /*                               Endpoints:                               */
  /*------------------------------------------------------------------------*/

  /**
   * Get a user's list of email addresses. Masquerade (act as user) ability is
   *   required for this function
   * @author Gabe Abrams
   * @memberof api.user
   * @instance
   * @async
   * @method listEmails
   * @param {object} opts object containing all arguments
   * @param {number} opts.userId the id of the user to get emails for
   * @param {boolean} [opts.sortByDate] if false then sort by ranked
   *   order of emails (primary email first), if true then sort by date
   *   created so the official emails should be first
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CACCLEmailEntry[]>}
   *   email address objects
   */
  public async listEmails(
    opts: {
      userId: number,
      sortByDate?: boolean,
    },
    config: APIConfig,
  ): Promise<CACCLEmailEntry[]> {
    const channels: CanvasCommunicationChannel[] = await this.visitEndpoint({
      config,
      action: 'get the list of email addresses for a user',
      path: `${API_PREFIX}/users/self/communication_channels`,
      method: 'GET',
      params: {
        as_user_id: opts.userId,
      },
    });
    
    // Filter out non-email communication channels
    const emailChannels = channels.filter((channel) => {
      return (channel.type === 'email');
    });

    // Create email objects
    const emailObjects = emailChannels.map((channel) => {
      return {
        position: channel.position,
        email: channel.address,
        createdAt: new Date(channel.created_at),
      };
    });

    // Sort
    if (opts.sortByDate) {
      emailObjects.sort((a, b) => {
        const aT = a.createdAt.getTime();
        const bT = b.createdAt.getTime();

        if (aT < bT) {
          return -1;
        }
        if (aT > bT) {
          return 1;
        }
        return 0;
      });
    }

    // Return
    return emailObjects;
  }

  /**
   * Get a user's list of courses. Masquerade (act as user) ability is
   *   required for this function
   * @author Gabe Abrams
   * @memberof api.user
   * @instance
   * @async
   * @method listCourses
   * @param {object} opts object containing all arguments
   * @param {number} opts.userId the id of the user to get emails for
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCourse[]>} list of courses {@link https://canvas.instructure.com/doc/api/courses.html#Course}
   */
  public async listCourses(
    opts: {
      userId: number,
    },
    config: APIConfig,
  ): Promise<CanvasCourse[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of courses for a user',
      path: `${API_PREFIX}/courses`,
      method: 'GET',
      params: {
        as_user_id: opts.userId,
      },
    });
  }

  /**
   * Search users
   * @author Gabe Abrams
   * @memberof api.user
   * @instance
   * @async
   * @method search
   * @param {object} opts object containing all arguments
   * @param {number} opts.accountId the account to search through
   * @param {string} opts.searchTerm a search term to apply (must be at
   *   least 3 chars). Can be a full ID or partial name. For admins, searches
   *   SIS ID, login ID, name, and email address.
   * @param {boolean} [opts.isStudent] if true, only search for students.
   *   Only one user type boolean can be true
   * @param {boolean} [opts.isTeacher] if true, only search for teachers.
   *   Only one user type boolean can be true
   * @param {boolean} [opts.isTA] if true, only search for TAs.
   *   Only one user type boolean can be true
   * @param {boolean} [opts.isObserver] if true, only search for observers.
   *   Only one user type boolean can be true
   * @param {boolean} [opts.isDesigner] if true, only search for designers.
   *   Only one user type boolean can be true
   * @param {string} [opts.sortBy=username] the item to sort by. Can be:
   *   "username" or "email" or "sis_id" or "last_login"
   * @param {boolean} [opts.sortDescending] if true, sort descending
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasUser[]>} list of user objects {@link https://canvas.instructure.com/doc/api/users.html#User}
   */
  public async search(
    opts: {
      accountId: number,
      searchTerm: string,
      isStudent?: boolean,
      isTeacher?: boolean,
      isTA?: boolean,
      isObserver?: boolean,
      isDesigner?: boolean,
      sortBy?: ('username' | 'email' | 'sis_id' | 'last_login'),
      sortDescending?: boolean,
    },
    config: APIConfig,
  ): Promise<CanvasUser[]> {
    // Get search term
    const searchTerm = String(opts.searchTerm);

    // Figure out enrollment type
    let enrollmentType;
    if (opts.isStudent) {
      enrollmentType = 'student';
    } else if (opts.isTeacher) {
      enrollmentType = 'teacher';
    } else if (opts.isTA) {
      enrollmentType = 'ta';
    } else if (opts.isObserver) {
      enrollmentType = 'observer';
    } else if (opts.isDesigner) {
      enrollmentType = 'designer';
    }

    // Figure out other parameters
    const sort = opts.sortBy || 'username';
    const order = (opts.sortDescending ? 'desc' : 'asc');

    // Send request
    return this.visitEndpoint({
      config,
      action: 'search for a user or a list of users',
      path: `${API_PREFIX}/accounts/${opts.accountId}/users`,
      method: 'GET',
      params: {
        sort,
        order,
        search_term: searchTerm,
        enrollment_type: enrollmentType,
      },
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatUser;
