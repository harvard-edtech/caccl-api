"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An endpoint category
 * @author Gabe Abrams
 */
var EndpointCategory = /** @class */ (function () {
    /**
     * Initialize the endpoint category
     * @author Gabe Abrams
     * @param initPack package of info for initializing the endpoint category
     */
    function EndpointCategory(initPack) {
        this.visitEndpoint = initPack.visitEndpoint;
        this.api = initPack.api;
    }
    return EndpointCategory;
}());
exports.default = EndpointCategory;
//# sourceMappingURL=EndpointCategory.js.map