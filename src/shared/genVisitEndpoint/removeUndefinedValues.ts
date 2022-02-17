/**
 * Remove undefined values from an object
 * @author Gabe Abrams
 * @param {object} obj object to remove values from
 * @returns {object} filtered object
 */
const removeUndefinedValues = (obj: { [k: string]: any }) => {
  const filteredObj: { [k: string]: any } = {};
  Object.entries(obj).forEach(([key, value]) => {
    // Only add if not undefined
    if (value !== undefined) {
      filteredObj[key] = value;
    }
  });

  return filteredObj;
};

export default removeUndefinedValues;
