import CanvasUser from './CanvasUser';
/**
 * Canvas admin
 * @author Gabe Abrams
 */
declare type CanvasAdmin = {
    id: number;
    role: string;
    user?: CanvasUser;
    workflow_state: string;
};
export default CanvasAdmin;
