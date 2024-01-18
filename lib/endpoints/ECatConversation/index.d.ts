/**
 * Functions for conversations
 * @namespace api.conversation
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasConversation from '../../types/CanvasConversation';
declare class ECatConversation extends EndpointCategory {
    /**
     * Creates a Canvas conversation
     * @author Gabe Abrams
     * @method create
     * @memberof api.conversation
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number[]} opts.recipientIds Canvas IDs for the users who will
     *   receive the message from the current user
     * @param {string} opts.subject subject of the conversation
     * @param {string} opts.body body of the message
     * @param {number} [opts.courseId=no course] the id of the course to
     *   send from. If no course is included, message is sent outside the context
     *   of the course
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasConversation[]>} Array of Canvas Conversations {@link https://canvas.instructure.com/doc/api/conversations.html#Conversation}
     */
    create(opts: {
        recipientIds: number[];
        subject: string;
        body: string;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasConversation[]>;
}
export default ECatConversation;
