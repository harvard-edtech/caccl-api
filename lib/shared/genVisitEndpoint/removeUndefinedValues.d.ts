/**
 * Remove undefined values from an object
 * @author Gabe Abrams
 * @param {object} obj object to remove values from
 * @returns {object} filtered object
 */
declare const removeUndefinedValues: (obj: {
    [k: string]: any;
}) => {
    [k: string]: any;
};
export default removeUndefinedValues;
