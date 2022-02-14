import APIStructure from '../types/API';
import InitPack from './types/InitPack';
import VisitEndpointFunc from './types/VisitEndpointFunc';
/**
 * An endpoint category
 * @author Gabe Abrams
 */
declare class EndpointCategory {
    protected visitEndpoint: VisitEndpointFunc;
    protected api: APIStructure;
    /**
     * Initialize the endpoint category
     * @author Gabe Abrams
     * @param initPack package of info for initializing the endpoint category
     */
    constructor(initPack: InitPack);
}
export default EndpointCategory;
