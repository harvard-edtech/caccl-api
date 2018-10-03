// Course
const courseApps = require('./course/apps.js');
const courseAssignmentGroups = require('./course/assignmentGroups.js');
const courseAssignments = require('./course/assignments.js');
const courseCourse = require('./course/course.js');
const courseEnrollments = require('./course/enrollments.js');
const courseGradebookColumns = require('./course/gradebookColumns.js');
const courseGroups = require('./course/groups.js');
const courseGroupSets = require('./course/groupSets.js');
const coursePages = require('./course/pages.js');
const courseQuizzes = require('./course/quizzes.js');
const courseSections = require('./course/sections.js');

// User
const userCourse = require('./user/course.js');
const userSelf = require('./user/self.js');

module.exports = {
  course: [
    courseApps,
    courseAssignmentGroups,
    courseAssignments,
    courseCourse,
    courseEnrollments,
    courseGradebookColumns,
    courseGroups,
    courseGroupSets,
    coursePages,
    courseQuizzes,
    courseSections,
  ],
  user: [
    userCourse,
    userSelf,
  ],
};
