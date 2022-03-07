/**
 * Functions for interacting with rubrics within courses
 * @namespace api.course.rubric
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';
import CanvasRubric from '../../types/CanvasRubric';

// Endpoint category
class ECatRubric extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                            Rubric Endpoints                            */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the set of rubrics in a course
   * @author Gabe Abrams
   * @method list
   * @memberof api.course.rubric
   * @instance
   * @param {object} [opts] object containing all arguments
   * @param {number} [opts.courseId=default course id] Canvas course Id to add
   *   the rubric to
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasRubric[]>} list of Canvas Rubrics {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
   */
  public async list(
    opts: {
      courseId?: number,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasRubric[]> {
    return this.visitEndpoint({
      config,
      action: 'list all the rubrics in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/rubrics`,
      method: 'GET',
    });
  }

  /**
   * Gets info on a specific rubric in a course
   * @author Gabe Abrams
   * @method get
   * @memberof api.course.rubric
   * @instance
   * @param {object} opts object containing all arguments
   * @param {number} opts.rubricId Canvas course Id to add the rubric to
   * @param {number} [opts.courseId=default course id] Canvas course Id to add
   *   the rubric to
   * @param {string} [opts.include] Allowed values: ['assessments',
   *   'graded_assessments', 'peer_assessments']. If excluded, no assessments
   *   will be included (default: none)
   * @param {string} [opts.assessmentStyle=both omitted] Allowed values:
   *   ['full','comments_only']
   *   (full = entire assessment, comments_only = only comment part of
   *   assessment). Only valid if including assessments
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasRubric>} Canvas Rubric {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
   */
  public async get(
    opts: {
      rubricId: number,
      courseId?: number,
      include?: (
        'assessments'
        | 'graded_assessments'
        | 'peer_assessments'
      ),
      assessmentStyle?: ('full' | 'comments_only'),
    },
    config?: APIConfig,
  ): Promise<CanvasRubric> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific rubric in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/rubrics/${opts.rubricId}`,
      method: 'GET',
      params: {
        include: utils.includeIfTruthy(opts.include),
        style: utils.includeIfTruthy(opts.assessmentStyle),
      },
    });
  }

  /**
   * Creates a new rubric for grading with free form comments enabled and add it
   *   to an assignment in a course.
   * @author Gabe Abrams
   * @method createFreeFormGradingRubricInAssignment
   * @memberof api.course.rubric
   * @instance
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas course Id to add the rubric to
   * @param {Array} opts.rubricItems List of rubric item objects:
   *   [{description, points, [longDescription]}, ...]
   * @param {number} [opts.courseId=default course id] Canvas course Id to add the rubric to
   * @param {string} [opts.title=generated title] Title of the new rubric
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasRubric>} Canvas Rubric {@link https://canvas.instructure.com/doc/api/rubrics.html#Rubric}
   */
  public async createFreeFormGradingRubricInAssignment(
    opts: {
      assignmentId: number,
      rubricItems: (
        {
          description: string,
          points: number,
          longDescription?: string,
        }
      )[],
      courseId?: number,
      title?: string,
    },
    config?: APIConfig,
  ): Promise<CanvasRubric> {
    // Infer points possible based on the rubric items
    let pointsPossible = 0;
    opts.rubricItems.forEach((rubricItem) => {
      pointsPossible += rubricItem.points;
    });
    // Set title
    const title = (
      opts.title
      || 'Unnamed-rubric-' + Date.now()
    );
    const params: { [k: string]: any } = {
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
      'rubric_association[association_id]': opts.assignmentId,
      'rubric_association[purpose]': 'grading',
      skip_updating_points_possible: false,
    };
    opts.rubricItems.forEach((rubricItem, i) => {
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

    const response = await this.visitEndpoint({
      config,
      action: 'create a new free form grading rubric and add it to a specific assignment in a course',
      params,
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/rubrics`,
      method: 'POST',
    });

    return response.rubric;
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatRubric;
