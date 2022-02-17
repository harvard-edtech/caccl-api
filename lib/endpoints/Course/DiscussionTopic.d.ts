/**
 * Functions for interacting with discussion topics within courses
 * @namespace api.course.discussionTopic
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasDiscussionTopic from '../../types/CanvasDiscussionTopic';
declare class DiscussionTopic extends EndpointCategory {
    /**
     * Gets the list of discussion topics
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.discussionTopic
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {boolean} [opts.includeAllDates] - If truthy, includes
     *   all dates
     * @param {boolean} [opts.includeSections] - If truthy, includes
     *   sections
     * @param {boolean} [opts.includeSectionsUserCount] - If truthy,
     *   includes section user count
     * @param {boolean} [opts.includeOverrides] - If truthy,
     *   includes overrides
     * @param {string} [opts.searchTerm] - If included, the partial title of the
     *   discussion topics to match and return
     * @param {string} [opts.orderBy="position"] - If included, the results are
     *   ordered as instructed. Can be "position" or "recent_activity" or "title"
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasDiscussionTopic[]>} List of Canvas Discussion Topics {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
     */
    list(opts: {
        courseId: number;
        includeAllDates?: boolean;
        includeSections?: boolean;
        includeSectionsUserCount?: boolean;
        includeOverrides?: boolean;
        searchTerm?: string;
        orderBy?: ('position' | 'recent_activity' | 'title');
    }, config?: APIConfig): Promise<CanvasDiscussionTopic[]>;
    /**
     * Creates a new discussion topic
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.discussionTopic
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {string} opts.title - title of the discussion
     * @param {string} opts.message - message of the discussion
     * @param {string} [opts.discussionType="side_comment"] - the type of
     *   discussion. Accepted values are 'side_comment', for discussions that
     *   only allow one level of nested comments, and 'threaded' for fully
     *   threaded discussions.
     * @param {boolean} [opts.published] - if true, topic is published. If false,
     *   discussion topic is left in draft state
     * @param {date} [opts.delayedPostAt] - if a date is given, the topic will
     *   not be published until that time
     * @param {boolean} [opts.allowRating] - if true, users can rate entries in
     *   this topic
     * @param {date} [opts.lockAt] - if a date is given, the topic will be
     *   scheduled to lock at the provided timestamp. If the date is in the past,
     *   the topic will be locked
     * @param {boolean} [opts.pinned] - if true, this topic will be listed in
     *   the “Pinned Discussion” section
     * @param {number} [opts.groupSetId] - if included, the topic will become a
     *   group discussion assigned to the group
     * @param {boolean} [opts.onlyGradersCanRate] - if true, only graders will
     *   be allowed to rate entries.
     * @param {boolean} [opts.requireInitialPost] - if true, then a user may not
     *   respond to other replies until that user has made an initial reply
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasDiscussionTopic>} A Canvas Discussion Topics {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
     */
    create(opts: {
        courseId: number;
        title: string;
        message: string;
        discussionType?: ('side_comment' | 'threaded');
        published?: boolean;
        delayedPostAt?: (Date | string);
        allowRating?: boolean;
        lockAt?: (Date | string);
        pinned?: boolean;
        groupSetId?: number;
        onlyGradersCanRate?: boolean;
        requireInitialPost?: boolean;
    }, config?: APIConfig): Promise<CanvasDiscussionTopic>;
    /**
     * Deletes a discussion topic
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.discussionTopic
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {string} opts.topicId - the id of the Canvas discussion topic to
     *   delete
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasDiscussionTopic>} A Canvas Discussion Topic {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
     */
    delete(opts: {
        courseId: number;
        topicId: string;
    }, config?: APIConfig): Promise<CanvasDiscussionTopic>;
    /**
     * Lists the entries in a discussion topic
     * @author Gabe Abrams
     * @method listEntries
     * @memberof api.course.discussionTopic
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {string} opts.topicId - the id of the Canvas discussion topic to
     *   list entries in
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasDiscussionTopic>} A Canvas Discussion Topic {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
     */
    listEntries(opts: {
        courseId: number;
        topicId: string;
    }, config?: APIConfig): Promise<CanvasDiscussionTopic>;
}
export default DiscussionTopic;
