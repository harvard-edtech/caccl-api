/**
 * Functions for conversations
 * @namespace api.conversation
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasConversation from '../../types/CanvasConversation';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class Conversation extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                               Endpoints:                               */
  /*------------------------------------------------------------------------*/

  /**
   * Creates a Canvas conversation
   * @author Gabe Abrams
   * @method create
   * @memberof api.conversation
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number[]} opts.recipientIds - Canvas IDs for the users who will
   *   receive the message from the current user
   * @param {string} opts.subject - subject of the conversation
   * @param {string} opts.body - body of the message
   * @param {number} [opts.courseId=no course] - the id of the course to send
   *   from
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasConversation[]>} Array of Canvas Conversations {@link https://canvas.instructure.com/doc/api/conversations.html#Conversation}
   */
  public async create(
    opts: {
      recipientIds: number[],
      subject: string,
      body: string,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasConversation[]> {
    // Separate recipients into batches of 100
    const recipientBatches: number[][] = [[]];
    opts.recipientIds.forEach((recipientId) => {
      if (recipientBatches[recipientBatches.length - 1].length >= 100) {
        // Batch full! Create a new batch
        recipientBatches.push([]);
      }

      // Add to the last batch
      recipientBatches[recipientBatches.length - 1].push(recipientId);
    });

    // Create parallel tasks for each recipient batch
    const conversationBatches = await Promise.all(
      recipientBatches.map((recipients) => {
        // Create params for this batch
        const params = {
          recipients,
          subject: opts.subject,
          body: opts.body,
          force_new: true,
          context_code: (
            opts.courseId
              ? `course_${opts.courseId}`
              : undefined
          ),
        };

        return this.visitEndpoint({
          config,
          params,
          action: 'create a new conversation',
          path: `${API_PREFIX}/conversations`,
          method: 'POST',
        });
      })
    );

    // Concatenate into one long list
    return [].concat(...conversationBatches);;
  };
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default Conversation;
