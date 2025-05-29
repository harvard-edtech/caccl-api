/**
 * Useful utilities for use in defining endpoints
 * @author Gabe Abrams
 */

const utils = {

  /**
   * Returns the value if it's truthy, otherwise returns a special value that
   *   indicates to the request pre-processor that the associated parameter
   *   should be excluded
   * @author Gabe Abrams
   * @param [value] - The value to include if truthy
   * @returns the value to send to visitEndpoint
   */
  includeIfTruthy: (value: any): any => {
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
  genIncludesList: (
    map: { [k: string]: boolean },
  ): (string[] | undefined) => {
    if (!map) {
      return undefined;
    }
    const include: string[] = [];
    Object.keys(map).forEach((includeText) => {
      const includeThis = map[includeText];
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
  includeIfBoolean: (value: any): (boolean | undefined) => {
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
  convertToBooleanIfDefined: (value: any): (boolean | undefined) => {
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
  includeTruthyElements: (arr: any[]): (any[] | undefined) => {
    // Exclude if this isn't an array
    if (!arr || !Array.isArray(arr)) {
      return undefined;
    }
    // Filter non-truthy elements
    return arr.filter((x) => {
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
  includeTruthyElementsExcludeIfEmpty: (arr: any[]): (any[] | undefined) => {
    // Exclude if this isn't an array
    if (!arr || !Array.isArray(arr)) {
      return undefined;
    }
    // Filter non-truthy elements
    const onlyTruthy = arr.filter((x) => {
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
  includeIfDate: (date: (Date | string)): (string | undefined) => {
    if (date && date instanceof Date) {
      // This is a date object. Convert to ISO 8601 string
      return date.toISOString();
    }
    // Exclude if no date included
    return (
      date
        ? String(date)
        : undefined
    );
  },

  /**
   * Returns the value if it's a number, otherwise returns a special value that
   *   indicates to the request pre-processor that the associated parameter
   *   should be excluded
   * @author Gabe Abrams
   * @param [value] The value to include if it's a number
   * @returns the value to send to visitEndpoint
   */
  includeIfNumber: (value: any): number => {
    if (
      value !== null
      && value !== undefined
      && !Number.isNaN(value)
    ) {
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
  isTruthy: (value: any): boolean => {
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
  extractIdsIfApplicable: (
    arr: ({ id: number } | number)[],
  ): number[] => {
    return arr.map((item) => {
      return Number.parseInt(
        ((item as any).id)
          ? (item as any).id
          : item,
        10,
      );
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
  sIfPlural: (num: number): string => {
    return (num === 1 ? '' : 's');
  },
};

export default utils;
