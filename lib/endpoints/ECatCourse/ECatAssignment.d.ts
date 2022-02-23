/**
 * Functions for interacting with assignments within courses
 * @namespace api.course.assignment
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasAssignment from '../../types/CanvasAssignment';
import CanvasUser from '../../types/CanvasUser';
import CanvasSubmission from '../../types/CanvasSubmission';
import CanvasProgress from '../../types/CanvasProgress';
import CanvasAssignmentOverride from '../../types/CanvasAssignmentOverride';
declare class ECatAssignment extends EndpointCategory {
    /**
     * Lists the assignments in a course
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {boolean} [opts.ignoreOverridesForDates] - if true, assignment
     *   dates are taken from the default dates instead of from the ones in
     *   overrides
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignment[]>} list of Canvas Assignments {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
     */
    list(opts: {
        courseId: number;
        ignoreOverridesForDates?: boolean;
    }, config?: APIConfig): Promise<CanvasAssignment[]>;
    /**
     * Get info on a specific assignment in a course
     * @author Gabe Abrams
     * @method get
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.assignmentId - Canvas assignment Id
     * @param {boolean} [opts.ignoreOverridesForDates] - if true, assignment
     *   dates are taken from the default dates instead of from the ones in
     *   overrides
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
     */
    get(opts: {
        courseId: number;
        assignmentId: number;
        ignoreOverridesForDates?: boolean;
    }, config?: APIConfig): Promise<CanvasAssignment>;
    /**
     * Updates a Canvas assignment
     * @author Gabe Abrams
     * @method update
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.assignmentId - Canvas assignment Id to update
     * @param {string} [opts.name=current value] - The name of the assignment
     * @param {number} [opts.pointsPossible=current value] - Points possible
     * @param {date} [opts.dueAt=current value] - Due at datetime
     * @param {date} [opts.lockAt=current value] - Due at datetime
     * @param {date} [opts.unlockAt=current value] - Due at datetime
     * @param {string} [opts.description=current value] - html description of
     *   the assignment
     * @param {string[]} [opts.submissionTypes=current value] - Submission type(s)
     * @param {string} [opts.allowedExtensions=current value] - List of allowed
     *   file extensions (exclude period). Online upload must be enabled
     * @param {string} [opts.gradingType=current value] - Grading type
     * @param {number} [opts.position=current value] - Position in assignment
     *   list
     * @param {boolean} [opts.published=current value] - If true, publish page
     *   upon creation. Must be a boolean
     * @param {boolean} [opts.muted=current value] - If true, assignment is
     *   muted. Must be a boolean
     * @param {number} [opts.groupSetId=current value] - Student group set Id
     * @param {number} [opts.assignmentGroupId=current value] - Assignment group
     *   Id
     * @param {boolean} [opts.peerReviewsEnabled=current value] - If true, users
     *   asked to submit peer reviews. Must be a boolean
     * @param {boolean} [opts.automaticPeerReviewsEnabled=current value] - If
     *   true, Canvas will automatically assign peer reviews. Must be a boolean
     * @param {boolean} [opts.omitFromFinalGrade=current value] - If true,
     *   assignment is omitted from the final grade. Must be a boolean
     * @param {boolean} [opts.gradeGroupStudentsIndividually=current value] - If
     *   true, students in groups can be given separate grades and when one student
     *   in a group gets a grade, other students do not get graded. Must be a
     *   boolean
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
     */
    update(opts: {
        courseId: number;
        assignmentId: number;
        name?: string;
        pointsPossible?: number;
        dueAt?: (Date | string);
        lockAt?: (Date | string);
        unlockAt?: (Date | string);
        description?: string;
        submissionTypes?: ('online_quiz' | 'none' | 'on_paper' | 'discussion_topic' | 'external_tool' | 'online_upload' | 'online_text_entry' | 'online_url' | 'media_recording' | 'student_annotation')[];
        allowedExtensions?: string[];
        gradingType?: ('pass_fail' | 'percent' | 'letter_grade' | 'gpa_scale' | 'points' | 'not_graded');
        position?: number;
        published?: boolean;
        muted?: boolean;
        groupSetId?: number;
        assignmentGroupId?: number;
        peerReviewsEnabled?: boolean;
        automaticPeerReviewsEnabled?: boolean;
        omitFromFinalGrade?: boolean;
        gradeGroupStudentsIndividually?: boolean;
    }, config?: APIConfig): Promise<CanvasAssignment>;
    /**
     * Creates a Canvas assignment
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to create an assignment
     *   in
     * @param {string} [opts.name=Unnamed Assignment] - The name of the
     *   assignment
     * @param {number} [opts.pointsPossible=null] - Points possible
     * @param {date} [opts.dueAt=null] - Due at datetime
     * @param {date} [opts.lockAt=null] - Due at datetime
     * @param {date} [opts.unlockAt=null] - Due at datetime
     * @param {string} [opts.description=null] - html description of
     *   the assignment
     * @param {string} [opts.submissionTypes=null] - Submission type(s)
     * @param {string} [opts.allowedExtensions=any] - List of allowed file
     *   extensions (exclude period). Online upload must be enabled
     * @param {string} [opts.gradingType=points] - Grading type
     * @param {number} [opts.position=last] - Position in assignment list
     * @param {boolean} [opts.published] - If true, publish page upon
     *   creation
     * @param {boolean} [opts.muted] - If true, assignment is muted
     * @param {number} [opts.groupSetId=null] - Student group set Id
     * @param {number} [opts.assignmentGroupId=top assignment group] - Assignment
     *   group Id
     * @param {boolean} [opts.peerReviewsEnabled] - If true, users asked to
     *   submit peer reviews
     * @param {boolean} [opts.automaticPeerReviewsEnabled] - If true,
     *   Canvas will automatically assign peer reviews
     * @param {boolean} [opts.omitFromFinalGrade] - If true, assignment is
     *   omitted from the final grade
     * @param {boolean} [opts.gradeGroupStudentsIndividually] - If true,
     *   students in groups can be given separate grades and when one student in a
     *   group gets a grade, other students do not get graded
     * @param {string} [opts.assignmentAppId=null] - If defined, the external
     *   tool that matches this id will be used for submissions. Also, the
     *   submission types will be overwritten with ['external_tool'] and the student
     *   will be redirected via LTI to the assignmentAppURL when they launch the
     *   assignment
     * @param {string} [opts.assignmentAppURL=tool launch url] - The launch URL
     *   of the external tool. If not included and assignmentAppId is defined, we
     *   will first request info on the external tool to get its launchURL and will
     *   use that value here. Only relevant if assignmentAppId is defined.
     * @param {boolean} [opts.assignmentAppNewTab] - Only relevant if
     *   assignmentAppId is defined. If true, when a student clicks the assignment,
     *   their LTI session with the external tool will be opened in a new tab
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
     */
    create(opts: {
        courseId: number;
        name?: string;
        pointsPossible?: number;
        dueAt?: (Date | string);
        lockAt?: (Date | string);
        unlockAt?: (Date | string);
        description?: string;
        submissionTypes?: ('online_quiz' | 'none' | 'on_paper' | 'discussion_topic' | 'external_tool' | 'online_upload' | 'online_text_entry' | 'online_url' | 'media_recording' | 'student_annotation')[];
        allowedExtensions?: string[];
        gradingType?: ('pass_fail' | 'percent' | 'letter_grade' | 'gpa_scale' | 'points' | 'not_graded');
        position?: number;
        published?: boolean;
        muted?: boolean;
        groupSetId?: number;
        assignmentGroupId?: number;
        peerReviewsEnabled?: boolean;
        automaticPeerReviewsEnabled?: boolean;
        omitFromFinalGrade?: boolean;
        gradeGroupStudentsIndividually?: boolean;
        assignmentAppId?: number;
        assignmentAppURL?: string;
        assignmentAppNewTab?: boolean;
    }, config?: APIConfig): Promise<CanvasAssignment>;
    /**
     * Delete an assignment
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id
     * @param {number} opts.assignmentId - Canvas assignment Id
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignment>} Canvas Assignment {@link https://canvas.instructure.com/doc/api/assignments.html#Assignment}
     */
    delete(opts: {
        courseId: number;
        assignmentId: number;
    }, config?: APIConfig): Promise<CanvasAssignment>;
    /**
     * List gradeable students for a specific assignment
     * @author Gabe Abrams
     * @method listGradeableStudents
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id to query
     * @param {number} opts.assignmentId - Canvas assignment Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    listGradeableStudents(opts: {
        courseId: number;
        assignmentId: number;
    }, config?: APIConfig): Promise<CanvasUser[]>;
    /**
     * Adds a comment to a submission
     * @author Gabe Abrams
     * @method createSubmissionComment
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id
     * @param {number} opts.assignmentId - Canvas course Id
     * @param {number} opts.studentId - Canvas student Id of the sub to comment
     *   on
     * @param {string} opts.comment - The text of the comment
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    createSubmissionComment(opts: {
        courseId: number;
        assignmentId: number;
        studentId: number;
        comment: string;
    }, config?: APIConfig): Promise<CanvasSubmission>;
    /**
     * Updates a student's grade and/or comment
     * @author Gabe Abrams
     * @method updateGrade
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course id
     * @param {number} opts.assignmentId - Canvas assignment id
     * @param {number} opts.studentId - Canvas student id
     * @param {number} [opts.points] - the overall points to assign to the
     *   student
     * @param {string} [opts.comment] - the grader comment to leave on the
     *   submission
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    updateGrade(opts: {
        courseId: number;
        assignmentId: number;
        studentId: number;
        points?: number;
        comment?: string;
    }, config?: APIConfig): Promise<CanvasSubmission>;
    /**
     * Batch updates grades and/or comments. Also supports updating rubric items
     * @author Gabe Abrams
     * @method updateGrades
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id
     * @param {number} opts.assignmentId - Canvas assignment Id
     * @param {Array} opts.gradeItems - List of grade items to upload to Canvas:
     *   [{
     *     studentId: <student id>,
     *     points: <optional, points to overwrite with>,
     *     comment: <optional, comment to append (or overwrite if rubric comment)>,
     *     rubricId: <optional, rubric item (overall grade/comment if excluded)>
     *   },...]
     * @param {boolean} [opts.waitForCompletion] - If true, promise won't
     *   resolve until Canvas has finished updating the grades, instead of resolving
     *   once the grade changes have been queued
     * @param {number} [opts.waitForCompletionTimeout=2] - The number of minutes
     *   to wait before timing out the grade update job
     * @param {boolean} [opts.dontMergeRubricItemUpdates] - When uploading
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
    updateGrades(opts: {
        courseId: number;
        assignmentId: number;
        gradeItems: ({
            studentId: number;
            points?: number;
            comment?: string;
            rubricId?: string;
        })[];
        waitForCompletion?: boolean;
        waitForCompletionTimeout?: number;
        dontMergeRubricItemUpdates?: boolean;
    }, config?: APIConfig): Promise<CanvasProgress>;
    /**
     * Gets the list of overrides for an assignment
     * @author Gabe Abrams
     * @method listOverrides
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course id to query
     * @param {number} opts.assignmentId - Canvas assignment id to look up
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentOverride[]>} list of Canvas AssignmentOverrides {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
     */
    listOverrides(opts: {
        courseId: number;
        assignmentId: number;
    }, config?: APIConfig): Promise<CanvasAssignmentOverride[]>;
    /**
     * Get a specific override on an assignment in a course
     * @author Gabe Abrams
     * @method getOverride
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course id to query
     * @param {number} opts.assignmentId - Canvas assignment id to query
     * @param {number} opts.overrideId - Canvas override id to look up
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
     */
    getOverride(opts: {
        courseId: number;
        assignmentId: number;
        overrideId: number;
    }, config?: APIConfig): Promise<CanvasAssignmentOverride>;
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
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course id
     * @param {number} opts.assignmentId - Canvas assignment id
     * @param {number[]} [opts.studentIds] - List of Canvas student IDs to override
     *   (Note: either studentIds, groupId, or sectionId must be included)
     * @param {number} [opts.groupId] - Group to override, must be a group
     *   assignment (Note: either studentIds, groupId, or sectionId must be
     *   included)
     * @param {number} [opts.sectionId] - Section to override (Note: either
     *   studentIds, groupId, or sectionId must be included)
     * @param {string} [opts.title=Override for X students] - Title of the
     *   override
     * @param {date} [opts.dueAt=no due date] - New due date. If excluded, the
     *   target(s) of this override have no due date (they can submit whenever they
     *   want without being marked as late)
     * @param {date} [opts.unlockAt=no unlock date] - New unlock date. If
     *   excluded, the target(s) of this override can immediately see the assignment
     *   (their unlock date is the beginning of time)
     * @param {date} [opts.lockAt=no lock date] - New lock date. If excluded,
     *   the target(s) of this override can see and submit the assignment at
     *   any point in the future (their lock date is the end of time)
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
     */
    createOverride(opts: {
        courseId: number;
        assignmentId: number;
        studentIds?: number[];
        groupId?: number;
        sectionId?: number;
        title?: string;
        dueAt?: (Date | string);
        unlockAt?: (Date | string);
        lockAt?: (Date | string);
    }, config?: APIConfig): Promise<CanvasAssignmentOverride>;
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
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course id
     * @param {number} opts.assignmentId - Canvas assignment id
     * @param {number} opts.overrideId - the override id to update
     * @param {number[]} opts.studentIds - List of Canvas student IDs being
     *   overridden
     * @param {string} [opts.title=current value] - New title of the
     *   override
     * @param {date} [opts.dueAt=no due date] - New due date. If excluded, the
     *   target(s) of this override have no due date (they can submit whenever they
     *   want without being marked as late)
     * @param {date} [opts.unlockAt=no unlock date] - New unlock date. If
     *   excluded, the target(s) of this override can immediately see the assignment
     *   (their unlock date is the beginning of time)
     * @param {date} [opts.lockAt=no lock date] - New lock date. If excluded,
     *   the target(s) of this override can see and submit the assignment at
     *   any point in the future (their lock date is the end of time)
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
     */
    updateOverride(opts: {
        courseId: number;
        assignmentId: number;
        overrideId: number;
        studentIds: number[];
        title?: string;
        dueAt?: (Date | string);
        unlockAt?: (Date | string);
        lockAt?: (Date | string);
    }, config?: APIConfig): Promise<CanvasAssignmentOverride>;
    /**
     * Deletes an assignment override
     * @author Gabe Abrams
     * @method deleteOverride
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course id to query
     * @param {number} opts.assignmentId - Canvas assignment id to query
     * @param {number} opts.overrideId - Canvas override id to look up
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasAssignmentOverride>} Canvas AssignmentOverride {@link https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride}
     */
    deleteOverride(opts: {
        courseId: number;
        assignmentId: number;
        overrideId: number;
    }, config?: APIConfig): Promise<CanvasAssignmentOverride>;
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
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id
     * @param {number} opts.assignmentId - The Canvas assignment Id to query
     * @param {boolean} [opts.includeComments] - If truthy, includes all
     *   comments on submissions
     * @param {boolean} [opts.includeRubricAssessment] - If truthy,
     *   includes rubric assessments: breakdown of score for each rubric item
     * @param {boolean} [opts.excludeUser] - If truthy, excludes
     *   submission[i].user value with the submission's user information
     * @param {boolean} [opts.includeTestStudent] - If truthy, includes
     *   dummy submission by test student (student view) if there is one. Note:
     *   if anonymous grading is enabled for this assignment, includeTestStudent
     *   will be true because we don't know which student is the test student
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission[]>} list of Canvas submissions {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    listSubmissions(opts: {
        courseId: number;
        assignmentId: number;
        includeComments?: boolean;
        includeRubricAssessment?: boolean;
        excludeUser?: boolean;
        includeTestStudent?: boolean;
    }, config?: APIConfig): Promise<CanvasSubmission[]>;
    /**
     * Lists the submissions for a batch of assignment/students in a course
     * @author Gabe Abrams
     * @method listAllSubmissions
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id
     * @param {number[]} [opts.studentIds=all students] - a list of
     *   specific students to pull submissions for
     * @param {number[]} [opts.assignmentIds=all assignments] - a list of
     *   assignments to get submissions for
     * @param {Date} [opts.submittedSince=beginning of time] - Exclude
     *   submissions that were not submitted or were submitted before this date
     * @param {Date} [opts.gradedSince=beginning of time] - Exclude
     *   submissions that were not graded or were graded before this date
     * @param {string} [opts.workflowState=all workflows] - a workflow state
     *   to filter by. Allowed values: 'submitted', 'unsubmitted', 'graded', or
     *   'pending_review'
     * @param {string} [opts.enrollmentState=all states except deleted] - an
     *   enrollment state to filter by. Allowed values: 'active' or 'concluded'
     * @param {boolean} [opts.includeSubmissionHistory] - if true, submission
     *   history is included
     * @param {boolean} [opts.includeComments] - if true, includes all comments
     *   on submissions
     * @param {boolean} [opts.includeRubricAssessment] - if true,
     *   rubric assessment is included
     * @param {boolean} [opts.includeAssignment] - if true, the assignment is
     *   included for each submission
     * @param {boolean} [opts.includeTotalScores] - if true, include the total
     *   scores
     * @param {boolean} [opts.includeVisibility] - if true, include visibility
     * @param {boolean} [opts.includeUser] - if true, include the user info
     *   with each submission
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission[]>} list of submissions {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    listAllSubmissions(opts: {
        courseId: number;
        studentIds?: number[];
        assignmentIds?: number[];
        submittedSince?: (Date | string);
        gradedSince?: (Date | string);
        workflowState?: ('submitted' | 'unsubmitted' | 'graded' | 'pending_review');
        enrollmentState?: ('active' | 'concluded');
        includeSubmissionHistory?: boolean;
        includeComments?: boolean;
        includeRubricAssessment?: boolean;
        includeAssignment?: boolean;
        includeTotalScores?: boolean;
        includeVisibility?: boolean;
        includeUser?: boolean;
    }, config?: APIConfig): Promise<CanvasSubmission[]>;
    /**
     * Gets a single submission for an assignment
     * @author Gabe Abrams
     * @method getSubmission
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id
     * @param {number} opts.assignmentId - The Canvas assignment Id
     * @param {number} opts.studentId - The Canvas student Id
     * @param {boolean} [opts.includeComments] - If truthy, includes all
     *   comments on submissions
     * @param {boolean} [opts.includeRubricAssessment] - If truthy,
     *   includes rubric assessments: breakdown of score for each rubric item
     * @param {boolean} [opts.excludeUser] - If truthy, excludes
     *   submission[i].user value with the submission's user information
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    getSubmission(opts: {
        courseId: number;
        assignmentId: number;
        studentId: number;
        includeComments?: boolean;
        includeRubricAssessment?: boolean;
        excludeUser?: boolean;
    }, config?: APIConfig): Promise<CanvasSubmission>;
    /**
     * Creates a text submission on behalf of the current user
     * @author Gabe Abrams
     * @method createTextSubmission
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id
     * @param {number} opts.assignmentId - The Canvas assignment Id
     * @param {string} opts.text - The text body of the submission
     * @param {string} [opts.comment] - A text student comment to include
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    createTextSubmission(opts: {
        courseId: number;
        assignmentId: number;
        text: string;
        comment?: string;
    }, config?: APIConfig): Promise<CanvasSubmission>;
    /**
     * Creates a url submission on behalf of the current user
     * @author Gabe Abrams
     * @method createURLSubmission
     * @memberof api.course.assignment
     * @instance
     * @async
     * @param {object} opts - object containing all arguments
     * @param {number} opts.courseId - Canvas course Id
     * @param {number} opts.assignmentId - The Canvas assignment Id
     * @param {string} opts.url - The url of the submission
     * @param {string} [opts.comment] - A text student comment to include
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasSubmission>} Canvas submission {@link https://canvas.instructure.com/doc/api/submissions.html#Submission}
     */
    createURLSubmission(opts: {
        courseId: number;
        assignmentId: number;
        url: string;
        comment?: string;
    }, config?: APIConfig): Promise<CanvasSubmission>;
}
export default ECatAssignment;
