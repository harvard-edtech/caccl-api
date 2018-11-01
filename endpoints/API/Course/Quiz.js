const axios = require('axios');
const parseCSV = require('csv-parse/lib/sync');

const CACCLError = require('../../../../caccl-error/index.js'); // TODO: use actual library
const errorCodes = require('../../../errorCodes.js');
const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');
const waitForCompletion = require('../../common/waitForCompletion.js');

class Quiz extends EndpointCategory {
  constructor(config) {
    super(config, Quiz);
  }
}

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
 * @method list
 * @param {number} courseId - Canvas course Id to query
 * @return {Promise.<Object[]>} list of Canvas Quizzes {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
 */
Quiz.list = (config) => {
  // @action: get the list of quizzes in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/quizzes`,
    method: 'GET',
  });
};

/**
 * Get info on a specific quiz in a course
 * @method get
 * @param {number} courseId - Canvas course Id to query
 * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
 * @return {Promise.<Object>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
 */
Quiz.get = (config) => {
  // @action: get info on a specific quiz in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}`,
    method: 'GET',
  });
};

/**
 * Updates a specific quiz in a course
 * @method update
 * @param {number} courseId - Canvas course Id to create the quiz in
 * @param {number} quizId - Canvas course Id to create the quiz in
 * @param {boolean} suppressNotification - If true, does not notify users that
 *   the quiz has been updated
 * @param {string} [title=current value] - New title of the quiz
 * @param {string} [description=current value] - New HTML description of the
 *   quiz
 * @param {string} [type=current value] - Quiz type. Allowed values: [
 *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
 * @param {date} [dueAt=current value] - Date the quiz is due
 * @param {date} [lockAt=current value] - Date the quiz is lock
 * @param {date} [unlockAt=current value] - Date the quiz is unlock
 * @param {boolean} [published=current value] - If true, quiz is published
 * @param {number} [allowedAttempts=current value] - Number of times a student
 *   is allowed to take the quiz. Set to -1 for unlimited
 *   attempts
 * @param {string} [scoringPolicy=current value] - Only valid if
 *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
 * @param {boolean} [oneQuestionAtATime=current value] - If true, shows quiz
 *   to student one question at a time. Must be a boolean
 * @param {boolean} [cantGoBack=current value] - If true, shows quiz to
 *   student one question at a time. Must be a boolean
 * @param {string} [accessCode=current value] - If defined, restricts access
 *   to the quiz only to those with this access code
 * @param {string} [ipFilter=current value] - If defined, restricts access to
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
Quiz.update = (config) => {
  // @action: update a specific quiz in a course
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
};

/**
 * Creates a new quiz in a course
 * @method create
 * @param {number} courseId - Canvas course Id to create the quiz in
 * @param {string} title - Title of the new quiz
 * @param {string} [description=null] - HTML description of the quiz
 * @param {string} [type=null] - Quiz type. Allowed values: [
 *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
 * @param {date} [dueAt=null] - Date the quiz is due
 * @param {date} [lockAt=null] - Date the quiz is lock
 * @param {date} [unlockAt=null] - Date the quiz is unlock
 * @param {boolean} [published=false] - If true, quiz is published
 * @param {number} [allowedAttempts=1] - Number of times a student is
 *   allowed to take the quiz. Set to -1 for unlimited attempts
 * @param {string} [scoringPolicy=keep_highest] - Only valid if
 *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
 * @param {boolean} [oneQuestionAtATime=false] - If true, shows quiz to
 *   student one question at a time
 * @param {boolean} [cantGoBack=false] - If true, shows quiz to student one
 *   question at a time
 * @param {string} [accessCode=false] - If defined, restricts access to the
 *   quiz only to those with this access code
 * @param {string} [ipFilter=false] - If defined, restricts access to the
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
Quiz.create = (config) => {
  // @action: create a new quiz in a specific course
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
};

/**
 * Deletes a quiz from a course
 * @method delete
 * @param {number} courseId - Canvas course Id to query
 * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
 * @return {Promise.<Object>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
 */
Quiz.delete = (config) => {
  // @action: delete a specific quiz from a course
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
};

/*------------------------------------------------------------------------*/
/*                         Quiz Question Endpoints                        */
/*------------------------------------------------------------------------*/

/**
 * Lists the questions in a specific quiz in a course
 * @method listQuestions
 * @param {number} courseId - Canvas course Id to query
 * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
 * @return {Promise.<Object[]>} list of Canvas QuizSubmissions {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
 */
Quiz.listQuestions = (config) => {
  // @action: get the list of questions in a specific quiz in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/questions`,
    method: 'GET',
  });
};

/**
 * Creates a new multiple choice question to a quiz in a course
 * @method createMultipleChoiceQuestion
 * @param {number} courseId - Canvas course Id to query
 * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
 * @param {string} name - Name of the question
 * @param {string} text - The text of the question, as displayed to the quiz
 *   taker
 * @param {number} pointsPossible - Maximum number of points
 * @param {array} answers - Array of answers: [{ text, isCorrect, comment }]
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
Quiz.createMultipleChoiceQuestion = (config) => {
  // @action: create a new multiple choice question to a quiz in a course
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
    params[`${answerPrefix}[answer_weight]`] = (answer.isCorrect ? 100 : 0);
    params[`${answerPrefix}[numerical_answer_type]`] = 'exact_answer';
    params[`${answerPrefix}[answer_text]`] = answer.text;
    params[`${answerPrefix}[answer_comment]`] = answer.comment;
  });
  return config.visitEndpoint({
    params,
    path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/questions`,
    method: 'POST',
  })
    .then((response) => {
      config.uncache([
        // Uncache quiz questions
        `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/questions`,
        // Uncache this specific question
        `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/questions/${response.id}`,
      ], response);
    });
};

/*------------------------------------------------------------------------*/
/*                        Quiz Submission Endpoints                       */
/*------------------------------------------------------------------------*/

/**
 * Lists the submissions to a quiz in a course
 * @method listSubmissions
 * @param {number} courseId - Canvas course Id to query
 * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
 * @return {Promise.<Object[]>} list of Canvas QuizSubmissions {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
 */
Quiz.listSubmissions = (config) => {
  // @action: get the list of submissions to a specific quiz in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions`,
    method: 'GET',
  }).then((response) => {
    return Promise.resolve(response.quiz_submissions);
  });
};

/**
 * Gets info on a specific submission to a quiz in a course
 * @method getSubmission
 * @param {number} courseId - Canvas course Id to query
 * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
 * @param {number} submissionId - Canvas quiz submission Id
 * @return {Promise.<Object>} Canvas QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
 */
Quiz.getSubmission = (config) => {
  // @action: get the list of submissions to a specific quiz in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions/${config.options.submissionId}`,
    method: 'GET',
  })
    .then((response) => {
      return Promise.resolve(response.quiz_submissions[0]);
    });
};

/**
 * Creates a new submission to a specific quiz in a course on behalf of the
 *   current user
 * @method createSubmission
 * @param {number} courseId - Canvas course Id
 * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
 * @param {object[]} answers - List of answers to quiz questions:
 *   [{id: <quiz_question_id>, answer: <answer_object>},...] where the answer
 *   object is explained here: {@link https://canvas.instructure.com/doc/api/quiz_submission_questions.html#Question+Answer+Formats-appendix}
 * @param {string} [accessCode] - Access code for the quiz if it is locked
 * @return {Promise.<Object>} Canvas QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
 */
Quiz.createSubmission = (config) => {
  // @action: create a new submission to a specific quiz in a course on behalf of the current user

  // Start a new quiz-taking session
  let submissionId;
  let validationToken;
  let attempt;
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions`,
    method: 'POST',
    params: {
      access_code: utils.includeIfTruthy(config.options.accessCode),
    },
  })
    .then((response) => {
      const openSubmission = response.quiz_submissions[0];
      submissionId = openSubmission.id;
      validationToken = openSubmission.validation_token;
      ({ attempt } = openSubmission);

      // Answer questions
      const params = {
        attempt,
        validation_token: validationToken,
        access_code: utils.includeIfTruthy(config.options.accessCode),
        quiz_questions: config.options.answers,
      };
      return config.visitEndpoint({
        params,
        path: `${prefix.v1}/quiz_submissions/${submissionId}/questions`,
        method: 'POST',
      });
    })
    .then(() => {
      // Complete the student's submission
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions/${submissionId}/complete`,
        method: 'POST',
        params: {
          attempt,
          validation_token: validationToken,
          access_code: utils.includeIfTruthy(config.options.accessCode),
        },
      });
    })
    .then((response) => {
      return config.uncache([
        // Uncache submission
        `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions/${submissionId}`,
        // Uncache list of submissions
        `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions`,
      ], response.quiz_submissions[0]);
    });
};

/*------------------------------------------------------------------------*/
/*                         Quiz Grading Endpoints                         */
/*------------------------------------------------------------------------*/

// Constants for quiz report CSVs
// If positive, we're including the column index
// If negative, the column's index can be calculated using:
//   csvHeaderRow.length + offset
const reportColMap = {
  name: 0,
  id: 1,
  sisId: 2,
  section: 3,
  sectionIds: 4,
  sectionSISIds: 5,
  submittedAt: 6,
  numCorrectOffset: -3,
  numIncorrectOffset: -2,
  scoreOffset: -1,
  // Each question takes up two columns:
  firstQuestionCol: 7,
  lastQuestionColOffset: -4,
};

/**
 * Lists quiz question grades for a specific quiz in a course
 * @method listQuestionGrades
 * @param {number} courseId - Canvas course Id to query
 * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
 * @return {Promise.<Object[]>} QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
 */
Quiz.listQuestionGrades = (config) => {
  // @action: list quiz question grades for a specific quiz in a course

  // Request a new quiz report
  let reportId;
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/reports`,
    method: 'POST',
    params: {
      'quiz_report[report_type]': 'student_analysis',
    },
  })
    .then((pendingReport) => {
      reportId = pendingReport.id;
      // Get a new copy of the report and include the progress
      return waitForCompletion({
        progress: {
          url: pendingReport.progress_url,
        },
        visitEndpoint: config.visitEndpoint,
      });
    })
    .then(() => {
      // Quiz report has been generated! Now, let's fetch it
      return config.visitEndpoint({
        path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/reports/${reportId}`,
        method: 'GET',
        params: {
          include: ['file'],
        },
      });
    })
    .then((report) => {
      // Get the csv file (the report)
      return axios.get(report.file.url);
    })
    .then((reportCSV) => {
      if (reportCSV.data) {
        // We already have the body
        return Promise.resolve(reportCSV.data);
      }

      // The body didn't come through the first request. Canvas must be
      // sending us through their 2 redirects process
      return axios.get(reportCSV.res.headers.location)
        .then((response) => {
          return axios.get(response.res.headers.location);
        })
        .then((response) => {
          return Promise.resolve(response.text);
        });
    })
    .then((csvBody) => {
      // Process the CSV file
      const parsedCSV = parseCSV(csvBody, {
        skip_empty_lines: true,
      });
      // Enforce that we have a header row
      if (parsedCSV.length < 1) {
        // Not enough rows
        throw new CACCLError({
          message: 'Canvas responded with a quiz report csv file that did not have any rows.',
          code: errorCodes.quizReportNoRows,
        });
      }

      // Generate a map of the quiz questions
      const questions = [];
      const header = parsedCSV[0];
      const { firstQuestionCol } = reportColMap;
      const lastQuestionCol = (
        header.length + reportColMap.lastQuestionColOffset
      );
      for (let i = firstQuestionCol; i < lastQuestionCol; i += 2) {
        const titleCol = header[i];
        const pointsCol = header[i + 1];
        // Parse title column (format: "questionId: quizTitle")
        const titleDividerIndex = titleCol.indexOf(':');
        const questionId = parseInt(titleCol.substring(0, titleDividerIndex));
        const questionTitle = titleCol.substring(titleDividerIndex).trim();
        // Parse points column
        const pointsPossible = parseFloat(pointsCol);

        questions.push({
          pointsPossible,
          title: questionTitle,
          id: questionId,
          answerColIndex: i,
          pointsColIndex: i + 1,
        });
      }

      // Go through each student row and extract responses
      const processedReport = [];
      for (let i = 1; i < parsedCSV.length; i++) {
        const studentRow = parsedCSV[i];
        const reportItem = {};

        // Extract student metadata
        reportItem.name = studentRow[reportColMap.name];
        reportItem.id = parseInt(studentRow[reportColMap.id]);
        reportItem.sisId = studentRow[reportColMap.sisId];
        // Split out sections
        reportItem.sections = studentRow[reportColMap.section]
          .split(',')
          .map((section) => {
            return section.trim();
          });
        // Split section ids and parse them as ints
        reportItem.sectionIds = [];
        if (studentRow[reportColMap.sectionIds]) {
          reportItem.sectionIds = studentRow[reportColMap.sectionIds]
            .split(',')
            .map((section) => {
              return parseInt(section.trim());
            });
        }
        // Split section sis ids
        reportItem.sectionSISIds = [];
        if (studentRow[reportColMap.sectionSISIds]) {
          reportId.sectionSISIds = studentRow[reportColMap.sectionSISIds]
            .split(',')
            .map((section) => {
              return section.trim();
            });
        }
        // Turn submission timestamp into date object if possible
        const submittedTimestamp = studentRow[reportColMap.submittedAt];
        reportItem.submittedAt = (
          submittedTimestamp ? new Date(submittedTimestamp) : null
        );

        // Extract student totals
        reportItem.numCorrect = parseInt(
          studentRow[header.length + reportColMap.numCorrectOffset]
        );
        reportItem.numIncorrect = parseInt(
          studentRow[header.length + reportColMap.numIncorrectOffset]
        );
        reportItem.totalScore = parseFloat(
          studentRow[header.length + reportColMap.scoreOffset]
        );

        // Extract question response/score info
        reportItem.questions = {};
        questions.forEach((question) => {
          // Check if the user didn't submit this question
          const response = studentRow[question.answerColIndex] || null;
          let points = studentRow[question.pointsColIndex] || null;
          // Parse points as float
          if (points) {
            points = parseFloat(points);
          }
          // Save report item
          reportItem.questions[question.id] = {
            response,
            points,
          };
        });

        // Save reportItem
        processedReport.push(reportItem);
      }

      return Promise.resolve(processedReport);
    });
};

/**
 * Updates the question grades for a specific submission to a quiz in a course
 * @version unstable
 * @method updateQuestionGrades
 * @param {number} courseId - Canvas course Id to query
 * @param {number} quizId - Canvas quiz Id (not the quiz's assignment Id)
 * @param {number} submissionId - Canvas submission Id for a quiz
 * @param {number} [fudgePoints=current value] - The amount of positive/negative
 *   fudge points to apply to this submission
 * @param {object} [questions] – A map questionId => { score, comment } of the
 *   question score/comment updates
 * @param {number} [attempt=most recent] – The attempt to update grades for.
 *   If excluded, we pull the user's submission to get the attempt number
 * @return {Promise.<Object[]>} QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
 */
Quiz.updateQuestionGrades = (config) => {
  // @action: update the question grades for a specific submission to a quiz in a course

  // Get the current submission (so we can identify the attempt)
  let getAttempt;
  if (config.options.attempt !== undefined) {
    // Attempt was included. Just use that number
    getAttempt = Promise.resolve(config.options.attempt);
  } else {
    // Attempt was not included. We have to look up their most recent attempt
    getAttempt = config.api.course.quiz.getSubmission({
      courseId: config.options.courseId,
      quizId: config.options.quizId,
      submissionId: config.options.submissionId,
    })
      .then((submission) => {
        return Promise.resolve(submission.attempt);
      });
  }

  // Update question grades
  return getAttempt.then((attempt) => {
    // Create params object
    const params = {
      'quiz_submissions[][attempt]': attempt,
      'quiz_submissions[][fudge_points]':
        utils.includeIfNumber(config.options.fudgePoints),
    };
    // Add question values
    Object.keys(config.options.questions || {}).forEach((questionId) => {
      const { score, comment } = config.options.questions[questionId];
      if (score !== undefined) {
        params[`quiz_submissions[][questions][${questionId}][score]`] = score;
      }
      if (comment !== undefined) {
        params[`quiz_submissions[][questions][${questionId}][comment]`] = (
          comment
        );
      }
    });

    return config.visitEndpoint({
      params,
      path: `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions/${config.options.submissionId}`,
      method: 'PUT',
    }).then((response) => {
      const submission = response.quiz_submissions[0];
      return config.uncache([
        // Uncache the list of submissions
        `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions`,
        // Uncache the submission
        `${prefix.v1}/courses/${config.options.courseId}/quizzes/${config.options.quizId}/submissions/${config.options.submissionId}`,
      ], submission);
    });
  });
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Quiz;
