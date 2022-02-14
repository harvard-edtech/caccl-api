// Import shared types
import APIStructure from '../../types/API';
import VisitEndpointFunc from './VisitEndpointFunc';

/**
 * Arguments required for initializing an endpoint category
 * @author Gabe Abrams
 */
type InitPack = {
  // Function to use for sending requests to Canvas
  visitEndpoint: VisitEndpointFunc,
  // Top-level api instance
  api: APIStructure,
};

export default InitPack;
