const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');

class Section extends EndpointCategory {
  constructor(config) {
    super(config, Section);
  }
}

/*------------------------------------------------------------------------*/
/*                            Section Endpoints                           */
/*------------------------------------------------------------------------*/

/**
 * Gets the list of sections in a course
 * @author Gabriel Abrams
 * @method list
 * @param {number} courseId - Canvas course Id to query
 * @return {Promise.<Object[]>} list of Canvas Sections {@link https://canvas.instructure.com/doc/api/sections.html#Section}
 */
Section.list = (config) => {
  // @action: get the list of sections in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/sections`,
    method: 'GET',
  });
};

/**
 * Gets info on a specific section
 * @author Gabriel Abrams
 * @method get
 * @param {number} courseId - Canvas course Id to query
 * @param {number} sectionId - Section Id to retrieve
 * @return {Promise.<Object>} Canvas Section {@link https://canvas.instructure.com/doc/api/sections.html#Section}
 */
Section.get = (config) => {
  // @action: get info on a specific section in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/sections/${config.options.sectionId}`,
    method: 'GET',
  });
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Section;
