const EndpointCategory = require('../../classes/EndpointCategory');

// Import subcategories
const Account = require('./Account');
const Conversation = require('./Conversation');
const Course = require('./Course');
const GraphQL = require('./GraphQL');
const Other = require('./Other');
const User = require('./User');

class API extends EndpointCategory {
  constructor(config) {
    super(config, API);
  }
}

/*------------------------------------------------------------------------*/
/*                             Subcategories:                             */
/*------------------------------------------------------------------------*/

/* @module course */
API.account = Account;
API.conversation = Conversation;
API.course = Course;
API.graphQL = GraphQL;
API.other = Other;
API.user = User;

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = API;
