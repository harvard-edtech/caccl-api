const EXCLUDED_VALUE = '-=EXCLUDED_PARAMETER=-';

/*
config:
- options
- accessToken
- defaults
*/
module.exports = (config) => {
  const { options, accessToken, defaults } = config;
  const oldParams = (options || {}).params || {};

  // Exclude parameters by name and value
  const newParams = {};
  Object.keys(oldParams).forEach((key) => {
    // Skip if excluded by value
    if (oldParams[key] === EXCLUDED_VALUE) {
      return;
    }

    // Add to new params
    if (Array.isArray(oldParams[key])) {
      // This is an array. Prep for repeat array format (Canvas requires this)
      newParams[key + '[]'] = oldParams[key];
    } else {
      // This is not an array. Just add it as usual
      newParams[key] = oldParams[key];
    }
  });

  // Add access token to request (if we have one and one isn't already added)
  if (accessToken && !newParams.access_token) {
    newParams.access_token = accessToken;
  }

  // Set up number of entries per page
  newParams.per_page = options.itemsPerPage || defaults.itemsPerPage;

  return newParams;
};
