/**
 * Canvas progress item
 * @author Gabe Abrams
 */
type CanvasProgress = {
  id: number,
  context_id: number,
  context_type: string,
  user_id: number,
  tag: string,
  completion: number,
  workflow_state: string,
  created_at: string,
  updated_at: string,
  message?: string,
  results?: any,
  url: string,
};

export default CanvasProgress;