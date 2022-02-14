/**
 * Functions for getting course analytics
 * @namespace api.course.analytics
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
 * @author Gabe Abrams
 * @memberof api.course.analytics
 * @instance
 * @async
 * @method getStudentParticipationData
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.studentId - the id of the student to get analytics on
 * @return {UserInCourseParticipationData} participation data {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.student_in_course_participation}
 */
Analytics.getStudentParticipationData = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/users/${options.studentId}/activity`,
    method: 'GET',
    dontCache: true,
  });
};
Analytics.getStudentParticipationData.action = 'get participation data for a student in a course';
Analytics.getStudentParticipationData.requiredParams = ['courseId', 'studentId'];
Analytics.getStudentParticipationData.scopes = [
  'url:GET|/api/v1/courses/:course_id/analytics/users/:student_id/activity',
];

/* --------------------- User Messaging Info -------------------- */

/**
 * Gets messaging data for a student in a course
 * @author Gabe Abrams
 * @memberof api.course.analytics
 * @instance
 * @async
 * @method getStudentMessagingData
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.studentId - the id of the student to get analytics on
 * @return {UserInCourseMessagingData} message data {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.student_in_course_messaging}
 */
Analytics.getStudentMessagingData = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/users/${options.studentId}/communication`,
    method: 'GET',
    dontCache: true,
  });
};
Analytics.getStudentMessagingData.action = 'get messaging data for a student in a course';
Analytics.getStudentMessagingData.requiredParams = ['courseId', 'studentId'];
Analytics.getStudentMessagingData.scopes = [
  'url:GET|/api/v1/courses/:course_id/analytics/users/:student_id/communication',
];

/* ------------------ Daily Activity Summaries ------------------ */

/**
 * Gets a list of daily activity summaries for each day in a course
 * @author Gabe Abrams
 * @memberof api.course.analytics
 * @instance
 * @async
 * @method listDailyActivitySummaries
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @return {CourseLevelParticipationData} list of daily activity summaries {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_participation}
 */
Analytics.listDailyActivitySummaries = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/activity`,
    method: 'GET',
    dontCache: true,
  });
};
Analytics.listDailyActivitySummaries.action = 'get a list of daily activity summaries for each day in a course';
Analytics.listDailyActivitySummaries.requiredParams = ['courseId'];
Analytics.listDailyActivitySummaries.scopes = [
  'url:GET|/api/v1/courses/:course_id/analytics/activity',
];

/* -------------------- Assignment Summaries -------------------- */

/**
 * Gets a list of assignments summaries for all assignments in a course
 * @author Gabe Abrams
 * @memberof api.course.analytics
 * @instance
 * @async
 * @method listAssignmentSummaries
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @return {CourseLevelAssignmentData} list of assignment summaries {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_assignments}
 */
Analytics.listAssignmentSummaries = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/assignments`,
    method: 'GET',
    dontCache: true,
  });
};
Analytics.listAssignmentSummaries.action = 'get a list of assignment summaries for all assignments in a course';
Analytics.listAssignmentSummaries.requiredParams = ['courseId'];
Analytics.listAssignmentSummaries.scopes = [
  'url:GET|/api/v1/courses/:course_id/analytics/assignments',
];

/* ---------------------- Student Summaries --------------------- */

/**
 * Gets a list of student summaries for all students in a course
 * @author Gabe Abrams
 * @memberof api.course.analytics
 * @instance
 * @async
 * @method listStudentSummaries
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @return {CourseLevelStudentSummaries} list of student summaries {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_student_summaries}
 */
Analytics.listStudentSummaries = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/student_summaries`,
    method: 'GET',
    dontCache: true,
  });
};
Analytics.listStudentSummaries.action = 'get a list of student summaries for all students in a course';
Analytics.listStudentSummaries.requiredParams = ['courseId'];
Analytics.listStudentSummaries.scopes = [
  'url:GET|/api/v1/courses/:course_id/analytics/student_summaries',
];

/**
 * Gets a student summary for a student in a course
 * @author Gabe Abrams
 * @memberof api.course.analytics
 * @instance
 * @async
 * @method getStudentSummary
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.studentId - id of the user to get analytics for
 * @return {CourseLevelStudentSummary} student summary {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_student_summaries}
 */
Analytics.getStudentSummary = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/analytics/student_summaries`,
    method: 'GET',
    params: {
      student_id: options.studentId,
    },
    dontCache: true,
  });
};
Analytics.getStudentSummary.action = 'get a student summary for a student in a course';
Analytics.getStudentSummary.requiredParams = ['courseId', 'studentId'];
Analytics.getStudentSummary.scopes = [
  'url:GET|/api/v1/courses/:course_id/analytics/student_summaries',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Analytics;
