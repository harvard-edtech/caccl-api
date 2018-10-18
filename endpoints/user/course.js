module.exports = [

  /**
   * Gets the list of courses associated with the current user
   */
  {
    name: 'listCourses',
    action: 'get the list of courses associated with the current user',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses',
        method: 'GET',
      });
    },
  },

];
