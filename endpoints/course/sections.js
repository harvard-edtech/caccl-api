/**
 * Sections endpoints module
 * @module endpoints/course/sections
 * @see module: endpoints/course/sections
 */

const prefix = require('../common/prefix.js');

module.exports = [
  /**
   * Gets the list of sections in a course
   * @param {number} courseId - Canvas course Id to query
   * @return {Promise.<Object[]>} list of Canvas Sections {@link https://canvas.instructure.com/doc/api/sections.html#Section}
   */
  {
    name: 'listSections',
    action: 'get the list of sections in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/sections`,
        method: 'GET',
      });
    },
  },

  /**
   * Gets info on a specific section
   * @param {number} courseId - Canvas course Id to query
   * @param {number} sectionId - Section Id to retrieve
   * @return {Promise.<Object>} Canvas Section {@link https://canvas.instructure.com/doc/api/sections.html#Section}
   */
  {
    name: 'getSection',
    action: 'get info on a specific section in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/sections/${config.options.sectionId}`,
        method: 'GET',
      });
    },
  },

];
