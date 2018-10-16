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
};
