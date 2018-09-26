const SmartEndpoints = require('../index.js');
const environment = require('./environment.js');

describe('SmartEndpoints', function () {
  describe('Script-type function', function () {
    let se;
    beforeEach(function () {
      se = new SmartEndpoints({
        accessToken: environment.accessToken,
        canvasHost: environment.canvasHost,
        cacheType: 'memory',
      });
    });

    it('Gets enrollments', function () {
      return se.course.getStudents({
        courseId: environment.testCourseId,
      }).then(console.log);
    });
  });
});
