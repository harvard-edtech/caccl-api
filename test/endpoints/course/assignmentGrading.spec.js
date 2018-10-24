const api = require('../../helpers/genInstructorAPI.js')();
const studentAPI = require('../../helpers/genStudentAPI.js')();
const studentAPI2 = require('../../helpers/genStudentAPI.js')(1);
const environment = require('../../environment.js');
const utils = require('../../helpers/utils.js');

const courseId = environment.testCourseId;
const allStudentIds = environment.students.map((x) => {
  return x.canvasId;
});
const studentInfo = environment.students[0];
const studentInfo2 = environment.students[1];

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

describe('Endpoints > Course > Assignment Grading', function () {
  it('Lists gradeable students', function () {
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
        // Wait a few moments for the assignment to update - this is a weird
        // issue with Canvas: after an assignment is created, student's aren't
        // gradeable for a few secs)
        return utils.wait(5);
      })
      .then(() => {
        // List the gradeable students
        return api.course.listGradeableStudents({
          courseId,
          assignmentId: testAssignmentId,
        });
      })
      .then((students) => {
        if (!students || students.length === 0) {
          throw new Error('No gradeable students could be found.');
        }
        let numFound = 0;
        students.forEach((student) => {
          if (allStudentIds.indexOf(parseInt(student.id)) >= 0) {
            // This student is in our list
            numFound += 1;
          }
        });
        if (numFound !== allStudentIds.length) {
          throw new Error('We expected ' + allStudentIds.length + ' of our test student(s) but found ' + numFound + ' instead.');
        }
        // Clean up: delete the assignment
        return api.course.deleteAssignment({
          courseId,
          assignmentId: testAssignmentId,
        }).catch((err) => {
          throw new Error('We listed gradeable students successfully but could not delete the test assignment. We ran into this error: ' + err.message);
        });
      });
  });

  it('Adds a submission comment', function () {
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
        // Create a submission
        return studentAPI.course.createAssignmentTextSubmission({
          courseId,
          assignmentId: testAssignmentId,
          text: 'test_sub',
          comment: 'student_comment',
        });
      })
      .then(() => {
        // Comment on the submission
        return api.course.createAssignmentSubmissionComment({
          courseId,
          assignmentId: testAssignmentId,
          studentId: studentInfo.canvasId,
          comment: 'instructor_comment',
        });
      })
      .then(() => {
        // Get submission
        return api.course.getAssignmentSubmission({
          courseId,
          assignmentId: testAssignmentId,
          studentId: studentInfo.canvasId,
          includeComments: true,
        });
      })
      .then((sub) => {
        // Check to see if any comments are in the submission
        if (
          !sub.submission_comments
          || sub.submission_comments.length === 0
        ) {
          throw new Error('No submission comments available.');
        }
        // Check for the instructor's comment
        let instructorComment;
        for (let i = 0; i < sub.submission_comments.length; i++) {
          if (sub.submission_comments[i].comment === 'instructor_comment') {
            instructorComment = sub.submission_comments[i];
            break;
          }
        }
        if (!instructorComment) {
          throw new Error('We couldn\'t find the comment. Perhaps it didn\'t upload.');
        }
        // Clean up: delete the assignment
        return api.course.deleteAssignment({
          courseId,
          assignmentId: testAssignmentId,
        }).catch((err) => {
          throw new Error('We listed gradeable students successfully but could not delete the test assignment. We ran into this error: ' + err.message);
        });
      });
  });

  it('Batch uploads grades and comments', function () {
    this.timeout(25000);
    // Create a test assignment that we can upload to
    const publishedTestAssignment = genTestAssignment();
    publishedTestAssignment.published = true;
    publishedTestAssignment.submissionTypes = ['online_text_entry'];
    let testAssignmentId;
    return api.course.createAssignment(publishedTestAssignment)
      .catch((err) => {
        throw new Error('Could not create an assignment so we could run our test on it. We ran into an error: "' + err.message + '"');
      })
      .then((assignment) => {
        testAssignmentId = assignment.id;
        // Create submissions that we can comment on
        return Promise.all([
          studentAPI.course.createAssignmentTextSubmission({
            courseId,
            assignmentId: testAssignmentId,
            text: 'test_sub',
            comment: 'student_comment',
          }),
          studentAPI2.course.createAssignmentTextSubmission({
            courseId,
            assignmentId: testAssignmentId,
            text: 'test_sub_2',
            comment: 'student_comment_2',
          }),
        ]);
      })
      .then(() => {
        // Batch upload grades
        return api.course.updateAssignmentGrades({
          courseId,
          assignmentId: testAssignmentId,
          gradeItems: [
            {
              studentId: studentInfo.canvasId,
              points: 80,
              comment: 'good work!',
            },
            {
              studentId: studentInfo2.canvasId,
              points: 12,
              comment: 'this sucks',
            },
          ],
          waitForCompletion: true,
        });
      })
      .then(() => {
        // Retrieve first student's sub
        return api.course.getAssignmentSubmission({
          courseId,
          assignmentId: testAssignmentId,
          studentId: studentInfo.canvasId,
        });
      })
      .then((sub) => {
        // Check first student's grades/comments
        const comparison = utils.checkTemplate({
          body: 'test_sub',
          grade: '80',
          score: 80,
          assignment_id: testAssignmentId,
          user_id: parseInt(studentInfo.canvasId),
          submission_type: 'online_text_entry',
          workflow_state: 'graded',
          attempt: 1,
          late: false,
          missing: false,
          seconds_late: 0,
          entered_grade: '80',
          entered_score: 80,
        }, sub);
        if (!comparison.isMatch) {
          throw new Error('Submission didn\'t match after grades/comments were uploaded.\n' + comparison.description);
        }
        // Retrieve second student's sub
        return api.course.getAssignmentSubmission({
          courseId,
          assignmentId: testAssignmentId,
          studentId: studentInfo2.canvasId,
        });
      })
      .then((sub) => {
        // Check second student's grades/comments
        const comparison = utils.checkTemplate({
          body: 'test_sub_2',
          grade: '12',
          score: 12,
          assignment_id: testAssignmentId,
          user_id: parseInt(studentInfo2.canvasId),
          submission_type: 'online_text_entry',
          workflow_state: 'graded',
          attempt: 1,
          late: false,
          missing: false,
          seconds_late: 0,
          entered_grade: '12',
          entered_score: 12,
        }, sub);
        if (!comparison.isMatch) {
          throw new Error('Submission didn\'t match after grades/comments were uploaded.\n' + comparison.description);
        }
        // Clean up: delete the assignment
        return api.course.deleteAssignment({
          courseId,
          assignmentId: testAssignmentId,
        }).catch((err) => {
          throw new Error('Grades/comments were added but we failed when trying to delete the test assignment. We ran into this error: ' + err.message);
        });
      });
  });
});
