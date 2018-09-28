class SessionCache {
  constructor(req) {
    this._req = req;

    // Initialize to empty cache
    if (!req.session.cache) {
      req.session.cache = {};
    }

    this.storePromises = false;
  }

  get(key) {
    return this._req.session.cache[key];
  }

  getAll() {
    return this._req.session.cache;
  }

  set(key, value) {
    this._req.session.cache[key] = value;
    this._req.session.save();
  }

  clear(key) {
    delete this._req.session.cache[key];
    this._req.session.save();
  }

  clearAll() {
    this._req.session.cache = {};
    this._req.session.save();
  }
}

module.exports = SessionCache;
