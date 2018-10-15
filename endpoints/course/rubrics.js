module.exports = [
  /**
   * Creates a new rubric for grading with free form comments enabled.
   * @param {number} courseId - Canvas course Id to add the rubric to
   * @param {number} assignmentId - Canvas course Id to add the rubric to
   * @param {string} title - Title of the new rubric
   * @param {array} rubricItems - List of rubric item objects:
   *   [{description, longDescription (optional), points}, ...]
   * @return Rubric (see: https://canvas.instructure.com/doc/api/rubrics.html#Rubric)
   */
  // WARNING: This endpoint is not documented, supported, or even listed in
  // the Canvas online API. It may change, be removed, or completely stop
  // working at any moment.
  {
    name: 'createFreeFormGradingRubric_unlisted',
    action: 'create a new free form grading rubric in a course',
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
      });
    },
  },
];
