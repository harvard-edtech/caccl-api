import CanvasUser from './CanvasUser';

/**
 * Canvas admin
 * @author Gabe Abrams
 */
type CanvasAdmin = {
  // The unique identifier for the account role/user assignment.
  id: number,
  // The account role assigned. This can be 'AccountAdmin' or a user-defined role
  // created by the Roles API.
  role: string,
  // The user the role is assigned to. See the Users API for details.
  user?: CanvasUser,
  // The status of the account role/user assignment.
  workflow_state: string,
};

export default CanvasAdmin;
