module.exports = () => {
  return [

    /**
     * Gets the list of courses associated with the current user
     */
    {
      name: 'listCourses',
      action: 'get the list of courses associated with the current user',
      run: (_, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses',
          method: 'GET',
        });
      },
    },

  ];
};
