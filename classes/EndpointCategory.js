/**
 * Class that handles a category of endpoints
 * @module classes/EndpointCategory
 * @see module: classes/EndpointCategory
 */

// Endpoint-related helpers
const genEndpointFunction = require('./endpoint/genEndpointFunction.js');

/** A category of endpoints */
class EndpointCategory {
  /**
   * Creates an EndpointCategory
   * @param {number} config.visitEndpoint - An instance of a visitEndpoint
   *   function generated by classes/endpoint/genEndpointFunction
   * @param {object} [api=this] - Top level instance of endpoints/Endpoints.js
   *   that this EndpointCategory instance is an ancestor of
   * @param {object} [config.cache=null] - A cache instance to use. If excluded,
   *   caching is turned off
   */
  constructor(config, Child) {
    // Add api if it's not included
    const newConfig = config;
    if (!newConfig.api) {
      newConfig.api = this;
    }

    // Turn each endpoint (defined as a static function in the child) into a
    // function
    Object.keys(Child).forEach((prop) => {
      if (Child[prop].prototype instanceof EndpointCategory) {
        // This is a sub-category
        this[prop] = new Child[prop](newConfig);
      } else {
        // This is an endpoint

        // Extract action from first line of function
        let action;
        try {
          const firstLine = Child[prop].toString().split('\n')[1];
          action = firstLine.split('// @action: ')[1].trim();
        } catch (err) {
          action = 'perform an unnamed task';
        }

        // Create the function
        this[prop] = genEndpointFunction({
          action,
          api: newConfig.api,
          run: Child[prop],
          cache: newConfig.cache,
          uncache: config.uncache,
          visitEndpoint: newConfig.visitEndpoint,
        });
      }
    });
  }
}

module.exports = EndpointCategory;