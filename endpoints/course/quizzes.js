/**
 * Quiz endpoints module
 * @module endpoints/course/quizzes
 * @see module: endpoints/course/quizzes
 */
const utils = require('../common/utils.js');
const prefix = require('../common/prefix.js');

module.exports = [

  /*------------------------------------------------------------------------*/
  /*                                 Quizzes                                */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the quizzes in a course
   * @param {number} courseId - Canvas course Id to query
   * @return {Promise.<Object[]>} list of Canvas Quizzes {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  {
    name: 'listQuizzes',
    action: 'get the list of quizzes in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes`,
        method: 'GET',
      });
    },
  },

  /**
   * Get info on a specific quiz in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
   * @return {Promise.<Object>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  {
    name: 'getQuiz',
    action: 'get info on a specific quiz in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}`,
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
   * @param {string} [title=current value] - New title of the quiz
   * @param {string} [description=current value] - New HTML description of the
   *   quiz
   * @param {string} [type=current value] - Quiz type. Allowed values: [
   *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
   * @param {date} [dueAt=current value] – Date the quiz is due
   * @param {date} [lockAt=current value] – Date the quiz is lock
   * @param {date} [unlockAt=current value] – Date the quiz is unlock
   * @param {boolean} [published=current value] – If true, quiz is published
   * @param {number} [allowedAttempts=current value] - Number of times a student
   *   is allowed to take the quiz. Set to -1 for unlimited
   *   attempts
   * @param {string} [scoringPolicy=current value] – Only valid if
   *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
   * @param {boolean} [oneQuestionAtATime=current value] – If true, shows quiz
   *   to student one question at a time. Must be a boolean
   * @param {boolean} [cantGoBack=current value] – If true, shows quiz to
   *   student one question at a time. Must be a boolean
   * @param {string} [accessCode=current value] – If defined, restricts access
   *   to the quiz only to those with this access code
   * @param {string} [ipFilter=current value] – If defined, restricts access to
   *   the quiz to computers in a specified IP range. Filters can be a
   *   comma-separated list of addresses, or an address followed by a mask
   * @param {number} [assignmentGroupId=current value] - The assignment group to
   *   put the quiz into. Only valid if type is "assignment" or "graded_survey"
   * @param {number} [timeLimitMins=current value] - Time limit for the quiz in
   *   minutes
   * @param {boolean} [shuffleAnswers=current value] - If true, quiz answers for
   *   multiple choice questions will be randomized for each student. Must be a
   *   boolean
   * @param {string} [hideResults=current value] - Allowed values: ['always',
   *   'until_after_last_attempt'], determines whether the student can see their
   *   own submission and other results
   * @param {boolean} [hideCorrectAnswers=current value] - Only valid if
   *   hideResults is not defined. If true, hides correct answers from students
   *   when results are viewed. Must be a boolean
   * @param {boolean} [showCorrectAnswersAfterLastAttempt=current value] - Only
   *   valid if hideCorrectAnswers is not true and allowedAttemptes > 1. If
   *   true, hides correct answers from students when quiz results are viewed
   *   until they submit the last attempt for the quiz. Must be a boolean
   * @param {date} [showCorrectAnswersAt=current value] - Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will only be
   *   visible after this date
   * @param {date} [hideCorrectAnswersAt=current value] - Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will stop being
   *   visible after this date has passed
   * @param {boolean} [oneTimeResults=current value] - Whether students should
   *   be prevented from viewing their quiz results past the first time (right
   *   after they turn in the quiz)
   * @param {boolean} [onlyVisibleToOverrides=current value] - If true, the quiz
   *   is only visible to students with overrides. Must be a boolean
   * @return {Promise.<Object>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  {
    name: 'updateQuiz',
    action: 'update a specific quiz in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}`,
        method: 'PUT',
        params: {
          'quiz[title]': config.options.title,
          'quiz[description]': utils.includeIfTruthy(config.options.description),
          'quiz[quiz_type]': utils.includeIfTruthy(config.options.type),
          'quiz[assignment_group_id]':
            utils.includeIfNumber(config.options.assignmentGroupId),
          'quiz[time_limit]':
            utils.includeIfNumber(config.options.timeLimitMins),
          'quiz[shuffle_answers]':
            utils.includeIfBoolean(config.options.shuffleAnswers),
          'quiz[hide_results]':
            utils.includeIfTruthy(config.options.hideResults),
          'quiz[show_correct_answers]':
            !utils.includeIfBoolean(config.options.hideCorrectAnswers),
          'quiz[show_correct_answers_last_attempt]': utils.includeIfBoolean(
            config.options.showCorrectAnswersAfterLastAttempt
          ),
          'quiz[show_correct_answers_at]':
            utils.includeIfDate(config.options.showCorrectAnswersAt),
          'quiz[hide_correct_answers_at]':
            utils.includeIfDate(config.options.hideCorrectAnswersAt),
          'quiz[allowed_attempts]':
            utils.includeIfNumber(config.options.allowedAttempts),
          'quiz[scoring_policy]':
            utils.includeIfTruthy(config.options.scoringPolicy),
          'quiz[one_question_at_a_time]':
            utils.includeIfBoolean(config.options.oneQuestionAtATime),
          'quiz[cant_go_back]':
            utils.includeIfBoolean(config.options.cantGoBack),
          'quiz[access_code]':
            utils.includeIfTruthy(config.options.accessCode),
          'quiz[ip_filter]':
            utils.includeIfTruthy(config.options.ipFilter),
          'quiz[due_at]':
            utils.includeIfDate(config.options.dueAt),
          'quiz[lock_at]':
            utils.includeIfDate(config.options.lockAt),
          'quiz[unlock_at]':
            utils.includeIfDate(config.options.unlockAt),
          'quiz[published]':
            utils.includeIfBoolean(config.options.published),
          'quiz[one_time_results]':
            utils.includeIfBoolean(config.options.oneTimeResults),
          'quiz[only_visible_to_overrides]':
            utils.includeIfBoolean(config.options.onlyVisibleToOverrides),
          'quiz[notify_of_update]':
            !utils.isTruthy(config.options.suppressNotification),
        },
      }).then((response) => {
        const uncachePaths = [
          // Uncache list of quizzes
          `${prefix.v1}/courses/${config.options.courseId}/quizzes`,
          // Uncache quiz
          `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}*`,
        ];
        if (response.assignment_id) {
          // Uncache list of assignments
          uncachePaths.push(`${prefix.v1}/courses/${config.options.courseId}/assignments`);
          // Uncache assignment (quiz is also an assignment)
          uncachePaths.push(`${prefix.v1}/courses/${config.options.courseId}/assignments/${response.assignment_id}*`);
        }
        return config.uncache(uncachePaths, response);
      });
    },
  },

  /**
   * Creates a new quiz in a course
   * @param {number} courseId - Canvas course Id to create the quiz in
   * @param {string} title - Title of the new quiz
   * @param {string} [description=null] - HTML description of the quiz
   * @param {string} [type=null] - Quiz type. Allowed values: [
   *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
   * @param {date} [dueAt=null] – Date the quiz is due
   * @param {date} [lockAt=null] – Date the quiz is lock
   * @param {date} [unlockAt=null] – Date the quiz is unlock
   * @param {boolean} [published=false] – If true, quiz is published
   * @param {number} [allowedAttempts=1] - Number of times a student is
   *   allowed to take the quiz. Set to -1 for unlimited attempts
   * @param {string} [scoringPolicy=keep_highest] – Only valid if
   *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
   * @param {boolean} [oneQuestionAtATime=false] – If true, shows quiz to
   *   student one question at a time
   * @param {boolean} [cantGoBack=false] – If true, shows quiz to student one
   *   question at a time
   * @param {string} [accessCode=false] – If defined, restricts access to the
   *   quiz only to those with this access code
   * @param {string} [ipFilter=false] – If defined, restricts access to the
   *   quiz to computers in a specified IP range. Filters can be a
   *   comma-separated list of addresses, or an address followed by a mask
   * @param {number} [assignmentGroupId=top assignment group] - The assignment
   *   group to put the quiz into. Only valid if type is "assignment" or
   *   "graded_survey"
   * @param {number} [timeLimitMins=null] - Time limit for the quiz in
   *   minutes
   * @param {boolean} [shuffleAnswers=false] - If true, quiz answers for
   *   multiple choice questions will be randomized for each student
   * @param {string} [hideResults=not hidden] - Allowed values: ['always',
   *   'until_after_last_attempt'], determines whether the student can see their
   *   own submission and other results
   * @param {boolean} [hideCorrectAnswers=false] - Only valid if hideResults
   *   is not defined. If true, hides correct answers from students when results
   *   are viewed
   * @param {boolean} [showCorrectAnswersAfterLastAttempt=false] - Only valid
   *   if hideCorrectAnswers is not true and allowedAttemptes > 1. If true,
   *   hides correct answers from students when quiz results are viewed until
   *   they submit the last attempt for the quiz
   * @param {date} [showCorrectAnswersAt=null] - Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will only be
   *   visible after this date
   * @param {date} [hideCorrectAnswersAt=null] - Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will stop being
   *   visible after this date has passed
   * @param {boolean} [oneTimeResults=false] - Whether students should be
   *   prevented from viewing their quiz results past the first time (right
   *   after they turn in the quiz)
   * @param {boolean} [onlyVisibleToOverrides=false] - If true, the quiz is
   *   only visible to students with overrides
   * @return {Promise.<Object>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  {
    name: 'createQuiz',
    action: 'create a new quiz in a specific course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes`,
        method: 'POST',
        params: {
          'quiz[title]': config.options.title,
          'quiz[description]': utils.includeIfTruthy(config.options.description),
          'quiz[quiz_type]': utils.includeIfTruthy(config.options.type),
          'quiz[assignment_group_id]':
            utils.includeIfNumber(config.options.assignmentGroupId),
          'quiz[time_limit]':
            utils.includeIfNumber(config.options.timeLimitMins),
          'quiz[shuffle_answers]':
            utils.isTruthy(config.options.shuffleAnswers),
          'quiz[hide_results]':
            utils.includeIfTruthy(config.options.hideResults),
          'quiz[show_correct_answers]':
            !utils.isTruthy(config.options.hideCorrectAnswers),
          'quiz[show_correct_answers_last_attempt]':
            utils.isTruthy(config.options.showCorrectAnswersAfterLastAttempt),
          'quiz[show_correct_answers_at]':
            utils.includeIfDate(config.options.showCorrectAnswersAt),
          'quiz[hide_correct_answers_at]':
            utils.includeIfDate(config.options.hideCorrectAnswersAt),
          'quiz[allowed_attempts]':
            utils.includeIfNumber(config.options.allowedAttempts),
          'quiz[scoring_policy]':
            utils.includeIfTruthy(config.options.scoringPolicy),
          'quiz[one_question_at_a_time]':
            utils.isTruthy(config.options.oneQuestionAtATime),
          'quiz[cant_go_back]':
            utils.isTruthy(config.options.cantGoBack),
          'quiz[access_code]':
            utils.includeIfTruthy(config.options.accessCode),
          'quiz[ip_filter]':
            utils.includeIfTruthy(config.options.ipFilter),
          'quiz[due_at]':
            utils.includeIfDate(config.options.dueAt),
          'quiz[lock_at]':
            utils.includeIfDate(config.options.lockAt),
          'quiz[unlock_at]':
            utils.includeIfDate(config.options.unlockAt),
          'quiz[published]':
            utils.isTruthy(config.options.published),
          'quiz[one_time_results]':
            utils.isTruthy(config.options.oneTimeResults),
          'quiz[only_visible_to_overrides]':
            utils.isTruthy(config.options.onlyVisibleToOverrides),
        },
      }).then((response) => {
        const uncachePaths = [
          // Uncache list of quizzes
          `${prefix.v1}/courses/${config.options.courseId}/quizzes`,
          // Uncache quiz
          `${prefix.v1}/courses/${config.options.courseId}/quizzes/${response.id}*`,
        ];
        if (response.assignment_id) {
          // Uncache list of assignments
          uncachePaths.push(`${prefix.v1}/courses/${config.options.courseId}/assignments`);
          // Uncache assignment (quiz is also an assignment)
          uncachePaths.push(`${prefix.v1}/courses/${config.options.courseId}/assignments/${response.assignment_id}*`);
        }
        return config.uncache(uncachePaths, response);
      });
    },
  },

  /**
   * Deletes a quiz from a course
   * @param {number} courseId - Canvas course Id to query
   * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
   * @return {Promise.<Object>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  {
    name: 'deleteQuiz',
    action: 'delete a specific quiz from a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}`,
        method: 'DELETE',
      }).then((response) => {
        const uncachePaths = [
          // Uncache list of quizzes
          `${prefix.v1}/courses/${config.options.courseId}/quizzes`,
          // Uncache quiz
          `${prefix.v1}/courses/${config.options.courseId}/quizzes/${response.id}*`,
        ];
        if (response.assignment_id) {
          // Uncache list of assignments
          uncachePaths.push(`${prefix.v1}/courses/${config.options.courseId}/assignments`);
          // Uncache assignment (quiz is also an assignment)
          uncachePaths.push(`${prefix.v1}/courses/${config.options.courseId}/assignments/${response.assignment_id}*`);
        }
        return config.uncache(uncachePaths, response);
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
   * @return {Promise.<Object>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  {
    name: 'deleteQuiz',
    action: 'delete a specific quiz from a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}`,
        method: 'DELETE',
      }).then((response) => {
        const uncachePaths = [
          // Uncache list of quizzes
          `${prefix.v1}/courses/${config.options.courseId}/quizzes`,
          // Uncache quiz
          `${prefix.v1}/courses/${config.options.courseId}/quizzes/${response.id}*`,
        ];
        if (response.assignment_id) {
          // Uncache list of assignments
          uncachePaths.push(`${prefix.v1}/courses/${config.options.courseId}/assignments`);
          // Uncache assignment (quiz is also an assignment)
          uncachePaths.push(`${prefix.v1}/courses/${config.options.courseId}/assignments/${response.assignment_id}*`);
        }
        return config.uncache(uncachePaths, response);
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
   * @param {number} pointsPossible - Maximum number of points
   * @param {array} answers - Array of answers: [{ text, correct, comment }]
   * @param {number} [position=last] - Optional. Position of the question with
   *   respect to the other questions in the quiz
   * @param {string} [correctComment=null] - Comment to display if the
   *   student answers correctly
   * @param {string} [incorrectComment=null] - Comment to display if the
   *   student answers incorrectly
   * @param {string} [neutralComment=null] - Comment to display regardless of
   *   how the student answers
   * @return {Promise.<Object>} Canvas QuizQuestion {@link https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion}
   */
  {
    name: 'createMultipleChoiceQuizQuestion',
    action: 'create a new multiple choice question to a quiz in a course',
    run(config) {
      const params = {
        'question[question_name]': config.options.name,
        'question[question_text]': config.options.text,
        'question[question_type]': 'multiple_choice_question',
        'question[position]': utils.includeIfNumber(config.options.position),
        'question[points_possible]': config.options.pointsPossible,
        'question[correct_comments]':
          utils.includeIfTruthy(config.options.correctComment),
        'question[incorrect_comments]':
          utils.includeIfTruthy(config.options.incorrectComment),
        'question[neutralComment]':
          utils.includeIfTruthy(config.options.neutralComment),
        'question[text_after_answers]':
          utils.includeIfTruthy(config.options.textAfterAnswers),
      };
      // Add answers
      config.options.answers.forEach((answer, i) => {
        const answerPrefix = `question[answers][${i}]`;
        params[`${answerPrefix}[answer_precision]`] = 10;
        params[`${answerPrefix}[answer_weight]`] = (answer.correct ? 100 : 0);
        params[`${answerPrefix}[numerical_answer_type]`] = 'exact_answer';
        params[`${answerPrefix}[answer_text]`] = answer.text;
        params[`${answerPrefix}[answer_comment]`] = answer.comment;
      });
      return config.visitEndpoint({
        params,
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/questions`,
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
   * @return {Promise.<Object[]>} list of Canvas QuizSubmissions {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
   */
  {
    name: 'listQuizSubmissions',
    action: 'get the list of submissions to a specific quiz in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions`,
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
   * @return {Promise.<Object>} Canvas QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
   */
  {
    name: 'getQuizSubmission',
    action: 'get the list of submissions to a specific quiz in a course',
    run(config) {
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions/${config.options.submissionId}`,
        method: 'GET',
      });
    },
  },

];
