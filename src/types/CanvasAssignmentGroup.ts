import CanvasAssignment from './CanvasAssignment';

interface CanvasAssignmentGroup {
  // the id of the Assignment Group
  id: number,
  // the name of the Assignment Group
  name: string,
  // the position of the Assignment Group
  position: number,
  // the weight of the Assignment Group
  group_weight: number,
  // the sis source id of the Assignment Group
  sis_source_id: string,
  // the integration data of the Assignment Group
  integration_data: any,
  // the assignments in this Assignment Group (see the Assignment API for a
  // detailed list of fields)
  assignments: CanvasAssignment[],
  // the grading rules that this Assignment Group has
  rules?: {
    // Number of lowest scores to be dropped for each user.
    drop_lowest?: number,
    // Number of highest scores to be dropped for each user.
    drop_highest?: number,
    // Assignment IDs that should never be dropped.
    never_drop?: number[],
  } | null,
};

export default CanvasAssignmentGroup;
