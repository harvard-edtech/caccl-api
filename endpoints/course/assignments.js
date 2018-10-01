const utils = require('../helpers/utils.js');

module.exports = () => {
  return [

    /*------------------------------------------------------------------------*/
    /*                               Assignments                              */
    /*------------------------------------------------------------------------*/

    /**
     * Lists the quizzes in a course
     * @param {number} courseId - Canvas course Id to query
     */
    {
      name: 'listAssignments',
      action: 'get the list of assignments in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments',
          method: 'GET',
        });
      },
    },

    /**
     * Get info on a specific assignment in a course
     * @param {number} courseId - Canvas course Id to query
     * @param {number} assignmentId - Canvas assignment Id
     */
    {
      name: 'getAssignment',
      action: 'get info on a specific assignment in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments/'
            + options.assignmentId,
          method: 'GET',
        });
      },
    },

    /**
     * Creates a Canvas assignment
     * @param {number} courseId - Canvas course Id to create an assignment in
     * @param {string} name - The name of the assignment
     * @param {number} pointsPossible - Points possible (default: null)
     * @param {string} dueAt - Due at datetime (default: none)
     * @param {string} lockAt - Due at datetime (default: none)
     * @param {string} unlockAt - Due at datetime (default: none)
     * @param {string} description - html description of
     *   the assignment (default: none)
     * @param {string} submissionTypes - Submission type(s) (default: none)
     * @param {string} allowedExtensions - List of allowed file extensions
     *   (exclude period). Online upload must be enabled (default: any)
     * @param {string} gradingType - Grading type (default: points)
     * @param {number} position - Position in assignment list (default: last)
     * @param {boolean} published - If true, publish page upon
     *   creation (default: false)
     * @param {boolean} muted - If true, assignment is muted (default: false)
     * @param {number} groupSetId - Student group set Id
     *   (default: none/singleton)
     * @param {number} assignmentGroupId - Assignment group Id (default: top
     *   assignment group in the course)
     * @param {boolean} peerReviewsEnabled - If true, users asked to submit
     *   peer reviews (default: false)
     * @param {boolean} automaticPeerReviewsEnabled - If true, Canvas will
     *   automatically assign peer reviews (default: false)
     * @param {boolean} omitFromFinalGrade - If true, assignment is omitted from
     *   the final grade (default: false)
     * @param {boolean} gradeGroupStudentsIndividually - If true, students in
     *   groups can be given separate grades and when one student in a group
     *   gets a grade, other students do not get graded (default: false)
     */
    {
      name: 'createAssignment',
      action: 'create a new assignment in a course',
      run: (options, visitEndpoint) => {
        return visitEndpoint({
          path: '/api/v1/courses/' + options.courseId + '/assignments',
          method: 'POST',
          params: {
            position: utils.includeIfTruthy(options.position),
            'assignment[peer_reviews]':
              utils.includeIfBoolean(options.peerReviewsEnabled),
            'assignment[automatic_peer_reviews]':
              utils.includeIfBoolean(options.automaticPeerReviewsEnabled),
            'assignment[grade_group_students_individually]':
              utils.includeIfBoolean(options.gradeGroupStudentsIndividually),
            'assignment[description]':
              utils.includeIfTruthy(options.description),
            'assignment[allowed_extensions]':
              utils.includeIfTruthy(options.allowedExtensions),
            'assignment[group_category_id]':
              utils.includeIfTruthy(options.groupSetId),
            'assignment[points_possible]':
              utils.includeIfNumber(options.pointsPossible),
            'assignment[due_at]': utils.includeIfTruthy(options.dueAt),
            'assignment[lock_at]': utils.includeIfTruthy(options.lockAt),
            'assignment[unlock_at]': utils.includeIfTruthy(options.unlockAt),
            'assignment[published]':
              utils.includeIfBoolean(options.published),
            'assignment[assignment_group_id]':
              utils.includeIfNumber(options.assignmentGroupId),
            'assignment[omit_from_final_grade]':
              utils.includeIfBoolean(options.omitFromFinalGrade),
            'assignment[muted]': utils.includeIfBoolean(options.muted),
          },
        });
      },
    },

    // TODO: Continue adding endpoints
  ];
};
