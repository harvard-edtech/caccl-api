/**
 * Functions for getting course analytics
 * @class api.course.analytics
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');

class Analytics extends EndpointCategory {
  constructor(config) {
    super(config, Analytics);
  }
}

/*------------------------------------------------------------------------*/
/*                               Endpoints:                               */
/*------------------------------------------------------------------------*/

/* --------------------- User Participation --------------------- */

/**
 * Gets participation data for a student in a course
 * @author Gabriel Abrams
 * @memberof api.course.analytics.getStudentParticipationData
 * @instance
 * @method getStudentParticipationData
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.studentId - the id of the student to get analytics on
 * @return {Promise.<Object>} participation data {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.student_in_course_participation}
 */
Analytics.getStudentParticipationData = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/users/${options.studentId}/activity`,
    method: 'GET',
  });
};
Analytics.getStudentParticipationData.action = 'get participation data for a student in a course';
Analytics.getStudentParticipationData.requiredParams = ['courseId', 'studentId'];

/* --------------------- User Messaging Info -------------------- */

/**
 * Gets messaging data for a student in a course
 * @author Gabriel Abrams
 * @memberof api.course.analytics.getStudentMessagingData
 * @instance
 * @method getStudentMessagingData
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.studentId - the id of the student to get analytics on
 * @return {Promise.<Object>} message data {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.student_in_course_messaging}
 */
Analytics.getStudentMessagingData = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/users/${options.studentId}/communication`,
    method: 'GET',
  });
};
Analytics.getStudentMessagingData.action = 'get messaging data for a student in a course';
Analytics.getStudentMessagingData.requiredParams = ['courseId', 'studentId'];

/* ------------------ Daily Activity Summaries ------------------ */

/**
 * Gets a list of daily activity summaries for each day in a course
 * @author Gabriel Abrams
 * @memberof api.course.analytics.listDailyActivitySummaries
 * @instance
 * @method listDailyActivitySummaries
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @return {Promise.<Object[]>} list of daily activity summaries {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_participation}
 */
Analytics.listDailyActivitySummaries = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/activity`,
    method: 'GET',
  });
};
Analytics.listDailyActivitySummaries.action = 'get a list of daily activity summaries for each day in a course';
Analytics.listDailyActivitySummaries.requiredParams = ['courseId'];

/* -------------------- Assignment Summaries -------------------- */

/**
 * Gets a list of assignments summaries for all assignments in a course
 * @author Gabriel Abrams
 * @memberof api.course.analytics.listAssignmentSummaries
 * @instance
 * @method listAssignmentSummaries
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @return {Promise.<Object[]>} list of assignment summaries {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_assignments}
 */
Analytics.listAssignmentSummaries = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/assignments`,
    method: 'GET',
  });
};
Analytics.listAssignmentSummaries.action = 'get a list of assignment summaries for all assignments in a course';
Analytics.listAssignmentSummaries.requiredParams = ['courseId'];

/* ---------------------- Student Summaries --------------------- */

/**
 * Gets a list of student summaries for all students in a course
 * @author Gabriel Abrams
 * @memberof api.course.analytics.listStudentSummaries
 * @instance
 * @method listStudentSummaries
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @return {Promise.<Object[]>} list of student summaries {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_student_summaries}
 */
Analytics.listStudentSummaries = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/student_summaries`,
    method: 'GET',
  });
};
Analytics.listStudentSummaries.action = 'get a list of student summaries for all students in a course';
Analytics.listStudentSummaries.requiredParams = ['courseId'];

/**
 * Gets a student summary for a student in a course
 * @author Gabriel Abrams
 * @memberof api.course.analytics.getStudentSummary
 * @instance
 * @method getStudentSummary
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.studentId - id of the user to get analytics for
 * @return {Promise.<Object>} student summary {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_student_summaries}
 */
Analytics.getStudentSummary = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/student_summaries`,
    method: 'GET',
    params: {
      student_id: options.studentId,
    },
  });
};
Analytics.getStudentSummary.action = 'get a student summary for a student in a course';
Analytics.getStudentSummary.requiredParams = ['courseId', 'studentId'];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Analytics;
