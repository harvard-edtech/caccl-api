module.exports = () => {
  return [
    /**
     * Gets the list of sections in a course
     * @param {number} courseId - Canvas course Id to query
     * @return list of Sections (see: https://canvas.instructure.com/doc/api/sections.html#Section)
     */
    {
      name: 'listSections',
      action: 'get the list of sections in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/sections',
          method: 'GET',
        });
      },
    },

    /**
     * Gets info on a specific section
     * @param {number} courseId - Canvas course Id to query
     * @param {number} sectionId - Section Id to retrieve
     * @return Section (see: https://canvas.instructure.com/doc/api/sections.html#Section)
     */
    {
      name: 'getSection',
      action: 'get info on a specific section in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/sections/'
            + options.sectionId,
          method: 'GET',
        });
      },
    },

  ];
};
