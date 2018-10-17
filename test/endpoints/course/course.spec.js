const api = require('../../helpers/genInstructorAPI.js')();
const courseId = require('../../environment.js').testCourseId;

describe('Endpoints > Course > Course', function () {
  it('Gets a course', function () {
    return api.course.getCourse({
      courseId,
    }).then((course) => {
      // We can't check the content of the course because we're not restricting
      // the setup of the test course itself. All we can do is spot check if the
      // returned object has the fields we expect
      if (
        !course
        || !course.id
        || !course.name
        || !course.course_code
        || !course.time_zone
      ) {
        throw new Error('The course we retrieved didn\'t have the correct fields.');
      }
    });
  });
});
