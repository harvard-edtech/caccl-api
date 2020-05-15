/**
 * Functions for interacting with course announcements
 * @namespace api.course.announcement
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');

class Announcement extends EndpointCategory {
  constructor(config) {
    super(config, Announcement);
  }
}

/*------------------------------------------------------------------------*/
/*                               Endpoints:                               */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of announcements in a course
 * @author Gabe Abrams
 * @memberof api.course.announcement
 * @instance
 * @async
 * @method list
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {boolean} [options.onlyIncludeActive] - if true, only include active
 *   announcements
 * @param {Date} [options.startDate=two weeks ago] - the start date for the
 *   query
 * @param {Date} [options.endDate=28 days from start date] - the end date for
 *   the query
 * @param {boolean} [options.queryLastSixMonths] - if true, overwrites the
 *   start date with 6 months ago and end date to now
 * @return {DiscussionTopic[]} list of discussion topics {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
 */
Announcement.list = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/announcements`,
    method: 'GET',
    params: {
      context_codes: [
        `course_${options.courseId}`,
      ],
      start_date: (
        options.queryLastSixMonths
          ? (new Date(Date.now() - 15552000000)).toISOString()
          : utils.includeIfDate(options.startDate)
      ),
      end_date: (
        options.queryLastSixMonths
          ? (new Date()).toISOString()
          : utils.includeIfDate(options.endDate)
      ),
      active_only: utils.includeIfBoolean(options.active_only),
    },
  });
};
Announcement.list.action = 'get the list of announcements in a course';
Announcement.list.requiredParams = ['courseId'];
Announcement.list.scopes = [
  'url:GET|/api/v1/announcements',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Announcement;
