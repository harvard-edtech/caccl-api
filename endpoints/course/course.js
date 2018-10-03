const utils = require('../helpers/utils.js');

module.exports = () => {
  return [

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
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId,
          method: 'GET',
          params: {
            include: utils.includeTruthyElementsExcludeIfEmpty([
              (options.includeSyllabus ? 'syllabus_body' : null),
              (options.includeTerm ? 'term' : null),
              (options.includeAccount ? 'account' : null),
              (options.includeDescription ? 'public_description' : null),
              (options.includeSections ? 'sections' : null),
              (options.includeTeachers ? 'teachers' : null),
              (options.includeCourseImage ? 'course_image' : null),
              (options.includeNeedsGradingCount ? 'needs_grading_count' : null),
            ]),
          },
        });
      },
    },
  ];
};
