// Import shared types
import APIStructure from '../types/API';
import InitPack from './types/InitPack';
import VisitEndpointFunc from './types/VisitEndpointFunc';

/**
 * An endpoint category
 * @author Gabe Abrams
 */
class EndpointCategory {
  protected visitEndpoint: VisitEndpointFunc;
  protected api: APIStructure;

  /**
   * Initialize the endpoint category
   * @author Gabe Abrams
   * @param initPack package of info for initializing the endpoint category
   */
  constructor(initPack: InitPack) {
    this.visitEndpoint = initPack.visitEndpoint;
    this.api = initPack.api;
  }
}

export default EndpointCategory;
