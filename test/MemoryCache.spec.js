const MemoryCache = require('../classes/MemoryCache.js');

describe('MemoryCache', function () {
  let mc;

  beforeEach(function () {
    mc = new MemoryCache();
  });

  it('Stores values', function () {
    // Store a value
    mc.set('key', 'value');
    // Retrieve value
    const ret = mc.get('key');
    if (!ret) {
      throw new Error('No value returned on "get"');
    }
    if (ret !== 'value') {
      throw new Error('Wrong value returned on "get"');
    }
  });

  it('Stores promises', function () {
    // Stores a promise
    mc.set('key', Promise.resolve('value'));
    // Retrieve value
    const ret = mc.get('key');
    if (!ret) {
      throw new Error('No value returned on "get"');
    }
    if (!ret.then || !ret.catch) {
      throw new Error('Value returned is not a promise');
    }
    return ret.then((value) => {
      if (value !== 'value') {
        throw new Error('Promise returned does not resolve to the correct value');
      }
    }).catch(() => {
      throw new Error('Returned promise rejects improperly OR we hit an error while evaluating the returned promise');
    });
  });

  it('Returnes null if unknown key is given', function () {
    // Look up something that doesn't exist
    if (mc.get('key')) {
      throw new Error('Something returned');
    }
  });

  it('Clears the cache', function () {
    // Populate
    mc.set('key', 'value');
    mc.set('key2', 'value2');
    // Clear
    mc.clearAll();
    // Check if any of the values still exist
    if (mc.get('key') || mc.get('key2')) {
      throw new Error('Found values');
    }
  });

  it('Gets all keys in the cache', function () {
    // Populate
    mc.set('key', 'value');
    mc.set('key2', 'value2');
    // Get all, compare using deep equality
    if (
      JSON.stringify(Object.keys(mc.getAll()))
      !== JSON.stringify(['key', 'key2'])
    ) {
      throw new Error('Keys returned from getAll were incorrect');
    }
  });
});
