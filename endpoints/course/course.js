module.exports = () => {
  return [

    /**
     * Gets info on a specific course
     * @param {number} courseId - Canvas course Id to get info on
     */
    {
      name: 'getCourse',
      action: 'get info on a specific course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId,
          method: 'GET',
        });
      },
    },
  ];
};
