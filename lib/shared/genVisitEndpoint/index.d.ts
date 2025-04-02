import SharedArgs from '../types/APIConfig';
import VisitEndpointFunc from '../types/VisitEndpointFunc';
/**
 * Generate a visitEndpoint function
 * @param defaults defaults to use when visiting endpoints
 * @returns visitEndpoint function
 */
declare const genVisitEndpoint: (defaults: SharedArgs) => VisitEndpointFunc;
export default genVisitEndpoint;
