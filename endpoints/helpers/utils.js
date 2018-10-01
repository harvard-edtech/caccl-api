const EXCLUDED_PARAM = '-=EXCLUDED_PARAMETER=-';

module.exports = {
  includeIfTruthy: (value) => {
    return value || EXCLUDED_PARAM;
  },

  includeIfBoolean: (value) => {
    return ((value === true || value === false) ? value : EXCLUDED_PARAM);
  },

  includeIfNumber: (value) => {
    return (!Number.isNaN(value) ? value : EXCLUDED_PARAM);
  },

  isTruthy: (value) => {
    return !(!value);
  },
};
