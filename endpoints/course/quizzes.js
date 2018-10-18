const utils = require('../helpers/utils.js');

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
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + cg.options.quizId,
        method: 'GET',
      });
    },
  },

  /**
   * Updates a specific quiz in a course
   * @param {number} courseId - Canvas course Id to create the quiz in
   * @param {number} quizId - Canvas course Id to create the quiz in
   * @param {boolean} suppressNotification - If true, does not notify users that
   *   the quiz has been updated
   * @param {string} title - Optional. New title of the quiz (default: previous
   *   value)
   * @param {string} description - Optional. New HTML description of the quiz
   *   (default: previous value)
   * @param {string} type - Optional. Quiz type. Allowed values: [
   *   'practice_quiz', 'assignment', 'graded_survey', 'survey'] (default:
   *   previous value)
   * @param {date} dueAt – Optional. Date the quiz is due (default: previous
   *   value)
   * @param {date} lockAt – Optional. Date the quiz is lock (default: previous
   *   value)
   * @param {date} unlockAt – Optional. Date the quiz is unlock (default:
   *   previous value)
   * @param {boolean} published – Optional. If true, quiz is published (default:
   *   previous value)
   * @param {number} allowedAttempts - Optional. Number of times a student is
   *   allowed to take the quiz. Set to -1 or 'infinity' for unlimited attempts
   *   (default: previous value)
   * @param {string} scoringPolicy – Optional. Required and only valid if
   *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
   *   (default: previous value)
   * @param {boolean} oneQuestionAtATime – Optional. If true, shows quiz to
   *   student one question at a time. Must be a boolean (default: previous
   *   value)
   * @param {boolean} cantGoBack – Optional. If true, shows quiz to student one
   *   question at a time. Must be a boolean (default: previous value)
   * @param {string} accessCode – Optional. If defined, restricts access to the
   *   quiz only to those with this access code (default: previous value)
   * @param {string} ipFilter – Optional. If defined, restricts access to the
   *   quiz to computers in a specified IP range. Filters can be a
   *   comma-separated list of addresses, or an address followed by a mask
   *   (default: previous value)
   * @param {number} assignmentGroupId - Optional. The assignment group to put
   *   the quiz into. Only valid if type is "assignment" or "graded_survey"
   *   (default: previous value)
   * @param {number} timeLimitMins - Optional. Time limit for the quiz in
   *   minutes (default: previous value)
   * @param {boolean} shuffleAnswers - If true, quiz answers for multiple choice
   *   questions will be randomized for each student. Must be a boolean
   *   (default: previous value)
   * @param {string} hideResults - Optional. Allowed values: ['always',
   *   'until_after_last_attempt'], determines whether the student can see their
   *   own submission and other results (default: previous value)
   * @param {boolean} hideCorrectAnswers - Optional. Only valid if hideResults
   *   is not defined. If true, hides correct answers from students when results
   *   are viewed. Must be a boolean (default: previous value)
   * @param {boolean} showCorrectAnswersAfterLastAttempt - Optional. Only valid
   *   if hideCorrectAnswers is not true and allowedAttemptes > 1. If true,
   *   hides correct answers from students when quiz results are viewed until
   *   they submit the last attempt for the quiz. Must be a boolean (default:
   *   previous value)
   * @param {date} showCorrectAnswersAt - Optional. Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will only be
   *   visible after this date (default: none)
   * @param {date} hideCorrectAnswersAt - Optional. Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will stop being
   *   visible after this date has passed (default: previous value)
   * @param {boolean} oneTimeResults - Optional. Whether students should be
   *   prevented from viewing their quiz results past the first time (right
   *   after they turn in the quiz) (default: previous value)
   * @param {boolean} onlyVisibleToOverrides - Optional. If true, the quiz is
   *   only visible to students with overrides. Must be a boolean (default:
   *   previous value)
   * @return Quiz (see: https://canvas.instructure.com/doc/api/quizzes.html#Quiz)
   */
  {
    name: 'updateQuiz',
    action: 'update a specific quiz in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + cg.options.quizId,
        method: 'PUT',
        params: {
          'quiz[title]': cg.options.title,
          'quiz[description]': utils.includeIfTruthy(cg.options.description),
          'quiz[quiz_type]': utils.includeIfTruthy(cg.options.type),
          'quiz[assignment_group_id]':
            utils.includeIfNumber(cg.options.assignmentGroupId),
          'quiz[time_limit]':
            utils.includeIfNumber(cg.options.timeLimitMins),
          'quiz[shuffle_answers]':
            utils.includeIfBoolean(cg.options.shuffleAnswers),
          'quiz[hide_results]':
            utils.includeIfTruthy(cg.options.hideResults),
          'quiz[show_correct_answers]':
            !utils.includeIfBoolean(cg.options.hideCorrectAnswers),
          'quiz[show_correct_answers_last_attempt]': utils.includeIfBoolean(
            cg.options.showCorrectAnswersAfterLastAttempt
          ),
          'quiz[show_correct_answers_at]':
            utils.includeIfDate(cg.options.showCorrectAnswersAt),
          'quiz[hide_correct_answers_at]':
            utils.includeIfDate(cg.options.hideCorrectAnswersAt),
          'quiz[allowed_attempts]':
            utils.includeIfNumber(cg.options.allowedAttempts),
          'quiz[scoring_policy]':
            utils.includeIfTruthy(cg.options.scoringPolicy),
          'quiz[one_question_at_a_time]':
            utils.includeIfBoolean(cg.options.oneQuestionAtATime),
          'quiz[cant_go_back]':
            utils.includeIfBoolean(cg.options.cantGoBack),
          'quiz[access_code]':
            utils.includeIfTruthy(cg.options.accessCode),
          'quiz[ip_filter]':
            utils.includeIfTruthy(cg.options.ipFilter),
          'quiz[due_at]':
            utils.includeIfDate(cg.options.dueAt),
          'quiz[lock_at]':
            utils.includeIfDate(cg.options.lockAt),
          'quiz[unlock_at]':
            utils.includeIfDate(cg.options.unlockAt),
          'quiz[published]':
            utils.includeIfBoolean(cg.options.published),
          'quiz[one_time_results]':
            utils.includeIfBoolean(cg.options.oneTimeResults),
          'quiz[only_visible_to_overrides]':
            utils.includeIfBoolean(cg.options.onlyVisibleToOverrides),
          'quiz[notify_of_update]':
            !utils.isTruthy(cg.options.suppressNotification),
        },
      }).then((response) => {
        const uncachePaths = [
          // Uncache list of quizzes
          '/api/v1/courses/' + cg.options.courseId + '/quizzes',
          // Uncache quiz
          '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + cg.options.quizId + '*',
        ];
        if (response.assignment_id) {
          // Uncache list of assignments
          uncachePaths.push('/api/v1/courses/' + cg.options.courseId + '/assignments');
          // Uncache assignment (quiz is also an assignment)
          uncachePaths.push('/api/v1/courses/' + cg.options.courseId + '/assignments/' + response.assignment_id + '*');
        }
        return cg.uncache(uncachePaths, response);
      });
    },
  },

  /**
   * Creates a new quiz in a course
   * @param {number} courseId - Canvas course Id to create the quiz in
   * @param {string} title - Title of the new quiz
   * @param {string} description - Optional. HTML description of the quiz
   *   (default: '')
   * @param {string} type - Optional. Quiz type. Allowed values: [
   *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
   * @param {date} dueAt – Optional. Date the quiz is due (default: no due date)
   * @param {date} lockAt – Optional. Date the quiz is lock (default: no lock
   *   date)
   * @param {date} unlockAt – Optional. Date the quiz is unlock (default: no
   *   unlock date)
   * @param {boolean} published – Optional. If true, quiz is published (default:
   *   false)
   * @param {number} allowedAttempts - Optional. Number of times a student is
   *   allowed to take the quiz. Set to -1 or 'infinity' for unlimited attempts
   *   (default: 1)
   * @param {string} scoringPolicy – Optional. Required and only valid if
   *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
   *   (default: 'keep_highest')
   * @param {boolean} oneQuestionAtATime – Optional. If true, shows quiz to
   *   student one question at a time (default: false)
   * @param {boolean} cantGoBack – Optional. If true, shows quiz to student one
   *   question at a time (default: false)
   * @param {string} accessCode – Optional. If defined, restricts access to the
   *   quiz only to those with this access code (default: none)
   * @param {string} ipFilter – Optional. If defined, restricts access to the
   *   quiz to computers in a specified IP range. Filters can be a
   *   comma-separated list of addresses, or an address followed by a mask
   *   (default: none)
   * @param {number} assignmentGroupId - Optional. The assignment group to put
   *   the quiz into. Only valid if type is "assignment" or "graded_survey"
   *   (default: top assignment group in the course)
   * @param {number} timeLimitMins - Optional. Time limit for the quiz in
   *   minutes (default: no time limit)
   * @param {boolean} shuffleAnswers - If true, quiz answers for multiple choice
   *   questions will be randomized for each student (default: false)
   * @param {string} hideResults - Optional. Allowed values: ['always',
   *   'until_after_last_attempt'], determines whether the student can see their
   *   own submission and other results (default: results not hidden)
   * @param {boolean} hideCorrectAnswers - Optional. Only valid if hideResults
   *   is not defined. If true, hides correct answers from students when results
   *   are viewed (default: false)
   * @param {boolean} showCorrectAnswersAfterLastAttempt - Optional. Only valid
   *   if hideCorrectAnswers is not true and allowedAttemptes > 1. If true,
   *   hides correct answers from students when quiz results are viewed until
   *   they submit the last attempt for the quiz (default: false)
   * @param {date} showCorrectAnswersAt - Optional. Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will only be
   *   visible after this date (default: none)
   * @param {date} hideCorrectAnswersAt - Optional. Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will stop being
   *   visible after this date has passed (default: none)
   * @param {boolean} oneTimeResults - Optional. Whether students should be
   *   prevented from viewing their quiz results past the first time (right
   *   after they turn in the quiz) (default: false)
   * @param {boolean} onlyVisibleToOverrides - Optional. If true, the quiz is
   *   only visible to students with overrides (default: false)
   * @return Quiz (see: https://canvas.instructure.com/doc/api/quizzes.html#Quiz)
   */
  {
    name: 'createQuiz',
    action: 'create a new quiz in a specific course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes',
        method: 'POST',
        params: {
          'quiz[title]': cg.options.title,
          'quiz[description]': utils.includeIfTruthy(cg.options.description),
          'quiz[quiz_type]': utils.includeIfTruthy(cg.options.type),
          'quiz[assignment_group_id]':
            utils.includeIfNumber(cg.options.assignmentGroupId),
          'quiz[time_limit]':
            utils.includeIfNumber(cg.options.timeLimitMins),
          'quiz[shuffle_answers]':
            utils.isTruthy(cg.options.shuffleAnswers),
          'quiz[hide_results]':
            utils.includeIfTruthy(cg.options.hideResults),
          'quiz[show_correct_answers]':
            !utils.isTruthy(cg.options.hideCorrectAnswers),
          'quiz[show_correct_answers_last_attempt]':
            utils.isTruthy(cg.options.showCorrectAnswersAfterLastAttempt),
          'quiz[show_correct_answers_at]':
            utils.includeIfDate(cg.options.showCorrectAnswersAt),
          'quiz[hide_correct_answers_at]':
            utils.includeIfDate(cg.options.hideCorrectAnswersAt),
          'quiz[allowed_attempts]':
            utils.includeIfNumber(cg.options.allowedAttempts),
          'quiz[scoring_policy]':
            utils.includeIfTruthy(cg.options.scoringPolicy),
          'quiz[one_question_at_a_time]':
            utils.isTruthy(cg.options.oneQuestionAtATime),
          'quiz[cant_go_back]':
            utils.isTruthy(cg.options.cantGoBack),
          'quiz[access_code]':
            utils.includeIfTruthy(cg.options.accessCode),
          'quiz[ip_filter]':
            utils.includeIfTruthy(cg.options.ipFilter),
          'quiz[due_at]':
            utils.includeIfDate(cg.options.dueAt),
          'quiz[lock_at]':
            utils.includeIfDate(cg.options.lockAt),
          'quiz[unlock_at]':
            utils.includeIfDate(cg.options.unlockAt),
          'quiz[published]':
            utils.isTruthy(cg.options.published),
          'quiz[one_time_results]':
            utils.isTruthy(cg.options.oneTimeResults),
          'quiz[only_visible_to_overrides]':
            utils.isTruthy(cg.options.onlyVisibleToOverrides),
        },
      }).then((response) => {
        const uncachePaths = [
          // Uncache list of quizzes
          '/api/v1/courses/' + cg.options.courseId + '/quizzes',
          // Uncache quiz
          '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + response.id + '*',
        ];
        if (response.assignment_id) {
          // Uncache list of assignments
          uncachePaths.push('/api/v1/courses/' + cg.options.courseId + '/assignments');
          // Uncache assignment (quiz is also an assignment)
          uncachePaths.push('/api/v1/courses/' + cg.options.courseId + '/assignments/' + response.assignment_id + '*');
        }
        return cg.uncache(uncachePaths, response);
      });
    },
  },

  /**
   * Deletes a quiz from a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
   * @return Quiz (see: https://canvas.instructure.com/doc/api/quizzes.html#Quiz)
   */
  {
    name: 'deleteQuiz',
    action: 'delete a specific quiz from a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + cg.options.quizId,
        method: 'DELETE',
      }).then((response) => {
        const uncachePaths = [
          // Uncache list of quizzes
          '/api/v1/courses/' + cg.options.courseId + '/quizzes',
          // Uncache quiz
          '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + response.id + '*',
        ];
        if (response.assignment_id) {
          // Uncache list of assignments
          uncachePaths.push('/api/v1/courses/' + cg.options.courseId + '/assignments');
          // Uncache assignment (quiz is also an assignment)
          uncachePaths.push('/api/v1/courses/' + cg.options.courseId + '/assignments/' + response.assignment_id + '*');
        }
        return cg.uncache(uncachePaths, response);
      });
    },
  },

  /*------------------------------------------------------------------------*/
  /*                             Quiz Questions                             */
  /*------------------------------------------------------------------------*/

  /**
   * Lists quiz questions
   * @param {number} courseId - Canvas course Id to query
   * @param {number} quizId - Canvas quiz Id to query
   * @return Quiz (see: https://canvas.instructure.com/doc/api/quizzes.html#Quiz)
   */
  { // TODO: implement
    name: 'deleteQuiz',
    action: 'delete a specific quiz from a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + cg.options.quizId,
        method: 'DELETE',
      }).then((response) => {
        const uncachePaths = [
          // Uncache list of quizzes
          '/api/v1/courses/' + cg.options.courseId + '/quizzes',
          // Uncache quiz
          '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + response.id + '*',
        ];
        if (response.assignment_id) {
          // Uncache list of assignments
          uncachePaths.push('/api/v1/courses/' + cg.options.courseId + '/assignments');
          // Uncache assignment (quiz is also an assignment)
          uncachePaths.push('/api/v1/courses/' + cg.options.courseId + '/assignments/' + response.assignment_id + '*');
        }
        return cg.uncache(uncachePaths, response);
      });
    },
  },

  /*------------------------------------------------------------------------*/
  /*                             Quiz Questions                             */
  /*------------------------------------------------------------------------*/

  /**
   * Creates a new multiple choice question to a quiz in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
   * @param {string} name - Name of the question
   * @param {string} text - The text of the question, as displayed to the quiz
   * @param {number} position - Optional. Position of the question with respect
   *   to the other questions in the quiz (default: last)
   * @param {number} pointsPossible - Maximum number of points
   * @param {string} correctComment - Optional. Comment to display if the
   *   student answers correctly (default: none)
   * @param {string} incorrectComment - Optional. Comment to display if the
   *   student answers incorrectly (default: none)
   * @param {string} neutralComment - Optional. Comment to display regardless of
   *   how the student answers (default: none)
   * @param {array} answers - Array of answers: [{ text, correct, comment }]
   * @return QuizQuestion (see: https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion)
   */
  {
    name: 'createMultipleChoiceQuizQuestion',
    action: 'create a new multiple choice question to a quiz in a course',
    run: (cg) => {
      const params = {
        'question[question_name]': cg.options.name,
        'question[question_text]': cg.options.text,
        'question[question_type]': 'multiple_choice_question',
        'question[position]': utils.includeIfNumber(cg.options.position),
        'question[points_possible]': cg.options.pointsPossible,
        'question[correct_comments]':
          utils.includeIfTruthy(cg.options.correctComment),
        'question[incorrect_comments]':
          utils.includeIfTruthy(cg.options.incorrectComment),
        'question[neutralComment]':
          utils.includeIfTruthy(cg.options.neutralComment),
        'question[text_after_answers]':
          utils.includeIfTruthy(cg.options.textAfterAnswers),
      };
      // Add answers
      cg.options.answers.forEach((answer, i) => {
        const prefix = 'question[answers][' + i + ']';
        params[prefix + '[answer_precision]'] = 10;
        params[prefix + '[answer_weight]'] = (answer.correct ? 100 : 0);
        params[prefix + '[numerical_answer_type]'] = 'exact_answer';
        params[prefix + '[answer_text]'] = answer.text;
        params[prefix + '[answer_comment]'] = answer.comment;
      });
      return cg.visitEndpoint({
        params,
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + cg.options.quizId + '/questions',
        method: 'POST',
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
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + cg.options.quizId + '/submissions',
        method: 'GET',
      }).then((response) => {
        return Promise.resolve(response.quiz_submissions);
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
        path: '/api/v1/courses/' + cg.options.courseId + '/quizzes/' + cg.options.quizId + '/submissions/' + cg.options.submissionId,
        method: 'GET',
      });
    },
  },

];
