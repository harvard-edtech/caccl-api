const EndpointCategory = require('../../classes/EndpointCategory.js');

// Import subcategories:
const Self = require('./UserSubcategories/Self.js');

class User extends EndpointCategory {
  constructor(config) {
    super(config, User);
  }
}

/*------------------------------------------------------------------------*/
/*                             Subcategories:                             */
/*------------------------------------------------------------------------*/

User.assignment = Self;

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = User;
