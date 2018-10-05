function _hashParams(params) {
  return JSON.stringify(params);
}

class MemoryCache {
  constructor() {
    this._map = new Map();
    this.storePromises = true;
  }

  get(path, params) {
    if (
      path
      && params
      && this._map.has(path)
    ) {
      // This path has some cached values. Look up based on params
      const paramsKey = _hashParams(params);
      return Promise.resolve(this._map.get(path).get(paramsKey));
    }
    return Promise.resolve();
  }

  set(path, params, value) {
    if (
      !path
      || !params
      || !value
    ) {
      // Nothing to store. Skip this
      return;
    }

    // Initialize submap if needed
    if (!this._map.has(path)) {
      this._map.set(path, new Map());
    }

    // Store new triplet
    const paramsKey = _hashParams(params);
    this._map.get(path).set(paramsKey, value);
    return Promise.resolve();
  }

  deletePaths(paths) {
    if (!paths) {
      // Nothing to delete (no paths)
      return Promise.resolve();
    }

    // Delete each path individually
    paths.forEach((path) => {
      this._map.delete(path);
    });

    return Promise.resolve();
  }

  getAllPaths() {
    return Promise.resolve(this._map.keys());
  }

  deleteAllPaths() {
    this._map = new Map();
    return Promise.resolve();
  }
}

module.exports = MemoryCache;
