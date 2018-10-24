/**
 * Course endpoints module
 * @module endpoints/course/course
 * @see module: endpoints/course/course
 */
const utils = require('../common/utils.js');
const prefix = require('../common/prefix.js');

module.exports = [

  /**
   * Gets info on a specific course
   * @param {number} courseId - Canvas course Id to get info on
   * @param {boolean} [includeSyllabus=false] - If truthy, includes syllabus
   *   body
   * @param {boolean} [includeTerm=false] - If truthy, includes term
   * @param {boolean} [includeAccount=false] - If truthy, includes account Id
   * @param {boolean} [includeDescription=false] - If truthy, includes public
   *   description
   * @param {boolean} [includeSections=false] - If truthy, includes sections
   * @param {boolean} [includeTeachers=false] - If truthy, includes teachers
   * @param {boolean} [includeCourseImage=false] - If truthy, includes the
   *   course image
   * @param {boolean} [includeNeedsGradingCount=false] - If truthy, includes the
   *   number of students who still need to be graded
   * @return {Promise.<Object>} Canvas course {@link https://canvas.instructure.com/doc/api/courses.html#Course}
   */
  {
    name: 'getCourse',
    action: 'get info on a specific course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}`,
        method: 'GET',
        params: {
          include: utils.includeTruthyElementsExcludeIfEmpty([
            (config.options.includeSyllabus ? 'syllabus_body' : null),
            (config.options.includeTerm ? 'term' : null),
            (config.options.includeAccount ? 'account' : null),
            (config.options.includeDescription ? 'public_description' : null),
            (config.options.includeSections ? 'sections' : null),
            (config.options.includeTeachers ? 'teachers' : null),
            (config.options.includeCourseImage ? 'course_image' : null),
            (config.options.includeNeedsGradingCount
              ? 'needs_grading_count' : null),
          ]),
        },
      });
    },
  },

];
