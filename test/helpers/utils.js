module.exports = {
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
      description += '> ' + (thisPropMatches ? '\u2713' : '\u00D7') + ' ' + key + ': ' + JSON.stringify(template[key]) + ' [' + (typeof template[key]) + '] ' + (thisPropMatches ? '=' : '≠') + ' ' + JSON.stringify(value[key]) + ' [' + typeof value[key] + ']\n';
    }
    return {
      isMatch,
      description: description.trim(),
    };
  },

  templateFound: (template, list) => {
    for (let i = 0; i < list.length; i++) {
      if (module.exports.checkTemplate(template, list[i]).isMatch) {
        return true;
      }
    }
    return false;
  },

  // Returns stringified list of templates from the given list that dont match
  // any in the list. If none dont match, returns null
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
    let message = '';
    notFound.forEach((n) => {
      message += '\n' + JSON.stringify(n);
    });
    return message;
  },

  wait: (seconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  },
};
