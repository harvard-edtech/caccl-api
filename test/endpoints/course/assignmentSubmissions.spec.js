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
  
});
