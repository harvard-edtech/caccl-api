/**
 * Enrollments endpoints module
 * @module endpoints/course/enrollments
 * @see module: endpoints/course/enrollments
 */

const prefix = require('../helpers/prefix.js');

module.exports = [

  /**
   * Gets the list of enrollments in a course
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
  {
    name: 'listEnrollments',
    action: 'get enrollments from a course',
    run(config) {
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
    },
  },

  /**
   * Gets the list of students in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {string} [activeOnly=false] - If truthy, only active enrollments
   *   included
   * @param {string} [includeAvatar=false] - If truthy, avatar_url is included
   * @param {string} [includeGroups=false] - If truthy, group_ids is included
   * @return {Promise.<Object[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
   */
  {
    name: 'listStudents',
    action: 'get the list of students in a course',
    run(config) {
      const newOptions = config.options;
      newOptions.types = ['student'];
      return config.self.listEnrollments(newOptions);
    },
  },

  /**
   * Gets the list of TAs and Teachers in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {string} [activeOnly=false] - If truthy, only active enrollments
   *   included
   * @param {string} [includeAvatar=false] - If truthy, avatar_url is included
   * @param {string} [includeGroups=false] - If truthy, group_ids is included
   * @return {Promise.<Object[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
   */
  {
    name: 'listTeachingTeamMembers',
    action: 'get the list of TAs and Teachers in a course',
    run(config) {
      const newOptions = config.options;
      newOptions.types = ['ta', 'teacher'];
      return config.self.listEnrollments(newOptions);
    },
  },

  /**
   * Gets the list of designers in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {string} [activeOnly=false] - If truthy, only active enrollments
   *   included
   * @param {string} [includeAvatar=false] - If truthy, avatar_url is included
   * @param {string} [includeGroups=false] - If truthy, group_ids is included
   * @return {Promise.<Object[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
   */
  {
    name: 'listDesigners',
    action: 'get the list of designers in a course',
    run(config) {
      const newOptions = config.options;
      newOptions.types = ['designer'];
      return config.self.listEnrollments(newOptions);
    },
  },

  /**
   * Gets the list of observers in a course
   * @param {number} courseId - Canvas course Id to query
   * @param {string} [activeOnly=false] - If truthy, only active enrollments
   *   included
   * @param {string} [includeAvatar=false] - If truthy, avatar_url is included
   * @param {string} [includeGroups=false] - If truthy, group_ids is included
   * @return {Promise.<Object[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
   */
  {
    name: 'listObservers',
    action: 'get the list of observers in a course',
    run(config) {
      const newOptions = config.options;
      newOptions.types = ['observer'];
      return config.self.listEnrollments(newOptions);
    },
  },

];
