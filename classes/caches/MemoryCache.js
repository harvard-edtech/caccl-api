/**
 * Memory cache class
 * @author Gabriel Abrams
 * @module classes/caches/MemoryCache
 * @see module: classes/caches/MemoryCache
 */

const Mutex = require('./helpers/Mutex');
const hashParams = require('./helpers/hashParams.js');

/** Class that stores cache in memory */
class MemoryCache {
  /**
   * Creates a MemoryCache
   * @author Gabriel Abrams
   */
  constructor() {
    this._map = new Map();
    this.storePromises = true;

    // Prepare for locking
    this._locks = new Map();
  }

  /**
   * Acquires a lock on the (path, params) combo
   * @method acquireLock
   * @param {string} path - The url path that is cached
   * @param {object} params - The get parameters for the cached request
   * @return {Promise} a promise that resolves when the lock has been acquired
   */
  acquireLock(path, params) {
    const paramsKey = hashParams(params);

    // Initialize the path map (if it doesn't exist)
    if (!this._locks.has(path)) {
      this._locks.set(path, new Map());
    }

    // Initialize the params map (if it doesn't exist)
    if (!this._locks.get(path).has(paramsKey)) {
      this._locks.get(path).set(paramsKey, new Mutex());
    }

    // Get the appropriate mutex
    const mutex = this._locks.get(path).get(paramsKey);

    // Lock the mutex
    return mutex.acquire();
  }

  /**
   * Releases a lock on the (path, params) combo
   * @method releaseLock
   * @param {string} path - The url path that is cached
   * @param {object} params - The get parameters for the cached request
   * @return {Promise} a promise that resolves when the lock has been released
   */
  releaseLock(path, params) {
    // No need to release if nobody has locked anything on this path yet
    if (!this._locks.has(path)) {
      return Promise.resolve();
    }

    const paramsKey = hashParams(params);

    // No need to release if nobody has locked this (path, params) tuple yet
    if (!this._locks.get(path).has(paramsKey)) {
      return Promise.resolve();
    }

    // Get the appropriate mutex
    const mutex = this._locks.get(path).get(paramsKey);

    // Unlock the mutex
    return mutex.release();
  }

  /**
   * Gets a value given the key pair (path, param)
   * @author Gabriel Abrams
   * @method get
   * @param {string} path - The url path that is cached
   * @param {object} params - The get parameters for the cached request
   * @return {Promise.<object>} Promise that resolves with cached value
   */
  get(path, params) {
    // Check for cached value
    if (
      path
      && params
      && this._map.has(path)
    ) {
      // This path has some cached values. Look up based on params
      const paramsKey = hashParams(params);
      return Promise.resolve(this._map.get(path).get(paramsKey));
    }
    // No cached value: resolve with undefined
    return Promise.resolve();
  }

  /**
   * Saves a value to the key pair (path, param), fetchable using get function
   * @author Gabriel Abrams
   * @method set
   * @param {string} path - The url path to cache
   * @param {object} params - The get parameters to cache
   * @param {string} value - The value to cache
   * @return {Promise} Promise that resolves when set and save are complete
   */
  set(path, params, value) {
    // Make sure we have an item to store
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
    const paramsKey = hashParams(params);
    this._map.get(path).set(paramsKey, value);
    return Promise.resolve();
  }

  /**
   * Deletes a specific path (and all associated params) from the cache
   * @author Gabriel Abrams
   * @method deletePaths
   * @return {Promise} Promise that resolves when the path is deleted
   */
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

  /**
   * Gets the list of all cached paths
   * @author Gabriel Abrams
   * @method getAllPaths
   * @return {Promise.<string[]>} Promise that resolves with the list of cached
   *   paths
   */
  getAllPaths() {
    return Promise.resolve(this._map.keys());
  }

  /**
   * Deletes the entire cache
   * @author Gabriel Abrams
   * @method deleteAllPaths
   * @return {Promise} Promise that resolves when delete is complete
   */
  deleteAllPaths() {
    this._map = new Map();
    return Promise.resolve();
  }
}

module.exports = MemoryCache;
