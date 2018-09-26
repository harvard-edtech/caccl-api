const EXCLUDED_PARAM = '-=EXCLUDED_PARAMETER=-';

module.exports = {
  includeIfTruthy: (value) => value || EXCLUDED_PARAM,
};
