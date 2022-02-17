/**
 * Functions for getting course analytics
 * @namespace api.course.analytics
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import CanvasUserInCourseParticipationData from '../../types/CanvasUserInCourseParticipationData';
import CanvasUserInCourseMessagingData from '../../types/CanvasUserInCourseMessagingData';
import CanvasCourseLevelParticipationData from '../../types/CanvasCourseLevelParticipationData';
import CanvasCourseLevelAssignmentData from '../../types/CanvasCourseLevelAssignmentData';
import CanvasCourseLevelStudentSummaries from '../../types/CanvasCourseLevelStudentSummaries';
import CanvasCourseLevelStudentSummary from '../../types/CanvasCourseLevelStudentSummary';
import APIConfig from '../../shared/types/APIConfig';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class Analytics extends EndpointCategory {
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
   * @param {number} opts.studentId the id of the student to get analytics on
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasUserInCourseParticipationData>} participation data {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.student_in_course_participation}
   */
  public async getStudentParticipationData(
    opts: {
      courseId: number,
      studentId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasUserInCourseParticipationData> {
    return this.visitEndpoint({
      config,
      action: 'get participation data for a student in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/analytics/users/${opts.studentId}/activity`,
      method: 'GET',
    });
  }

  /* --------------------- User Messaging Info -------------------- */

  /**
   * Gets messaging data for a student in a course
   * @author Gabe Abrams
   * @memberof api.course.analytics
   * @instance
   * @async
   * @method getStudentMessagingData
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
   * @param {number} opts.studentId the id of the student to get analytics on
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasUserInCourseMessagingData>} message data {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.student_in_course_messaging}
   */
  public async getStudentMessagingData(
    opts: {
      courseId: number,
      studentId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasUserInCourseMessagingData> {
    return this.visitEndpoint({
      config,
      action: 'get messaging data for a student in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/analytics/users/${opts.studentId}/communication`,
      method: 'GET',
    });
  }

  /* ------------------ Daily Activity Summaries ------------------ */

  /**
   * Gets a list of daily activity summaries for each day in a course
   * @author Gabe Abrams
   * @memberof api.course.analytics
   * @instance
   * @async
   * @method listDailyActivitySummaries
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCourseLevelParticipationData>} list of daily activity summaries {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_participation}
   */
  public async listDailyActivitySummaries(
    opts: {
      courseId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasCourseLevelParticipationData> {
    return this.visitEndpoint({
      config,
      action: 'get a list of daily activity summaries for each day in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/analytics/activity`,
      method: 'GET',
    });
  }

  /* -------------------- Assignment Summaries -------------------- */

  /**
   * Gets a list of assignments summaries for all assignments in a course
   * @author Gabe Abrams
   * @memberof api.course.analytics
   * @instance
   * @async
   * @method listAssignmentSummaries
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCourseLevelAssignmentData>} list of assignment summaries {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_assignments}
   */
  public async listAssignmentSummaries(
    opts: {
      courseId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasCourseLevelAssignmentData> {
    return this.visitEndpoint({
      config,
      action: 'get a list of assignment summaries for all assignments in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/analytics/assignments`,
      method: 'GET',
    });
  }

  /* ---------------------- Student Summaries --------------------- */

  /**
   * Gets a list of student summaries for all students in a course
   * @author Gabe Abrams
   * @memberof api.course.analytics
   * @instance
   * @async
   * @method listStudentSummaries
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCourseLevelStudentSummaries>} list of student summaries {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_student_summaries}
   */
  public async listStudentSummaries(
    opts: {
      courseId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasCourseLevelStudentSummaries> {
    return this.visitEndpoint({
      config,
      action: 'get a list of student summaries for all students in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/analytics/student_summaries`,
      method: 'GET',
    });
  }

  /**
   * Gets a student summary for a student in a course
   * @author Gabe Abrams
   * @memberof api.course.analytics
   * @instance
   * @async
   * @method getStudentSummary
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
   * @param {number} opts.studentId id of the user to get analytics for
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasCourseLevelStudentSummary>} student summary {@link https://canvas.instructure.com/doc/api/analytics.html#method.analytics_api.course_student_summaries}
   */
  public async getStudentSummary(
    opts: {
      courseId: number,
      studentId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasCourseLevelStudentSummary> {
    return this.visitEndpoint({
      config,
      action: 'get a student summary for a student in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/analytics/student_summaries`,
      method: 'GET',
      params: {
        student_id: opts.studentId,
      },
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default Analytics;
