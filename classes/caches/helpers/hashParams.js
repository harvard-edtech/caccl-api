// Creates a cache key out of a set of params
module.exports = (params) => {
  return JSON.stringify(params);
};
