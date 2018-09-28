class MemoryCache {
  constructor() {
    this.cache = {};
    this.storePromises = true;
  }

  get(key) {
    return this.cache[key];
  }

  getAll() {
    return this.cache;
  }

  set(key, value) {
    this.cache[key] = value;
  }

  clear(key) {
    delete this.cache[key];
  }

  clearAll() {
    this.cache = {};
  }
}

module.exports = MemoryCache;
