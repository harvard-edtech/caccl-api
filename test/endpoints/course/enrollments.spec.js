const api = require('../../helpers/genInstructorAPI.js')();
const courseId = require('../../environment.js').testCourseId;

describe('Endpoints > Course > Enrollments', function () {
  it('Lists enrollments', function () {
    return api.course.listEnrollments({
      courseId,
    }).then((enrollments) => {
      if (!enrollments || enrollments.length === 0) {
        throw new Error('No enrollments returned');
      }
    });
  });

  it('Lists students', function () {
    return api.course.listStudents({
      courseId,
    }).then((students) => {
      // Check to make sure role is 'StudentEnrollment'
      for (let i = 0; i < students.length; i++) {
        if (students[i].type !== 'StudentEnrollment') {
          throw new Error('At least one incorrect enrollment was returned! An enrollment didn\'t have type "StudentEnrollment".');
        }
      }
    });
  });

  it('Lists teaching team members', function () {
    return api.course.listTeachingTeamMembers({
      courseId,
    }).then((members) => {
      // Check to make sure role is 'TaEnrollment' or 'TeacherEnrollment'
      for (let i = 0; i < members.length; i++) {
        if (
          members[i].type !== 'TaEnrollment'
          && members[i].type !== 'TeacherEnrollment'
        ) {
          throw new Error('At least one incorrect enrollment was returned! An enrollment didn\'t have type "TaEnrollment" or "TeacherEnrollment".');
        }
      }
    });
  });

  it('Lists designers', function () {
    return api.course.listDesigners({
      courseId,
    }).then((designers) => {
      // Check to make sure role is 'DesignerEnrollment'
      for (let i = 0; i < designers.length; i++) {
        if (designers[i].type !== 'DesignerEnrollment') {
          throw new Error('At least one incorrect enrollment was returned! An enrollment didn\'t have type "DesignerEnrollment".');
        }
      }
    });
  });

  it('Lists observers', function () {
    return api.course.listObservers({
      courseId,
    }).then((observers) => {
      // Check to make sure role is 'ObserverEnrollment'
      for (let i = 0; i < observers.length; i++) {
        if (observers[i].type !== 'ObserverEnrollment') {
          throw new Error('At least one incorrect enrollment was returned! An enrollment didn\'t have type "ObserverEnrollment".');
        }
      }
    });
  });
});
