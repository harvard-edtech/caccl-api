/**
 * Functions for interacting with discussion topics within courses
 * @namespace api.course.discussionTopic
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');

class DiscussionTopic extends EndpointCategory {
  constructor(config) {
    super(config, DiscussionTopic);
  }
}

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
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {boolean} [options.includeAllDates=false] - If truthy, includes
 *   all dates
 * @param {boolean} [options.includeSections=false] - If truthy, includes
 *   sections
 * @param {boolean} [options.includeSectionsUserCount=false] - If truthy,
 *   includes section user count
 * @param {boolean} [options.includeOverrides=false] - If truthy,
 *   includes overrides
 * @param {string} [options.searchTerm] - If included, the partial title of the
 *   discussion topics to match and return
 * @param {string} [options.orderBy="position"] - If included, the results are
 *   ordered as instructed. Can be "position" or "recent_activity" or "title"
 * @return {DiscussionTopic[]} List of Canvas Discussion Topics {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
 */
DiscussionTopic.list = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/discussion_topics`,
    method: 'GET',
    params: {
      include: utils.genIncludesList({
        all_dates: options.includeAllDates,
        sections: options.includeSections,
        sections_user_count: options.includeSectionsUserCount,
        overrides: options.includeOverrides,
      }),
      search_term: utils.includeIfTruthy(options.searchTerm),
      order_by: utils.includeIfTruthy(options.orderBy),
    },
  });
};
DiscussionTopic.list.action = 'get the list of discussion topics in a course';
DiscussionTopic.list.requiredParams = ['courseId'];
DiscussionTopic.list.scopes = [
  'url:GET|/api/v1/courses/:course_id/discussion_topics',
];

/**
 * Creates a new discussion topic
 * @author Gabe Abrams
 * @method create
 * @memberof api.course.discussionTopic
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {string} options.title - title of the discussion
 * @param {string} options.message - message of the discussion
 * @param {string} [options.discussionType="side_comment"] - the type of
 *   discussion. Accepted values are 'side_comment', for discussions that
 *   only allow one level of nested comments, and 'threaded' for fully
 *   threaded discussions.
 * @param {boolean} [options.published] - if true, topic is published. If false,
 *   discussion topic is left in draft state
 * @param {date} [options.delayedPostAt] - if a date is given, the topic will
 *   not be published until that time
 * @param {boolean} [options.allowRating] - if true, users can rate entries in
 *   this topic
 * @param {date} [options.lockAt] - if a date is given, the topic will be
 *   scheduled to lock at the provided timestamp. If the date is in the past,
 *   the topic will be locked
 * @param {boolean} [options.pinned] - if true, this topic will be listed in
 *   the “Pinned Discussion” section
 * @param {number} [options.groupSetId] - if included, the topic will become a
 *   group discussion assigned to the group
 * @param {boolean} [options.onlyGradersCanRate] - if true, only graders will
 *   be allowed to rate entries.
 * @param {boolean} [options.requireInitialPost] - if true, then a user may not
 *   respond to other replies until that user has made an initial reply
 * @return {DiscussionTopic} A Canvas Discussion Topics {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
 */
DiscussionTopic.create = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/discussion_topics`,
    method: 'POST',
    params: {
      title: options.title,
      message: options.message,
      discussion_type: utils.includeIfTruthy(options.discussionType),
      published: options.includeIfBoolean(options.published),
      delayed_post_at: utils.includeIfDate(options.delayedPostAt),
      lock_at: utils.includeIfDate(options.lockAt),
      require_initial_post:
        options.includeIfBoolean(options.requireInitialPost),
      pinned: options.includeIfBoolean(options.pinned),
      group_category_id: options.includeIfNumber(options.groupSetId),
      allow_rating: options.includeIfBoolean(options.allowRating),
      only_graders_can_rate:
        options.includeIfBoolean(options.onlyGradersCanRate),
    },
  });
};
DiscussionTopic.create.action = 'create a discussion topic in a course';
DiscussionTopic.create.requiredParams = ['courseId', 'title', 'message'];
DiscussionTopic.create.scopes = [
  'url:POST|/api/v1/courses/:course_id/discussion_topics',
];

/**
 * Deletes a discussion topic
 * @author Gabe Abrams
 * @method delete
 * @memberof api.course.discussionTopic
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {string} options.topicId - the id of the Canvas discussion topic to
 *   delete
 * @return {DiscussionTopic} A Canvas Discussion Topic {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
 */
DiscussionTopic.delete = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/discussion_topics/${options.topicId}`,
    method: 'DELETE',
  });
};
DiscussionTopic.delete.action = 'delete a discussion topic from a course';
DiscussionTopic.delete.requiredParams = ['courseId', 'topicId'];
DiscussionTopic.delete.scopes = [
  'url:DELETE|/api/v1/courses/:course_id/discussion_topics/:topic_id',
];

/**
 * Lists the entries in a discussion topic
 * @author Gabe Abrams
 * @method listEntries
 * @memberof api.course.discussionTopic
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {string} options.topicId - the id of the Canvas discussion topic to
 *   list entries in
 * @return {DiscussionTopic} A Canvas Discussion Topic {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
 */
DiscussionTopic.listEntries = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/discussion_topics/${options.topicId}/entries`,
    method: 'GET',
  });
};
DiscussionTopic.listEntries.action = 'list entries in a discussion topic in a course';
DiscussionTopic.listEntries.requiredParams = ['courseId', 'topicId'];
DiscussionTopic.listEntries.scopes = [
  'url:GET|/api/v1/courses/:course_id/discussion_topics/:topic_id/entries',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = DiscussionTopic;
