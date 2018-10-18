const api = require('../../helpers/genInstructorAPI.js')();
const courseId = require('../../environment.js').testCourseId;

describe('Endpoints > User > Course', function () {
  it('Lists the user\'s courses', function () {
    return api.user.listCourses()
      .then((courses) => {
        // Make sure the test course is in the list
        let found;
        for (let i = 0; i < courses.length; i++) {
          if (courses[i].id === courseId) {
            // Found!
            found = true;
            break;
          }
        }
        if (!found) {
          throw new Error('Could not find the test course');
        }
      });
  });
});
