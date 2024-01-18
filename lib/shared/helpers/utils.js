"use strict";
/**
 * Useful utilities for use in defining endpoints
 * @author Gabe Abrams
 */
Object.defineProperty(exports, "__esModule", { value: true });
var utils = {
    /**
     * Returns the value if it's truthy, otherwise returns a special value that
     *   indicates to the request pre-processor that the associated parameter
     *   should be excluded
     * @author Gabe Abrams
     * @param [value] - The value to include if truthy
     * @returns the value to send to visitEndpoint
     */
    includeIfTruthy: function (value) {
        return (value || undefined);
    },
    /**
     * Given a mapping: includeText => includeThis, creates a list of include
     *   strings to send to Canvas
     * @author Gabe Abrams
     * @param map a mapping: includeText =>
     *   includeThis where includeText is the string to include in the list and
     *   includeThis is a value to check (if truthy, includeText is included)
     * @returns list of strings that were marked to be included
     */
    genIncludesList: function (map) {
        if (!map) {
            return undefined;
        }
        var include = [];
        Object.keys(map).forEach(function (includeText) {
            var includeThis = map[includeText];
            if (includeThis) {
                include.push(includeText);
            }
        });
        if (include.length) {
            // At least one option to include. Return a list
            return include;
        }
        // No options to include. Just exclude the whole parameter
        return undefined;
    },
    /**
     * Returns the value if it's a boolean, otherwise returns a special value that
     *   indicates to the request pre-processor that the associated parameter
     *   should be excluded
     * @author Gabe Abrams
     * @param [value] The value to include if it's a boolean
     * @returns the value to send to visitEndpoint
     */
    includeIfBoolean: function (value) {
        if (value === true || value === false) {
            return value;
        }
        return undefined;
    },
    /**
     * Returns true if defined and truthy, false if defined and falsy,
     *   and excludes the param if undefined
     * @author Gabe Abrams
     * @param [value] the value to evaluate
     * @returns the value to send to visitEndpoint
     */
    convertToBooleanIfDefined: function (value) {
        if (value !== undefined) {
            return !!value;
        }
        return undefined;
    },
    /**
     * Returns a new list that only includes truthy elements of the array, if
     *   array has no truthy elements, an empty array is returned, if no
     *   array is included, returns a special value that indicates to the request
     *   pre-processor that the associated parameter should be excluded
     * @author Gabe Abrams
     * @param [arr] The value to include if truthy
     * @returns the value to send to visitEndpoint
     */
    includeTruthyElements: function (arr) {
        // Exclude if this isn't an array
        if (!arr || !Array.isArray(arr)) {
            return undefined;
        }
        // Filter non-truthy elements
        return arr.filter(function (x) {
            return x;
        });
    },
    /**
     * Returns a new list that only includes truthy elements of the array, if
     *   array has no truthy elements or if no array is included, returns a
     *   special value that indicates to the request pre-processor that the
     *   associated parameter should be excluded
     * @author Gabe Abrams
     * @param [arr] The array to filter
     * @returns the value to send to visitEndpoint
     */
    includeTruthyElementsExcludeIfEmpty: function (arr) {
        // Exclude if this isn't an array
        if (!arr || !Array.isArray(arr)) {
            return undefined;
        }
        // Filter non-truthy elements
        var onlyTruthy = arr.filter(function (x) {
            return x;
        });
        if (onlyTruthy.length === 0) {
            // No truthy elements
            return undefined;
        }
        return onlyTruthy;
    },
    /**
     * Returns the ISO 8601 string for the given date if it is truthy, otherwise
     *   returns a special value that indicates to the request pre-processor
     *   that the associated parameter should be excluded
     * @author Gabe Abrams
     * @param [date] The string (ISO 8601 format) or javascript
     *   date object to include if it's truthy
     * @return the value to send to visitEndpoint
     */
    includeIfDate: function (date) {
        if (date && date instanceof Date) {
            // This is a date object. Convert to ISO 8601 string
            return date.toISOString();
        }
        // Exclude if no date included
        return (date
            ? String(date)
            : undefined);
    },
    /**
     * Returns the value if it's a number, otherwise returns a special value that
     *   indicates to the request pre-processor that the associated parameter
     *   should be excluded
     * @author Gabe Abrams
     * @param [value] The value to include if it's a number
     * @returns the value to send to visitEndpoint
     */
    includeIfNumber: function (value) {
        if (value !== null
            && value !== undefined
            && !Number.isNaN(value)) {
            return Number.parseFloat(value);
        }
        return undefined;
    },
    /**
     * Returns true if the value is truthy, otherwise returns false
     * @author Gabe Abrams
     * @param [value] - The value to check
     * @returns the value to send to visitEndpoint
     */
    isTruthy: function (value) {
        return !!value;
    },
    /**
     * Returns an array of ids. If the first element in the list has an id
     *   property (arr[0].id is defined), extracts each array element's id
     *   property, otherwise, just returns the array. If the array is not falsy,
     *   an empty array is returned
     * @author Gabe Abrams
     * @param arr The array of ids or objects containing ids
     * @returns array of ids
     */
    extractIdsIfApplicable: function (arr) {
        return arr.map(function (item) {
            return Number.parseInt((item.id)
                ? item.id
                : item);
        });
    },
    /**
     * Returns 's' if num is not 1, otherwise returns ''. May be used to pluralize
     *   descriptions:
     *   `Only ${students.length} student${sIfPlural(students.length)} submitted`
     * @author Gabe Abrams
     * @param [num] The number to check
     * @returns the pluralization 's' or an empty string
     */
    sIfPlural: function (num) {
        return (num === 1 ? '' : 's');
    },
};
exports.default = utils;
//# sourceMappingURL=utils.js.map