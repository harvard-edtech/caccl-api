module.exports = [

  /**
   * Gets info on the current user
   */
  {
    name: 'getCurrentUser',
    action: 'get info on the current user',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/users/self/profile',
        method: 'GET',
      });
    },
  },

];
