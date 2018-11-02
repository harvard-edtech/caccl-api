/*
  NOTE: a "template" is an incomplete object with defining traits of an object
  that we use to make sure an object "matches" in a more flexible way. We only
  compare the properties/values that are defined in the template.

  See this example:

    Comparing assignments:
    template = { name: 'Test Assignment', points_possible = 10 }
    assignmentObject = {
      id: 57832,
      name: 'Test Assignment',
      points_possible: 10,
      created_at: '2018-10-30T18:05:43.811Z',
      updated_at: '2018-10-30T18:05:43.811Z',
      ...
    }

    Since we can't precisely predict created_at, updated_at, id, and other
    properties, we only want to check the properties defined in the template.

    For instance:
    utils.checkTemplate(template, assignmentObject) compares name and
    points_possible only.
*/

module.exports = {
  /**
   * Checks whether a template matches a value (good for checking if a template
   *   matches a specific value)
   * @author Gabriel Abrams
   * @memberof module: endpoints/common/utils
   * @param {object} template - object template (see docs in
   *   /endpoints/common/utils)
   * @param {object} value - the object to compare to the template
   * @return {object} { isMatch, description } where isMatch is true if the
   *   template matches the value and description is a string description of
   *   why the template didn't match (if isMatch is false)
   */
  checkTemplate: (template, value) => {
    if (!value) {
      return {
        isMatch: false,
        description: 'Value is null',
      };
    }
    const templateKeys = Object.keys(template);
    let description = 'Comparison (expected, actual):\n';
    let isMatch = true;
    for (let j = 0; j < templateKeys.length; j++) {
      const key = templateKeys[j];
      const thisPropMatches = (
        JSON.stringify(template[key])
        === JSON.stringify(value[key])
      );
      if (!thisPropMatches) {
        // Assignment doesn't match
        isMatch = false;
      }
      const mark = (thisPropMatches ? '\u2713' : '\u00D7'); // check or x
      description += `> ${mark} ${key}: ${JSON.stringify(template[key])} [${typeof template[key]}] ${thisPropMatches ? '=' : '≠'} ${JSON.stringify(value[key])} [${typeof value[key]}]\n`;
    }
    return {
      isMatch,
      description: description.trim(),
    };
  },

  /**
   * Checks if a template matches any values in the list (good for checking if
   *   a template is found in a list)
   * @author Gabriel Abrams
   * @memberof module: endpoints/common/utils
   * @param {object} template - object template (see docs in
   *   /endpoints/common/utils)
   * @param {array} list - the list of objects to compare to the template
   * @return {boolean} true if the template matched at least one value in the
   *   list
   */
  templateFound: (template, list) => {
    for (let i = 0; i < list.length; i++) {
      if (module.exports.checkTemplate(template, list[i]).isMatch) {
        return true;
      }
    }
    return false;
  },

  /**
   * Generates a string explaining which templates could not be found in the
   *   list (good for checking if multiple templates exist in a list)
   * @author Gabriel Abrams
   * @memberof module: endpoints/common/utils
   * @param {object} templates - object templates (see docs in
   *   /endpoints/common/utils)
   * @param {object} list - the list of objects to compare to the template
   * @return {string|null} null if all templates found in the list, string
   *   describing the templates that were missing from the list if at least one
   *   template could not be found
   */
  missingTemplatesToString: (templates, list) => {
    const notFound = [];
    for (let i = 0; i < templates.length; i++) {
      if (!module.exports.templateFound(templates[i], list)) {
        notFound.push(templates[i]);
      }
    }
    if (notFound.length === 0) {
      return null;
    }
    // List what we couldn't find
    let message = '';
    notFound.forEach((n) => {
      message += `\n${JSON.stringify(n)}`;
    });
    // Print the list we're searching through
    message += '\n\nWe were searching through this list:';
    list.forEach((item) => {
      message += `\n${JSON.stringify(item)}`;
    });
    return message;
  },

  /**
   * Waits a given number of seconds
   * @author Gabriel Abrams
   * @memberof module: endpoints/common/utils
   * @param {float} seconds - the number of seconds to wait
   * @return {Promise} promise that resolves when the wait is complete
   */
  wait: (seconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  },
};
