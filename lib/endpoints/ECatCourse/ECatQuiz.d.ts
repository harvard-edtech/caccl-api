/**
 * Functions for interacting with quizzes within courses
 * @namespace api.course.quiz
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasQuiz from '../../types/CanvasQuiz';
import CanvasQuizQuestion from '../../types/CanvasQuizQuestion';
import CanvasQuizSubmission from '../../types/CanvasQuizSubmission';
declare class ECatQuiz extends EndpointCategory {
    /**
     * Lists the quizzes in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuiz[]>} list of Canvas Quizzes {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
     */
    list(opts?: {
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasQuiz[]>;
    /**
     * Get info on a specific quiz in a course
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
     */
    get(opts: {
        quizId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasQuiz>;
    /**
     * Updates a specific quiz in a course
     * @author Gabe Abrams
     * @method update
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas course Id to create the quiz in
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   create the quiz in
     * @param {boolean} [opts.suppressNotification] If true, does not
     *   notify users that the quiz has been updated
     * @param {string} [opts.title=current value] New title of the quiz
     * @param {string} [opts.description=current value] New HTML description of
     *   the quiz
     * @param {string} [opts.type=current value] Quiz type. Allowed values: [
     *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
     * @param {date} [opts.dueAt=current value] Date the quiz is due
     * @param {date} [opts.lockAt=current value] Date the quiz is lock
     * @param {date} [opts.unlockAt=current value] Date the quiz is unlock
     * @param {boolean} [opts.published=current value] If true, quiz is
     *   published
     * @param {number} [opts.allowedAttempts=current value] Number of times a
     *   student is allowed to take the quiz. Set to1 for unlimited attempts
     * @param {string} [opts.scoringPolicy=current value] Only valid if
     *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
     * @param {boolean} [opts.oneQuestionAtATime=current value] If true, shows
     *   quiz to student one question at a time. Must be a boolean
     * @param {boolean} [opts.cantGoBack=current value] If true, shows quiz to
     *   student one question at a time. Must be a boolean
     * @param {string} [opts.accessCode=current value] If defined, restricts
     *   access to the quiz only to those with this access code
     * @param {string} [opts.ipFilter=current value] If defined, restricts
     *   access to the quiz to computers in a specified IP range. Filters can be a
     *   comma-separated list of addresses, or an address followed by a mask
     * @param {number} [opts.assignmentGroupId=current value] The assignment
     *   group to put the quiz into. Only valid if type is "assignment" or
     *   "graded_survey"
     * @param {number} [opts.timeLimitMins=current value] Time limit for the
     *   quiz in minutes
     * @param {boolean} [opts.shuffleAnswers=current value] If true, quiz
     *   answers for multiple choice questions will be randomized for each student
     * @param {string} [opts.hideResults=current value] Allowed values:
     *   ['always', 'until_after_last_attempt'], determines whether the student can
     *   see their own submission and other results
     * @param {boolean} [opts.hideCorrectAnswers=current value] Only valid if
     *   hideResults is not defined. If true, hides correct answers from students
     *   when results are viewed
     * @param {boolean} [opts.showCorrectAnswersAfterLastAttempt=current value]
     *   Only valid if hideCorrectAnswers is not true and allowedAttemptes > 1. If
     *   true, hides correct answers from students when quiz results are viewed
     *   until they submit the last attempt for the quiz. Must be a boolean
     * @param {date} [opts.showCorrectAnswersAt=current value] Only valid if
     *   hideCorrectAnswers is not true. If set, correct answers will only be
     *   visible after this date
     * @param {date} [opts.hideCorrectAnswersAt=current value] Only valid if
     *   hideCorrectAnswers is not true. If set, correct answers will stop being
     *   visible after this date has passed
     * @param {boolean} [opts.oneTimeResults=current value] Whether students
     *   should be prevented from viewing their quiz results past the first time
     *   (right after they turn in the quiz)
     * @param {boolean} [opts.onlyVisibleToOverrides=current value] If true,
     *   the quiz is only visible to students with overrides
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
     */
    update(opts: {
        quizId: number;
        courseId?: number;
        suppressNotification?: boolean;
        title?: string;
        description?: string;
        type?: ('practice_quiz' | 'assignment' | 'graded_survey' | 'survey');
        dueAt?: (Date | string);
        lockAt?: (Date | string);
        unlockAt?: (Date | string);
        published?: boolean;
        allowedAttempts?: number;
        scoringPolicy?: ('keep_highest' | 'keep_latest');
        oneQuestionAtATime?: boolean;
        cantGoBack?: boolean;
        accessCode?: string;
        ipFilter?: string;
        assignmentGroupId?: number;
        timeLimitMins?: number;
        shuffleAnswers?: boolean;
        hideResults?: boolean;
        hideCorrectAnswers?: boolean;
        showCorrectAnswersAfterLastAttempt?: boolean;
        showCorrectAnswersAt?: (Date | string);
        hideCorrectAnswersAt?: (Date | string);
        oneTimeResults?: boolean;
        onlyVisibleToOverrides?: boolean;
    }, config?: APIConfig): Promise<CanvasQuiz>;
    /**
     * Creates a new quiz in a course
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {string} opts.title Title of the new quiz
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   create the quiz in
     * @param {string} [opts.description=null] HTML description of the quiz
     * @param {string} [opts.type=null] Quiz type. Allowed values: [
     *   'practice_quiz', 'assignment', 'graded_survey', 'survey']
     * @param {date} [opts.dueAt=null] Date the quiz is due
     * @param {date} [opts.lockAt=null] Date the quiz is lock
     * @param {date} [opts.unlockAt=null] Date the quiz is unlock
     * @param {boolean} [opts.published] If true, quiz is published
     * @param {number} [opts.allowedAttempts=1] Number of times a student is
     *   allowed to take the quiz. Set to1 for unlimited attempts
     * @param {string} [opts.scoringPolicy=keep_highest] Only valid if
     *   allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']
     * @param {boolean} [opts.oneQuestionAtATime] If true, shows quiz to
     *   student one question at a time
     * @param {boolean} [opts.cantGoBack] If true, shows quiz to student
     *   one question at a time
     * @param {string} [opts.accessCode] If defined, restricts access to
     *   the quiz only to those with this access code
     * @param {string} [opts.ipFilter] If defined, restricts access to
     *   the quiz to computers in a specified IP range. Filters can be a
     *   comma-separated list of addresses, or an address followed by a mask
     * @param {number} [opts.assignmentGroupId=top assignment group] The
     *   assignment group to put the quiz into. Only valid if type is "assignment"
     *   or "graded_survey"
     * @param {number} [opts.timeLimitMins=null] Time limit for the quiz in
     *   minutes
     * @param {boolean} [opts.shuffleAnswers] If true, quiz answers for
     *   multiple choice questions will be randomized for each student
     * @param {string} [opts.hideResults=not hidden] Allowed values: ['always',
     *   'until_after_last_attempt'], determines whether the student can see their
     *   own submission and other results
     * @param {boolean} [opts.hideCorrectAnswers] Only valid if
     *   hideResults is not defined. If true, hides correct answers from students
     *   when results are viewed
     * @param {boolean} [opts.showCorrectAnswersAfterLastAttempt] Only
     *   valid if hideCorrectAnswers is not true and allowedAttemptes > 1. If true,
     *   hides correct answers from students when quiz results are viewed until
     *   they submit the last attempt for the quiz
     * @param {date} [opts.showCorrectAnswersAt=null] Only valid if
     *   hideCorrectAnswers is not true. If set, correct answers will only be
     *   visible after this date
     * @param {date} [opts.hideCorrectAnswersAt=null] Only valid if
     *   hideCorrectAnswers is not true. If set, correct answers will stop being
     *   visible after this date has passed
     * @param {boolean} [opts.oneTimeResults] Whether students should be
     *   prevented from viewing their quiz results past the first time (right
     *   after they turn in the quiz)
     * @param {boolean} [opts.onlyVisibleToOverrides] If true, the quiz
     *   is only visible to students with overrides
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
     */
    create(opts: {
        title: string;
        courseId?: number;
        description?: string;
        type?: ('practice_quiz' | 'assignment' | 'graded_survey' | 'survey');
        dueAt?: (Date | string);
        lockAt?: (Date | string);
        unlockAt?: (Date | string);
        published?: boolean;
        allowedAttempts?: number;
        scoringPolicy?: ('keep_highest' | 'keep_latest');
        oneQuestionAtATime?: boolean;
        cantGoBack?: boolean;
        accessCode?: string;
        ipFilter?: string;
        assignmentGroupId?: number;
        timeLimitMins?: number;
        shuffleAnswers?: boolean;
        hideResults?: boolean;
        hideCorrectAnswers?: boolean;
        showCorrectAnswersAfterLastAttempt?: boolean;
        showCorrectAnswersAt?: (Date | string);
        hideCorrectAnswersAt?: (Date | string);
        oneTimeResults?: boolean;
        onlyVisibleToOverrides?: boolean;
    }, config?: APIConfig): Promise<CanvasQuiz>;
    /**
     * Deletes a quiz from a course
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuiz>} Canvas Quiz {@link https://canvas.instructure.com/doc/api/quizzes.html#Quiz}
     */
    delete(opts: {
        quizId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasQuiz>;
    /**
     * Lists the questions in a specific quiz in a course
     * @author Gabe Abrams
     * @method listQuestions
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizQuestion[]>} list of Canvas Quiz Questions {@link https://canvas.instructure.com/doc/api/quiz_questions.html}
     */
    listQuestions(opts: {
        quizId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasQuizQuestion[]>;
    /**
     * Creates a new multiple choice question and adds it to a quiz in a course
     * @author Gabe Abrams
     * @method createMultipleChoiceQuestion
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {string} opts.name Name of the question
     * @param {string} opts.text The text of the question, as displayed to the
     *   quiz taker
     * @param {number} opts.pointsPossible Maximum number of points
     * @param {Array} opts.answers Array of answers: [{ text, isCorrect,
     *   comment }]
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {number} [opts.position=last] Optional. Position of the question
     *   with respect to the other questions in the quiz
     * @param {string} [opts.correctComment] Comment to display if the
     *   student answers correctly
     * @param {string} [opts.incorrectComment] Comment to display if the
     *   student answers incorrectly
     * @param {string} [opts.neutralComment] Comment to display regardless
     *   of how the student answers
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizQuestion>} Canvas QuizQuestion {@link https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion}
     */
    createMultipleChoiceQuestion(opts: {
        quizId: number;
        name: string;
        text: string;
        pointsPossible: number;
        answers: ({
            text: string;
            isCorrect?: boolean;
            comment?: string;
        })[];
        courseId?: number;
        position?: number;
        correctComment?: string;
        incorrectComment?: string;
        neutralComment?: string;
    }, config?: APIConfig): Promise<CanvasQuizQuestion>;
    /**
     * Creates a new essay question and adds it to a quiz in a course
     * @author Gabe Abrams
     * @method createEssayQuestion
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {string} opts.name Name of the question
     * @param {string} opts.text The text of the question, as displayed to the
     *   quiz taker
     * @param {number} opts.pointsPossible Maximum number of points
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {number} [opts.position=last] Optional. Position of the question
     *   with respect to the other questions in the quiz
     * @param {string} [opts.correctComment] Comment to display if the
     *   student answers correctly
     * @param {string} [opts.incorrectComment] Comment to display if the
     *   student answers incorrectly
     * @param {string} [opts.neutralComment] Comment to display regardless
     *   of how the student answers
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizQuestion>} Canvas QuizQuestion {@link https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion}
     */
    createEssayQuestion(opts: {
        quizId: number;
        name: string;
        text: string;
        pointsPossible: number;
        courseId?: number;
        position?: number;
        correctComment?: string;
        incorrectComment?: string;
        neutralComment?: string;
    }, config?: APIConfig): Promise<CanvasQuizQuestion>;
    /**
     * Creates a new short answer question and adds it to a quiz in a course
     * @author Gabe Abrams
     * @method createShortAnswerQuestion
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {string} opts.name Name of the question
     * @param {string} opts.text The text of the question, as displayed to the
     *   quiz taker
     * @param {number} opts.pointsPossible Maximum number of points
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {number} [opts.position=last] Optional. Position of the question
     *   with respect to the other questions in the quiz
     * @param {string} [opts.correctComment] Comment to display if the
     *   student answers correctly
     * @param {string} [opts.incorrectComment] Comment to display if the
     *   student answers incorrectly
     * @param {string} [opts.neutralComment] Comment to display regardless
     *   of how the student answers
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizQuestion>} Canvas QuizQuestion {@link https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion}
     */
    createShortAnswerQuestion(opts: {
        quizId: number;
        name: string;
        text: string;
        pointsPossible: number;
        courseId?: number;
        position?: number;
        correctComment?: string;
        incorrectComment?: string;
        neutralComment?: string;
    }, config?: APIConfig): Promise<CanvasQuizQuestion>;
    /**
     * Lists the submissions to a quiz in a course
     * @author Gabe Abrams
     * @method listSubmissions
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizSubmission[]>} list of Canvas QuizSubmissions {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
     */
    listSubmissions(opts: {
        quizId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasQuizSubmission[]>;
    /**
     * Gets info on a specific submission to a quiz in a course
     * @author Gabe Abrams
     * @method getSubmission
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} opts.submissionId Canvas quiz submission Id
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizSubmission>} Canvas QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
     */
    getSubmission(opts: {
        quizId: number;
        submissionId: number;
        courseId?: number;
    }, config?: APIConfig): Promise<CanvasQuizSubmission>;
    /**
     * Creates a new submission to a specific quiz in a course on behalf of the
     *   current user
     * @author Gabe Abrams
     * @method createSubmission
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {object[]} opts.answers List of answers to quiz questions:
     *   [{id: <quiz_question_id>, answer: <answer_object>},...] where the answer
     *   object is explained here: {@link https://canvas.instructure.com/doc/api/quiz_submission_questions.html#Question+Answer+Formats-appendix}
     * @param {number} [opts.courseId=default course id] Canvas course Id
     * @param {string} [opts.accessCode] Access code for the quiz if it is
     *   locked
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizSubmission>} Canvas QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
     */
    createSubmission(opts: {
        quizId: number;
        answers: ({
            id: number;
            answer: any;
        })[];
        courseId?: number;
        accessCode?: string;
    }, config?: APIConfig): Promise<CanvasQuizSubmission>;
    /**
     * Updates the question grades for a specific submission to a quiz in a course
     * @author Gabe Abrams
     * @method updateQuestionGrades
     * @memberof api.course.quiz
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.quizId Canvas quiz Id (not the quiz's assignment
     *   Id)
     * @param {number} opts.submissionId Canvas submission Id for a quiz
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {number} [opts.fudgePoints=current value] The amount of
     *   positive/negative fudge points to apply to this submission
     * @param {object} [opts.questions] A map questionId => { score, comment }
     *   of the question score/comment updates
     * @param {number} [opts.attempt=most recent] The attempt to update grades
     *   for. If excluded, we pull the user's submission to get the attempt number
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasQuizSubmission>} QuizSubmission {@link https://canvas.instructure.com/doc/api/quiz_submissions.html}
     */
    updateQuestionGrades(opts: {
        quizId: number;
        submissionId: number;
        courseId?: number;
        fudgePoints?: number;
        questions?: {
            [k in number]: {
                score: number;
                comment: string;
            };
        };
        attempt?: number;
    }, config?: APIConfig): Promise<CanvasQuizSubmission>;
}
export default ECatQuiz;
