/**
 * Endpoints structure config file module
 * @module endpoints/config
 * @see module: endpoints/config
 */

// Course
const courseApps = require('./course/apps.js');
const courseAssignmentGrading = require('./course/assignmentGrading.js');
const courseAssignmentGroups = require('./course/assignmentGroups.js');
const courseAssignmentOverrides = require('./course/assignmentOverrides.js');
const courseAssignments = require('./course/assignments.js');
const courseAssignmentSubmissions = require('./course/assignmentSubmissions.js');
const courseCourse = require('./course/course.js');
const courseEnrollments = require('./course/enrollments.js');
const courseGradebookColumns = require('./course/gradebookColumns.js');
const courseGroups = require('./course/groups.js');
const courseGroupSets = require('./course/groupSets.js');
const coursePages = require('./course/pages.js');
const courseQuizzes = require('./course/quizzes.js');
const courseRubrics = require('./course/rubrics.js');
const courseSections = require('./course/sections.js');

// User
const userCourse = require('./user/course.js');
const userSelf = require('./user/self.js');

module.exports = {
  course: [
    courseApps,
    courseAssignmentGrading,
    courseAssignmentGroups,
    courseAssignmentOverrides,
    courseAssignments,
    courseAssignmentSubmissions,
    courseCourse,
    courseEnrollments,
    courseGradebookColumns,
    courseGroups,
    courseGroupSets,
    coursePages,
    courseQuizzes,
    courseRubrics,
    courseSections,
  ],
  user: [
    userCourse,
    userSelf,
  ],
};
