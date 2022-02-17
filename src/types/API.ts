import Account from '../endpoints/Account';
import Conversation from '../endpoints/Conversation';
import Course from '../endpoints/Course';
import Other from '../endpoints/Other';
import User from '../endpoints/User';

/**
 * API structure type
 * @author Gabe Abrams
 */
interface API {
  account: Account,
  course: Course,
  conversation: Conversation,
  other: Other,
  user: User,
};

export default API;
