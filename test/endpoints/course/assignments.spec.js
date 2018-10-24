const path = require('path');
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

/*------------------------------------------------------------------------*/
/*                                  Tests                                 */
/*------------------------------------------------------------------------*/

describe('Endpoints > Course > Assignments', function () {
  it('Lists assignments', function () {
    let assignmentsToDelete;
    // Create assignments so we can check for them in the list
    return Promise.all([
      api.course.createAssignment(genTestAssignment(0)),
      api.course.createAssignment(genTestAssignment(1)),
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
        return api.course.deleteAssignment({
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
    return api.course.createAssignment(genTestAssignment())
      .then((assignment) => {
        // Get the assignment
        return api.course.getAssignment({
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
        return api.course.deleteAssignment({
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
    return api.course.createAssignment(genTestAssignment())
      .then((assignment) => {
        testAssignmentId = assignment.id;
        // Try to update the assignment
        return api.course.updateAssignment({
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
        return api.course.getAssignment({
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
        return api.course.deleteAssignment({
          courseId,
          assignmentId: testAssignmentId,
        }).catch((err) => {
          throw new Error('Successfully created and updated an assignment but could not clean up (delete) the assignment afterward. We ran into this error: ' + err.message);
        });
      });
  });

  it('Creates an assignment', function () {
    return api.course.createAssignment(genTestAssignment())
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
        return api.course.deleteAssignment({
          courseId,
          assignmentId: assignment.id,
        }).catch((err) => {
          throw new Error('Successfully created an assignment but could not clean up (delete) the assignment afterward. We ran into this error: ' + err.message);
        });
      });
  });

  it('Deletes an assignment', function () {
    return api.course.createAssignment(genTestAssignment())
      .catch((err) => {
        throw new Error('Could not create an assignment so we could delete it. We ran into an error: "' + err.message + '"');
      }).then((assignment) => {
        // Now try to delete the assignment
        return api.course.deleteAssignment({
          courseId,
          assignmentId: assignment.id,
        });
      })
      .then(() => {
        // List the assignments
        return api.course.listAssignments({
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
