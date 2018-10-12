const EXCLUDED_VALUE = '-=EXCLUDED_PARAMETER=-';

module.exports = (options, accessToken) => {
  // Pre-process parameters
  // > Exclude parameters by name and value
  const newParams = {};
  Object.keys(options.params || {}).forEach((key) => {
    if (options.params[key] !== EXCLUDED_VALUE) {
      newParams[key] = options.params[key];
    }
  });

  // Add access token to request (if we have one and one isn't already added)
  if (accessToken && !newParams.access_token) {
    newParams.access_token = accessToken;
  }

  return newParams;
};
