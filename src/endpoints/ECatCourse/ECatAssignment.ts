/**
 * Functions for interacting with assignments within courses
 * @namespace api.course.assignment
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasAssignment from '../../types/CanvasAssignment';
import CanvasUser from '../../types/CanvasUser';
import CanvasSubmission from '../../types/CanvasSubmission';
import CanvasProgress from '../../types/CanvasProgress';
import CACCLError from 'caccl-error';
import ErrorCode from '../../shared/types/ErrorCode';
import CanvasAssignmentOverride from '../../types/CanvasAssignmentOverride';

// Import shared helpers
import utils from '../../shared/helpers/utils';
import waitForCompletion from '../../shared/helpers/waitForCompletion';
import parallelLimit from '../../shared/helpers/parallelLimit';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Endpoint category
class ECatAssignment extends EndpointCategory {
  /*------------------------------------------------------------------------*/
  /*                           Table of Contents:                           */
  /*                           - Assignments                                */
  /*                           - Grading                                    */
  /*                           - Overrides                                  */
  /*                           - Submissions                                */
  /*------------------------------------------------------------------------*/

  /*------------------------------------------------------------------------*/
  /*                          Assignment Endpoints                          */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the assignments in a course
   * @author Gabe Abrams
   * @method list
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} [opts] object containing all arguments
   * @param {number} [opts.courseId=default course id] Canvas course Id to
   *   query
   * @param {boolean} [opts.ignoreOverridesForDates] if true, assignment
   *   dates are taken from the default dates instead of from the ones in
   *   overrides
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignment[]>} list of Canvas Assignments {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
   */
  public async list(
    opts: {
      courseId?: number,
      ignoreOverridesForDates?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasAssignment[]> {
    return this.visitEndpoint({
      config,
      action: 'get the list of assignments in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments`,
      method: 'GET',
      params: {
        override_assignment_dates: !opts.ignoreOverridesForDates,
      },
    });
  }

  /**
   * Get info on a specific assignment in a course
   * @author Gabe Abrams
   * @method get
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts  object containing all arguments
   * @param {number} opts.assignmentId  Canvas assignment Id
   * @param {number} [opts.courseId=default course id]  Canvas course Id to query
   * @param {boolean} [opts.ignoreOverridesForDates]  if true, assignment
   *   dates are taken from the default dates instead of from the ones in
   *   overrides
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
   */
  public async get(
    opts: {
      assignmentId: number,
      ignoreOverridesForDates?: boolean,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasAssignment> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}`,
      method: 'GET',
      params: {
        override_assignment_dates: !opts.ignoreOverridesForDates,
      },
    });
  }

  /**
   * Updates a Canvas assignment
   * @author Gabe Abrams
   * @method update
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts - object containing all arguments
   * @param {number} opts.assignmentId Canvas assignment Id to update
   * @param {number} [opts.courseId=default course id] Canvas course Id to query
   * @param {string} [opts.name=current value] The name of the assignment
   * @param {number} [opts.pointsPossible=current value] Points possible
   * @param {date} [opts.dueAt=current value] Due at datetime
   * @param {date} [opts.lockAt=current value] Due at datetime
   * @param {date} [opts.unlockAt=current value] Due at datetime
   * @param {string} [opts.description=current value] html description of
   *   the assignment
   * @param {string[]} [opts.submissionTypes=current value] Submission type(s)
   * @param {string} [opts.allowedExtensions=current value] List of allowed
   *   file extensions (exclude period). Online upload must be enabled
   * @param {string} [opts.gradingType=current value] Grading type
   * @param {number} [opts.position=current value] Position in assignment
   *   list
   * @param {boolean} [opts.published=current value] If true, publish page
   *   upon creation. Must be a boolean
   * @param {boolean} [opts.muted=current value] If true, assignment is
   *   muted. Must be a boolean
   * @param {number} [opts.groupSetId=current value] Student group set Id
   * @param {number} [opts.assignmentGroupId=current value] Assignment group
   *   Id
   * @param {boolean} [opts.peerReviewsEnabled=current value] If true, users
   *   asked to submit peer reviews. Must be a boolean
   * @param {boolean} [opts.automaticPeerReviewsEnabled=current value] If
   *   true, Canvas will automatically assign peer reviews. Must be a boolean
   * @param {boolean} [opts.omitFromFinalGrade=current value] If true,
   *   assignment is omitted from the final grade. Must be a boolean
   * @param {boolean} [opts.gradeGroupStudentsIndividually=current value] If
   *   true, students in groups can be given separate grades and when one student
   *   in a group gets a grade, other students do not get graded. Must be a
   *   boolean
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
   */
  public async update(
    opts: {
      assignmentId: number,
      courseId?: number,
      name?: string,
      pointsPossible?: number,
      dueAt?: (Date | string),
      lockAt?: (Date | string),
      unlockAt?: (Date | string),
      description?: string,
      submissionTypes?: (
        'online_quiz'
        | 'none'
        | 'on_paper'
        | 'discussion_topic'
        | 'external_tool'
        | 'online_upload'
        | 'online_text_entry'
        | 'online_url'
        | 'media_recording'
        | 'student_annotation'
      )[],
      allowedExtensions?: string[],
      gradingType?: (
        'pass_fail'
        | 'percent'
        | 'letter_grade'
        | 'gpa_scale'
        | 'points'
        | 'not_graded'
      ),
      position?: number,
      published?: boolean,
      muted?: boolean,
      groupSetId?: number,
      assignmentGroupId?: number,
      peerReviewsEnabled?: boolean,
      automaticPeerReviewsEnabled?: boolean,
      omitFromFinalGrade?: boolean,
      gradeGroupStudentsIndividually?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasAssignment> {
    return this.visitEndpoint({
      config,
      action: 'update an assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}`,
      method: 'PUT',
      params: {
        'assignment[name]': utils.includeIfTruthy(opts.name),
        'assignment[submission_types]':
          utils.includeIfTruthy(opts.submissionTypes),
        'assignment[grading_type]':
          utils.includeIfTruthy(opts.gradingType),
        position: utils.includeIfTruthy(opts.position),
        'assignment[peer_reviews]':
          utils.includeIfBoolean(opts.peerReviewsEnabled),
        'assignment[automatic_peer_reviews]':
          utils.includeIfBoolean(opts.automaticPeerReviewsEnabled),
        'assignment[grade_group_students_individually]':
          utils.includeIfBoolean(
            opts.gradeGroupStudentsIndividually
          ),
        'assignment[description]':
          utils.includeIfTruthy(opts.description),
        'assignment[allowed_extensions]':
          utils.includeIfTruthy(opts.allowedExtensions),
        'assignment[group_category_id]':
          utils.includeIfTruthy(opts.groupSetId),
        'assignment[points_possible]':
          utils.includeIfNumber(opts.pointsPossible),
        'assignment[due_at]': utils.includeIfDate(opts.dueAt),
        'assignment[lock_at]': utils.includeIfDate(opts.lockAt),
        'assignment[unlock_at]': utils.includeIfDate(opts.unlockAt),
        'assignment[published]':
          utils.includeIfBoolean(opts.published),
        'assignment[assignment_group_id]':
          utils.includeIfNumber(opts.assignmentGroupId),
        'assignment[omit_from_final_grade]':
          utils.includeIfBoolean(opts.omitFromFinalGrade),
        'assignment[muted]': utils.includeIfBoolean(opts.muted),
      },
    });
  }

  /**
   * Creates a Canvas assignment
   * @author Gabe Abrams
   * @method create
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} [opts] object containing all arguments
   * @param {number} [opts.courseId=default course id] Canvas course Id to
   *   create an assignment in
   * @param {string} [opts.name=Unnamed Assignment] The name of the
   *   assignment
   * @param {number} [opts.pointsPossible=null] Points possible
   * @param {date} [opts.dueAt=null] Due at datetime
   * @param {date} [opts.lockAt=null] Due at datetime
   * @param {date} [opts.unlockAt=null] Due at datetime
   * @param {string} [opts.description=null] html description of
   *   the assignment
   * @param {string} [opts.submissionTypes=null] Submission type(s)
   * @param {string} [opts.allowedExtensions=any] List of allowed file
   *   extensions (exclude period). Online upload must be enabled
   * @param {string} [opts.gradingType=points] Grading type
   * @param {number} [opts.position=last] Position in assignment list
   * @param {boolean} [opts.published] If true, publish page upon
   *   creation
   * @param {boolean} [opts.muted] If true, assignment is muted
   * @param {number} [opts.groupSetId=null] Student group set Id
   * @param {number} [opts.assignmentGroupId=top assignment group] Assignment
   *   group Id
   * @param {boolean} [opts.peerReviewsEnabled] If true, users asked to
   *   submit peer reviews
   * @param {boolean} [opts.automaticPeerReviewsEnabled] If true,
   *   Canvas will automatically assign peer reviews
   * @param {boolean} [opts.omitFromFinalGrade] If true, assignment is
   *   omitted from the final grade
   * @param {boolean} [opts.gradeGroupStudentsIndividually] If true,
   *   students in groups can be given separate grades and when one student in a
   *   group gets a grade, other students do not get graded
   * @param {string} [opts.assignmentAppId=null] If defined, the external
   *   tool that matches this id will be used for submissions. Also, the
   *   submission types will be overwritten with ['external_tool'] and the
   *   student will be redirected via LTI to the assignmentAppURL when they
   *   launch the assignment
   * @param {string} [opts.assignmentAppURL=tool launch url] The launch URL
   *   of the external tool. If not included and assignmentAppId is defined, we
   *   will first request info on the external tool to get its launchURL and
   *   will use that value here. Only relevant if assignmentAppId is defined.
   * @param {boolean} [opts.assignmentAppNewTab] Only relevant if
   *   assignmentAppId is defined. If true, when a student clicks the
   *   assignment, their LTI session with the external tool will be opened in a
   *   new tab
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
   */
  public async create(
    opts: {
      courseId?: number,
      name?: string,
      pointsPossible?: number,
      dueAt?: (Date | string),
      lockAt?: (Date | string),
      unlockAt?: (Date | string),
      description?: string,
      submissionTypes?: (
        'online_quiz'
        | 'none'
        | 'on_paper'
        | 'discussion_topic'
        | 'external_tool'
        | 'online_upload'
        | 'online_text_entry'
        | 'online_url'
        | 'media_recording'
        | 'student_annotation'
      )[],
      allowedExtensions?: string[],
      gradingType?: (
        'pass_fail'
        | 'percent'
        | 'letter_grade'
        | 'gpa_scale'
        | 'points'
        | 'not_graded'
      ),
      position?: number,
      published?: boolean,
      muted?: boolean,
      groupSetId?: number,
      assignmentGroupId?: number,
      peerReviewsEnabled?: boolean,
      automaticPeerReviewsEnabled?: boolean,
      omitFromFinalGrade?: boolean,
      gradeGroupStudentsIndividually?: boolean,
      assignmentAppId?: number,
      assignmentAppURL?: string,
      assignmentAppNewTab?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasAssignment> {
    // Create params
    const params: { [k: string]: any } = {
      'assignment[name]': (opts.name || 'Unnamed Assignment'),
      'assignment[grading_type]': (opts.gradingType || 'points'),
      position: utils.includeIfTruthy(opts.position),
      'assignment[peer_reviews]': (
        utils.isTruthy(opts.peerReviewsEnabled)
      ),
      'assignment[automatic_peer_reviews]':
        utils.isTruthy(opts.automaticPeerReviewsEnabled),
      'assignment[grade_group_students_individually]':
        utils.isTruthy(opts.gradeGroupStudentsIndividually),
      'assignment[description]': (
        utils.includeIfTruthy(opts.description)
      ),
      'assignment[allowed_extensions]': (
        utils.includeIfTruthy(opts.allowedExtensions)
      ),
      'assignment[group_category_id]': (
        utils.includeIfTruthy(opts.groupSetId)
      ),
      'assignment[points_possible]': (
        utils.includeIfNumber(opts.pointsPossible)
      ),
      'assignment[due_at]': utils.includeIfDate(opts.dueAt),
      'assignment[lock_at]': utils.includeIfDate(opts.lockAt),
      'assignment[unlock_at]': utils.includeIfDate(opts.unlockAt),
      'assignment[published]': (
        utils.isTruthy(opts.published)
      ),
      'assignment[assignment_group_id]': (
        utils.includeIfNumber(opts.assignmentGroupId)
      ),
      'assignment[omit_from_final_grade]': (
        utils.isTruthy(opts.omitFromFinalGrade)
      ),
      'assignment[muted]': utils.isTruthy(opts.muted),
    };

    // Prep for external tool
    if (opts.assignmentAppId) {
      // Using an external tool
      params['assignment[external_tool_tag_attributes][new_tab]'] = (
        !!opts.assignmentAppNewTab
      );
      params['assignment[external_tool_tag_attributes][content_type]'] = (
        'context_external_tool'
      );
      params['assignment[external_tool_tag_attributes][content_id]'] = (
        opts.assignmentAppId
      );
      params['assignment[submission_types]'] = ['external_tool'];

      if (opts.assignmentAppURL) {
        // No need to fetch the launchURL
        params['assignment[external_tool_tag_attributes][url]'] = (
          opts.assignmentAppURL
        );
      } else {
        // Need to fetch the launchURL
        const app = await this.api.course.app.get(
          {
            courseId: (opts.courseId ?? this.defaultCourseId),
            appId: opts.assignmentAppId,
          },
          config,
        );
        params['assignment[external_tool_tag_attributes][url]'] = app.url;
      }
    } else {
      params['assignment[submission_types]'] = (
        opts.submissionTypes || ['none']
      );
    }

    return this.visitEndpoint({
      config,
      action: 'create a new assignment in a course',
      params,
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments`,
      method: 'POST',
    });
  }

  /**
   * Delete an assignment
   * @author Gabe Abrams
   * @method delete
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas assignment Id
   * @param {number} [opts.courseId=default course id] Canvas course Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
   */
  public async delete(
    opts: {
      assignmentId: number,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasAssignment> {
    return this.visitEndpoint({
      config,
      action: 'delete an assignment from a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}`,
      method: 'DELETE',
    });
  }

  /*------------------------------------------------------------------------*/
  /*                            Grading Endpoints                           */
  /*------------------------------------------------------------------------*/

  /**
   * List gradeable students for a specific assignment
   * @author Gabe Abrams
   * @method listGradeableStudents
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas assignment Id to query
   * @param {number} [opts.courseId=default course id] Canvas course Id to
   *   query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasUser[]>} list of Canvas users {@link https://canvas.instructure.com/doc/api/users.html#User}
   */
  public async listGradeableStudents(
    opts: {
      assignmentId: number,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasUser[]> {
    const students: CanvasUser[] = await this.visitEndpoint({
      config,
      action: 'get the list of students who are gradeable in a specific assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/gradeable_students`,
      method: 'GET',
    });

    return students.filter((s) => {
      return !(s as any).fake_student;
    });
  }

  /**
   * Adds a comment to a submission
   * @author Gabe Abrams
   * @method createSubmissionComment
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas course Id
   * @param {number} opts.studentId Canvas student Id of the sub to comment
   *   on
   * @param {string} opts.comment The text of the comment
   * @param {number} [opts.courseId=default course id] Canvas course Id
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  public async createSubmissionComment(
    opts: {
      assignmentId: number,
      studentId: number,
      comment: string,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasSubmission> {
    return this.visitEndpoint({
      config,
      action: 'create a new comment on a submission',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/submissions/${opts.studentId}`,
      method: 'PUT',
      params: {
        'comment[text_comment]': opts.comment,
      },
    });
  }

  /**
   * Updates a student's grade and/or comment
   * @author Gabe Abrams
   * @method updateGrade
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas assignment id
   * @param {number} opts.studentId Canvas student id
   * @param {number} [opts.courseId=default course id] Canvas course id
   * @param {number} [opts.points] the overall points to assign to the
   *   student
   * @param {string} [opts.comment] the grader comment to leave on the
   *   submission
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  public async updateGrade(
    opts: {
      assignmentId: number,
      studentId: number,
      courseId?: number,
      points?: number,
      comment?: string,
    },
    config?: APIConfig,
  ): Promise<CanvasSubmission> {
    return this.visitEndpoint({
      config,
      action: 'update student grade and/or comments for a specific assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/submissions/${opts.studentId}`,
      method: 'PUT',
      params: {
        'comment[text_comment]': utils.includeIfTruthy(opts.comment),
        'submission[posted_grade]': utils.includeIfNumber(opts.points),
      },
    });
  }

  /**
   * Batch updates grades and/or comments. Also supports updating rubric items
   * @author Gabe Abrams
   * @method updateGrades
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas assignment Id
   * @param {Array} opts.gradeItems List of grade items to upload to Canvas:
   *   [{
   *     studentId: <student id>,
   *     points: <optional, points to overwrite with>,
   *     comment: <optional, comment to append (or overwrite if rubric comment)>,
   *     rubricId: <optional, rubric item (overall grade/comment if excluded)>
   *   },...]
   * @param {number} [opts.courseId=default course id] Canvas course Id
   * @param {boolean} [opts.waitForCompletion] If true, promise won't
   *   resolve until Canvas has finished updating the grades, instead of resolving
   *   once the grade changes have been queued
   * @param {number} [opts.waitForCompletionTimeout=2] The number of minutes
   *   to wait before timing out the grade update job
   * @param {boolean} [opts.dontMergeRubricItemUpdates] When uploading
   *   grades to a rubric item, we intelligently merge rubric item updates with
   *   previous rubric assessments. For instance, if the assignment's rubric is:
   *     { grammar, argument, formatting }
   *   And the student of interest has the following rubric assessment so far:
   *     { grammar: 10/10, argument: 8/10, formatting: ungraded }
   *   When we upload a new gradeItem (9/10 points) to the student's
   *   formatting rubric item, the result is:
   *     { grammar: 10/10, argument: 8/10, formatting: 9/10 }
   *   However, if dontMergeRubricItemUpdates=true, the result is:
   *     { grammar: ungraded, argument: ungraded, formatting: 9/10 }
   *   Note: merging is an added feature. By default, the Canvas API does not
   *   merge rubric assessments.
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasProgress>} Canvas Progress object {@link https://canvas.instructure.com/doc/api/progress.html#Progress}
   */
  public async updateGrades(
    opts: {
      assignmentId: number,
      gradeItems: (
        {
          studentId: number,
          points?: number,
          comment?: string,
          rubricId?: string,
        }
      )[],
      courseId?: number,
      waitForCompletion?: boolean,
      waitForCompletionTimeout?: number,
      dontMergeRubricItemUpdates?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasProgress> {
    /* --- 1. Check if we need to merge --- */

    // Check if we need to merge rubric item updates
    const studentsToMerge: number[] = [];
    // Check if merge is necessary
    // > not necessary if no rubric item updates
    let performRubricItemMerge = false;
    if (!opts.dontMergeRubricItemUpdates) {
      performRubricItemMerge = opts.gradeItems.some((item) => {
        return item.rubricId;
      });
    }

    // Pull assignment so we can get rubric information
    if (performRubricItemMerge) {
      const assignment = await this.api.course.assignment.get(
        {
          courseId: (opts.courseId ?? this.defaultCourseId),
          assignmentId: opts.assignmentId,
        },
        config,
      );

      // Make sure the assignment has a rubric
      if (!assignment.rubric) {
        // This assignment doesn't have a rubric
        throw new CACCLError({
          message: 'We could not upload grades because the rubric we were trying to upload to didn\'t exist.',
          code: ErrorCode.NoRubricOnBatchGradeUpload,
        });
      }

      // Only merge students who don't have all the rubric items defined
      // (if all the rubric items are being uploaded, no merge needed)
      // > Get data on rubric
      const realRubricItemIds = new Set<string>();
      const numRubricItems = assignment.rubric.length;
      assignment.rubric.forEach((rubricItem) => {
        realRubricItemIds.add(rubricItem.id);
      });
      // > Figure out which students have which rubric items
      const studentToRubricItemsOverwritten = (
        new Map<number, Set<string>>()
      );
      const allStudentsWithRubricItems = new Set<number>();
      // ^ {studentId => { Set of rubric ids being uploaded }}
      opts.gradeItems.forEach((gradeItem) => {
        const { rubricId, studentId } = gradeItem;
        allStudentsWithRubricItems.add(studentId);

        // Skip if this item isn't a (real) rubric item
        if (!rubricId || realRubricItemIds.has(rubricId)) {
          return;
        }

        // Only mark this rubric item as being overwritten if both points and
        // comments are being overwritten
        if (
          gradeItem.points === undefined
          || gradeItem.points === null
          || !gradeItem.comment
        ) {
          // Not completely overwriting
          return;
        }

        // Keep track of rubric items that are found
        if (!studentToRubricItemsOverwritten.has(studentId)) {
          // Initialize student map
          studentToRubricItemsOverwritten.set(studentId, new Set<string>());
        }
        studentToRubricItemsOverwritten.get(studentId).add(rubricId);
      });

      // > Find students that need to be merged (has some rubric items but not
      // completely overwriting all of them)
      allStudentsWithRubricItems.forEach((studentId) => {
        const numOverwrittenItems = (
          (
            studentToRubricItemsOverwritten.get(studentId)
            || { size: 0 }
          ).size
        );

        if (numOverwrittenItems < numRubricItems) {
          // Need to merge this student
          studentsToMerge.push(studentId);
        }
      });
    }

    /* ----------- Fetch subs ----------- */

    const subs: CanvasSubmission[] = await parallelLimit(
      studentsToMerge.map((studentId) => {
        return async () => {
          return this.api.course.assignment.getSubmission(
            {
              studentId,
              courseId: (opts.courseId ?? this.defaultCourseId),
              assignmentId: opts.assignmentId,
              includeRubricAssessment: true,
              excludeUser: true, // Save request space
            },
            config,
          );
        }
      }),
      10,
    );

    /* ---------- Perform Merge --------- */

    // Prep for merge (if applicable)
    const params: { [k: string]: any } = {};

    if (subs.length > 0) {
      // Keep track of which items are being overwritten
      const overwritingMap: {
        [k: string]: {
          [k: string]: {
            points: boolean,
            comment: boolean,
          }
        }
      } = {};
      // ^ {studentId => rubricId => {
      //      points: true/false, is being overwritten,
      //      comment: true/false, is being overwritten
      //    }}
      opts.gradeItems.forEach((gradeItem) => {
        if (!gradeItem.rubricId) {
          // No need to keep track of non-rubric item updates
          // (these are not being merged)
          return;
        }
        const sid = gradeItem.studentId;
        const rid = gradeItem.rubricId;
        // Initialize map if needed
        if (!overwritingMap[sid]) {
          overwritingMap[sid] = {};
        }
        if (!overwritingMap[sid][rid]) {
          overwritingMap[sid][rid] = { points: false, comment: false };
        }
        // Save points and comments
        if (gradeItem.points !== undefined) {
          overwritingMap[sid][rid].points = true;
        }
        if (gradeItem.comment !== undefined) {
          overwritingMap[sid][rid].comment = true;
        }
      });

      // Perform actual merge
      subs.forEach((sub) => {
        if (!sub.rubric_assessment) {
          // No need to merge: submission has no rubric content yet
          return;
        }
        const sid = sub.user_id;
        // Loop through rubric items and merge
        Object.keys(sub.rubric_assessment).forEach((rubricId) => {
          // Get previous values
          const oldPoints = sub.rubric_assessment[rubricId].points;
          const oldComment = sub.rubric_assessment[rubricId].comments;

          // Check if we're overwriting these values
          let overwritePoints;
          let overwriteComment;
          if (overwritingMap[sid] && overwritingMap[sid][rubricId]) {
            overwritePoints = overwritingMap[sid][rubricId].points;
            overwriteComment = overwritingMap[sid][rubricId].comment;
          }

          // Add old value
          if (
            oldPoints !== undefined
            && oldPoints !== null
            && !overwritePoints
          ) {
            // We have an old points val and we're not overwriting it
            // (include the old points value)
            params[`grade_data[${sid}][rubric_assessment][${rubricId}][points]`] = oldPoints;
          }
          if (oldComment && !overwriteComment) {
            // We have an old comment and we're not overwriting it
            // (include the old comment)
            params[`grade_data[${sid}][rubric_assessment][${rubricId}][comments]`] = oldComment;
          }
        });
      });
    }

    // Add rest of grade item updates to params
    opts.gradeItems.forEach((gradeItem) => {
      if (gradeItem.rubricId) {
        if (gradeItem.points !== undefined) {
          params[`grade_data[${gradeItem.studentId}][rubric_assessment][${gradeItem.rubricId}][points]`] = gradeItem.points;
        }
        if (gradeItem.comment) {
          params[`grade_data[${gradeItem.studentId}][rubric_assessment][${gradeItem.rubricId}][comments]`] = gradeItem.comment;
        }
      } else {
        if (gradeItem.points !== undefined) {
          params[`grade_data[${gradeItem.studentId}][posted_grade]`] = gradeItem.points;
        }
        if (gradeItem.comment) {
          params[`grade_data[${gradeItem.studentId}][text_comment]`] = gradeItem.comment;
        }
      }
    });

    // Send request
    const progress = await this.visitEndpoint({
      params,
      config,
      action: 'update student grades, comments, and/or rubric assessments for a specific assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/submissions/update_grades`,
      method: 'POST',
    });

    /* --- Wait for completion (if applicable) --- */
    if (opts.waitForCompletion) {
      const finishedProgress = await waitForCompletion({
        progress,
        visitEndpoint: this.visitEndpoint,
        timeoutMin: opts.waitForCompletionTimeout,
      });
      return finishedProgress;
    }

    return progress;
  }

  /*------------------------------------------------------------------------*/
  /*                      Assignment Override Endpoints                     */
  /*------------------------------------------------------------------------*/

  /**
   * Gets the list of overrides for an assignment
   * @author Gabe Abrams
   * @method listOverrides
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas assignment id to look up
   * @param {number} [opts.courseId=default course id] Canvas course id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignmentOverride[]>} list of Canvas AssignmentOverrides {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
   */
  public async listOverrides(
    opts: {
      assignmentId: number,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasAssignmentOverride[]> {
    return this.visitEndpoint({
      config,
      action: 'get a list of assignment overrides for a specific assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/overrides`,
      method: 'GET',
    });
  }

  /**
   * Get a specific override on an assignment in a course
   * @author Gabe Abrams
   * @method getOverride
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas assignment id to query
   * @param {number} opts.overrideId Canvas override id to look up
   * @param {number} [opts.courseId=default course id] Canvas course id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
   */
  public async getOverride(
    opts: {
      assignmentId: number,
      overrideId: number,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasAssignmentOverride> {
    return this.visitEndpoint({
      config,
      action: 'get a list of assignment overrides for a specific assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/overrides/${opts.overrideId}`,
      method: 'GET',
    });
  }

  /**
   * Create assignment override. Note that if any dates (dueAt, unlockAt, or
   *   lockAt) are left out, they will be set to "none" for the target(s) of this
   *   override. If dueAt is omitted, the target(s) will have no deadline. If
   *   unlockAt is omitted, the target(s) will immediately be able to see the
   *   assignment (even if everyone else has to wait until the unlockAt date). If
   *   lockAt is omitted, the target(s) will be able to submit at any
   *   time in the future (even if everyone else can't submit because their lock
   *   date has passed). In short, it is not recommended to omit dates that are
   *   defined in the assignment.
   * @author Gabe Abrams
   * @method createOverride
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas assignment id
   * @param {number} [opts.courseId=default course id] Canvas course id
   * @param {number[]} [opts.studentIds] List of Canvas student IDs to override
   *   (Note: either studentIds, groupId, or sectionId must be included)
   * @param {number} [opts.groupId] Group to override, must be a group
   *   assignment (Note: either studentIds, groupId, or sectionId must be
   *   included)
   * @param {number} [opts.sectionId] Section to override (Note: either
   *   studentIds, groupId, or sectionId must be included)
   * @param {string} [opts.title=Override for X students] Title of the
   *   override
   * @param {date} [opts.dueAt=no due date] New due date. If excluded, the
   *   target(s) of this override have no due date (they can submit whenever they
   *   want without being marked as late)
   * @param {date} [opts.unlockAt=no unlock date] New unlock date. If
   *   excluded, the target(s) of this override can immediately see the assignment
   *   (their unlock date is the beginning of time)
   * @param {date} [opts.lockAt=no lock date] New lock date. If excluded,
   *   the target(s) of this override can see and submit the assignment at
   *   any point in the future (their lock date is the end of time)
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
   */
  public async createOverride(
    opts: {
      assignmentId: number,
      courseId?: number,
      studentIds?: number[],
      groupId?: number,
      sectionId?: number,
      title?: string,
      dueAt?: (Date | string),
      unlockAt?: (Date | string),
      lockAt?: (Date | string),
    },
    config?: APIConfig,
  ): Promise<CanvasAssignmentOverride> {
    let { title } = opts;
    if (!title) {
      title = `Override for ${opts.studentIds.length} student${utils.sIfPlural(opts.studentIds.length)}`;
    }

    // Pre-process dates
    let dueAt = utils.includeIfDate(opts.dueAt) || null;
    let unlockAt = utils.includeIfDate(opts.unlockAt) || null;
    let lockAt = utils.includeIfDate(opts.lockAt) || null;

    return this.visitEndpoint({
      config,
      action: 'create a new override for a specific assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/overrides`,
      method: 'POST',
      params: {
        'assignment_override[title]': utils.includeIfTruthy(title),
        'assignment_override[student_ids]':
          utils.includeIfTruthy(opts.studentIds),
        'assignment_override[group_id]':
          utils.includeIfTruthy(opts.groupId),
        'assignment_override[course_section_id]':
          utils.includeIfTruthy(opts.sectionId),
        'assignment_override[due_at]': dueAt,
        'assignment_override[unlock_at]': unlockAt,
        'assignment_override[lock_at]': lockAt,
      },
    });
  }

  /**
   * Update an assignment override. Note: target can only be updated if the
   *   override is a student override (if this is a group or section override,
   *   the target remains unchanged).
   *   Also, note that if any dates (dueAt, unlockAt, or lockAt) are omitted,
   *   their previous override values will be changed to "none." For instance,
   *   if the previous override has a dueAt and the update does not, the updated
   *   override will have no dueAt date (the target(s) of the override will have
   *   no deadline).
   * @author Gabe Abrams
   * @method updateOverride
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas assignment id
   * @param {number} opts.overrideId the override id to update
   * @param {number[]} opts.studentIds List of Canvas student IDs being
   *   overridden
   * @param {number} [opts.courseId=default course id] Canvas course id
   * @param {string} [opts.title=current value] New title of the
   *   override
   * @param {date} [opts.dueAt=no due date] New due date. If excluded, the
   *   target(s) of this override have no due date (they can submit whenever they
   *   want without being marked as late)
   * @param {date} [opts.unlockAt=no unlock date] New unlock date. If
   *   excluded, the target(s) of this override can immediately see the assignment
   *   (their unlock date is the beginning of time)
   * @param {date} [opts.lockAt=no lock date] New lock date. If excluded,
   *   the target(s) of this override can see and submit the assignment at
   *   any point in the future (their lock date is the end of time)
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
   */
  public async updateOverride(
    opts: {
      assignmentId: number,
      overrideId: number,
      studentIds: number[],
      courseId?: number,
      title?: string,
      dueAt?: (Date | string),
      unlockAt?: (Date | string),
      lockAt?: (Date | string),
    },
    config?: APIConfig,
  ): Promise<CanvasAssignmentOverride> {
    // Pre-process dates
    let dueAt = utils.includeIfDate(opts.dueAt) || null;
    let unlockAt = utils.includeIfDate(opts.unlockAt) || null;
    let lockAt = utils.includeIfDate(opts.lockAt) || null;

    return this.visitEndpoint({
      config,
      action: 'update an override for a specific assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/overrides/${opts.overrideId}`,
      method: 'PUT',
      params: {
        'assignment_override[title]': utils.includeIfTruthy(opts.title),
        'assignment_override[student_ids]':
          utils.includeIfTruthy(opts.studentIds),
        'assignment_override[due_at]': dueAt,
        'assignment_override[unlock_at]': unlockAt,
        'assignment_override[lock_at]': lockAt,
      },
    });
  }

  /**
   * Deletes an assignment override
   * @author Gabe Abrams
   * @method deleteOverride
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId Canvas assignment id to query
   * @param {number} opts.overrideId Canvas override id to look up
   * @param {number} [opts.courseId=default course id] Canvas course id to query
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
   */
  public async deleteOverride(
    opts: {
      assignmentId: number,
      overrideId: number,
      courseId?: number,
    },
    config?: APIConfig,
  ): Promise<CanvasAssignmentOverride> {
    return this.visitEndpoint({
      config,
      action: 'delete an override for a specific assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/overrides/${opts.overrideId}`,
      method: 'DELETE',
    });
  }

  /*------------------------------------------------------------------------*/
  /*                     Assignment Submission Endpoints                    */
  /*------------------------------------------------------------------------*/

  /**
   * Lists the submissions to a specific assignment in a course. If the assignment
   *   has anonymous grading turned on, to exclude the test user, we will also
   *   pull the list of students in the course. If including the user object for
   *   an anonymously graded assignment, fake user objects will be created where
   *   each submissions[i].user object contains a isAnonymousUser boolean that is
   *   true
   * @author Gabe Abrams
   * @method listSubmissions
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId The Canvas assignment Id to query
   * @param {number} [opts.courseId=default course id] Canvas course Id
   * @param {boolean} [opts.includeComments] If truthy, includes all
   *   comments on submissions
   * @param {boolean} [opts.includeRubricAssessment] If truthy,
   *   includes rubric assessments: breakdown of score for each rubric item
   * @param {boolean} [opts.excludeUser] If truthy, excludes
   *   submission[i].user value with the submission's user information
   * @param {boolean} [opts.includeTestStudent] If truthy, includes
   *   dummy submission by test student (student view) if there is one. Note:
   *   if anonymous grading is enabled for this assignment, includeTestStudent
   *   will be true because we don't know which student is the test student
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasSubmission[]>} list of Canvas submissions {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  public async listSubmissions(
    opts: {
      assignmentId: number,
      courseId?: number,
      includeComments?: boolean,
      includeRubricAssessment?: boolean,
      excludeUser?: boolean,
      includeTestStudent?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasSubmission[]> {
    // Fetch the user info if we're not excluding user info OR if we're
    // filtering out the test student (we need user info to filter)
    const fetchUser = (
      !opts.includeTestStudent
      || !opts.excludeUser
    );

    const subs: CanvasSubmission[] = await this.visitEndpoint({
      config,
      action: 'list the submissions to a specific assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/submissions`,
      method: 'GET',
      params: {
        include: utils.genIncludesList({
          submission_comments: opts.includeComments,
          rubric_assessment: opts.includeRubricAssessment,
          user: fetchUser,
        }),
      },
    });

    // Filter test student if applicable
    if (!opts.includeTestStudent) {
      // Handle empty list case
      if (!subs || subs.length === 0) {
        return [];
      }

      // Handle normal case where we have user objects
      const realSubs = subs.filter((sub) => {
        return (
          !sub.user
          || sub.user.name !== 'Test Student'
        );
      });

      // Finish
      return realSubs;
    }

    // Not filtering out test student. Just return subs
    return subs;
  }

  /**
   * Lists the submissions for a batch of assignment/students in a course
   * @author Gabe Abrams
   * @method listAllSubmissions
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} [opts] object containing all arguments
   * @param {number} [opts.courseId=default course id] Canvas course Id
   * @param {number[]} [opts.studentIds=all students] a list of
   *   specific students to pull submissions for
   * @param {number[]} [opts.assignmentIds=all assignments] a list of
   *   assignments to get submissions for
   * @param {Date} [opts.submittedSince=beginning of time] Exclude
   *   submissions that were not submitted or were submitted before this date
   * @param {Date} [opts.gradedSince=beginning of time] Exclude
   *   submissions that were not graded or were graded before this date
   * @param {string} [opts.workflowState=all workflows] a workflow state
   *   to filter by. Allowed values: 'submitted', 'unsubmitted', 'graded', or
   *   'pending_review'
   * @param {string} [opts.enrollmentState=all states except deleted] an
   *   enrollment state to filter by. Allowed values: 'active' or 'concluded'
   * @param {boolean} [opts.includeSubmissionHistory] if true, submission
   *   history is included
   * @param {boolean} [opts.includeComments] if true, includes all comments
   *   on submissions
   * @param {boolean} [opts.includeRubricAssessment] if true,
   *   rubric assessment is included
   * @param {boolean} [opts.includeAssignment] if true, the assignment is
   *   included for each submission
   * @param {boolean} [opts.includeTotalScores] if true, include the total
   *   scores
   * @param {boolean} [opts.includeVisibility] if true, include visibility
   * @param {boolean} [opts.includeUser] if true, include the user info
   *   with each submission
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasSubmission[]>} list of submissions {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  public async listAllSubmissions(
    opts: {
      courseId?: number,
      studentIds?: number[],
      assignmentIds?: number[],
      submittedSince?: (Date | string),
      gradedSince?: (Date | string),
      workflowState?: (
        'submitted'
        | 'unsubmitted'
        | 'graded'
        | 'pending_review'
      ),
      enrollmentState?: ('active' | 'concluded'),
      includeSubmissionHistory?: boolean,
      includeComments?: boolean,
      includeRubricAssessment?: boolean,
      includeAssignment?: boolean,
      includeTotalScores?: boolean,
      includeVisibility?: boolean,
      includeUser?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasSubmission[]> {
    return this.visitEndpoint({
      config,
      action: 'list a batch of submissions in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/students/submissions`,
      method: 'GET',
      params: {
        student_ids: (
          opts.studentIds
            ? opts.studentIds
            : ['all']
        ),
        assignment_ids: opts.assignmentIds,
        submitted_since: utils.includeIfDate(opts.submittedSince),
        graded_since: utils.includeIfDate(opts.gradedSince),
        workflow_state: utils.includeIfTruthy(opts.workflowState),
        enrollment_state: utils.includeIfTruthy(opts.enrollmentState),
        include: utils.genIncludesList({
          submission_history: opts.includeSubmissionHistory,
          submission_comments: opts.includeComments,
          rubric_assessment: opts.includeRubricAssessment,
          assignment: opts.includeAssignment,
          total_scores: opts.includeTotalScores,
          visibility: opts.includeVisibility,
          user: opts.includeUser,
        }),
      },
    });
  }

  /**
   * Gets a single submission for an assignment
   * @author Gabe Abrams
   * @method getSubmission
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId The Canvas assignment Id
   * @param {number} opts.studentId The Canvas student Id
   * @param {number} [opts.courseId=default course id] Canvas course Id
   * @param {boolean} [opts.includeComments] If truthy, includes all
   *   comments on submissions
   * @param {boolean} [opts.includeRubricAssessment] If truthy,
   *   includes rubric assessments: breakdown of score for each rubric item
   * @param {boolean} [opts.excludeUser] If truthy, excludes
   *   submission[i].user value with the submission's user information
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  public async getSubmission(
    opts: {
      assignmentId: number,
      studentId: number,
      courseId?: number,
      includeComments?: boolean,
      includeRubricAssessment?: boolean,
      excludeUser?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasSubmission> {
    return this.visitEndpoint({
      config,
      action: 'get a specific submission to an assignment in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/submissions/${opts.studentId}`,
      method: 'GET',
      params: {
        include: utils.genIncludesList({
          submission_comments: opts.includeComments,
          rubric_assessment: opts.includeRubricAssessment,
          user: !opts.excludeUser,
        }),
      },
    });
  }

  /**
   * Creates a text submission on behalf of the current user
   * @author Gabe Abrams
   * @method createTextSubmission
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId The Canvas assignment Id
   * @param {string} opts.text The text body of the submission
   * @param {number} [opts.courseId=default course id] Canvas course Id
   * @param {string} [opts.comment] A text student comment to include
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  public async createTextSubmission(
    opts: {
      assignmentId: number,
      text: string,
      courseId?: number,
      comment?: string,
    },
    config?: APIConfig,
  ): Promise<CanvasSubmission> {
    return this.visitEndpoint({
      config,
      action: 'create a text submission to a specific assignment in a course on behalf of the current user',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/submissions`,
      method: 'POST',
      params: {
        'comment[text_comment]':
          utils.includeIfTruthy(opts.comment),
        'submission[body]': opts.text,
        'submission[submission_type]': 'online_text_entry',
      },
    });
  }

  /**
   * Creates a url submission on behalf of the current user
   * @author Gabe Abrams
   * @method createURLSubmission
   * @memberof api.course.assignment
   * @instance
   * @async
   * @param {object} opts object containing all arguments
   * @param {number} opts.assignmentId The Canvas assignment Id
   * @param {string} opts.url The url of the submission
   * @param {number} [opts.courseId=default course id] Canvas course Id
   * @param {string} [opts.comment] A text student comment to include
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   *   call (overwrites defaults that were included when api was initialized)
   * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
   */
  public async createURLSubmission(
    opts: {
      assignmentId: number,
      url: string,
      courseId?: number,
      comment?: string,
    },
    config?: APIConfig,
  ): Promise<CanvasSubmission> {
    return this.visitEndpoint({
      config,
      action: 'create a url submission to a specific assignment in a course on behalf of the current user',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/assignments/${opts.assignmentId}/submissions`,
      method: 'POST',
      params: {
        'comment[text_comment]':
          utils.includeIfTruthy(opts.comment),
        'submission[url]': opts.url,
        'submission[submission_type]': 'online_url',
      },
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatAssignment;
