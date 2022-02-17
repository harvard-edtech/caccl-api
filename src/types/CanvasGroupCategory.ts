import CanvasProgress from './CanvasProgress';

interface CanvasGroupCategory {
  // The ID of the group category.
  id: number,
  // The display name of the group category.
  name: string,
  // Certain types of group categories have special role designations. Currently,
  // these include: 'communities', 'student_organized', and 'imported'. Regular
  // course/account group categories have a role of null.
  role: ('communities' | 'student_organized' | 'imported'),
  // If the group category allows users to join a group themselves, thought they
  // may only be a member of one group per group category at a time. Values
  // include 'restricted', 'enabled', and null 'enabled' allows students to assign
  // themselves to a group 'restricted' restricts them to only joining a group in
  // their section null disallows students from joining groups
  self_signup?: ('restricted' | 'enabled' | null),
  // Gives instructors the ability to automatically have group leaders assigned. 
  // Values include 'random', 'first', and null; 'random' picks a student from the
  // group at random as the leader, 'first' sets the first student to be assigned
  // to the group as the leader
  auto_leader?: ('random' | 'first' | null),
  // The course or account that the category group belongs to. The pattern here is
  // that whatever the context_type is, there will be an _id field named after
  // that type. So if instead context_type was 'Course', the course_id field would
  // be replaced by an course_id field.
  context_type: string,
  account_id: number,
  course_id?: number | null,
  // If self-signup is enabled, group_limit can be set to cap the number of users
  // in each group. If null, there is no limit.
  group_limit?: number | null,
  // The SIS identifier for the group category. This field is only included if the
  // user has permission to manage or view SIS information.
  sis_group_category_id?: string | null,
  // The unique identifier for the SIS import. This field is only included if the
  // user has permission to manage SIS information.
  sis_import_id?: number | null,
  // If the group category has not yet finished a randomly student assignment
  // request, a progress object will be attached, which will contain information
  // related to the progress of the assignment request. Refer to the Progress API
  // for more information
  progress?: CanvasProgress | null,
};

export default CanvasGroupCategory;
