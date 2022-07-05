interface CanvasModule {
  // the unique identifier for the module
  id: number,
// the state of the module: 'active', 'deleted'
  workflow_state: string,
// the position of this module in the course (1-based)
  position: number,
// the name of this module
  name: string,
// (Optional) the date this module will unlock
  unlock_at: string,
// Whether module items must be unlocked in order
  require_sequential_progress: boolean,
// IDs of Modules that must be completed before this one is unlocked
  prerequisite_module_ids: number[],
// The number of items in the module
  items_count: number,
// The API URL to retrieve this module's items
  items_url: string,
// The contents of this module, as an array of Module Items. (Present only if
// requested via include[]=items AND the module is not deemed too large by
// Canvas.)
  items: string[] | null,
// The state of this Module for the calling user one of 'locked', 'unlocked',
// 'started', 'completed' (Optional; present only if the caller is a student or
// if the optional parameter 'student_id' is included)
  state: string,
// the date the calling user completed the module (Optional; present only if the
// caller is a student or if the optional parameter 'student_id' is included)
  completion_date: string,
// if the student's final grade for the course should be published to the SIS
// upon completion of this module
  publish_final_grade: boolean,
// (Optional) Whether this module is published. This field is present only if
// the caller has permission to view unpublished modules.
  published?: boolean,
};

export default CanvasModule;
