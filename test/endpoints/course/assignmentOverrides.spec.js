const utils = require('../../helpers/utils.js');
const api = require('../../helpers/genInstructorAPI.js')();
const environment = require('../../environment.js');

const courseId = environment.testCourseId;
const studentIds = environment.students.map((s) => {
  return s.canvasId;
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



/*------------------------------------------------------------------------*/
/*                                  Tests                                 */
/*------------------------------------------------------------------------*/


describe('Endpoints > Course > Assignment Overrides', function () {
  
});
