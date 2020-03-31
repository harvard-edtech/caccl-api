/**
 * Functions for interacting with accounts
 * @class api.account
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');

// Subcategories
const enrollmentTerm = require('./EnrollmentTerm');

class Account extends EndpointCategory {
  constructor(config) {
    super(config, Account);
  }
}

/*------------------------------------------------------------------------*/
/*                             Subcategories:                             */
/*------------------------------------------------------------------------*/

Account.enrollmentTerm = enrollmentTerm;

/*------------------------------------------------------------------------*/
/*                               Endpoints:                               */
/*------------------------------------------------------------------------*/

/**
 * Gets info on a specific course
 * @author Gabriel Abrams
 * @method get
 * @memberof api.account
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.accountId - Canvas account Id to get info on
 * @return {Promise.<Object>} Canvas account {@link https://canvas.instructure.com/doc/api/accounts.html#Account}
 */
Account.get = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/accounts/${options.accountId}`,
    method: 'GET',
  });
};
Account.get.action = 'get info on a specific account';
Account.get.requiredParams = ['accountId'];
Account.get.scopes = ['url:GET|/api/v1/accounts/:id'];

/**
 * Get the list of accounts
 * @author Gabriel Abrams
 * @method list
 * @memberof api.account
 * @instance
 * @return {Promise.<Object[]>} list of Canvas accounts {@link https://canvas.instructure.com/doc/api/accounts.html#Account}
 */
Account.list = function () {
  return this.visitEndpoint({
    path: `${prefix.v1}/accounts`,
    method: 'GET',
  });
};
Account.list.action = 'get the list of accounts';
Account.list.scopes = ['url:GET|/api/v1/accounts'];

/**
 * Gets the list of admins in an account
 * @author Gabriel Abrams
 * @method listAdmins
 * @memberof api.account
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.accountId - Canvas account Id to get the list of
 *   admins from
 * @return {Promise.<Object[]>} List of Canvas admins {@link https://canvas.instructure.com/doc/api/admins.html#Admin}
 */
Account.listAdmins = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/accounts/${options.accountId}/admins`,
    method: 'GET',
  });
};
Account.listAdmins.action = 'get the list of admins in a specific account';
Account.listAdmins.requiredParams = ['accountId'];
Account.listAdmins.scopes = ['url:GET|/api/v1/accounts/:account_id/admins'];

/**
 * Gets the list of active courses in an account
 * @author Gabe Abrams
 * @method listCourses
 * @memberof api.account
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.accountId - Canvas account Id to get the list of
 *   courses from
 * @param {number[]} [options.teacherIds=all teachers] - a list of teacher ids
 *   to limit the search to
 * @param {number[]} [options.subaccountIds=all subaccounts] - a list of
 *   subaccount ids to limit the search to
 * @param {boolean} [options.hasEnrollments=no filter] - if true, require that
 *   the course has at least one enrollment, if false, require that the course
 *   has no enrollments
 * @param {boolean} [options.atLeastOneTeacher] - if true, only show
 *   courses that have at least one teacher
 * @param {boolean} [options.atLeastOneStudent] - if true, only show
 *   courses that have at least one student
 * @param {boolean} [options.atLeastOneTA] - if true, only show
 *   courses that have at least one TA
 * @param {boolean} [options.atLeastOneObserver] - if true, only show
 *   courses that have at least one observer
 * @param {boolean} [options.atLeastOneDesigner] - if true, only show
 *   courses that have at least one designer
 * @param {boolean} [options.published=no filter] - if true, only show courses
 *   that are published, if false, only show courses that are unpublished
 * @param {boolean} [options.completed=no filter] - if true, only show courses
 *   that are completed, if false, only show courses that are not completed
 * @param {boolean} [options.blueprint=no filter] - if true, only include
 *   blueprint courses, if false, only show courses that are not blueprints
 * @param {boolean} [options.blueprintAssociated=no filter] - if true, require
 *   that the course be associated with a blueprint, if false, require that the
 *   course not be associated with a blueprint
 * @param {string[]} [options.state=no filter] - a list of states to limit the
 *   search to. Allowed values: created, claimed, available, completed, deleted,
 *   all
 * @param {number} [options.enrollmentTermId=no filter] - an enrollment term to
 *   limit the scope of the search to
 * @param {string} [options.searchTerm] - a minimum 3 character string to search
 *   the courses by (searches course name, code, or full id)
 * @param {string} [options.sortColumn] - the main data column to sort the
 *   results by. Allowed values: course_name, sis_course_id, teacher,
 *   account_name
 * @param {string} [options.sortOrder] - the sort order to use: "asc" or "desc"
 * @param {date} [options.startsBefore] - If set, only return courses that start
 *   before the value (inclusive) or their enrollment term starts before the
 *   value (inclusive) or both the course's start_at and the enrollment term's
 *   start_at are set to null. Format can be an ISO 8601 string or a Date
 *   instance
 * @param {date} [options.endsAfter] - If set, only return courses that end
 *   after the value (inclusive) or their enrollment term ends after the value
 *   (inclusive) or both the course's end_at and the enrollment term's end_at
 *   are set to null. Format can be an ISO 8601 string or a Date
 *   instance
 * @param {boolean} [options.includeSyllabus] - if true, for each course,
 *   include its syllabus
 * @param {boolean} [options.includeTerm] - if true, for each course,
 *   include its term
 * @param {boolean} [options.includeCourseProgress] - if true, for each course,
 *   include its progress
 * @param {boolean} [options.includeStorageQuotaUsedMB] - if true, for each
 *   courses, include the number of megabytes of storage used
 * @param {boolean} [options.includeTotalStudents] - if true, for each course,
 *   include the total number of students
 * @param {boolean} [options.includeTeachers] - if true, for each course,
 *   include the teachers
 * @param {boolean} [options.includeAccountName] - if true, for each course,
 *   include its parent account name
 * @param {boolean} [options.includeConcluded] - if true, for each course,
 *   include whether the course has been concluded
 * @return {Promise.<Object[]>} Array of Canvas courses {@link https://canvas.instructure.com/doc/api/courses.html#Course}
 */
Account.listCourses = function (options) {
  // Pre-process enrollment types
  let enrollmentTypes;
  if (
    options.atLeastOneStudent
    || options.atLeastOneTA
    || options.atLeastOneObserver
    || options.atLeastOneDesigner
    || options.atLeastOneTeacher
  ) {
    enrollmentTypes = [];
  }
  if (options.atLeastOneStudent) {
    enrollmentTypes.push('student');
  }
  if (options.atLeastOneTA) {
    enrollmentTypes.push('ta');
  }
  if (options.atLeastOneObserver) {
    enrollmentTypes.push('observer');
  }
  if (options.atLeastOneDesigner) {
    enrollmentTypes.push('designer');
  }
  if (options.atLeastOneTeacher) {
    enrollmentTypes.push('teacher');
  }

  return this.visitEndpoint({
    path: `${prefix.v1}/accounts/${options.accountId}/courses`,
    method: 'GET',
    params: {
      with_enrollments: utils.convertToBooleanIfDefined(options.hasEnrollments),
      enrollment_type: enrollmentTypes,
      published: utils.convertToBooleanIfDefined(options.published),
      completed: utils.convertToBooleanIfDefined(options.completed),
      blueprint: utils.convertToBooleanIfDefined(options.blueprint),
      blueprint_associated: utils.convertToBooleanIfDefined(
        options.blueprintAssociated
      ),
      by_teachers: utils.includeIfTruthy(options.teacherIds),
      by_subaccounts: utils.includeIfTruthy(options.subaccountIds),
      state: utils.includeIfTruthy(options.state),
      enrollment_term_id: utils.includeIfTruthy(options.enrollmentTermId),
      search_term: utils.includeIfTruthy(options.searchTerm),
      include: utils.genIncludesList({
        syllabus_body: options.includeSyllabus,
        term: options.includeTerm,
        course_progress: options.includeCourseProgress,
        storage_quota_used_mb: options.includeStorageQuotaUsedMB,
        total_students: options.includeTotalStudents,
        teachers: options.includeTeachers,
        account_name: options.includeAccountName,
        concluded: options.includeConcluded,
      }),
      sort: utils.includeIfTruthy(options.sort),
      order: utils.includeIfTruthy(options.order),
      starts_before: utils.includeIfDate(options.startsBefore),
      ends_after: utils.includeIfDate(options.endsAfter),
    },
  });
};
Account.listCourses.action = 'get the list of courses in a specific account';
Account.listCourses.requiredParams = ['accountId'];
Account.listCourses.scopes = ['url:GET|/api/v1/accounts/:account_id/courses'];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Account;
