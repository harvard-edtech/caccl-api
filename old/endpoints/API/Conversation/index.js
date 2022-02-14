/**
 * Functions for conversations
 * @namespace api.conversation
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');

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
 * @memberof api.conversation
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
  // Separate recipients into batches of 100
  const recipientBatches = [[]];
  options.recipientIds.forEach((recipientId) => {
    if (recipientBatches[recipientBatches.length - 1].length >= 100) {
      // Batch full! Create a new batch
      recipientBatches.push([]);
    }

    // Add to the last batch
    recipientBatches[recipientBatches.length - 1].push(recipientId);
  });

  // Run in parallel
  return (
    // Create parallel tasks for each recipient batch
    Promise.all(recipientBatches.map((recipients) => {
      // Create params for this batch
      const params = {
        recipients,
        subject: options.subject,
        body: options.body,
        force_new: true,
      };

      // Add context
      if (options.courseId) {
        params.context_code = `course_${options.courseId}`;
      }

      return this.visitEndpoint({
        params,
        path: `${prefix.v1}/conversations`,
        method: 'POST',
      });
    }))
      // Concatenate into one long list
      .then((conversationBatches) => {
        return [].concat(...conversationBatches);
      })
  );
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
