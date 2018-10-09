const utils = require('../helpers/utils.js');

module.exports = [

  /**
   * Gets info on a specific course
   * @param {number} courseId - Canvas course Id to get info on
   * @param {boolean} includeSyllabus - If truthy, includes syllabus body
   * @param {boolean} includeTerm - If truthy, includes term
   * @param {boolean} includeAccount - If truthy, includes account Id
   * @param {boolean} includeDescription - If truthy, includes public
   *   description
   * @param {boolean} includeSections - If truthy, includes sections
   * @param {boolean} includeTeachers - If truthy, includes teachers
   * @param {boolean} includeCourseImage - If truthy, includes the course
   *   image
   * @param {boolean} includeNeedsGradingCount - If truthy, includes the
   *   number of students who still need to be graded
   * @return Course (see: https://canvas.instructure.com/doc/api/courses.html#Course)
   */
  {
    name: 'getCourse',
    action: 'get info on a specific course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId,
        method: 'GET',
        params: {
          include: utils.includeTruthyElementsExcludeIfEmpty([
            (cg.options.includeSyllabus ? 'syllabus_body' : null),
            (cg.options.includeTerm ? 'term' : null),
            (cg.options.includeAccount ? 'account' : null),
            (cg.options.includeDescription ? 'public_description' : null),
            (cg.options.includeSections ? 'sections' : null),
            (cg.options.includeTeachers ? 'teachers' : null),
            (cg.options.includeCourseImage ? 'course_image' : null),
            (cg.options.includeNeedsGradingCount
              ? 'needs_grading_count' : null),
          ]),
        },
      });
    },
  },

];
