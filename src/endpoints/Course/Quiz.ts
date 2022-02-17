/**
 * Functions for interacting with quizzes within courses
 * @namespace api.course.quiz
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasCourse from '../../types/CanvasCourse';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';
import CanvasQuiz from '../../types/CanvasQuiz';
import CanvasQuizQuestion from '../../types/CanvasQuizQuestion';
import CanvasQuizSubmission from '../../types/CanvasQuizSubmission';

// Endpoint category
class Quiz extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                           Table of Contents:                           */
  /*                           - Quizzes                                    */
  /*                           - Quiz Questions                             */
  /*                           - Quiz Submissions                           */
  /*------------------------------------------------------------------------*/

  /*------------------------------------------------------------------------*/
  /*                             Quiz Endpoints                             */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the quizzes in a course
   * @author Gabe Abrams
   * @method list
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuiz[]>} list of Canvas Quizzes {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  public async list(
    opts: {
      courseId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasQuiz[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of quizzes in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes`,
      method: 'GET',
    });
  }

  /**
   * Get info on a specific quiz in a course
   * @author Gabe Abrams
   * @method get
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.quizId - Canvas quiz Id (not the quiz's assignment
   *   Id)
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  public async get(
    opts: {
      courseId: number,
      quizId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasQuiz> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific quiz in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}`,
      method: 'GET',
    });
  }

  /**
   * Updates a specific quiz in a course
   * @author Gabe Abrams
   * @method update
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to create the quiz in
   * @param {number} opts.quizId - Canvas course Id to create the quiz in
   * @param {boolean} [opts.suppressNotification] - If true, does not
   *   notify users that the quiz has been updated
   * @param {string} [opts.title=current value] - New title of the quiz
   * @param {string} [opts.description=current value] - New HTML description of
   *   the quiz
   * @param {string} [opts.type=current value] - Quiz type. Allowed values: [
   *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
   * @param {date} [opts.dueAt=current value] - Date the quiz is due
   * @param {date} [opts.lockAt=current value] - Date the quiz is lock
   * @param {date} [opts.unlockAt=current value] - Date the quiz is unlock
   * @param {boolean} [opts.published=current value] - If true, quiz is
   *   published
   * @param {number} [opts.allowedAttempts=current value] - Number of times a
   *   student is allowed to take the quiz. Set to -1 for unlimited attempts
   * @param {string} [opts.scoringPolicy=current value] - Only valid if
   *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
   * @param {boolean} [opts.oneQuestionAtATime=current value] - If true, shows
   *   quiz to student one question at a time. Must be a boolean
   * @param {boolean} [opts.cantGoBack=current value] - If true, shows quiz to
   *   student one question at a time. Must be a boolean
   * @param {string} [opts.accessCode=current value] - If defined, restricts
   *   access to the quiz only to those with this access code
   * @param {string} [opts.ipFilter=current value] - If defined, restricts
   *   access to the quiz to computers in a specified IP range. Filters can be a
   *   comma-separated list of addresses, or an address followed by a mask
   * @param {number} [opts.assignmentGroupId=current value] - The assignment
   *   group to put the quiz into. Only valid if type is "assignment" or
   *   "graded_survey"
   * @param {number} [opts.timeLimitMins=current value] - Time limit for the
   *   quiz in minutes
   * @param {boolean} [opts.shuffleAnswers=current value] - If true, quiz
   *   answers for multiple choice questions will be randomized for each student
   * @param {string} [opts.hideResults=current value] - Allowed values:
   *   ['always', 'until_after_last_attempt'], determines whether the student can
   *   see their own submission and other results
   * @param {boolean} [opts.hideCorrectAnswers=current value] - Only valid if
   *   hideResults is not defined. If true, hides correct answers from students
   *   when results are viewed
   * @param {boolean} [opts.showCorrectAnswersAfterLastAttempt=current value] -
   *   Only valid if hideCorrectAnswers is not true and allowedAttemptes > 1. If
   *   true, hides correct answers from students when quiz results are viewed
   *   until they submit the last attempt for the quiz. Must be a boolean
   * @param {date} [opts.showCorrectAnswersAt=current value] - Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will only be
   *   visible after this date
   * @param {date} [opts.hideCorrectAnswersAt=current value] - Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will stop being
   *   visible after this date has passed
   * @param {boolean} [opts.oneTimeResults=current value] - Whether students
   *   should be prevented from viewing their quiz results past the first time
   *   (right after they turn in the quiz)
   * @param {boolean} [opts.onlyVisibleToOverrides=current value] - If true,
   *   the quiz is only visible to students with overrides
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  public async update(
    opts: {
      courseId: number,
      quizId: number,
      suppressNotification?: boolean,
      title?: string,
      description?: string,
      type?: ('practice_quiz' | 'assignment' | 'graded_survey' | 'survey'),
      dueAt?: (Date | string),
      lockAt?: (Date | string),
      unlockAt?: (Date | string),
      published?: boolean,
      allowedAttempts?: number,
      scoringPolicy?: ('keep_highest' | 'keep_latest'),
      oneQuestionAtATime?: boolean,
      cantGoBack?: boolean,
      accessCode?: string,
      ipFilter?: string,
      assignmentGroupId?: number,
      timeLimitMins?: number,
      shuffleAnswers?: boolean,
      hideResults?: boolean,
      hideCorrectAnswers?: boolean,
      showCorrectAnswersAfterLastAttempt?: boolean,
      showCorrectAnswersAt?: (Date | string),
      hideCorrectAnswersAt?: (Date | string),
      oneTimeResults?: boolean,
      onlyVisibleToOverrides?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasQuiz> {
    return this.visitEndpoint({
      config,
      action: 'update a specific quiz in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}`,
      method: 'PUT',
      params: {
        'quiz[title]': opts.title,
        'quiz[description]': utils.includeIfTruthy(opts.description),
        'quiz[quiz_type]': utils.includeIfTruthy(opts.type),
        'quiz[assignment_group_id]':
          utils.includeIfNumber(opts.assignmentGroupId),
        'quiz[time_limit]':
          utils.includeIfNumber(opts.timeLimitMins),
        'quiz[shuffle_answers]':
          utils.includeIfBoolean(opts.shuffleAnswers),
        'quiz[hide_results]':
          utils.includeIfTruthy(opts.hideResults),
        'quiz[show_correct_answers]':
          !utils.includeIfBoolean(opts.hideCorrectAnswers),
        'quiz[show_correct_answers_last_attempt]': utils.includeIfBoolean(
          opts.showCorrectAnswersAfterLastAttempt
        ),
        'quiz[show_correct_answers_at]':
          utils.includeIfDate(opts.showCorrectAnswersAt),
        'quiz[hide_correct_answers_at]':
          utils.includeIfDate(opts.hideCorrectAnswersAt),
        'quiz[allowed_attempts]':
          utils.includeIfNumber(opts.allowedAttempts),
        'quiz[scoring_policy]':
          utils.includeIfTruthy(opts.scoringPolicy),
        'quiz[one_question_at_a_time]':
          utils.includeIfBoolean(opts.oneQuestionAtATime),
        'quiz[cant_go_back]':
          utils.includeIfBoolean(opts.cantGoBack),
        'quiz[access_code]':
          utils.includeIfTruthy(opts.accessCode),
        'quiz[ip_filter]':
          utils.includeIfTruthy(opts.ipFilter),
        'quiz[due_at]':
          utils.includeIfDate(opts.dueAt),
        'quiz[lock_at]':
          utils.includeIfDate(opts.lockAt),
        'quiz[unlock_at]':
          utils.includeIfDate(opts.unlockAt),
        'quiz[published]':
          utils.includeIfBoolean(opts.published),
        'quiz[one_time_results]':
          utils.includeIfBoolean(opts.oneTimeResults),
        'quiz[only_visible_to_overrides]':
          utils.includeIfBoolean(opts.onlyVisibleToOverrides),
        'quiz[notify_of_update]':
          !utils.isTruthy(opts.suppressNotification),
      },
    });
  }

  /**
   * Creates a new quiz in a course
   * @author Gabe Abrams
   * @method create
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to create the quiz in
   * @param {string} opts.title - Title of the new quiz
   * @param {string} [opts.description=null] - HTML description of the quiz
   * @param {string} [opts.type=null] - Quiz type. Allowed values: [
   *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
   * @param {date} [opts.dueAt=null] - Date the quiz is due
   * @param {date} [opts.lockAt=null] - Date the quiz is lock
   * @param {date} [opts.unlockAt=null] - Date the quiz is unlock
   * @param {boolean} [opts.published] - If true, quiz is published
   * @param {number} [opts.allowedAttempts=1] - Number of times a student is
   *   allowed to take the quiz. Set to -1 for unlimited attempts
   * @param {string} [opts.scoringPolicy=keep_highest] - Only valid if
   *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
   * @param {boolean} [opts.oneQuestionAtATime] - If true, shows quiz to
   *   student one question at a time
   * @param {boolean} [opts.cantGoBack] - If true, shows quiz to student
   *   one question at a time
   * @param {string} [opts.accessCode] - If defined, restricts access to
   *   the quiz only to those with this access code
   * @param {string} [opts.ipFilter] - If defined, restricts access to
   *   the quiz to computers in a specified IP range. Filters can be a
   *   comma-separated list of addresses, or an address followed by a mask
   * @param {number} [opts.assignmentGroupId=top assignment group] - The
   *   assignment group to put the quiz into. Only valid if type is "assignment"
   *   or "graded_survey"
   * @param {number} [opts.timeLimitMins=null] - Time limit for the quiz in
   *   minutes
   * @param {boolean} [opts.shuffleAnswers] - If true, quiz answers for
   *   multiple choice questions will be randomized for each student
   * @param {string} [opts.hideResults=not hidden] - Allowed values: ['always',
   *   'until_after_last_attempt'], determines whether the student can see their
   *   own submission and other results
   * @param {boolean} [opts.hideCorrectAnswers] - Only valid if
   *   hideResults is not defined. If true, hides correct answers from students
   *   when results are viewed
   * @param {boolean} [opts.showCorrectAnswersAfterLastAttempt] - Only
   *   valid if hideCorrectAnswers is not true and allowedAttemptes > 1. If true,
   *   hides correct answers from students when quiz results are viewed until
   *   they submit the last attempt for the quiz
   * @param {date} [opts.showCorrectAnswersAt=null] - Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will only be
   *   visible after this date
   * @param {date} [opts.hideCorrectAnswersAt=null] - Only valid if
   *   hideCorrectAnswers is not true. If set, correct answers will stop being
   *   visible after this date has passed
   * @param {boolean} [opts.oneTimeResults] - Whether students should be
   *   prevented from viewing their quiz results past the first time (right
   *   after they turn in the quiz)
   * @param {boolean} [opts.onlyVisibleToOverrides] - If true, the quiz
   *   is only visible to students with overrides
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  public async create(
    opts: {
      courseId: number,
      title?: string,
      description?: string,
      type?: ('practice_quiz' | 'assignment' | 'graded_survey' | 'survey'),
      dueAt?: (Date | string),
      lockAt?: (Date | string),
      unlockAt?: (Date | string),
      published?: boolean,
      allowedAttempts?: number,
      scoringPolicy?: ('keep_highest' | 'keep_latest'),
      oneQuestionAtATime?: boolean,
      cantGoBack?: boolean,
      accessCode?: string,
      ipFilter?: string,
      assignmentGroupId?: number,
      timeLimitMins?: number,
      shuffleAnswers?: boolean,
      hideResults?: boolean,
      hideCorrectAnswers?: boolean,
      showCorrectAnswersAfterLastAttempt?: boolean,
      showCorrectAnswersAt?: (Date | string),
      hideCorrectAnswersAt?: (Date | string),
      oneTimeResults?: boolean,
      onlyVisibleToOverrides?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasQuiz> {
    return this.visitEndpoint({
      config,
      action: 'update a specific quiz in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes`,
      method: 'POST',
      params: {
        'quiz[title]': opts.title,
        'quiz[description]': utils.includeIfTruthy(opts.description),
        'quiz[quiz_type]': utils.includeIfTruthy(opts.type),
        'quiz[assignment_group_id]':
          utils.includeIfNumber(opts.assignmentGroupId),
        'quiz[time_limit]':
          utils.includeIfNumber(opts.timeLimitMins),
        'quiz[shuffle_answers]':
          utils.isTruthy(opts.shuffleAnswers),
        'quiz[hide_results]':
          utils.includeIfTruthy(opts.hideResults),
        'quiz[show_correct_answers]':
          !utils.isTruthy(opts.hideCorrectAnswers),
        'quiz[show_correct_answers_last_attempt]':
          utils.isTruthy(opts.showCorrectAnswersAfterLastAttempt),
        'quiz[show_correct_answers_at]':
          utils.includeIfDate(opts.showCorrectAnswersAt),
        'quiz[hide_correct_answers_at]':
          utils.includeIfDate(opts.hideCorrectAnswersAt),
        'quiz[allowed_attempts]':
          utils.includeIfNumber(opts.allowedAttempts),
        'quiz[scoring_policy]':
          utils.includeIfTruthy(opts.scoringPolicy),
        'quiz[one_question_at_a_time]':
          utils.isTruthy(opts.oneQuestionAtATime),
        'quiz[cant_go_back]':
          utils.isTruthy(opts.cantGoBack),
        'quiz[access_code]':
          utils.includeIfTruthy(opts.accessCode),
        'quiz[ip_filter]':
          utils.includeIfTruthy(opts.ipFilter),
        'quiz[due_at]':
          utils.includeIfDate(opts.dueAt),
        'quiz[lock_at]':
          utils.includeIfDate(opts.lockAt),
        'quiz[unlock_at]':
          utils.includeIfDate(opts.unlockAt),
        'quiz[published]':
          utils.isTruthy(opts.published),
        'quiz[one_time_results]':
          utils.isTruthy(opts.oneTimeResults),
        'quiz[only_visible_to_overrides]':
          utils.isTruthy(opts.onlyVisibleToOverrides),
      },
    });
  }

  /**
   * Deletes a quiz from a course
   * @author Gabe Abrams
   * @method delete
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.quizId - Canvas quiz Id (not the quiz's assignment
   *   Id)
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
   */
  public async delete(
    opts: {
      courseId: number,
      quizId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasQuiz> {
    return this.visitEndpoint({
      config,
      action: 'delete a specific quiz from a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}`,
      method: 'DELETE',
    });
  }

  /*------------------------------------------------------------------------*/
  /*                         Quiz Question Endpoints                        */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the questions in a specific quiz in a course
   * @author Gabe Abrams
   * @method listQuestions
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.quizId - Canvas quiz Id (not the quiz's assignment
   *   Id)
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuizQuestion[]>} list of Canvas Quiz Questions {@link https://canvas.instructure.com/doc/api/quiz_questions.html}
   */
  public async listQuestions(
    opts: {
      courseId: number,
      quizId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasQuizQuestion[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of questions in a specific quiz in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}/questions`,
      method: 'GET',
    });
  }

  /**
   * Creates a new multiple choice question and adds it to a quiz in a course
   * @author Gabe Abrams
   * @method createMultipleChoiceQuestion
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.quizId - Canvas quiz Id (not the quiz's assignment
   *   Id)
   * @param {string} opts.name - Name of the question
   * @param {string} opts.text - The text of the question, as displayed to the
   *   quiz taker
   * @param {number} opts.pointsPossible - Maximum number of points
   * @param {Array} opts.answers - Array of answers: [{ text, isCorrect,
   *   comment }]
   * @param {number} [opts.position=last] - Optional. Position of the question
   *   with respect to the other questions in the quiz
   * @param {string} [opts.correctComment] - Comment to display if the
   *   student answers correctly
   * @param {string} [opts.incorrectComment] - Comment to display if the
   *   student answers incorrectly
   * @param {string} [opts.neutralComment] - Comment to display regardless
   *   of how the student answers
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuizQuestion>} Canvas QuizQuestion {@link https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion}
   */
  public async createMultipleChoiceQuestion(
    opts: {
      courseId: number,
      quizId: number,
      name: string,
      text: string,
      pointsPossible: number,
      answers: (
        {
          text: string,
          isCorrect?: boolean,
          comment?: string,
        }
      )[],
      position?: number,
      correctComment?: string,
      incorrectComment?: string,
      neutralComment?: string,
    },
    config?: APIConfig,
  ): Promise<CanvasQuizQuestion> {
    const params: {[k: string]: any} = {
      'question[question_name]': opts.name,
      'question[question_text]': opts.text,
      'question[question_type]': 'multiple_choice_question',
      'question[position]': utils.includeIfNumber(opts.position),
      'question[points_possible]': opts.pointsPossible,
      'question[correct_comments]':
        utils.includeIfTruthy(opts.correctComment),
      'question[incorrect_comments]':
        utils.includeIfTruthy(opts.incorrectComment),
      'question[neutralComment]':
        utils.includeIfTruthy(opts.neutralComment),
    };

    // Add answers
    (opts.answers || []).forEach((answer, i) => {
      const answerPrefix = `question[answers][${i}]`;
      params[`${answerPrefix}[answer_precision]`] = 10;
      params[`${answerPrefix}[answer_weight]`] = (answer.isCorrect ? 100 : 0);
      params[`${answerPrefix}[numerical_answer_type]`] = 'exact_answer';
      params[`${answerPrefix}[answer_text]`] = answer.text;
      params[`${answerPrefix}[answer_comment]`] = answer.comment;
    });
    return this.visitEndpoint({
      config,
      action: 'create a new multiple choice question and add it to a quiz in a course',
      params,
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}/questions`,
      method: 'POST',
    });
  }

  /**
   * Creates a new essay question and adds it to a quiz in a course
   * @author Gabe Abrams
   * @method createEssayQuestion
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.quizId - Canvas quiz Id (not the quiz's assignment
   *   Id)
   * @param {string} opts.name - Name of the question
   * @param {string} opts.text - The text of the question, as displayed to the
   *   quiz taker
   * @param {number} opts.pointsPossible - Maximum number of points
   * @param {number} [opts.position=last] - Optional. Position of the question
   *   with respect to the other questions in the quiz
   * @param {string} [opts.correctComment] - Comment to display if the
   *   student answers correctly
   * @param {string} [opts.incorrectComment] - Comment to display if the
   *   student answers incorrectly
   * @param {string} [opts.neutralComment] - Comment to display regardless
   *   of how the student answers
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuizQuestion>} Canvas QuizQuestion {@link https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion}
   */
  public async createEssayQuestion(
    opts: {
      courseId: number,
      quizId: number,
      name: string,
      text: string,
      pointsPossible: number,
      position?: number,
      correctComment?: string,
      incorrectComment?: string,
      neutralComment?: string,
    },
    config?: APIConfig,
  ): Promise<CanvasQuizQuestion> {
    const params = {
      'question[question_name]': opts.name,
      'question[question_text]': opts.text,
      'question[question_type]': 'essay_question',
      'question[position]': utils.includeIfNumber(opts.position),
      'question[points_possible]': opts.pointsPossible,
      'question[correct_comments]':
        utils.includeIfTruthy(opts.correctComment),
      'question[incorrect_comments]':
        utils.includeIfTruthy(opts.incorrectComment),
      'question[neutralComment]':
        utils.includeIfTruthy(opts.neutralComment),
    };
    return this.visitEndpoint({
      config,
      action: 'create a new essay question and add it to a quiz in a course',
      params,
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}/questions`,
      method: 'POST',
    });
  }

  /**
   * Creates a new short answer question and adds it to a quiz in a course
   * @author Gabe Abrams
   * @method createShortAnswerQuestion
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.quizId - Canvas quiz Id (not the quiz's assignment
   *   Id)
   * @param {string} opts.name - Name of the question
   * @param {string} opts.text - The text of the question, as displayed to the
   *   quiz taker
   * @param {number} opts.pointsPossible - Maximum number of points
   * @param {number} [opts.position=last] - Optional. Position of the question
   *   with respect to the other questions in the quiz
   * @param {string} [opts.correctComment] - Comment to display if the
   *   student answers correctly
   * @param {string} [opts.incorrectComment] - Comment to display if the
   *   student answers incorrectly
   * @param {string} [opts.neutralComment] - Comment to display regardless
   *   of how the student answers
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuizQuestion>} Canvas QuizQuestion {@link https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion}
   */
  public async createShortAnswerQuestion(
    opts: {
      courseId: number,
      quizId: number,
      name: string,
      text: string,
      pointsPossible: number,
      position?: number,
      correctComment?: string,
      incorrectComment?: string,
      neutralComment?: string,
    },
    config?: APIConfig,
  ): Promise<CanvasQuizQuestion> {
    const params = {
      'question[question_name]': opts.name,
      'question[question_text]': opts.text,
      'question[question_type]': 'short_answer_question',
      'question[position]': utils.includeIfNumber(opts.position),
      'question[points_possible]': opts.pointsPossible,
      'question[correct_comments]':
        utils.includeIfTruthy(opts.correctComment),
      'question[incorrect_comments]':
        utils.includeIfTruthy(opts.incorrectComment),
      'question[neutralComment]':
        utils.includeIfTruthy(opts.neutralComment),
    };
    return this.visitEndpoint({
      config,
      action: 'create a new short answer question and add it to a quiz in a course',
      params,
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}/questions`,
      method: 'POST',
    });
  }

  /*------------------------------------------------------------------------*/
  /*                        Quiz Submission Endpoints                       */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the submissions to a quiz in a course
   * @author Gabe Abrams
   * @method listSubmissions
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.quizId - Canvas quiz Id (not the quiz's assignment
   *   Id)
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuizSubmission[]>} list of Canvas QuizSubmissions {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
   */
  public async listSubmissions(
    opts: {
      courseId: number,
      quizId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasQuizSubmission[]> {
    const response = await this.visitEndpoint({
      config,
      action: 'get the list of submissions to a specific quiz in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}/submissions`,
      method: 'GET',
    });

    return response.quiz_submissions;
  }

  /**
   * Gets info on a specific submission to a quiz in a course
   * @author Gabe Abrams
   * @method getSubmission
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.quizId - Canvas quiz Id (not the quiz's assignment
   *   Id)
   * @param {number} opts.submissionId - Canvas quiz submission Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuizSubmission>} Canvas QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
   */
  public async getSubmission(
    opts: {
      courseId: number,
      quizId: number,
      submissionId: number,
    },
    config?: APIConfig,
  ): Promise<CanvasQuizSubmission> {
    const response = await this.visitEndpoint({
      config,
      action: 'get the list of submissions to a specific quiz in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}/submissions/${opts.submissionId}`,
      method: 'GET',
    });

    return response.quiz_submissions[0];
  }

  /**
   * Creates a new submission to a specific quiz in a course on behalf of the
   *   current user
   * @author Gabe Abrams
   * @method createSubmission
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id
   * @param {number} opts.quizId - Canvas quiz Id (not the quiz's assignment
   *   Id)
   * @param {object[]} opts.answers - List of answers to quiz questions:
   *   [{id: <quiz_question_id>, answer: <answer_object>},...] where the answer
   *   object is explained here: {@link https://canvas.instructure.com/doc/api/quiz_submission_questions.html#Question+Answer+Formats-appendix}
   * @param {string} [opts.accessCode] - Access code for the quiz if it is
   *   locked
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuizSubmission>} Canvas QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
   */
  public async createSubmission(
    opts: {
      courseId: number,
      quizId: number,
      answers: (
        {
          id: number,
          answer: any,
        }
      )[],
      accessCode?: string,
    },
    config?: APIConfig,
  ): Promise<CanvasQuizSubmission> {
    // Start a new quiz-taking session
    const startResponse = await this.visitEndpoint({
      config,
      action: 'start a new quiz-taking session',
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}/submissions`,
      method: 'POST',
      params: {
        access_code: utils.includeIfTruthy(opts.accessCode),
      },
    });
    
    // Get info on the new open submission
    const openSubmission = startResponse.quiz_submissions[0];
    const submissionId = openSubmission.id;
    const validationToken = openSubmission.validation_token;
    const { attempt } = openSubmission;

    // Answer questions
    await this.visitEndpoint({
      config,
      action: 'add quiz question responses',
      params: {
        attempt,
        validation_token: validationToken,
        access_code: utils.includeIfTruthy(opts.accessCode),
        quiz_questions: opts.answers,
      },
      path: `${API_PREFIX}/quiz_submissions/${submissionId}/questions`,
      method: 'POST',
    });

    // Complete the student's submission
    return this.visitEndpoint({
      config,
      action: 'wrap up a quiz submission',
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}/submissions/${submissionId}/complete`,
      method: 'POST',
      params: {
        attempt,
        validation_token: validationToken,
        access_code: utils.includeIfTruthy(opts.accessCode),
      },
    });
  }

  /*------------------------------------------------------------------------*/
  /*                         Quiz Grading Endpoints                         */
  /*------------------------------------------------------------------------*/

  /**
   * Updates the question grades for a specific submission to a quiz in a course
   * @author Gabe Abrams
   * @method updateQuestionGrades
   * @memberof api.course.quiz
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.courseId - Canvas course Id to query
   * @param {number} opts.quizId - Canvas quiz Id (not the quiz's assignment
   *   Id)
   * @param {number} opts.submissionId - Canvas submission Id for a quiz
   * @param {number} [opts.fudgePoints=current value] - The amount of
   *   positive/negative fudge points to apply to this submission
   * @param {object} [opts.questions] - A map questionId => { score, comment }
   *   of the question score/comment updates
   * @param {number} [opts.attempt=most recent] - The attempt to update grades
   *   for. If excluded, we pull the user's submission to get the attempt number
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasQuizSubmission>} QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
   */
  public async updateQuestionGrades(
    opts: {
      courseId: number,
      quizId: number,
      submissionId: number,
      fudgePoints?: number,
      questions?: {
        [k in number]: {
          score: number,
          comment: string,
        }
      },
      attempt?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasQuizSubmission> {
    // Get the current submission (so we can identify the attempt)
    let { attempt } = opts;
    if (attempt === undefined) {
      // Attempt was not included. We have to look up their most recent attempt
      const sub = await this.api.course.quiz.getSubmission(
        {
          courseId: opts.courseId,
          quizId: opts.quizId,
          submissionId: opts.submissionId,
        },
        config,
      );
      attempt = sub.attempt;
    }

    // Update question grades
    const params: { [k: string]: any } = {
      'quiz_submissions[][attempt]': attempt,
      'quiz_submissions[][fudge_points]': (
        utils.includeIfNumber(opts.fudgePoints)
      ),
    };
    // Add question values
    Object.entries(opts.questions).forEach(([questionId, info]) => {
      const { score, comment } = info;
      if (score !== undefined) {
        params[`quiz_submissions[][questions][${questionId}][score]`] = score;
      }
      if (comment !== undefined) {
        params[`quiz_submissions[][questions][${questionId}][comment]`] = (
          comment
        );
      }
    });

    const response = await this.visitEndpoint({
      config,
      action: 'update the question grades for a specific submission to a quiz in a course',
      params,
      path: `${API_PREFIX}/courses/${opts.courseId}/quizzes/${opts.quizId}/submissions/${opts.submissionId}`,
      method: 'PUT',
    });

    return response.quiz_submissions[0];
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default Quiz;
