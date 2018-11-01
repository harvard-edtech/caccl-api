const axios = require('axios');
const qs = require('qs');
const CACCLError = require('../../../../caccl-error/index.js'); // TODO: switch to actual library
const errorCodes = require('../../../errorCodes.js');
//
// const paramsSerializer = (params) => {
//   const ret = queryString.stringify(params, { arrayFormat: 'bracket' });
//   console.log(ret);
//   return ret;
// };

// Function that sends (and retries) an https request
const sendRequest = (options) => {
  // Set max number of retries if not defined
  const numRetries = (options.numRetries ? options.numRetries : 0);

  // Use default method if applicable
  const method = options.method || 'GET';

  // Stringify parameters
  const stringifiedParams = qs.stringify(options.params || {}, {
    encodeValuesOnly: true,
    arrayFormat: 'brackets',
  });

  // Create url (include query if GET)
  const query = (method === 'GET' ? `?${stringifiedParams}` : '');
  const url = `https://${options.host}${options.path}${query}`;

  // Create data (only if not GET)
  const data = (method !== 'GET' ? stringifiedParams : null);

  // Send request
  return axios({
    method,
    url,
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .catch((err) => {
      // Axios throws an error if the request status indicates an error
      // sendRequest is supposed to resolve if the request went through, whether
      // the status indicates an error or not.
      if (err.response) {
        // Resolve with response
        return Promise.resolve(err.response);
      }
      // Request failed! Check if we have more attempts
      if (numRetries > 0) {
        // Update options with one less retry
        const newOptions = options;
        newOptions.numRetries -= 1;
        return sendRequest(newOptions);
      }

      // No tries left
      throw new CACCLError({
        message: 'We encountered an error when trying to send a network request. If this issue persists, contact an admin.',
        code: errorCodes.notConnected,
      });
    })
    .then((response) => {
      return {
        body: response.data,
        status: response.status,
        headers: response.headers,
      };
    });
};
module.exports = sendRequest;
