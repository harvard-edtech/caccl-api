const path = require('path');
const api = require('../../../common/genInstructorAPI.js')();
const studentAPI = require('../../../common/genStudentAPI.js')();
const studentAPI2 = require('../../../common/genStudentAPI.js')(1);
const environment = require('../../../environment.js');
const utils = require('../../../common/utils.js');

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
const now = new Date(Math.round(new Date().getTime() / 60000) * 60000);
const nowISO = now.toISOString().split('.')[0] + 'Z';
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

// Generate the template of a test assignment's canvas response
function genTestAssignmentTemplate(index = 0) {
  return {
    name: 'temporary_test_' + index + '_' + stamp,
    points_possible: (index + 1) * 10,
    description: 'this is a test assignment that was auto-generated and can be deleted if it is not deleted automatically',
    published: false,
  };
}

// Generate the parameters for a test override
function genTestAssignmentOverride(assignmentId, index = 0) {
  const studentIdsToOverride = studentIds.slice(
    Math.min(studentIds.length - 2, index * 2),
    Math.min(studentIds.length - 2, index * 2) + 2
  );
  return {
    courseId,
    assignmentId,
    studentIds: studentIdsToOverride,
    title: 'test-assignment-override-' + index + '-' + stamp,
    dueAt: now,
    unlockAt: now,
    lockAt: now,
  };
}

// Generate the template of a test override's canvas response
function genTestAssignmentOverrideTemplate(assignmentId, index = 0) {
  return {
    assignment_id: assignmentId,
    title: 'test-assignment-override-' + index + '-' + stamp,
    due_at: nowISO,
    unlock_at: nowISO,
    lock_at: nowISO,
  };
}

describe('Endpoints > Course > Assignment', function () {
  /*------------------------------------------------------------------------*/
  /*                            Assignment Tests                            */
  /*------------------------------------------------------------------------*/

  describe('Assignment', function () {
    it('Lists assignments', function () {
      let assignmentsToDelete;
      // Create assignments so we can check for them in the list
      return Promise.all([
        api.course.assignment.create(genTestAssignment(0)),
        api.course.assignment.create(genTestAssignment(1)),
      ]).then((assignments) => {
        assignmentsToDelete = assignments;
        // List the assignments
        return api.course.listAssignments({
          courseId,
        });
      }).then((assignments) => {
        // Check if the two generated assignments are there
        const notFound = utils.missingTemplatesToString([
          genTestAssignmentTemplate(0),
          genTestAssignmentTemplate(1),
        ], assignments);

        if (notFound) {
          throw new Error('We could not find the following assignments:' + notFound);
        }

        // Delete the test assignments
        return Promise.all(assignmentsToDelete.map((assignment) => {
          return api.course.assignment.delete({
            courseId,
            assignmentId: assignment.id,
          }).catch((err) => {
            throw new Error('We were able to list assignments but we couldn\'t delete one of the test assignments (' + assignment.name + ') due to an error: ' + err.message);
          });
        }));
      });
    });

    it('Gets an assignment', function () {
      // Create an assignment so we can get it
      return api.course.assignment.create(genTestAssignment())
        .then((assignment) => {
          // Get the assignment
          return api.course.assignment.get({
            courseId,
            assignmentId: assignment.id,
          });
        })
        .then((assignment) => {
          // Check to make sure the assignment we get matches
          const comparison = utils.checkTemplate(
            genTestAssignmentTemplate(),
            assignment
          );
          if (!comparison.isMatch) {
            throw new Error('Assignment we got didn\'t match:\n' + comparison.description);
          }
          // Delete test assignment
          return api.course.assignment.delete({
            courseId,
            assignmentId: assignment.id,
          }).catch((err) => {
            throw new Error('We were able to get an assignment but we couldn\'t delete the test assignment (' + assignment.name + ') due to an error: ' + err.message);
          });
        });
    });

    it('Updates an assignment', function () {
      // Create a test assignment that we can update
      let testAssignmentId;
      return api.course.assignment.create(genTestAssignment())
        .then((assignment) => {
          testAssignmentId = assignment.id;
          // Try to update the assignment
          return api.course.update({
            courseId,
            assignmentId: testAssignmentId,
            name: 'updated_test_assignment',
            pointsPossible: 20,
            dueAt: now,
            lockAt: now,
            unlockAt: now,
            description: 'updated description',
            submissionTypes: ['online_text_entry'],
            muted: true,
            omitFromFinalGrade: true,
          });
        }).then(() => {
          // Get the assignment so we can double check that the name was updated
          return api.course.assignment.get({
            courseId,
            assignmentId: testAssignmentId,
          });
        }).then((updatedAssignment) => {
          const comparison = utils.checkTemplate(
            {
              name: 'updated_test_assignment',
              points_possible: 20,
              due_at: nowISO,
              lock_at: nowISO,
              unlock_at: nowISO,
              description: 'updated description',
              submission_types: ['online_text_entry'],
              muted: true,
              omit_from_final_grade: true,
            },
            updatedAssignment
          );
          // Make sure it matches
          if (!comparison.isMatch) {
            throw new Error('Updated assignment doesn\'t match with our requested changes. \n' + comparison.description);
          }
          // Clean up
          return api.course.assignment.delete({
            courseId,
            assignmentId: testAssignmentId,
          }).catch((err) => {
            throw new Error('Successfully created and updated an assignment but could not clean up (delete) the assignment afterward. We ran into this error: ' + err.message);
          });
        });
    });

    it('Creates an assignment', function () {
      return api.course.assignment.create(genTestAssignment())
        .then((assignment) => {
          const comparison = utils.checkTemplate(
            genTestAssignmentTemplate(),
            assignment
          );
          // Assignment created. See if it matches
          if (!comparison.isMatch) {
            throw new Error('Assignment created but didn\'t match our parameters we included. \n' + comparison.description);
          }
          // Clean up
          return api.course.assignment.delete({
            courseId,
            assignmentId: assignment.id,
          }).catch((err) => {
            throw new Error('Successfully created an assignment but could not clean up (delete) the assignment afterward. We ran into this error: ' + err.message);
          });
        });
    });

    it('Deletes an assignment', function () {
      return api.course.assignment.create(genTestAssignment())
        .catch((err) => {
          throw new Error('Could not create an assignment so we could delete it. We ran into an error: "' + err.message + '"');
        }).then((assignment) => {
          // Now try to delete the assignment
          return api.course.assignment.delete({
            courseId,
            assignmentId: assignment.id,
          });
        })
        .then(() => {
          // List the assignments
          return api.course.assignment.list({
            courseId,
          });
        })
        .then((assignments) => {
          // Check to make sure the assignment was removed
          const found = utils.templateFound(
            genTestAssignment(),
            assignments
          );

          if (found) {
            // It's in the list! This is wrong.
            throw new Error('The assignment wasn\'t deleted properly.');
          }
        });
    });
  });

  /*------------------------------------------------------------------------*/
  /*                              Grading Tests                             */
  /*------------------------------------------------------------------------*/

  describe('Grading', function () {
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

  /*------------------------------------------------------------------------*/
  /*                             Override Tests                             */
  /*------------------------------------------------------------------------*/

  describe('Override', function () {
    it('Lists assignment overrides', function () {
      // Create an assignment that we can override
      let testAssignmentId;
      const testAssignment = genTestAssignment();
      testAssignment.published = true;
      testAssignment.dueAt = now;
      return api.course.createAssignment(testAssignment)
        .then((assignment) => {
          testAssignmentId = assignment.id;
          // Add a couple assignment overrides to the list
          return Promise.all([
            api.course.createAssignmentOverride(
              genTestAssignmentOverride(testAssignmentId, 0)
            ),
            api.course.createAssignmentOverride(
              genTestAssignmentOverride(testAssignmentId, 1)
            ),
          ]);
        })
        .then(() => {
          // List the overrides
          return api.course.listAssignmentOverrides({
            courseId,
            assignmentId: testAssignmentId,
          });
        })
        .then((overrides) => {
          // Make sure the apps we added are in the list
          const notFound = utils.missingTemplatesToString([
            genTestAssignmentOverrideTemplate(testAssignmentId, 0),
            genTestAssignmentOverrideTemplate(testAssignmentId, 1),
          ], overrides);

          if (notFound) {
            throw new Error('We could not find the following override(s):' + notFound);
          }

          // Clean up: delete the assignment
          return api.course.deleteAssignment({
            courseId,
            assignmentId: testAssignmentId,
          }).catch((err) => {
            throw new Error('We completed the test successfully but ran into an error while cleaning up (deleting the test assignment): ' + err.message);
          });
        });
    });

    it('Gets an assignment overrides', function () {
      // Create an assignment that we can override
      let testAssignmentId;
      const testAssignment = genTestAssignment();
      testAssignment.published = true;
      testAssignment.dueAt = now;
      return api.course.createAssignment(testAssignment)
        .then((assignment) => {
          testAssignmentId = assignment.id;
          // Add an assignment override
          return api.course.createAssignmentOverride(
            genTestAssignmentOverride(testAssignmentId)
          );
        })
        .then((override) => {
          // Get an override
          return api.course.getAssignmentOverride({
            courseId,
            assignmentId: testAssignmentId,
            overrideId: override.id,
          });
        })
        .then((override) => {
          // Check the override
          const comparison = utils.checkTemplate(
            genTestAssignmentOverrideTemplate(testAssignmentId),
            override
          );

          if (!comparison.isMatch) {
            throw new Error('The override we retrieved wasn\'t what we expected:\n' + comparison.description);
          }

          // Clean up: delete the assignment
          return api.course.deleteAssignment({
            courseId,
            assignmentId: testAssignmentId,
          }).catch((err) => {
            throw new Error('We completed the test successfully but ran into an error while cleaning up (deleting the test assignment): ' + err.message);
          });
        });
    });

    it('Creates an assignment overrides', function () {
      // Create an assignment that we can override
      let testAssignmentId;
      const testAssignment = genTestAssignment();
      testAssignment.published = true;
      testAssignment.dueAt = now;
      return api.course.createAssignment(testAssignment)
        .then((assignment) => {
          testAssignmentId = assignment.id;
          // Add an assignment override
          return api.course.createAssignmentOverride(
            genTestAssignmentOverride(testAssignmentId)
          );
        })
        .then((override) => {
          // Get an override
          return api.course.getAssignmentOverride({
            courseId,
            assignmentId: testAssignmentId,
            overrideId: override.id,
          });
        })
        .then((override) => {
          // Check the override
          const comparison = utils.checkTemplate(
            genTestAssignmentOverrideTemplate(testAssignmentId),
            override
          );

          if (!comparison.isMatch) {
            throw new Error('The override we created wasn\'t what we expected:\n' + comparison.description);
          }

          // Clean up: delete the assignment
          return api.course.deleteAssignment({
            courseId,
            assignmentId: testAssignmentId,
          }).catch((err) => {
            throw new Error('We completed the test successfully but ran into an error while cleaning up (deleting the test assignment): ' + err.message);
          });
        });
    });

    it('Deletes an assignment overrides', function () {
      // Create an assignment that we can override
      let testAssignmentId;
      const testAssignment = genTestAssignment();
      testAssignment.published = true;
      testAssignment.dueAt = now;
      return api.course.createAssignment(testAssignment)
        .then((assignment) => {
          testAssignmentId = assignment.id;
          // Add an assignment override
          return api.course.createAssignmentOverride(
            genTestAssignmentOverride(testAssignmentId)
          );
        })
        .then((override) => {
          // Delete the assignment override
          return api.course.deleteAssignmentOverride({
            courseId,
            assignmentId: testAssignmentId,
            overrideId: override.id,
          });
        })
        .then(() => {
          // List the overrides
          return api.course.listAssignmentOverrides({
            courseId,
            assignmentId: testAssignmentId,
          });
        })
        .then((overrides) => {
          // Check to make sure the override was removed
          const found = utils.templateFound(
            genTestAssignmentOverrideTemplate(testAssignmentId),
            overrides
          );

          if (found) {
            // It's in the list! This is wrong.
            throw new Error('The override wasn\'t deleted properly.');
          }

          // Clean up: delete the assignment
          return api.course.deleteAssignment({
            courseId,
            assignmentId: testAssignmentId,
          }).catch((err) => {
            throw new Error('We completed the test successfully but ran into an error while cleaning up (deleting the test assignment): ' + err.message);
          });
        });
    });
  });

  /*------------------------------------------------------------------------*/
  /*                            Submission Tests                            */
  /*------------------------------------------------------------------------*/

  describe('Submission', function () {
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

});
