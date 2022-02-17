/**
 * Functions for interacting with accounts
 * @namespace api.account
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import CanvasAccount from '../../types/CanvasAccount';
import APIConfig from '../../shared/types/APIConfig';
import CanvasAdmin from '../../types/CanvasAdmin';
import CanvasCourse from '../../types/CanvasCourse';
import InitPack from '../../shared/types/InitPack';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Subcategories
import EnrollmentTerm from './EnrollmentTerm';

// Endpoint category
class Account extends EndpointCategory {
  // Sub-categories
  public enrollmentTerm: EnrollmentTerm;

  /**
   * Initialize endpoint category
   * @param initPack package of info for initializing the endpoint category
   */
  constructor(initPack: InitPack) {
    super(initPack);

    // Initialize subcategory
    this.enrollmentTerm = new EnrollmentTerm(initPack);
  }

  /*------------------------------------------------------------------------*/
  /*                               Endpoints:                               */
  /*------------------------------------------------------------------------*/

  /**
   * Get info on a specific Canvas account
   * @author Gabe Abrams
   * @method get
   * @memberof api.account
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.accountId Canvas account Id to get info on
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAccount>} Canvas account {@link https://canvas.instructure.com/doc/api/accounts.html#Account}
   */
  public async get(
    opts: {
      accountId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasAccount> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific account',
      path: `${API_PREFIX}/accounts/${opts.accountId}`,
      method: 'GET',
    });
  };

  /**
   * Get the list of accounts in the Canvas instance
   * @author Gabe Abrams
   * @method list
   * @memberof api.account
   * @instance
   * @async
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAccount[]>} list of Canvas accounts {@link https://canvas.instructure.com/doc/api/accounts.html#Account}
   */
  public async list(
    config?: APIConfig,
  ): Promise<CanvasAccount[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of accounts',
      path: `${API_PREFIX}/accounts`,
      method: 'GET',
    });
  }

  /**
   * Gets the list of admins in an account
   * @author Gabe Abrams
   * @method listAdmins
   * @memberof api.account
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.accountId Canvas account Id to get the list of
   *   admins from
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAdmin[]>} List of Canvas admins {@link https://canvas.instructure.com/doc/api/admins.html#Admin}
   */
  public async listAdmins(
    opts: {
      accountId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasAdmin> {
    return this.visitEndpoint({
      config,
      action: 'get the list of admins in a specific account',
      path: `${API_PREFIX}/accounts/${opts.accountId}/admins`,
      method: 'GET',
    });
  };

  /**
   * Gets the list of active courses in an account
   * @author Gabe Abrams
   * @method listCourses
   * @memberof api.account
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.accountId - Canvas account Id to get the list of
   *   courses from
   * @param {number[]} [opts.teacherIds=all teachers] - a list of teacher ids
   *   to limit the search to
   * @param {number[]} [opts.subaccountIds=all subaccounts] - a list of
   *   subaccount ids to limit the search to
   * @param {boolean} [opts.hasEnrollments=no filter] - if true, require that
   *   the course has at least one enrollment, if false, require that the course
   *   has no enrollments
   * @param {boolean} [opts.atLeastOneTeacher] - if true, only show
   *   courses that have at least one teacher
   * @param {boolean} [opts.atLeastOneStudent] - if true, only show
   *   courses that have at least one student
   * @param {boolean} [opts.atLeastOneTA] - if true, only show
   *   courses that have at least one TA
   * @param {boolean} [opts.atLeastOneObserver] - if true, only show
   *   courses that have at least one observer
   * @param {boolean} [opts.atLeastOneDesigner] - if true, only show
   *   courses that have at least one designer
   * @param {boolean} [opts.published=no filter] - if true, only show courses
   *   that are published, if false, only show courses that are unpublished
   * @param {boolean} [opts.completed=no filter] - if true, only show courses
   *   that are completed, if false, only show courses that are not completed
   * @param {boolean} [opts.blueprint=no filter] - if true, only include
   *   blueprint courses, if false, only show courses that are not blueprints
   * @param {boolean} [opts.blueprintAssociated=no filter] - if true, require
   *   that the course be associated with a blueprint, if false, require that the
   *   course not be associated with a blueprint
   * @param {string[]} [opts.state=no filter] - a list of states to limit the
   *   search to. Allowed values: created, claimed, available, completed, deleted,
   *   all
   * @param {number} [opts.enrollmentTermId=no filter] - an enrollment term to
   *   limit the scope of the search to
   * @param {string} [opts.searchTerm] - a minimum 3 character string to search
   *   the courses by (searches course name, code, or full id)
   * @param {string} [opts.sortColumn] - the main data column to sort the
   *   results by. Allowed values: course_name, sis_course_id, teacher,
   *   account_name
   * @param {string} [opts.sortOrder] - the sort order to use: "asc" or "desc"
   * @param {date} [opts.startsBefore] - If set, only return courses that start
   *   before the value (inclusive) or their enrollment term starts before the
   *   value (inclusive) or both the course's start_at and the enrollment term's
   *   start_at are set to null. Format can be an ISO 8601 string or a Date
   *   instance
   * @param {date} [opts.endsAfter] - If set, only return courses that end
   *   after the value (inclusive) or their enrollment term ends after the value
   *   (inclusive) or both the course's end_at and the enrollment term's end_at
   *   are set to null. Format can be an ISO 8601 string or a Date
   *   instance
   * @param {boolean} [opts.includeSyllabus] - if true, for each course,
   *   include its syllabus
   * @param {boolean} [opts.includeTerm] - if true, for each course,
   *   include its term
   * @param {boolean} [opts.includeCourseProgress] - if true, for each course,
   *   include its progress
   * @param {boolean} [opts.includeStorageQuotaUsedMB] - if true, for each
   *   courses, include the number of megabytes of storage used
   * @param {boolean} [opts.includeTotalStudents] - if true, for each course,
   *   include the total number of students
   * @param {boolean} [opts.includeTeachers] - if true, for each course,
   *   include the teachers
   * @param {boolean} [opts.includeAccountName] - if true, for each course,
   *   include its parent account name
   * @param {boolean} [opts.includeConcluded] - if true, for each course,
   *   include whether the course has been concluded
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCourse[]>} Array of Canvas courses {@link https://canvas.instructure.com/doc/api/courses.html#Course}
   */
  public async listCourses(
    opts: {
      accountId: number,
      teacherIds?: number[],
      subaccountIds?: number[],
      hasEnrollments?: boolean,
      atLeastOneTeacher?: boolean,
      atLeastOneStudent?: boolean,
      atLeastOneTA?: boolean,
      atLeastOneObserver?: boolean,
      atLeastOneDesigner?: boolean,
      published?: boolean,
      completed?: boolean,
      blueprint?: boolean,
      blueprintAssociated?: boolean,
      state?: (
        'created'
        | 'claimed'
        | 'available'
        | 'completed'
        | 'deleted'
        | 'all'
      )[],
      enrollmentTermId?: number,
      searchTerm?: string,
      sortColumn?: (
        'course_name'
        | 'sis_course_id'
        | 'teacher'
        | 'account_name'
      ),
      sortOrder?: ('asc' | 'desc'),
      startsBefore?: (Date | string),
      endsAfter?: (Date | string),
      includeSyllabus?: boolean,
      includeTerm?: boolean,
      includeCourseProgress?: boolean,
      includeStorageQuotaUsedMB?: boolean,
      includeTotalStudents?: boolean,
      includeTeachers?: boolean,
      includeAccountName?: boolean,
      includeConcluded?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasCourse[]> {
    // Pre-process enrollment types
    let enrollmentTypes: string[];
    if (
      opts.atLeastOneStudent
      || opts.atLeastOneTA
      || opts.atLeastOneObserver
      || opts.atLeastOneDesigner
      || opts.atLeastOneTeacher
    ) {
      enrollmentTypes = [];
    }
    if (opts.atLeastOneStudent) {
      enrollmentTypes.push('student');
    }
    if (opts.atLeastOneTA) {
      enrollmentTypes.push('ta');
    }
    if (opts.atLeastOneObserver) {
      enrollmentTypes.push('observer');
    }
    if (opts.atLeastOneDesigner) {
      enrollmentTypes.push('designer');
    }
    if (opts.atLeastOneTeacher) {
      enrollmentTypes.push('teacher');
    }

    return this.visitEndpoint({
      path: `${API_PREFIX}/accounts/${opts.accountId}/courses`,
      method: 'GET',
      action: 'get the list of courses in a specific account',
      params: {
        with_enrollments: utils.convertToBooleanIfDefined(opts.hasEnrollments),
        enrollment_type: enrollmentTypes,
        published: utils.convertToBooleanIfDefined(opts.published),
        completed: utils.convertToBooleanIfDefined(opts.completed),
        blueprint: utils.convertToBooleanIfDefined(opts.blueprint),
        blueprint_associated: utils.convertToBooleanIfDefined(
          opts.blueprintAssociated
        ),
        by_teachers: utils.includeIfTruthy(opts.teacherIds),
        by_subaccounts: utils.includeIfTruthy(opts.subaccountIds),
        state: utils.includeIfTruthy(opts.state),
        enrollment_term_id: utils.includeIfTruthy(opts.enrollmentTermId),
        search_term: utils.includeIfTruthy(opts.searchTerm),
        include: utils.genIncludesList({
          syllabus_body: opts.includeSyllabus,
          term: opts.includeTerm,
          course_progress: opts.includeCourseProgress,
          storage_quota_used_mb: opts.includeStorageQuotaUsedMB,
          total_students: opts.includeTotalStudents,
          teachers: opts.includeTeachers,
          account_name: opts.includeAccountName,
          concluded: opts.includeConcluded,
        }),
        sort: utils.includeIfTruthy(opts.sortColumn),
        order: utils.includeIfTruthy(opts.sortOrder),
        starts_before: utils.includeIfDate(opts.startsBefore),
        ends_after: utils.includeIfDate(opts.endsAfter),
      },
    });
  };
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default Account;
