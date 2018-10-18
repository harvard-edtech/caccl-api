const utils = require('../../helpers/utils.js');
const api = require('../../helpers/genInstructorAPI.js')();
const environment = require('../../environment.js');

const courseId = environment.testCourseId;

/*------------------------------------------------------------------------*/
/*                                 Helpers                                */
/*------------------------------------------------------------------------*/

// Create current time (rounded to nearest minute) for due/lock/unlockat times
const now = new Date(Math.round(new Date().getTime() / 60000) * 60000);
const nowISO = now.toISOString().split('.')[0] + 'Z';
const stamp = new Date().getTime();

// Generate the parameters for a test quiz
function genTestQuiz(index = 0) {
  return {
    courseId,
    title: 'temporary_test_' + index + '_' + stamp,
    description: 'this is a test quiz that was auto-generated and can be deleted if it is not deleted automatically',
    type: 'assignment',
    published: true,
    dueAt: now,
    allowedAttempts: 2,
    scoringPolicy: 'keep_highest',
    oneQuestionAtATime: true,
    cantGoBack: true,
    accessCode: '123',
    timeLimitMins: 5,
    shuffleAnswers: true,
    hideResults: 'until_after_last_attempt',
    showCorrectAnswersAfterLastAttempt: true,
  };
}

// Generate the parameters for a test quiz template
function genTestQuizTemplate(index = 0) {
  return {
    title: 'temporary_test_' + index + '_' + stamp,
    description: 'this is a test quiz that was auto-generated and can be deleted if it is not deleted automatically',
    quiz_type: 'assignment',
    published: true,
    due_at: nowISO,
    allowed_attempts: 2,
    scoring_policy: 'keep_highest',
    one_question_at_a_time: true,
    cant_go_back: true,
    access_code: '123',
    time_limit: 5,
    shuffle_answers: true,
  };
}

/*------------------------------------------------------------------------*/
/*                                  Tests                                 */
/*------------------------------------------------------------------------*/


describe('Endpoints > Course > Quizzes', function () {
  describe('Quizzes', function () {
    it('Lists quizzes', function () {
      // Create two quizzes so we can check if they show up in the list
      let quizzesToDelete;
      return Promise.all([
        api.course.createQuiz(genTestQuiz(0)),
        api.course.createQuiz(genTestQuiz(1)),
      ])
        .then((quizzes) => {
          quizzesToDelete = quizzes;
          // List the quizzes
          return api.course.listQuizzes({
            courseId,
          });
        })
        .then((quizzes) => {
          // Make sure our test quizzes show up in the list
          const notFound = utils.missingTemplatesToString([
            genTestQuizTemplate(0),
            genTestQuizTemplate(1),
          ], quizzes);

          if (notFound) {
            throw new Error('We could not find the following quizzes: ' + notFound);
          }
          // Clean up: delete the gradebook columns
          return Promise.all(
            quizzesToDelete.map((quiz) => {
              return api.course.deleteQuiz({
                courseId,
                quizId: quiz.id,
              }).catch((err) => {
                throw new Error('We finished the test successfully but couldn\'t clean up (delete gradebook column(s)). We ran into this error: ' + err.message);
              });
            })
          );
        });
    });

    it('Gets a quiz', function () {
      // Create a quiz so we can get it
      let testQuizId;
      return api.course.createQuiz(genTestQuiz())
        .then((quiz) => {
          testQuizId = quiz.id;
          // Get the quiz
          return api.course.getQuiz({
            courseId,
            quizId: testQuizId,
          });
        })
        .then((quiz) => {
          const comparison = utils.checkTemplate(genTestQuizTemplate(), quiz);

          if (!comparison.isMatch) {
            throw new Error('The quiz we got doesn\'t match what we expected:\n' + comparison.description);
          }
          // Clean up: delete the quiz
          return api.course.deleteQuiz({
            courseId,
            quizId: testQuizId,
          }).catch((err) => {
            throw new Error('We completed the test successfully but ran into an error when cleaning up (deleting the test quiz(zes)): ' + err.message);
          });
        });
    });

    it('Updates a quiz', function () {
      // Create a quiz so we can update it
      let testQuizId;
      return api.course.createQuiz(genTestQuiz())
        .then((quiz) => {
          testQuizId = quiz.id;
          // Update the quiz
          return api.course.updateQuiz({
            courseId,
            quizId: testQuizId,
            suppressNotification: true,
            title: 'new_title_' + stamp,
            description: 'new_description',
            allowedAttempts: 10,
            scoringPolicy: 'keep_latest',
            accessCode: '321',
          });
        })
        .then(() => {
          // Get the quiz to make sure it was updated properly
          return api.course.getQuiz({
            courseId,
            quizId: testQuizId,
          });
        })
        .then((updatedQuiz) => {
          const comparison = utils.checkTemplate({
            title: 'new_title_' + stamp,
            description: 'new_description',
            quiz_type: 'assignment',
            published: true,
            due_at: nowISO,
            allowed_attempts: 10,
            scoring_policy: 'keep_latest',
            one_question_at_a_time: true,
            cant_go_back: true,
            access_code: '321',
            time_limit: 5,
            shuffle_answers: true,
          }, updatedQuiz);

          if (!comparison.isMatch) {
            throw new Error('Updated quiz doesn\'t match what we expected:\n' + comparison.description);
          }
          // Clean up: delete the quiz
          return api.course.deleteQuiz({
            courseId,
            quizId: testQuizId,
          }).catch((err) => {
            throw new Error('We completed the test successfully but ran into an error when cleaning up (deleting the test quiz(zes)): ' + err.message);
          });
        });
    });

    it('Creates a quiz', function () {
      // Create a quiz
      let testQuizId;
      return api.course.createQuiz(genTestQuiz())
        .then((quiz) => {
          testQuizId = quiz.id;
          // Get the quiz to make sure it was created properly
          return api.course.getQuiz({
            courseId,
            quizId: testQuizId,
          });
        })
        .then((quiz) => {
          const comparison = utils.checkTemplate(genTestQuizTemplate(), quiz);

          if (!comparison.isMatch) {
            throw new Error('Created quiz doesn\'t match what we expected:\n' + comparison.description);
          }
          // Clean up: delete the quiz
          return api.course.deleteQuiz({
            courseId,
            quizId: testQuizId,
          }).catch((err) => {
            throw new Error('We completed the test successfully but ran into an error when cleaning up (deleting the test quiz(zes)): ' + err.message);
          });
        });
    });

    it('Deletes a quiz', function () {
      // Create a quiz so we can delete it
      let testQuizId;
      return api.course.createQuiz(genTestQuiz())
        .then((quiz) => {
          testQuizId = quiz.id;
          // Delete the quiz
          return api.course.deleteQuiz({
            courseId,
            quizId: testQuizId,
          });
        })
        .then(() => {
          // List the quizzes so we can make sure the quiz was deleted
          return api.course.listQuizzes({
            courseId,
          });
        })
        .then((quizzes) => {
          if (utils.templateFound(genTestQuizTemplate(), quizzes)) {
            throw new Error('The quiz wasn\'t delete properly: it was still found in the list');
          }
        });
    });
  });

  describe('Submissions', function () {
    it('Lists quiz submissions', function () {
      // TODO: create submissions and check if they're in the list
      // (we can't do this until Canvas adds an enpoint that creates a sub)

      // Create a quiz so we can list its submissions
      let testQuizId;
      return api.course.createQuiz(genTestQuiz())
        .then((quiz) => {
          testQuizId = quiz.id;
          // List submissions
          return api.course.listQuizSubmissions({
            courseId,
            quizId: testQuizId,
          });
        })
        .then((submissions) => {
          if (!submissions || submissions.length !== 0) {
            // Expected [] but got either no list or a list with submissions
            throw new Error('We expected an empty list but got the following: ' + JSON.stringify(submissions));
          }
          // Clean up: delete the quiz
          return api.course.deleteQuiz({
            courseId,
            quizId: testQuizId,
          });
        });
    });
  });

  // TODO: add test for getQuizSubmission
  // (we can't do this until Canvas adds an enpoint that creates a sub)
});
