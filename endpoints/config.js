// Course
const courseApps = require('./course/apps.js');
const courseAssignmentGroups = require('./course/assignmentGroups.js');
const courseAssignments = require('./course/assignments.js');
const courseCourse = require('./course/course.js');
const courseEnrollments = require('./course/enrollments.js');
const coursePages = require('./course/pages.js');
const courseSections = require('./course/sections.js');

// User
const userCourse = require('./user/course.js');

module.exports = {
  course: [
    courseApps,
    courseAssignmentGroups,
    courseAssignments,
    courseCourse,
    courseEnrollments,
    coursePages,
    courseSections,
  ],
  user: [
    userCourse,
  ],
};
