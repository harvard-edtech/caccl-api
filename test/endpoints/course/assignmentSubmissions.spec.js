const path = require('path');
const api = require('../../helpers/genInstructorAPI.js')();
const studentAPI = require('../../helpers/genStudentAPI.js')();
const studentAPI2 = require('../../helpers/genStudentAPI.js')(1);
const environment = require('../../environment.js');
const utils = require('../../helpers/utils.js');

const courseId = environment.testCourseId;
const studentInfo = environment.students[0];

/*------------------------------------------------------------------------*/
/*                     Helpers and Content Definitions                    */
/*------------------------------------------------------------------------*/

// Create current time (rounded to nearest minute) for due/lock/unlockat times
const stamp = new Date().getTime();

// Generate the parameters for a test assignment
function genTestAssignment(index = 0) {
  return {
    courseId,
    name: 'temporary_test_' + index + '_' + stamp,
    pointsPossible: (index + 1) * 10,
    description: 'this is a test assignment that was auto-generated and can be deleted if it is not deleted automatically',
    published: false,
  };
}

/*------------------------------------------------------------------------*/
/*                                  Tests                                 */
/*------------------------------------------------------------------------*/

describe('Endpoints > Course > Assignment Submissions', function () {
  it('Lists assignment submissions', function () {
    // Create a test assignment
    const testAssignment = genTestAssignment();
    testAssignment.published = true;
    testAssignment.submissionTypes = ['online_text_entry'];
    let testAssignmentId;
    return api.course.createAssignment(testAssignment)
      .catch((err) => {
        throw new Error('Could not create an assignment so we could run our test on it. We ran into an error: "' + err.message + '"');
      })
      .then((assignment) => {
        testAssignmentId = assignment.id;
        // Create submissions to the test assignment
        return Promise.all([
          studentAPI.course.createAssignmentTextSubmission({
            courseId,
            assignmentId: testAssignmentId,
            text: 'test_sub_0',
            comment: 'student_comment',
          }),
          studentAPI2.course.createAssignmentTextSubmission({
            courseId,
            assignmentId: testAssignmentId,
            text: 'test_sub_1',
            comment: 'student_comment',
          }),
        ]);
      })
      .then(() => {
        // List submissions
        return api.course.listAssignmentSubmissions({
          courseId,
          assignmentId: testAssignmentId,
        });
      })
      .then((submissions) => {
        // Find both subs
        const template0 = {
          body: 'test_sub_0',
          url: null,
          submission_type: 'online_text_entry',
          workflow_state: 'submitted',
          attempt: 1,
          late: false,
          missing: false,
          seconds_late: 0,
        };
        const template1 = {
          body: 'test_sub_1',
          url: null,
          submission_type: 'online_text_entry',
          workflow_state: 'submitted',
          attempt: 1,
          late: false,
          missing: false,
          seconds_late: 0,
        };
        const notFound = utils.missingTemplatesToString([
          template0,
          template1,
        ], submissions);

        if (notFound) {
          throw new Error('We could not find the following submissions:' + notFound);
        }

        // Clean up
        return api.course.deleteAssignment({
          courseId,
          assignmentId: testAssignmentId,
        }).catch((err) => {
          throw new Error('Successfully listed submissions but could not clean up (delete) the assignment afterward. We ran into this error: ' + err.message);
        });
      });
  });

  it('Gets an assignment submission', function () {
    // Create a test assignment
    const testAssignment = genTestAssignment();
    testAssignment.published = true;
    testAssignment.submissionTypes = ['online_text_entry'];
    let testAssignmentId;
    return api.course.createAssignment(testAssignment)
      .catch((err) => {
        throw new Error('Could not create an assignment so we could run our test on it. We ran into an error: "' + err.message + '"');
      })
      .then((assignment) => {
        testAssignmentId = assignment.id;
        // Create submissions to the test assignment
        return studentAPI.course.createAssignmentTextSubmission({
          courseId,
          assignmentId: testAssignmentId,
          text: 'test_sub',
          comment: 'student_comment',
        });
      })
      .then(() => {
        // Get submission
        return api.course.getAssignmentSubmission({
          courseId,
          assignmentId: testAssignmentId,
          studentId: studentInfo.canvasId,
        });
      })
      .then((submission) => {
        // Check if submission matches
        const template = {
          body: 'test_sub',
          url: null,
          submission_type: 'online_text_entry',
          workflow_state: 'submitted',
          attempt: 1,
          late: false,
          missing: false,
          seconds_late: 0,
        };
        const comparison = utils.checkTemplate(template, submission);
        if (!comparison.isMatch) {
          throw new Error('The submission we got didn\'t match what we expected:\n' + comparison.description);
        }
        // Clean up
        return api.course.deleteAssignment({
          courseId,
          assignmentId: testAssignmentId,
        }).catch((err) => {
          throw new Error('Successfully got a submission but could not clean up (delete) the assignment afterward. We ran into this error: ' + err.message);
        });
      });
  });

  it('Creates an assignment submission (text)', function () {
    const publishedTestAssignment = genTestAssignment();
    publishedTestAssignment.published = true;
    publishedTestAssignment.submissionTypes = ['online_text_entry'];
    let testAssignmentId;
    return api.course.createAssignment(publishedTestAssignment)
      .catch((err) => {
        throw new Error('Could not create an assignment so we could run our test on it. We ran into an error: "' + err.message + '"');
      }).then((assignment) => {
        testAssignmentId = assignment.id;
        return studentAPI.course.createAssignmentTextSubmission({
          courseId,
          assignmentId: testAssignmentId,
          text: 'test_sub',
          comment: 'student_comment',
        });
      }).then((sub) => {
        // Verify assignment
        const comparison = utils.checkTemplate({
          body: 'test_sub',
          url: null,
          submission_type: 'online_text_entry',
          score: null,
          grade_matches_current_submission: true,
          workflow_state: 'submitted',
          grade: null,
          attempt: 1,
          cached_due_date: null,
          excused: null,
          late: false,
          missing: false,
        }, sub);
        if (!comparison.isMatch) {
          throw new Error('Submission didn\'t match.\n' + comparison.description);
        }
        // Check if comment matches
        if (
          !sub.submission_comments
          || !sub.submission_comments.length === 1
          || !sub.submission_comments[0].comment === 'student_comment'
        ) {
          // Invalid student comment
          throw new Error('Student comment wasn\'t posted. Should\'ve been "student_comment"');
        }
        // Clean up: delete the assignment
        return api.course.deleteAssignment({
          courseId,
          assignmentId: testAssignmentId,
        }).catch((err) => {
          throw new Error('Submission was created but we failed when trying to delete the test assignment. We ran into this error: ' + err.message);
        });
      });
  });

  it('Creates an assignment submission (url)', function () {
    const publishedTestAssignment = genTestAssignment();
    publishedTestAssignment.published = true;
    publishedTestAssignment.submissionTypes = ['online_url'];
    let testAssignmentId;
    return api.course.createAssignment(publishedTestAssignment)
      .catch((err) => {
        throw new Error('Could not create an assignment so we could run our test on it. We ran into an error: "' + err.message + '"');
      }).then((assignment) => {
        testAssignmentId = assignment.id;
        return studentAPI.course.createAssignmentURLSubmission({
          courseId,
          assignmentId: testAssignmentId,
          url: 'https://google.com',
          comment: 'student_comment',
        });
      }).then((sub) => {
        // Verify assignment
        const comparison = utils.checkTemplate({
          body: null,
          url: 'https://google.com',
          submission_type: 'online_url',
          score: null,
          grade_matches_current_submission: true,
          workflow_state: 'submitted',
          grade: null,
          attempt: 1,
          cached_due_date: null,
          excused: null,
          late: false,
          missing: false,
        }, sub);
        if (!comparison.isMatch) {
          throw new Error('Submission didn\'t match.\n' + comparison.description);
        }
        // Check if comment matches
        if (
          !sub.submission_comments
          || !sub.submission_comments.length === 1
          || !sub.submission_comments[0].comment === 'student_comment'
        ) {
          // Invalid student comment
          throw new Error('Student comment wasn\'t posted. Should\'ve been "student_comment"');
        }
        // Clean up: delete the assignment
        return api.course.deleteAssignment({
          courseId,
          assignmentId: testAssignmentId,
        }).catch((err) => {
          throw new Error('Submission was created but we failed when trying to delete the test assignment. We ran into this error: ' + err.message);
        });
      });
  });

  it('Creates an assignment submission (file)', function () {
    this.timeout(15000);
    const publishedTestAssignment = genTestAssignment();
    publishedTestAssignment.published = true;
    publishedTestAssignment.submissionTypes = ['online_upload'];
    let testAssignmentId;
    return api.course.createAssignment(publishedTestAssignment)
      .catch((err) => {
        throw new Error('Could not create an assignment so we could run our test on it. We ran into an error: "' + err.message + '"');
      }).then((assignment) => {
        testAssignmentId = assignment.id;
        return studentAPI.course.createAssignmentFileSubmission({
          courseId,
          assignmentId: testAssignmentId,
          filenames: [path.join(__dirname, '../../helpers/testFileSub.txt')],
          comment: 'student_comment',
        });
      }).then((sub) => {
        // Verify assignment
        const comparison = utils.checkTemplate({
          body: null,
          submission_type: 'online_upload',
          score: null,
          grade_matches_current_submission: true,
          workflow_state: 'submitted',
          grade: null,
          attempt: 1,
          cached_due_date: null,
          excused: null,
          late: false,
          missing: false,
        }, sub);
        if (!comparison.isMatch) {
          throw new Error('Submission didn\'t match.\n' + comparison.description);
        }
        // Check if comment matches
        if (
          !sub.submission_comments
          || !sub.submission_comments.length === 1
          || !sub.submission_comments[0].comment === 'student_comment'
        ) {
          // Invalid student comment
          throw new Error('Student comment wasn\'t posted. Should\'ve been "student_comment"');
        }
        // Check for files
        if (
          !sub.attachments
          || !sub.attachments.length === 1
          || !sub.attachments[0].filename === 'testFileSub.txt'
        ) {
          // File not found correctly
          throw new Error('File was not found in the submission');
        }

        // Clean up: delete the assignment
        return api.course.deleteAssignment({
          courseId,
          assignmentId: testAssignmentId,
        }).catch((err) => {
          throw new Error('Submission was created but we failed when trying to delete the test assignment. We ran into this error: ' + err.message);
        });
      });
  });
});
