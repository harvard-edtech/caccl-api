const utils = require('../../helpers/utils.js');
const api = require('../../helpers/genInstructorAPI.js')();
const environment = require('../../environment.js');

const courseId = environment.testCourseId;
const studentIds = environment.students.map((s) => {
  return parseInt(s.canvasId);
});
/*------------------------------------------------------------------------*/
/*                                 Helpers                                */
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

// Generate the parameters for a test page
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

// Generate the template of a test assignment's canvas response
function genTestAssignmentOverrideTemplate(assignmentId, index = 0) {
  return {
    assignment_id: assignmentId,
    title: 'test-assignment-override-' + index + '-' + stamp,
    due_at: nowISO,
    unlock_at: nowISO,
    lock_at: nowISO,
  };
}

/*------------------------------------------------------------------------*/
/*                                  Tests                                 */
/*------------------------------------------------------------------------*/


describe('Endpoints > Course > Assignment Overrides', function () {
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
