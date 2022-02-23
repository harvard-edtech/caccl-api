/**
 * Functions for getting course analytics
 * @namespace api.course.analytics
 */
import EndpointCategory from '../../shared/EndpointCategory';
import CanvasUserInCourseParticipationData from '../../types/CanvasUserInCourseParticipationData';
import CanvasUserInCourseMessagingData from '../../types/CanvasUserInCourseMessagingData';
import CanvasCourseLevelParticipationData from '../../types/CanvasCourseLevelParticipationData';
import CanvasCourseLevelAssignmentData from '../../types/CanvasCourseLevelAssignmentData';
import CanvasCourseLevelStudentSummaries from '../../types/CanvasCourseLevelStudentSummaries';
import CanvasCourseLevelStudentSummary from '../../types/CanvasCourseLevelStudentSummary';
import APIConfig from '../../shared/types/APIConfig';
declare class ECatAnalytics extends EndpointCategory {
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
    getStudentParticipationData(opts: {
        courseId: number;
        studentId: number;
    }, config?: APIConfig): Promise<CanvasUserInCourseParticipationData>;
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
    getStudentMessagingData(opts: {
        courseId: number;
        studentId: number;
    }, config?: APIConfig): Promise<CanvasUserInCourseMessagingData>;
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
    listDailyActivitySummaries(opts: {
        courseId: number;
    }, config?: APIConfig): Promise<CanvasCourseLevelParticipationData>;
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
    listAssignmentSummaries(opts: {
        courseId: number;
    }, config?: APIConfig): Promise<CanvasCourseLevelAssignmentData>;
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
    listStudentSummaries(opts: {
        courseId: number;
    }, config?: APIConfig): Promise<CanvasCourseLevelStudentSummaries>;
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
    getStudentSummary(opts: {
        courseId: number;
        studentId: number;
    }, config?: APIConfig): Promise<CanvasCourseLevelStudentSummary>;
}
export default ECatAnalytics;
