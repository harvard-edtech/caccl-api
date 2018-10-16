const path = require('path');
const api = require('../../helpers/genInstructorAPI.js')();
const studentAPI = require('../../helpers/genStudentAPI.js')();
const studentAPI2 = require('../../helpers/genStudentAPI.js')(1);
const environment = require('../../environment.js');
const utils = require('../../helpers/utils.js');

const courseId = environment.testCourseId;
const studentInfo = environment.students[0];
const studentInfo2 = environment.students[1];

/*------------------------------------------------------------------------*/
/*                     Helpers and Content Definitions                    */
/*------------------------------------------------------------------------*/

// Create current time (rounded to nearest minute) for due/lock/unlockat times
const now = new Date(Math.round(new Date().getTime() / 60000) * 60000);
const nowISO = now.toISOString().split('.')[0] + 'Z';

// Definition of assignment that we'll create in tests
const testAssignment = {
  courseId,
  name: 'temporary_test',
  pointsPossible: 100,
  description: 'this is a test assignment that was auto-generated and can be deleted if it is not deleted automatically',
  published: false,
};
// Definition of expected canvas response for the assignment we create
const testAssignmentResult = {
  name: 'temporary_test',
  points_possible: 100,
  description: 'this is a test assignment that was auto-generated and can be deleted if it is not deleted automatically',
  published: false,
};
// Definition of updates to canvas assignment
const updatedTestAssignment = {
  name: 'updated_test_assignment',
  pointsPossible: 20,
  dueAt: now,
  lockAt: now,
  unlockAt: now,
  description: 'updated description',
  submissionTypes: ['online_text_entry'],
  muted: true,
  omitFromFinalGrade: true,
};
// Definition of updated canvas assignment response
const updatedTestAssignmentResults = {
  name: 'updated_test_assignment',
  points_possible: 20,
  due_at: nowISO,
  lock_at: nowISO,
  unlock_at: nowISO,
  description: 'updated description',
  submission_types: ['online_text_entry'],
  muted: true,
  omit_from_final_grade: true,
};
// List of assignments we expect to already be in the sandbox before testing
const sandboxAssignments = [
  {
    name: 'Homework 1 (text introduction)',
    points_possible: 10,
    grading_type: 'points',
    peer_reviews: false,
    submission_types: ['online_text_entry'],
    has_submitted_submissions: true,
    workflow_state: 'published',
    muted: false,
    published: true,
  },
  {
    name: 'Homework 2 (submit pdf file)',
    points_possible: 100,
    grading_type: 'points',
    peer_reviews: false,
    submission_types: ['online_upload'],
    has_submitted_submissions: true,
    workflow_state: 'published',
    muted: false,
    published: true,
  },
  {
    name: 'Homework 3 (submit url of youtube video)',
    points_possible: 100,
    grading_type: 'points',
    peer_reviews: false,
    submission_types: ['online_url'],
    has_submitted_submissions: true,
    workflow_state: 'published',
    muted: false,
    published: true,
  },
  {
    name: 'Homework 4 (submit url of youtube video)',
    points_possible: 100,
    grading_type: 'points',
    peer_reviews: false,
    submission_types: ['online_url'],
    has_submitted_submissions: true,
    workflow_state: 'published',
    muted: false,
    published: true,
  },
];

/*------------------------------------------------------------------------*/
/*                                  Tests                                 */
/*------------------------------------------------------------------------*/

describe('Endpoints > Course > Assignments', function () {
  describe('Assignments', function () {
    it('Lists assignments', function () {
      return api.course.listAssignments({
        courseId,
      }).then((assignments) => {
        // Find all assignments
        sandboxAssignments.forEach((sandboxAssignment) => {
          let foundAssignmentInList = false;
          for (let i = 0; i < assignments.length; i++) {
            if (
              utils.checkTemplate(sandboxAssignment, assignments[i]).isMatch
            ) {
              foundAssignmentInList = true;
              break;
            }
          }
          if (!foundAssignmentInList) {
            throw new Error('Couldn\'t find an assignment we expected to be in the list: "' + sandboxAssignment.name + '".');
          }
        });
      });
    });

    it('Gets an assignment', function () {
      return api.course.listAssignments({
        courseId,
      }).then((assignments) => {
        // Find HW1
        let firstSandboxAssignmentId;
        for (let i = 0; i < assignments.length; i++) {
          if (assignments[i].name === sandboxAssignments[0].name) {
            firstSandboxAssignmentId = assignments[i].id;
            break;
          }
        }
        if (!firstSandboxAssignmentId) {
          throw new Error('Could not find "' + sandboxAssignments[0].name + '" in the course. Thus, we can\'t check if we can get it.');
        }
        return api.course.getAssignment({
          courseId,
          assignmentId: firstSandboxAssignmentId,
        });
      }).then((assignment) => {
        const comparison = utils.checkTemplate(
          sandboxAssignments[0],
          assignment
        );
        if (!comparison.isMatch) {
          throw new Error('Tried to get "' + sandboxAssignments[0].name + '" from the course, but the returned assignment information didn\'t match the assignment info we expected. \n' + comparison.isMatch);
        }
      });
    });

    it('Updates an assignment', function () {
      return api.course.createAssignment(testAssignment)
        .then((assignment) => {
          // Try to update the assignment
          const updateRequest = updatedTestAssignment;
          updateRequest.courseId = courseId;
          updateRequest.assignmentId = assignment.id;
          return api.course.updateAssignment(updateRequest);
        }).then((updatedAssignment) => {
          // Get the assignment so we can double check that the name was updated
          return api.course.getAssignment({
            courseId,
            assignmentId: updatedAssignment.id,
          });
        }).then((updatedAssignment) => {
          const comparison = utils.checkTemplate(
            updatedTestAssignmentResults,
            updatedAssignment
          );
          // Make sure it matches
          if (!comparison.isMatch) {
            throw new Error('Updated assignment doesn\'t match with our requested changes. \n' + comparison.description);
          }
          // Clean up
          return api.course.deleteAssignment({
            courseId,
            assignmentId: updatedAssignment.id,
          }).catch((err) => {
            throw new Error('Successfully created and updated an assignment but could not clean up (delete) the assignment afterward. We ran into this error: ' + err.message);
          });
        });
    });

    it('Creates an assignment', function () {
      return api.course.createAssignment(testAssignment)
        .then((assignment) => {
          const comparison = utils.checkTemplate(
            testAssignmentResult,
            assignment
          );
          // Assignment created. See if it matches
          if (!comparison.isMatch) {
            throw new Error('Assignment created but didn\'t match our parameters we included. \n' + comparison.description);
          }
          // Clean up
          return api.course.deleteAssignment({
            courseId,
            assignmentId: assignment.id,
          }).catch((err) => {
            throw new Error('Successfully created an assignment but could not clean up (delete) the assignment afterward. We ran into this error: ' + err.message);
          });
        });
    });

    it('Deletes an assignment', function () {
      return api.course.createAssignment(testAssignment)
        .catch((err) => {
          throw new Error('Could not create an assignment so we could delete it. We ran into an error: "' + err.message + '"');
        }).then((assignment) => {
          // Now try to delete the assignment
          return api.course.deleteAssignment({
            courseId,
            assignmentId: assignment.id,
          });
        });
    });
  });

  describe('Submissions', function () {
    it('Lists assignment submissions', function () {
      return api.course.listAssignments({
        courseId,
      }).then((assignments) => {
        // Find HW1
        let hw1Id;
        for (let i = 0; i < assignments.length; i++) {
          if (assignments[i].name === 'Homework 1 (text introduction)') {
            hw1Id = assignments[i].id;
            break;
          }
        }
        if (!hw1Id) {
          throw new Error('Could not find "Homework 1 (text introduction)" in the course. Thus, we can\'t check if we can get it.');
        }
        return api.course.listAssignmentSubmissions({
          courseId,
          assignmentId: hw1Id,
        });
      }).then((submissions) => {
        if (submissions.length !== 20) {
          throw new Error('Incorrect number of submissions');
        }
        // Find Nella's submission
        let nellaSub;
        for (let i = 0; i < submissions.length; i++) {
          if (submissions[i].body === 'Sup. I’m Nella.') {
            nellaSub = submissions[i];
            break;
          }
        }
        if (!nellaSub) {
          throw new Error('Couldn\'t find Nella\'s submission (we use this to check structure of response)');
        }
        const comparison = utils.checkTemplate({
          body: 'Sup. I’m Nella.',
          score: 10,
          submission_type: 'online_text_entry',
          workflow_state: 'graded',
          grade_matches_current_submission: true,
          attempt: 1,
          late: false,
          missing: false,
          seconds_late: 0,
          entered_grade: '10',
          entered_score: 10,
        }, nellaSub);
        if (!comparison.isMatch) {
          throw new Error('Submission structure didn\'t match. \n' + comparison.description);
        }
      });
    });

    it('Gets an assignment submission', function () {
      return api.course.listAssignments({
        courseId,
      }).then((assignments) => {
        // Find HW1
        let hw1Id;
        for (let i = 0; i < assignments.length; i++) {
          if (assignments[i].name === 'Homework 1 (text introduction)') {
            hw1Id = assignments[i].id;
            break;
          }
        }
        if (!hw1Id) {
          throw new Error('Could not find "Homework 1 (text introduction)" in the course. Thus, we can\'t check if we can get it.');
        }
        return api.course.listAssignmentSubmissions({
          courseId,
          assignmentId: hw1Id,
        });
      }).then((submissions) => {
        // Find Nella's submission
        let nellaSub;
        for (let i = 0; i < submissions.length; i++) {
          if (submissions[i].body === 'Sup. I’m Nella.') {
            nellaSub = submissions[i];
            break;
          }
        }
        if (!nellaSub) {
          throw new Error('Couldn\'t find Nella\'s submission (we use this as a submission we are going to get)');
        }
        return api.course.getAssignmentSubmission({
          courseId,
          assignmentId: nellaSub.assignment_id,
          studentId: nellaSub.user.id,
        });
      }).then((sub) => {
        const comparison = utils.checkTemplate({
          body: 'Sup. I’m Nella.',
          score: 10,
          submission_type: 'online_text_entry',
          workflow_state: 'graded',
          grade_matches_current_submission: true,
          attempt: 1,
          late: false,
          missing: false,
          seconds_late: 0,
          entered_grade: '10',
          entered_score: 10,
        }, sub);
        if (!comparison.isMatch) {
          throw new Error('Submission structure didn\'t match. \n' + comparison.description);
        }
      });
    });

    it('Creates a assignment submission (text)', function () {
      const publishedTestAssignment = testAssignment;
      publishedTestAssignment.published = true;
      publishedTestAssignment.submissionTypes = ['online_text_entry'];
      let testAssignmentId;
      return api.course.createAssignment(publishedTestAssignment)
        .catch((err) => {
          throw new Error('Could not create an assignment so we could create a submission for it. We ran into an error: "' + err.message + '"');
        }).then((assignment) => {
          testAssignmentId = assignment.id;
          return studentAPI.course.createAssignmentSubmission({
            courseId,
            assignmentId: testAssignmentId,
            submissionType: 'text',
            body: 'test_sub',
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

    it('Creates a assignment submission (url)', function () {
      const publishedTestAssignment = testAssignment;
      publishedTestAssignment.published = true;
      publishedTestAssignment.submissionTypes = ['online_url'];
      let testAssignmentId;
      return api.course.createAssignment(publishedTestAssignment)
        .catch((err) => {
          throw new Error('Could not create an assignment so we could create a submission for it. We ran into an error: "' + err.message + '"');
        }).then((assignment) => {
          testAssignmentId = assignment.id;
          return studentAPI.course.createAssignmentSubmission({
            courseId,
            assignmentId: testAssignmentId,
            submissionType: 'url',
            body: 'https://google.com',
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

    it('Creates a assignment submission (file)', function () {
      this.timeout(15000);
      const publishedTestAssignment = testAssignment;
      publishedTestAssignment.published = true;
      publishedTestAssignment.submissionTypes = ['online_upload'];
      let testAssignmentId;
      return api.course.createAssignment(publishedTestAssignment)
        .catch((err) => {
          throw new Error('Could not create an assignment so we could create a submission for it. We ran into an error: "' + err.message + '"');
        }).then((assignment) => {
          testAssignmentId = assignment.id;
          return studentAPI.course.createAssignmentSubmission({
            courseId,
            assignmentId: testAssignmentId,
            submissionType: 'files',
            body: [path.join(__dirname, '../../helpers/testFileSub.txt')],
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

  describe('Grading', function () {
    it('Lists gradeable students', function () {
      return api.course.listAssignments({
        courseId,
      }).then((assignments) => {
        // Find HW1
        let hw1Id;
        for (let i = 0; i < assignments.length; i++) {
          if (assignments[i].name === 'Homework 1 (text introduction)') {
            hw1Id = assignments[i].id;
            break;
          }
        }
        if (!hw1Id) {
          throw new Error('Could not find "Homework 1 (text introduction)" in the course. Thus, we can\'t list its gradeable students.');
        }
        return api.course.listGradeableStudents({
          courseId,
          assignmentId: hw1Id,
        });
      }).then((students) => {
        if (!students || students.length === 0) {
          throw new Error('No gradeable students could be found.');
        }
      });
    });

    it('Adds a submission comment', function () {
      const publishedTestAssignment = testAssignment;
      publishedTestAssignment.published = true;
      publishedTestAssignment.submissionTypes = ['online_text_entry'];
      let testAssignmentId;
      return api.course.createAssignment(publishedTestAssignment)
        .catch((err) => {
          throw new Error('Could not create an assignment so we could create a submission for it. We ran into an error: "' + err.message + '"');
        })
        .then((assignment) => {
          testAssignmentId = assignment.id;
          return studentAPI.course.createAssignmentSubmission({
            courseId,
            assignmentId: testAssignmentId,
            submissionType: 'text',
            body: 'test_sub',
            comment: 'student_comment',
          });
        })
        .then(() => {
          // Comment on submission
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
            throw new Error('Comment was added but we failed when trying to delete the test assignment. We ran into this error: ' + err.message);
          });
        });
    });

    it('Batch uploads grades and comments', function () {
      this.timeout(20000);
      const publishedTestAssignment = testAssignment;
      publishedTestAssignment.published = true;
      publishedTestAssignment.submissionTypes = ['online_text_entry'];
      let testAssignmentId;
      return api.course.createAssignment(publishedTestAssignment)
        .catch((err) => {
          throw new Error('Could not create an assignment so we could create a submission for it. We ran into an error: "' + err.message + '"');
        })
        .then((assignment) => {
          testAssignmentId = assignment.id;
          return studentAPI.course.createAssignmentSubmission({
            courseId,
            assignmentId: testAssignmentId,
            submissionType: 'text',
            body: 'test_sub',
            comment: 'student_comment',
          });
        })
        .then(() => {
          return studentAPI2.course.createAssignmentSubmission({
            courseId,
            assignmentId: testAssignmentId,
            submissionType: 'text',
            body: 'test_sub_2',
            comment: 'student_comment_2',
          });
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
          // Check first student
          return api.course.getAssignmentSubmission({
            courseId,
            assignmentId: testAssignmentId,
            studentId: studentInfo.canvasId,
          });
        })
        .then((sub) => {
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
          // Check second student
          return api.course.getAssignmentSubmission({
            courseId,
            assignmentId: testAssignmentId,
            studentId: studentInfo2.canvasId,
          });
        })
        .then((sub) => {
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
});
