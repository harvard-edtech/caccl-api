const EndpointCategory = require('../../../classes/EndpointCategory.js');
const prefix = require('../../common/prefix.js');
const utils = require('../../common/utils.js');

class Rubric extends EndpointCategory {
  constructor(config) {
    super(config, Rubric);
  }
}

/*------------------------------------------------------------------------*/
/*                            Rubric Endpoints                            */
/*------------------------------------------------------------------------*/

/**
 * Lists the set of rubrics in a course
 * @method list
 * @param {number} courseId - Canvas course Id to add the rubric to
 * @return {Promise.<Object[]>} list of Canvas Rubrics {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
 */
Rubric.list = (config) => {
  // @action: list all the rubrics in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/rubrics`,
    method: 'GET',
  });
};

/**
 * Gets info on a specific rubric in a course
 * @method get
 * @param {number} courseId - Canvas course Id to add the rubric to
 * @param {number} rubricId - Canvas course Id to add the rubric to
 * @param {boolean} [include=null] - Allowed values: ['assessments',
 *   'graded_assessments', 'peer_assessments']. If excluded, no assessments
 *   will be included (default: none)
 * @param {string} [assessmentStyle=both omitted] - Allowed values:
 *   ['full','comments_only']
 *   (full = entire assessment, comments_only = only comment part of
 *   assessment). Only valid if including assessments
 * @return {Promise.<Object>} Canvas Rubric {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
 */
Rubric.get = (config) => {
  // @action: get info on a specific rubric in a course
  return config.visitEndpoint({
    path: `${prefix.v1}/courses/${config.options.courseId}/rubrics/${config.options.rubricId}`,
    method: 'GET',
    params: {
      include: utils.includeIfTruthy(config.options.include),
      style: utils.includeIfTruthy(config.options.assessmentStyle),
    },
  });
};

/**
 * Creates a new rubric for grading with free form comments enabled and add it
 *   to an assignment in a course.
 * @version unlisted
 * @method createFreeFormGradingRubricInAssignment
 * @param {number} courseId - Canvas course Id to add the rubric to
 * @param {number} assignmentId - Canvas course Id to add the rubric to
 * @param {array} rubricItems - List of rubric item objects:
 *   [{description, points, [longDescription]}, ...]
 * @param {string} [title=generated title] - Title of the new rubric
 * @return {Promise.<Object>} Canvas Rubric {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
 */
Rubric.createFreeFormGradingRubricInAssignment = (config) => {
  // @action: create a new free form grading rubric and add it to a specific assignment in a course
  // Infer points possible based on the rubric items
  let pointsPossible = 0;
  config.options.rubricItems.forEach((rubricItem) => {
    pointsPossible += rubricItem.points;
  });
  // Set title
  const title = (
    config.options.title
    || 'Unnamed-rubric-' + new Date().getTime()
  );
  const params = {
    title,
    'rubric[title]': title,
    'rubric[points_possible]': pointsPossible,
    'rubric_association[use_for_grading]': 1,
    'rubric_association[hide_score_total]': 0,
    'rubric_association[hide_points]': 0,
    'rubric_association[hide_outcome_results]': 0,
    'rubric[free_form_criterion_comments]': 1,
    points_possible: pointsPossible,
    rubric_id: 'new',
    'rubric_association[association_type]': 'Assignment',
    'rubric_association[association_id]': config.options.assignmentId,
    'rubric_association[purpose]': 'grading',
    skip_updating_points_possible: false,
  };
  config.options.rubricItems.forEach((rubricItem, i) => {
    params[`rubric[criteria][${i}][description]`] = (
      rubricItem.description
    );
    params[`rubric[criteria][${i}][points]`] = (
      rubricItem.points
    );
    params[`rubric[criteria][${i}][long_description]`] = (
      rubricItem.longDescription
    );
    params[`rubric[criteria][${i}][criterion_use_range]`] = false;
    params[`rubric[criteria][${i}][ratings][0][description]`] = (
      'Full Marks'
    );
    params[`rubric[criteria][${i}][ratings][0][points]`] = (
      rubricItem.points
    );
    params[`rubric[criteria][${i}][ratings][0][id]`] = 'blank';
    params[`rubric[criteria][${i}][ratings][1][description]`] = (
      'No Marks'
    );
    params[`rubric[criteria][${i}][ratings][1][points]`] = 0;
    params[`rubric[criteria][${i}][ratings][1][id]`] = 'blank_2';
  });
  return config.visitEndpoint({
    params,
    path: `${prefix.v1}/courses/${config.options.courseId}/rubrics`,
    method: 'POST',
  }).then((response) => {
    // Response is of form { rubric: <rubric object> } for no reason
    // We just extract that rubric object
    const { rubric } = response;
    return config.uncache([
      // Uncache list of rubrics
      `${prefix.v1}/courses/${config.options.courseId}/rubrics`,
      // Uncache rubric
      `${prefix.v1}/courses/${config.options.courseId}/rubrics/${response.id}`,
    ], rubric);
  });
};

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = Rubric;
