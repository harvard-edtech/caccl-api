const EXCLUDED_PARAM = '-=EXCLUDED_PARAMETER=-';

module.exports = {
  includeIfTruthy: (value) => {
    return value || EXCLUDED_PARAM;
  },
};
