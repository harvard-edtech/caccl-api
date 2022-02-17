import AssignmentCanvasOverride from './CanvasAssignmentOverride';
import CanvasDiscussionTopic from './CanvasDiscussionTopic'
import CanvasRubricCriterion from './CanvasRubricCriterion';
import CanvasRubricSettings from './CanvasRubricSettings';
import CanvasSubmission from './CanvasSubmission';

interface CanvasAssignment {
  // the ID of the assignment
  id: number,
  // the name of the assignment
  name: string,
  // the assignment description, in an HTML fragment
  description: string,
  // The time at which this assignment was originally created
  created_at: string,
  // The time at which this assignment was last modified in any way
  updated_at?: string,
  // the due date for the assignment. returns null if not present. NOTE: If this
  // assignment has assignment overrides, this field will be the due date as it
  // applies to the user requesting information from the API.
  due_at?: string | null,
  // the lock date (assignment is locked after this date). returns null if not
  // present. NOTE: If this assignment has assignment overrides, this field will
  // be the lock date as it applies to the user requesting information from the
  // API.
  lock_at?: string | null,
  // the unlock date (assignment is unlocked after this date) returns null if not
  // present NOTE: If this assignment has assignment overrides, this field will be
  // the unlock date as it applies to the user requesting information from the
  // API.
  unlock_at?: string | null,
  // whether this assignment has overrides
  has_overrides?: boolean | null,
  // (Optional) all dates associated with the assignment, if applicable
  all_dates?: any | null,
  // the ID of the course the assignment belongs to
  course_id: number,
  // the URL to the assignment's web page
  html_url: string,
  // the URL to download all submissions as a zip
  submissions_download_url: string,
  // the ID of the assignment's group
  assignment_group_id?: number | null,
  // Boolean flag indicating whether the assignment requires a due date based on
  // the account level setting
  due_date_required: boolean,
  // Allowed file extensions, which take effect if submission_types includes
  // 'online_upload'.
  allowed_extensions?: string[] | null,
  // An integer indicating the maximum length an assignment's name may be
  max_name_length: number,
  // Boolean flag indicating whether or not Turnitin has been enabled for the
  // assignment. NOTE: This flag will not appear unless your account has the
  // Turnitin plugin available
  turnitin_enabled?: boolean | null,
  // Boolean flag indicating whether or not VeriCite has been enabled for the
  // assignment. NOTE: This flag will not appear unless your account has the
  // VeriCite plugin available
  vericite_enabled?: boolean | null,
  // Settings to pass along to turnitin to control what kinds of matches should be
  // considered. originality_report_visibility can be 'immediate',
  // 'after_grading', 'after_due_date', or 'never' exclude_small_matches_type can
  // be null, 'percent', 'words' exclude_small_matches_value: - if type is null,
  // this will be null also - if type is 'percent', this will be a number between
  // 0 and 100 representing match size to exclude as a percentage of the document
  // size. - if type is 'words', this will be number > 0 representing how many
  // words a match must contain for it to be considered NOTE: This flag will not
  // appear unless your account has the Turnitin plugin available
  turnitin_settings?: any | null,
  // If this is a group assignment, boolean flag indicating whether or not
  // students will be graded individually.
  grade_group_students_individually?: boolean | null,
  // (Optional) assignment's settings for external tools if submission_types
  // include 'external_tool'. Only url and new_tab are included (new_tab defaults
  // to false).  Use the 'External Tools' API if you need more information about
  // an external tool.
  external_tool_tag_attributes?: any | null,
  // Boolean indicating if peer reviews are required for this assignment
  peer_reviews?: boolean | null,
  // Boolean indicating peer reviews are assigned automatically. If false, the
  // teacher is expected to manually assign peer reviews.
  automatic_peer_reviews?: boolean | null,
  // Integer representing the amount of reviews each user is assigned. NOTE: This
  // key is NOT present unless you have automatic_peer_reviews set to true.
  peer_review_count?: number | null,
  // String representing a date the reviews are due by. Must be a date that occurs
  // after the default due date. If blank, or date is not after the assignment's
  // due date, the assignment's due date will be used. NOTE: This key is NOT
  // present unless you have automatic_peer_reviews set to true.
  peer_reviews_assign_at?: string | null,
  // Boolean representing whether or not members from within the same group on a
  // group assignment can be assigned to peer review their own group's work
  intra_group_peer_reviews?: boolean | null,
  // The ID of the assignment’s group set, if this is a group assignment. For
  // group discussions, set group_category_id on the discussion topic, not the
  // linked assignment.
  group_category_id?: number | null,
  // if the requesting user has grading rights, the number of submissions that
  // need grading.
  needs_grading_count?: number | null,
  // if the requesting user has grading rights and the
  // 'needs_grading_count_by_section' flag is specified, the number of submissions
  // that need grading split out by section. NOTE: This key is NOT present unless
  // you pass the 'needs_grading_count_by_section' argument as true.  ANOTHER
  // NOTE: it's possible to be enrolled in multiple sections, and if a student is
  // setup that way they will show an assignment that needs grading in multiple
  // sections (effectively the count will be duplicated between sections)
  needs_grading_count_by_section: (
    {
      section_id: string,
      needs_grading_count: number,
    }
  )[],
  // the sorting order of the assignment in the group
  position: number,
  // (optional, present if Sync Grades to SIS feature is enabled)
  post_to_sis?: boolean | null,
  // (optional, Third Party unique identifier for Assignment)
  integration_id?: string | null,
  // (optional, Third Party integration data for assignment)
  integration_data?: any | null,
  // the maximum points possible for the assignment
  points_possible?: number | null,
  // the types of submissions allowed for this assignment list containing one or
  // more of the following: 'discussion_topic', 'online_quiz', 'on_paper', 'none',
  // 'external_tool', 'online_text_entry', 'online_url', 'online_upload',
  // 'media_recording', 'student_annotation'
  submission_types: (
    'discussion_topic'
    | 'online_quiz'
    | 'on_paper'
    | 'none'
    | 'external_tool'
    | 'online_text_entry'
    | 'online_url'
    | 'online_upload'
    | 'media_recording'
    | 'student_annotation'
  )[],
  // If true, the assignment has been submitted to by at least one student
  has_submitted_submissions?: boolean | null,
  // The type of grading the assignment receives; one of 'pass_fail', 'percent',
  // 'letter_grade', 'gpa_scale', 'points'
  grading_type: (
    'pass_fail'
    | 'percent'
    | 'letter_grade'
    | 'gpa_scale'
    | 'points'
  ),
  // The id of the grading standard being applied to this assignment. Valid if
  // grading_type is 'letter_grade' or 'gpa_scale'.
  grading_standard_id?: number | null,
  // Whether the assignment is published
  published: boolean,
  // Whether the assignment's 'published' state can be changed to false. Will be
  // false if there are student submissions for the assignment.
  unpublishable: boolean,
  // Whether the assignment is only visible to overrides.
  only_visible_to_overrides: boolean,
  // Whether or not this is locked for the user.
  locked_for_user: boolean,
  // (Optional) Information for the user about the lock. Present when
  // locked_for_user is true.
  lock_info?: any | null,
  // (Optional) An explanation of why this is locked for the user. Present when
  // locked_for_user is true.
  lock_explanation?: string | null,
  // (Optional) id of the associated quiz (applies only when submission_types is
  // ['online_quiz'])
  quiz_id?: number | null,
  // (Optional) whether anonymous submissions are accepted (applies only to quiz
  // assignments)
  anonymous_submissions?: boolean | null,
  // (Optional) the DiscussionTopic associated with the assignment, if applicable
  discussion_topic?: CanvasDiscussionTopic | null,
  // (Optional) Boolean indicating if assignment will be frozen when it is copied.
  // NOTE: This field will only be present if the AssignmentFreezer plugin is
  // available for your account.
  freeze_on_copy?: boolean | null,
  // (Optional) Boolean indicating if assignment is frozen for the calling user.
  // NOTE: This field will only be present if the AssignmentFreezer plugin is
  // available for your account.
  frozen?: boolean | null,
  // (Optional) Array of frozen attributes for the assignment. Only account
  // administrators currently have permission to change an attribute in this list.
  // Will be empty if no attributes are frozen for this assignment. Possible
  // frozen attributes are: title, description, lock_at, points_possible,
  // grading_type, submission_types, assignment_group_id, allowed_extensions,
  // group_category_id, notify_of_update, peer_reviews NOTE: This field will only
  // be present if the AssignmentFreezer plugin is available for your account.
  frozen_attributes?: string[] | null,
  // (Optional) If 'submission' is included in the 'include' parameter, includes a
  // Submission object that represents the current user's (user who is requesting
  // information from the api) current submission for the assignment. See the
  // Submissions API for an example response. If the user does not have a
  // submission, this key will be absent.
  submission?: CanvasSubmission | null,
  // (Optional) If true, the rubric is directly tied to grading the assignment.
  // Otherwise, it is only advisory. Included if there is an associated rubric.
  use_rubric_for_grading?: boolean | null,
  // (Optional) An object describing the basic attributes of the rubric, including
  // the point total. Included if there is an associated rubric.
  rubric_settings?: CanvasRubricSettings | null,
  // (Optional) A list of scoring criteria and ratings for each rubric criterion.
  // Included if there is an associated rubric.
  rubric?: CanvasRubricCriterion[] | null,
  // (Optional) If 'assignment_visibility' is included in the 'include' parameter,
  // includes an array of student IDs who can see this assignment.
  assignment_visibility?: number[] | null,
  // (Optional) If 'overrides' is included in the 'include' parameter, includes an
  // array of assignment override objects.
  overrides?: AssignmentCanvasOverride[] | null,
  // (Optional) If true, the assignment will be omitted from the student's final
  // grade
  omit_from_final_grade?: boolean | null,
  // Boolean indicating if the assignment is moderated.
  moderated_grading?: boolean | null,
  // The maximum number of provisional graders who may issue grades for this
  // assignment. Only relevant for moderated assignments. Must be a positive
  // value, and must be set to 1 if the course has fewer than two active
  // instructors. Otherwise, the maximum value is the number of active instructors
  // in the course minus one, or 10 if the course has more than 11 active
  // instructors.
  grader_count: number,
  // The user ID of the grader responsible for choosing final grades for this
  // assignment. Only relevant for moderated assignments.
  final_grader_id?: number | null,
  // Boolean indicating if provisional graders' comments are visible to other
  // provisional graders. Only relevant for moderated assignments.
  grader_comments_visible_to_graders: boolean,
  // Boolean indicating if provisional graders' identities are hidden from other
  // provisional graders. Only relevant for moderated assignments with
  // grader_comments_visible_to_graders set to true.
  graders_anonymous_to_graders: boolean,
  // Boolean indicating if provisional grader identities are visible to the final
  // grader. Only relevant for moderated assignments.
  grader_names_visible_to_final_grader: boolean,
  // Boolean indicating if the assignment is graded anonymously. If true, graders
  // cannot see student identities.
  anonymous_grading: boolean,
  // The number of submission attempts a student can make for this assignment. -1
  // is considered unlimited.
  allowed_attempts: number,
  // Whether the assignment has manual posting enabled. Only relevant for courses
  // using New Gradebook.
  post_manually: boolean,
  // (Optional) If 'score_statistics' and 'submission' are included in the
  // 'include' parameter and statistics are available, includes the min, max, and
  // mode for this assignment
  score_statistics?: boolean | null,
  // (Optional) If retrieving a single assignment and 'can_submit' is included in
  // the 'include' parameter, flags whether user has the right to submit the
  // assignment (i.e. checks enrollment dates, submission types, locked status,
  // attempts remaining, etc...). Including 'can submit' automatically includes
  // 'submission' in the include parameter. Not available when observed_users are
  // included.
  can_submit?: boolean | null,
  // The id of the attachment to be annotated by students. Relevant only if
  // submission_types includes 'student_annotation'.
  annotatable_attachment_id?: any | null,
};

export default CanvasAssignment;
