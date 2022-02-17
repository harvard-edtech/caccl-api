"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Remove undefined values from an object
 * @author Gabe Abrams
 * @param {object} obj object to remove values from
 * @returns {object} filtered object
 */
var removeUndefinedValues = function (obj) {
    var filteredObj = {};
    Object.entries(obj).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        // Only add if not undefined
        if (value !== undefined) {
            filteredObj[key] = value;
        }
    });
    return filteredObj;
};
exports.default = removeUndefinedValues;
//# sourceMappingURL=removeUndefinedValues.js.map