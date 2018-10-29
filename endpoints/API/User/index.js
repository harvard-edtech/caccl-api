const EndpointCategory = require('../../../classes/EndpointCategory.js');

// Import subcategories:
const Self = require('./Self.js');

class User extends EndpointCategory {
  constructor(config) {
    super(config, User);
  }
}

/*------------------------------------------------------------------------*/
/*                             Subcategories:                             */
/*------------------------------------------------------------------------*/

User.self = Self;

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = User;
