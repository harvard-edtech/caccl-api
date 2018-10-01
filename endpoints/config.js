// Course
const courseApps = require('./course/apps.js');
const courseEnrollments = require('./course/enrollments.js');

// User
const userCourse = require('./user/course.js');

module.exports = {
  course: [
    courseApps,
    courseEnrollments,
  ],
  user: [
    userCourse,
  ],
};
