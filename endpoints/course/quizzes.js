module.exports = () => {
  return [

    /*------------------------------------------------------------------------*/
    /*                                 Quizzes                                */
    /*------------------------------------------------------------------------*/

    /**
     * Lists the quizzes in a course
     * @param {number} courseId - Canvas course Id to query
     */
    {
      name: 'listQuizzes',
      action: 'get the list of quizzes in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/quizzes',
          method: 'GET',
        });
      },
    },

    /**
     * Get info on a specific quiz in a course
     * @param {number} courseId - Canvas course Id to query
     * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
     */
    {
      name: 'getQuiz',
      action: 'get info on a specific quiz in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/quizzes/'
            + options.quizId,
          method: 'GET',
        });
      },
    },

    /*------------------------------------------------------------------------*/
    /*                            Quiz Submissions                            */
    /*------------------------------------------------------------------------*/

    /**
     * Lists the submissions to a quiz in a course
     * @param {number} courseId - Canvas course Id to query
     * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
     */
    {
      name: 'listQuizSubmissions',
      action: 'get the list of submissions to a specific quiz in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/quizzes/'
            + options.quizId + '/submissions',
          method: 'GET',
        });
      },
    },

    /**
     * Gets info on a specific submission to a quiz in a course
     * @param {number} courseId - Canvas course Id to query
     * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
     * @param {number} submissionId - Canvas quiz submission Id
     */
    {
      name: 'getQuizSubmission',
      action: 'get the list of submissions to a specific quiz in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/quizzes/'
            + options.quizId + '/submissions/' + options.submissionId,
          method: 'GET',
        });
      },
    },
  ];
};
