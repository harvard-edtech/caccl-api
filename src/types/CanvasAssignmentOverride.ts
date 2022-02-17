interface CanvasAssignmentOverride {
  // the ID of the assignment override
  id: number,
  // the ID of the assignment the override applies to
  assignment_id: number,
  // the IDs of the override's target students (present if the override targets an
  // ad-hoc set of students)
  student_ids?: number[] | null,
  // the ID of the override's target group (present if the override targets a
  // group and the assignment is a group assignment)
  group_id?: number | null,
  // the ID of the overrides's target section (present if the override targets a
  // section)
  course_section_id?: number | null,
  // the title of the override
  title?: string | null,
  // the overridden due at (present if due_at is overridden)
  due_at?: string | null,
  // the overridden all day flag (present if due_at is overridden)
  all_day?: boolean | null,
  // the overridden all day date (present if due_at is overridden)
  all_day_date?: string | null,
  // the overridden unlock at (present if unlock_at is overridden)
  unlock_at?: string | null,
  // the overridden lock at, if any (present if lock_at is overridden)
  lock_at?: string | null,
};

export default CanvasAssignmentOverride;
