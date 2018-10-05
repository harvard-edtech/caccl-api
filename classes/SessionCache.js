const CACCLError = require('../../caccl-error/index.js');
const errorCodes = require('../errorCodes.js');

function _hashParams(params) {
  return JSON.stringify(params);
}

class SessionCache {
  constructor(req) {
    // Save request object
    this._req = req;

    // Check if no cache
    if (!this._req || !this._req.session) {
      throw new CACCLError({
        message: 'We could not create a new session cache because we didn\'t have a valid request and/or session object. Please contact an admin.',
        code: errorCodes.sessionCacheNoSession,
      });
    }

    // Initialize session (if not already done)
    if (!this._req.session.cache) {
      this._req.session.cache = {};
    }
  }

  get(path, params) {
    if (
      path
      && params
      && this._req.session.cache[path]
    ) {
      // This path has some cached values. Look up based on params
      const paramsKey = _hashParams(params);
      return Promise.resolve(this._req.session.cache[path][paramsKey]);
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
    if (!this._req.session.cache[path]) {
      this._req.session.cache[path] = {};
    }

    // Store new triplet
    const paramsKey = _hashParams(params);
    this._req.session.cache[path][paramsKey] = value;

    // Save
    return this._save();
  }

  deletePaths(paths) {
    if (!paths) {
      // Nothing to delete (no paths)
      return Promise.resolve();
    }

    paths.forEach((path) => {
      delete this._req.session.cache[path];
    });

    // Save
    return this._save();
  }

  getAllPaths() {
    return Promise.resolve(Object.keys(this._req.session.cache));
  }

  deleteAllPaths() {
    this._req.session.cache = {};
    return this._save();
  }

  _save() {
    return new Promise((resolve, reject) => {
      this._req.session.save((err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }
}

module.exports = SessionCache;
