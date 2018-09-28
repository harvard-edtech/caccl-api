const CACCLError = require('../../caccl-error/index.js'); // TODO: switch to actual package
const wrapVisitEndpoint = require('./helpers/wrapVisitEndpoint.js');

class EndpointsCategory {
  constructor(options) {
    // Wrap visitEndpoint to add two new features:
    // > Adds access tokens to each request
    // > Caches/uncaches values if cache was included
    const visitEndpoint = wrapVisitEndpoint({
      visitEndpoint: options.visitEndpoint,
      cache: options.cache,
      accessToken: options.accessToken,
    });

    // Turn each endpoint into a function
    let { endpointsDefinitions } = options;
    if (!Array.isArray(options.endpointsDefinitions)) {
      endpointsDefinitions = [options.endpointsDefinitions];
    }
    endpointsDefinitions.forEach((endpointsDefinition) => {
      endpointsDefinition(this, visitEndpoint).forEach((endpoint) => {
        this[endpoint.name] = (...args) => {
          return endpoint.run(...args)
            .catch((err) => {
              // Turn into CACCLError if not already
              let newError = err;
              if (!err.isCACCLError) {
                newError = new CACCLError(err);
              }

              // Add on action to the error
              newError.message = 'While attempting to ' + endpoint.action + ', we ran into an error: ' + err.message;
              throw newError;
            });
        };
      });
    });
  }
}

module.exports = EndpointsCategory;
