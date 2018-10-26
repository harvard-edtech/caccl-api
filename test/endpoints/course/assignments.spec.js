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
/*                                  Tests                                 */
/*------------------------------------------------------------------------*/

describe('Endpoints > Course > Assignments', function () {
  
});
