/**
 * Functions for interacting with assignment groups within courses
 * @namespace api.course.assignmentGroup
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasAssignmentGroup from '../../types/CanvasAssignmentGroup';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

class ECatAssignmentGroup extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                                Endpoints                               */
  /*------------------------------------------------------------------------*/

  /**
   * Lists assignment groups in a course
   * @author Gabe Abrams
   * @memberof api.course.assignmentGroup
   * @instance
   * @async
   * @method list
   * @param {object} [opts] object containing all arguments
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignmentGroup[]>} list of Canvas AssignmentGroups {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
   */
  public async list(
    opts: {
      courseId?: number,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasAssignmentGroup[]> {
    return this.visitEndpoint({
      config,
      action: 'list the assignment groups in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignment_groups`,
      method: 'GET',
    });
  }

  /**
   * Gets info on a specific assignment group in a course
   * @author Gabe Abrams
   * @memberof api.course.assignmentGroup
   * @instance
   * @async
   * @method get
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentGroupId Assignment group to get
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {boolean} [opts.includeAssignments] if true, the list of
   *   assignments inside the group is included
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
   */
  public async get(
    opts: {
      assignmentGroupId: number,
      courseId?: number,
      includeAssignments?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasAssignmentGroup> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific assignment group in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignment_groups/${opts.assignmentGroupId}`,
      method: 'GET',
      params: {
        include: utils.genIncludesList({
          assignments: opts.includeAssignments,
        }),
      },
    });
  }

  /**
   * Updates an assignment group in a course
   * @author Gabe Abrams
   * @memberof api.course.assignmentGroup
   * @instance
   * @async
   * @method update
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentGroupId Assignment group to update
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {string} [opts.name=current value] New assignment group name
   * @param {number} [opts.weight=current value] New weight
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
   */
  public async update(
    opts: {
      assignmentGroupId: number,
      courseId?: number,
      name?: string,
      weight?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasAssignmentGroup> {
    return this.visitEndpoint({
      config,
      action: 'update an assignment group in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignment_groups/${opts.assignmentGroupId}`,
      method: 'PUT',
      params: {
        name: utils.includeIfTruthy(opts.name),
        group_weight: utils.includeIfNumber(opts.weight),
      },
    });
  }

  /**
   * Create a new assignment group in a course
   * @author Gabe Abrams
   * @memberof api.course.assignmentGroup
   * @instance
   * @async
   * @method create
   * @param {object} opts object containing all arguments
   * @param {string} opts.name New assignment group name
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {number} [opts.weight=0] Assignment group weight
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
   */
  public async create(
    opts: {
      name: string,
      courseId?: number,
      weight?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasAssignmentGroup> {
    return this.visitEndpoint({
      config,
      action: 'create a new assignment group in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignment_groups`,
      method: 'POST',
      params: {
        name: utils.includeIfTruthy(opts.name),
        group_weight: utils.includeIfNumber(opts.weight),
      },
    });
  }

  /**
   * Deletes an assignment group from a course
   * @author Gabe Abrams
   * @memberof api.course.assignmentGroup
   * @instance
   * @async
   * @method delete
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentGroupId Assignment group to delete
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {number} [opts.moveAssignmentsTo] Assignment group to move
   *   assignments to. If this parameter isn't included, assignments in the
   *   assignment group will be deleted.
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignmentGroup>} Canvas AssignmentGroup {@link https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup}
   */
  public async delete(
    opts: {
      assignmentGroupId: number,
      courseId?: number,
      moveAssignmentsTo?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasAssignmentGroup> {
    return this.visitEndpoint({
      config,
      action: 'delete an assignment group from a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignment_groups/${opts.assignmentGroupId}`,
      method: 'DELETE',
      params: {
        move_assignments_to: utils.includeIfNumber(opts.moveAssignmentsTo),
      },
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatAssignmentGroup;
