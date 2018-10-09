module.exports = [

  /*------------------------------------------------------------------------*/
  /*                                 Quizzes                                */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the quizzes in a course
   * @param {number} courseId - Canvas course Id to query
   * @return list of Quizzes (see: https://canvas.instructure.com/doc/api/quizzes.html#Quiz)
   */
  {
    name: 'listQuizzes',
    action: 'get the list of quizzes in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes',
        method: 'GET',
      });
    },
  },

  /**
   * Get info on a specific quiz in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
   * @return Quiz (see: https://canvas.instructure.com/doc/api/quizzes.html#Quiz)
   */
  {
    name: 'getQuiz',
    action: 'get info on a specific quiz in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes/'
          + cg.options.quizId,
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
   * @return list of QuizSubmissions (see: https://canvas.instructure.com/doc/api/quiz_submissions.html)
   */
  {
    name: 'listQuizSubmissions',
    action: 'get the list of submissions to a specific quiz in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes/'
          + cg.options.quizId + '/submissions',
        method: 'GET',
      });
    },
  },

  /**
   * Gets info on a specific submission to a quiz in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
   * @param {number} submissionId - Canvas quiz submission Id
   * @return QuizSubmission (see: https://canvas.instructure.com/doc/api/quiz_submissions.html)
   */
  {
    name: 'getQuizSubmission',
    action: 'get the list of submissions to a specific quiz in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes/'
          + cg.options.quizId + '/submissions/' + cg.options.submissionId,
        method: 'GET',
      });
    },
  },

];
