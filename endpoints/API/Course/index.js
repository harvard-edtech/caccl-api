const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');

// Import subcategories
const Assignment = require('./Assignment.js');
const AssignmentGroup = require('./AssignmentGroup.js');
const App = require('./App.js');
const GradebookColumn = require('./GradebookColumn.js');
const Group = require('./Group.js');
const GroupSet = require('./GroupSet.js');
const Page = require('./Page.js');
const Quiz = require('./Quiz.js');
const Rubric = require('./Rubric.js');
const Section = require('./Section.js');

class Course extends EndpointCategory {
  constructor(config) {
    super(config, Course);
  }
}

/*------------------------------------------------------------------------*/
/*                             Subcategories:                             */
/*------------------------------------------------------------------------*/

Course.assignment = Assignment;
Course.assignmentgroup = AssignmentGroup;
Course.app = App;
Course.gradebookcolumn = GradebookColumn;
Course.group = Group;
Course.groupset = GroupSet;
Course.page = Page;
Course.quiz = Quiz;
Course.rubric = Rubric;
Course.section = Section;

/*------------------------------------------------------------------------*/
/*                               Endpoints:                               */
/*------------------------------------------------------------------------*/

/**
 * Gets info on a specific course
 * @author Gabriel Abrams
 * @method get
 * @param {number} courseId - Canvas course Id to get info on
 * @param {boolean} [includeSyllabus=false] - If truthy, includes syllabus
 *   body
 * @param {boolean} [includeTerm=false] - If truthy, includes term
 * @param {boolean} [includeAccount=false] - If truthy, includes account Id
 * @param {boolean} [includeDescription=false] - If truthy, includes public
 *   description
 * @param {boolean} [includeSections=false] - If truthy, includes sections
 * @param {boolean} [includeTeachers=false] - If truthy, includes teachers
 * @param {boolean} [includeCourseImage=false] - If truthy, includes the
 *   course image
 * @param {boolean} [includeNeedsGradingCount=false] - If truthy, includes the
 *   number of students who still need to be graded
 * @return {Promise.<Object>} Canvas course {@link https://canvas.instructure.com/doc/api/courses.html#Course}
 */
Course.get = (config) => {
  // @action: get info on a specific course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}`,
    method: 'GET',
    params: {
      include: utils.genIncludesList({
        syllabus_body: config.options.includeSyllabus,
        term: config.options.includeTerm,
        account: config.options.includeAccount,
        public_description: config.options.includeDescription,
        sections: config.options.includeSections,
        teachers: config.options.includeTeachers,
        course_image: config.options.includeCourseImage,
        needs_grading_count: config.options.includeNeedsGradingCount,
      }),
    },
  });
};

/**
 * Gets the list of enrollments in a course
 * @author Gabriel Abrams
 * @method listEnrollments
 * @param {number} courseId - Canvas course Id to query
 * @param {string} [types=all] - list of enrollment types to include:
 *   ['student', 'ta', 'teacher', 'designer', 'observer']
 *   Defaults to all types.
 * @param {string} [activeOnly=false] - If truthy, only active enrollments
 *   included
 * @param {string} [includeAvatar=false] - If truthy, avatar_url is included
 * @param {string} [includeGroups=false] - If truthy, group_ids is included
 * @return {Promise.<Object[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
 */
Course.listEnrollments = (config) => {
  // @action: get enrollments from a course
  const params = {};

  // Enrollment types
  if (config.options.types) {
    params.type = config.options.types.map((type) => {
      if (type.includes('Enrollment')) {
        return type;
      }
      return type.charAt(0).toUpperCase() + type.substr(1) + 'Enrollment';
    });
  }

  // Filter to only active
  if (config.options.activeOnly) {
    params.state = ['active'];
  }

  // Include avatar
  if (config.options.includeAvatar) {
    params.include = ['avatar_url'];
  }

  // Include groups
  if (config.options.includeGroups) {
    if (!params.include) {
      params.include = [];
    }
    params.include.push('group_ids');
  }

  return config.visitEndpoint({
    params,
    path: `${prefix.v1}/courses/${config.options.courseId}/enrollments`,
    method: 'GET',
  });
};

/**
 * Gets the list of students in a course
 * @author Gabriel Abrams
 * @method listStudents
 * @param {number} courseId - Canvas course Id to query
 * @param {string} [activeOnly=false] - If truthy, only active enrollments
 *   included
 * @param {string} [includeAvatar=false] - If truthy, avatar_url is included
 * @param {string} [includeGroups=false] - If truthy, group_ids is included
 * @return {Promise.<Object[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
 */
Course.listStudents = (config) => {
  // @action: get the list of students in a course
  const newOptions = config.options;
  newOptions.types = ['student'];
  return config.api.course.listEnrollments(newOptions);
};

/**
 * Gets the list of TAs and Teachers in a course
 * @author Gabriel Abrams
 * @method listTeachingTeamMembers
 * @param {number} courseId - Canvas course Id to query
 * @param {string} [activeOnly=false] - If truthy, only active enrollments
 *   included
 * @param {string} [includeAvatar=false] - If truthy, avatar_url is included
 * @param {string} [includeGroups=false] - If truthy, group_ids is included
 * @return {Promise.<Object[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
 */
Course.listTeachingTeamMembers = (config) => {
  // @action: get the list of TAs and Teachers in a course
  const newOptions = config.options;
  newOptions.types = ['ta', 'teacher'];
  return config.api.course.listEnrollments(newOptions);
};

/**
 * Gets the list of designers in a course
 * @author Gabriel Abrams
 * @method listDesigners
 * @param {number} courseId - Canvas course Id to query
 * @param {string} [activeOnly=false] - If truthy, only active enrollments
 *   included
 * @param {string} [includeAvatar=false] - If truthy, avatar_url is included
 * @param {string} [includeGroups=false] - If truthy, group_ids is included
 * @return {Promise.<Object[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
 */
Course.listDesigners = (config) => {
  // @action: get the list of designers in a course
  const newOptions = config.options;
  newOptions.types = ['designer'];
  return config.api.course.listEnrollments(newOptions);
};

/**
 * Gets the list of observers in a course
 * @author Gabriel Abrams
 * @method listObservers
 * @param {number} courseId - Canvas course Id to query
 * @param {string} [activeOnly=false] - If truthy, only active enrollments
 *   included
 * @param {string} [includeAvatar=false] - If truthy, avatar_url is included
 * @param {string} [includeGroups=false] - If truthy, group_ids is included
 * @return {Promise.<Object[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
 */
Course.listObservers = (config) => {
  // @action: get the list of observers in a course
  const newOptions = config.options;
  newOptions.types = ['observer'];
  return config.api.course.listEnrollments(newOptions);
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Course;
