/**
 * Functions for interacting with course announcements
 * @namespace api.course.announcement
 */
import EndpointCategory from '../../shared/EndpointCategory';
import CanvasDiscussionTopic from '../../types/CanvasDiscussionTopic';
import APIConfig from '../../shared/types/APIConfig';
declare class Announcement extends EndpointCategory {
    /**
     * Create an announcement
     * @author Gabe Abrams
     * @memberof api.course.announcement
     * @instance
     * @async
     * @method create
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id
     * @param {string} opts.title the title of the announcement
     * @param {string} opts.message the message of the announcement
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasDiscussionTopic>} a discussion topic {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
     */
    create(opts: {
        courseId: number;
        title: string;
        message: string;
    }, config?: APIConfig): Promise<CanvasDiscussionTopic>;
    /**
     * Gets the list of announcements in a course
     * @author Gabe Abrams
     * @memberof api.course.announcement
     * @instance
     * @async
     * @method list
     * @param {object} opts object containing all arguments
     * @param {number} opts.courseId Canvas course Id to query
     * @param {boolean} [opts.onlyIncludeActive] if true, only include active
     *   announcements
     * @param {Date} [opts.startDate=two weeks ago] the start date for the
     *   query
     * @param {Date} [opts.endDate=28 days from start date] the end date for
     *   the query
     * @param {boolean} [opts.queryLastSixMonths] if true, overwrites the
     *   start date with 6 months ago and end date to now
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasDiscussionTopic[]>} list of discussion topics {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
     */
    list(opts: {
        courseId: number;
        onlyIncludeActive?: boolean;
        startDate?: (Date | string);
        endDate?: (Date | string);
        queryLastSixMonths?: boolean;
    }, config?: APIConfig): Promise<CanvasDiscussionTopic[]>;
}
export default Announcement;
