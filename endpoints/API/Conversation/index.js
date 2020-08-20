/**
 * Functions for users
 * @namespace api.user
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');

class Conversation extends EndpointCategory {
  constructor(config) {
    super(config, Conversation);
  }
}

/*------------------------------------------------------------------------*/
/*                                Endpoints                               */
/*------------------------------------------------------------------------*/

/**
 * Creates a Canvas conversation
 * @author Gabe Abrams
 * @method create
 * @memberof api.course.conversation
 * @instance
 * @async
 * @param {object} options - object containing all arguments
 * @param {number[]} options.recipientIds - Canvas IDs for the users who will
 *   receive the message from the current user
 * @param {string} options.subject - subject of the conversation
 * @param {string} options.body - body of the message
 * @param {number} [options.courseId=no course] - the id of the course to send
 *   from
 * @return {Conversation[]} Array of Canvas Conversations {@link https://canvas.instructure.com/doc/api/conversations.html#method.conversations.create}
 */
Conversation.create = function (options) {
  const params = {
    recipients: options.recipientIds,
    subject: options.subject,
    body: options.body,
    force_new: true,
  };

  // Add context
  if (options.courseId) {
    params.context_code = `course_${options.courseId}`;
  }

  return this.visitEndpoint({
    path: `${prefix.v1}/conversations`,
    method: 'POST',
    params,
  });
};
Conversation.create.action = 'create a new conversation';
Conversation.create.requiredParams = ['recipientIds', 'subject', 'body'];
Conversation.create.scopes = [
  'url:POST|/api/v1/conversations',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Conversation;
