module.exports = () => {
  return [

    /**
     * Gets info on the current user
     */
    {
      name: 'getCurrentUser',
      action: 'get info on the current user',
      run: (_, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/users/self/profile',
          method: 'GET',
        });
      },
    },

  ];
};
