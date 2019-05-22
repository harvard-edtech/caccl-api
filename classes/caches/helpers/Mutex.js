const locks = require('locks');

/**
 * A simple Promise-based mutex
 * @module classes/caches/helpers/Mutex
 */
class Mutex {
  constructor() {
    this.mutex = locks.createMutex();
  }

  /**
   * Acquires the lock
   * @method acquire
   * @return {Promise} promise that resolves when the lock has been acquired
   */
  acquire() {
    return new Promise((resolve) => {
      this.mutex.lock(resolve);
    });
  }

  /**
   * Releases the lock
   * @method release
   */
  release() {
    this.mutex.unlock();
    return Promise.resolve();
  }
}

module.exports = Mutex;
