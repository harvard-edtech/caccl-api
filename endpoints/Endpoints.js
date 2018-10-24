const EndpointCategory = require('../classes/EndpointCategory.js');

// Import subcategories
const Course = require('./EndpointsSubcategories/Course.js');

class Endpoints extends EndpointCategory {
  constructor(config) {
    super(config, Endpoints);
  }
}

/*------------------------------------------------------------------------*/
/*                             Subcategories:                             */
/*------------------------------------------------------------------------*/

Endpoints.course = Course;

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Endpoints;
