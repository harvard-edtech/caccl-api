import APIStructure from '../../types/API';
import VisitEndpointFunc from './VisitEndpointFunc';
/**
 * Arguments required for initializing an endpoint category
 * @author Gabe Abrams
 */
declare type InitPack = {
    visitEndpoint: VisitEndpointFunc;
    api: APIStructure;
};
export default InitPack;
