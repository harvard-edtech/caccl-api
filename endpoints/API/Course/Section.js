/**
 * Functions for interacting with sections within courses
 * @namespace api.course.section
 */

const EndpointCategory = require('../../../classes/EndpointCategory');
const prefix = require('../../common/prefix');
const utils = require('../../common/utils');

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
 * @author Gabe Abrams
 * @method list
 * @memberof api.course.section
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {boolean} [options.includeStudents] - if true, the list of students
 *   from each section are included
 * @return {Section[]} list of Canvas Sections {@link https://canvas.instructure.com/doc/api/sections.html#Section}
 */
Section.list = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/sections`,
    method: 'GET',
    params: {
      include: utils.genIncludesList({
        students: options.includeStudents,
      }),
    },
  });
};
Section.list.action = 'get the list of sections in a course';
Section.list.requiredParams = ['courseId'];
Section.list.scopes = [
  'url:GET|/api/v1/courses/:course_id/sections',
];

/**
 * Gets info on a specific section
 * @author Gabe Abrams
 * @method get
 * @memberof api.course.section
 * @instance
 * @param {object} options - object containing all arguments
 * @param {number} options.courseId - Canvas course Id to query
 * @param {number} options.sectionId - Section Id to retrieve
 * @param {boolean} [options.includeStudents] - if true, the list of students
 *   in the section are included
 * @return {Section} Canvas Section {@link https://canvas.instructure.com/doc/api/sections.html#Section}
 */
Section.get = function (options) {
  return this.visitEndpoint({
    path: `${prefix.v1}/courses/${options.courseId}/sections/${options.sectionId}`,
    method: 'GET',
    params: {
      include: utils.genIncludesList({
        students: options.includeStudents,
      }),
    },
  });
};
Section.get.action = 'get info on a specific section in a course';
Section.get.requiredParams = ['courseId', 'sectionId'];
Section.get.scopes = [
  'url:GET|/api/v1/courses/:course_id/sections/:id',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Section;
