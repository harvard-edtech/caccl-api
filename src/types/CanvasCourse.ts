import CanvasEnrollment from './CanvasEnrollment';
import CanvasTerm from './CanvasTerm';

interface CanvasCourse {
  // the unique identifier for the course
  id: number,
  // the SIS identifier for the course, if defined. This field is only included if
  // the user has permission to view SIS information.
  sis_course_id?: string | null,
  // the UUID of the course
  uuid: string,
  // the integration identifier for the course, if defined. This field is only
  // included if the user has permission to view SIS information.
  integration_id?: any | null,
  // the unique identifier for the SIS import. This field is only included if the
  // user has permission to manage SIS information.
  sis_import_id?: number | null,
  // the full name of the course
  name: string,
  // the course code
  course_code: string,
  // the current state of the course one of 'unpublished', 'available',
  // 'completed', or 'deleted'
  workflow_state: (
    'unpublished'
    | 'available'
    | 'completed'
    | 'deleted'
  ),
  // the account associated with the course
  account_id: number,
  // the root account associated with the course
  root_account_id: number,
  // the enrollment term associated with the course
  enrollment_term_id: number,
  // A list of grading periods associated with the course
  grading_periods?: any[] | null,
  // the grading standard associated with the course
  grading_standard_id?: number | null,
  // the grade_passback_setting set on the course
  grade_passback_setting?: string | null,
  // the date the course was created.
  created_at: string,
  // the start date for the course, if applicable
  start_at?: string | null,
  // the end date for the course, if applicable
  end_at?: string | null,
  // the course-set locale, if applicable
  locale?: string | null,
  // A list of enrollments linking the current user to the course. for student
  // enrollments, grading information may be included if include[]=total_scores
  enrollments?: CanvasEnrollment[] | null,
  // optional: the total number of active and invited students in the course
  total_students?: number | null,
  // course calendar
  calendar?: any | null,
  // the type of page that users will see when they first visit the course -
  // 'feed': Recent Activity Dashboard - 'wiki': Wiki Front Page - 'modules':
  // Course Modules/Sections Page - 'assignments': Course Assignments List -
  // 'syllabus': Course Syllabus Page other types may be added in the future
  default_view: (
    'feed'
    | 'wiki'
    | 'modules'
    | 'assignments'
    | 'syllabus'
    | string
  ),
  // optional: user-generated HTML for the course syllabus
  syllabus_body?: string | null,
  // optional: the number of submissions needing grading returned only if the
  // current user has grading rights and include[]=needs_grading_count
  needs_grading_count?: number | null,
  // optional: the enrollment term object for the course returned only if
  // include[]=term
  term?: CanvasTerm | null,
  // optional: information on progress through the course returned only if
  // include[]=course_progress
  course_progress?: {
    // total number of requirements from all modules
    requirement_count: number,
    // total number of requirements the user has completed from all modules
    requirement_completed_count: number,
    // url to next module item that has an unmet requirement. null if the user has
    // completed the course or the current module does not require sequential
    // progress
    next_requirement_url?: (string | null),
    // date the course was completed. null if the course has not been completed by
    // this user
    completed_at?: (string | null),
  } | null,
  // weight final grade based on assignment group percentages
  apply_assignment_group_weights: boolean,
  // optional: the permissions the user has for the course. returned only for a
  // single course and include[]=permissions
  permissions?: {
    create_discussion_topic: boolean,
    create_announcement: boolean,
  } | null,
  is_public: boolean,
  is_public_to_auth_users: boolean,
  public_syllabus: boolean,
  public_syllabus_to_auth: boolean,
  // optional: the public description of the course
  public_description: string,
  storage_quota_mb: number,
  storage_quota_used_mb: number,
  hide_final_grades: boolean
  license: string,
  allow_student_assignment_edits: boolean,
  allow_wiki_comments: boolean,
  allow_student_forum_attachments: boolean,
  open_enrollment: boolean,
  self_enrollment: boolean,
  restrict_enrollments_to_course_dates: boolean,
  course_format: string,
  // optional: this will be true if this user is currently prevented from viewing
  // the course because of date restriction settings
  access_restricted_by_date?: boolean,
  // The course's IANA time zone name.
  time_zone: string,
  // optional: whether the course is set as a Blueprint Course (blueprint fields
  // require the Blueprint Courses feature)
  blueprint?: any | null,
  // optional: Set of restrictions applied to all locked course objects
  blueprint_restrictions?: {
    content: boolean,
    points: boolean,
    due_dates: boolean,
    availability_dates: boolean,
  } | null,
  // optional: Sets of restrictions differentiated by object type applied to
  // locked course objects
  blueprint_restrictions_by_object_type?: {
    assignment: {
      content: boolean,
      points: boolean,
    },
    wiki_page: {
      content: boolean,
    },
  } | null,
  // optional: whether the course is set as a template (requires the Course
  // Templates feature)
  template?: boolean | null,
};

export default CanvasCourse;
