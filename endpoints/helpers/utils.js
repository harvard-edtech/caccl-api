// wrapVisitEndpoint filters out all parameters with value equal to
// EXCLUDED_PARAM. To exclude a parameter, just set its value to EXCLUDED_PARAM
const EXCLUDED_PARAM = '-=EXCLUDED_PARAMETER=-';

module.exports = {
  includeIfTruthy: (value) => {
    return value || EXCLUDED_PARAM;
  },

  includeTruthyElements: (arr) => {
    // Exclude if this isn't an array
    if (!arr || !Array.isArray(arr)) {
      return EXCLUDED_PARAM;
    }
    // Filter non-truthy elements
    return arr.filter((x) => {
      return x;
    });
  },

  includeTruthyElementsExcludeIfEmpty: (arr) => {
    // Exclude if this isn't an array
    if (!arr || !Array.isArray(arr)) {
      return EXCLUDED_PARAM;
    }
    // Filter non-truthy elements
    const onlyTruthy = arr.filter((x) => {
      return x;
    });
    if (onlyTruthy.length === 0) {
      // No truthy elements
      return EXCLUDED_PARAM;
    }
    return onlyTruthy;
  },

  includeIfDate: (date) => {
    if (date && date.toISOString) {
      // This is a date object. Convert to ISO 8601 string
      return date.toISOString();
    }
    // Exclude if no date included
    return date || EXCLUDED_PARAM;
  },

  includeIfNumber: (value) => {
    if (
      !Number.isNaN(value)
      && value !== null
      && value !== undefined
    ) {
      return value;
    }
    return EXCLUDED_PARAM;
  },

  isTruthy: (value) => {
    return !(!value);
  },
};
