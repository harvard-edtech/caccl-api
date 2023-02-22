/**
 * Functions for interacting with discussion topics within courses
 * @namespace api.course.discussionTopic
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasDiscussionTopic from '../../types/CanvasDiscussionTopic';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatDiscussionTopic extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                                Endpoints                               */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of discussion topics
   * @author Gabe Abrams
   * @method list
   * @memberof api.course.discussionTopic
   * @instance
   * @async
   * @param {object} [opts] object containing all arguments
   * @param {number} [opts.courseId] Canvas course Id to query
   * @param {boolean} [opts.includeAllDates] If truthy, includes
   *   all dates
   * @param {boolean} [opts.includeSections] If truthy, includes
   *   sections
   * @param {boolean} [opts.includeSectionsUserCount] If truthy,
   *   includes section user count
   * @param {boolean} [opts.includeOverrides] If truthy,
   *   includes overrides
   * @param {string} [opts.searchTerm] If included, the partial title of the
   *   discussion topics to match and return
   * @param {string} [opts.orderBy="position"] If included, the results are
   *   ordered as instructed. Can be "position" or "recent_activity" or "title"
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasDiscussionTopic[]>} List of Canvas Discussion Topics {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
   */
  public async list(
    opts: {
      courseId?: number,
      includeAllDates?: boolean,
      includeSections?: boolean,
      includeSectionsUserCount?: boolean,
      includeOverrides?: boolean,
      searchTerm?: string,
      orderBy?: ('position' | 'recent_activity' | 'title'),
    } = {},
    config?: APIConfig,
  ): Promise<CanvasDiscussionTopic[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of discussion topics in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/discussion_topics`,
      method: 'GET',
      params: {
        include: utils.genIncludesList({
          all_dates: opts.includeAllDates,
          sections: opts.includeSections,
          sections_user_count: opts.includeSectionsUserCount,
          overrides: opts.includeOverrides,
        }),
        search_term: utils.includeIfTruthy(opts.searchTerm),
        order_by: utils.includeIfTruthy(opts.orderBy),
      },
    });
  }

  /**
   * Creates a new discussion topic
   * @author Gabe Abrams
   * @method create
   * @memberof api.course.discussionTopic
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {string} opts.title title of the discussion
   * @param {string} opts.message message of the discussion
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {string} [opts.discussionType="side_comment"] the type of
   *   discussion. Accepted values are 'side_comment', for discussions that
   *   only allow one level of nested comments, and 'threaded' for fully
   *   threaded discussions.
   * @param {boolean} [opts.published] if true, topic is published. If false,
   *   discussion topic is left in draft state
   * @param {date} [opts.delayedPostAt] if a date is given, the topic will
   *   not be published until that time
   * @param {boolean} [opts.allowRating] if true, users can rate entries in
   *   this topic
   * @param {date} [opts.lockAt] if a date is given, the topic will be
   *   scheduled to lock at the provided timestamp. If the date is in the past,
   *   the topic will be locked
   * @param {boolean} [opts.pinned] if true, this topic will be listed in
   *   the “Pinned Discussion” section
   * @param {number} [opts.groupSetId] if included, the topic will become a
   *   group discussion assigned to the group
   * @param {boolean} [opts.onlyGradersCanRate] if true, only graders will
   *   be allowed to rate entries.
   * @param {boolean} [opts.requireInitialPost] if true, then a user may not
   *   respond to other replies until that user has made an initial reply
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasDiscussionTopic>} A Canvas Discussion Topics {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
   */
  public async create(
    opts: {
      title: string,
      message: string,
      courseId?: number,
      discussionType?: ('side_comment' | 'threaded'),
      published?: boolean,
      delayedPostAt?: (Date | string),
      allowRating?: boolean,
      lockAt?: (Date | string),
      pinned?: boolean,
      groupSetId?: number,
      onlyGradersCanRate?: boolean,
      requireInitialPost?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasDiscussionTopic> {
    return this.visitEndpoint({
      config,
      action: 'create a discussion topic in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/discussion_topics`,
      method: 'POST',
      params: {
        title: opts.title,
        message: opts.message,
        discussion_type: utils.includeIfTruthy(opts.discussionType),
        published: utils.includeIfBoolean(opts.published),
        delayed_post_at: utils.includeIfDate(opts.delayedPostAt),
        lock_at: utils.includeIfDate(opts.lockAt),
        require_initial_post: (
          utils.includeIfBoolean(opts.requireInitialPost)
        ),
        pinned: utils.includeIfBoolean(opts.pinned),
        group_category_id: utils.includeIfNumber(opts.groupSetId),
        allow_rating: utils.includeIfBoolean(opts.allowRating),
        only_graders_can_rate: (
          utils.includeIfBoolean(opts.onlyGradersCanRate)
        ),
      },
    });
  }

  /**
   * Deletes a discussion topic
   * @author Gabe Abrams
   * @method delete
   * @memberof api.course.discussionTopic
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {string} opts.topicId the id of the Canvas discussion topic to
   *   delete
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasDiscussionTopic>} A Canvas Discussion Topic {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
   */
  public async delete(
    opts: {
      topicId: string,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasDiscussionTopic> {
    return this.visitEndpoint({
      config,
      action: 'delete a discussion topic from a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/discussion_topics/${opts.topicId}`,
      method: 'DELETE',
    });
  }

  /**
   * Update whether a discussion topic is published or not
   * @author Gabe Abrams
   * @method updatePublishState
   * @memberof api.course
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {string} opts.topicId the id of the Canvas discussion topic to
   *   update
   * @param {number} [opts.courseId=default course id] Canvas course Id to
   *   modify
   * @param {boolean} [opts.isPublished] if true, publish the discussion topic.
   *   Otherwise, unpublish it
   */
  public async updatePublishState(
    opts: {
      topicId: string,
      courseId?: number,
      isPublished?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasDiscussionTopic> {
    return this.visitEndpoint({
      config,
      action: 'update the published state of a specific discussion topic',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/discussion_topics/${opts.topicId}`,
      method: 'PUT',
      params: {
        published: !!opts.isPublished,
      },
    });
  }

  /**
   * Lists the entries in a discussion topic
   * @author Gabe Abrams
   * @method listEntries
   * @memberof api.course.discussionTopic
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {string} opts.topicId the id of the Canvas discussion topic to
   *   list entries in
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasDiscussionTopic>} A Canvas Discussion Topic {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
   */
  public async listEntries(
    opts: {
      topicId: string,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasDiscussionTopic> {
    return this.visitEndpoint({
      config,
      action: 'list entries in a discussion topic in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/discussion_topics/${opts.topicId}/entries`,
      method: 'GET',
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatDiscussionTopic;
