# Custom Cache

You can use our built-in `memory` or `session` caches or create your own. If you make your own cache, it should follow this structure:

```js
class CustomCache {
    get(key) {
        // Return value associated with this key
    }
    
    getAll() {
        // Return object: { key => value }
        // This should represent all pairs in the cache
    }
    
    set(key, value) {
        // Store (key, value) pair
    }
    
    clear(key) {
        // Remove key from cache
    }
    
    clearAll() {
        // Clear entire cache
    }
}
```

**Note:** if your cache has the ability to store promises, your cache should also have a property:

```js
cacheInstance.storePromises = true
```
