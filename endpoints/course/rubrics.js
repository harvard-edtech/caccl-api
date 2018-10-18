const utils = require('../helpers/utils.js');

module.exports = [
  /**
   * Lists the set of rubrics in a course
   * @param {number} courseId - Canvas course Id to add the rubric to
   * @return list of Rubrics (see: https://canvas.instructure.com/doc/api/rubrics.html#Rubric)
   */
  {
    name: 'listRubrics',
    action: 'list all the rubrics in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/rubrics',
        method: 'GET',
      });
    },
  },

  /**
   * Gets info on a specific rubric in a course
   * @param {number} courseId - Canvas course Id to add the rubric to
   * @param {number} rubricId - Canvas course Id to add the rubric to
   * @param {boolean} include - Optional. Allowed values: ['assessments',
   *   'graded_assessments', 'peer_assessments']. If excluded, no assessments
   *   will be included (default: none)
   * @param {string} assessmentStyle - Optional. Allowed values:
   *   ['full','comments_only']
   *   (full = entire assessment, comments_only = only comment part of
   *   assessment). Only valid if including assessments (default: both data and
   *   comments are omitted)
   * @return Rubric (see: https://canvas.instructure.com/doc/api/rubrics.html#Rubric)
   */
  {
    name: 'getRubric',
    action: 'get info on a specific rubric in a course',
    run: (cg) => {
      return cg.visitEndpoint({
        path: '/api/v1/courses/' + cg.options.courseId + '/rubrics/' + cg.options.rubricId,
        method: 'GET',
        params: {
          include: utils.includeIfTruthy(cg.options.include),
          style: utils.includeIfTruthy(cg.options.assessmentStyle),
        },
      });
    },
  },

  /**
   * Creates a new rubric for grading with free form comments enabled and add it
   *   to an assignment in a course.
   * @status unlisted
   * @param {number} courseId - Canvas course Id to add the rubric to
   * @param {number} assignmentId - Canvas course Id to add the rubric to
   * @param {string} title - Title of the new rubric
   * @param {array} rubricItems - List of rubric item objects:
   *   [{description, longDescription (optional), points}, ...]
   * @return Rubric (see: https://canvas.instructure.com/doc/api/rubrics.html#Rubric)
   */
  {
    name: 'createFreeFormGradingRubricInAssignment',
    action: 'create a new free form grading rubric and add it to a specific assignment in a course',
    run: (cg) => {
      let pointsPossible = 0;
      cg.options.rubricItems.forEach((rubricItem) => {
        pointsPossible += rubricItem.points;
      });
      const params = {
        'rubric[title]': cg.options.title,
        'rubric[points_possible]': pointsPossible,
        'rubric_association[use_for_grading]': 1,
        'rubric_association[hide_score_total]': 0,
        'rubric_association[hide_points]': 0,
        'rubric_association[hide_outcome_results]': 0,
        'rubric[free_form_criterion_comments]': 1,
        title: cg.options.title,
        points_possible: pointsPossible,
        rubric_id: 'new',
        'rubric_association[association_type]': 'Assignment',
        'rubric_association[association_id]': cg.options.assignmentId,
        'rubric_association[purpose]': 'grading',
        skip_updating_points_possible: false,
      };
      cg.options.rubricItems.forEach((rubricItem, i) => {
        params['rubric[criteria][' + i + '][description]'] = (
          rubricItem.description
        );
        params['rubric[criteria][' + i + '][points]'] = (
          rubricItem.points
        );
        params['rubric[criteria][' + i + '][long_description]'] = (
          rubricItem.longDescription
        );
        params['rubric[criteria][' + i + '][criterion_use_range]'] = false;
        params['rubric[criteria][' + i + '][ratings][0][description]'] = (
          'Full Marks'
        );
        params['rubric[criteria][' + i + '][ratings][0][points]'] = (
          rubricItem.points
        );
        params['rubric[criteria][' + i + '][ratings][0][id]'] = 'blank';
        params['rubric[criteria][' + i + '][ratings][1][description]'] = (
          'No Marks'
        );
        params['rubric[criteria][' + i + '][ratings][1][points]'] = 0;
        params['rubric[criteria][' + i + '][ratings][1][id]'] = 'blank_2';
      });
      return cg.visitEndpoint({
        params,
        path: '/api/v1/courses/' + cg.options.courseId + '/rubrics',
        method: 'POST',
      }).then((response) => {
        // Response is of form { rubric: <rubric object> } for no reason
        // We just extract that rubric object
        const { rubric } = response;
        return cg.uncache([
          // Uncache list of rubrics
          '/api/v1/courses/' + cg.options.courseId + '/rubrics',
          // Uncache rubric
          '/api/v1/courses/' + cg.options.courseId + '/rubrics/' + response.id,
        ], rubric);
      });
    },
  },
];
