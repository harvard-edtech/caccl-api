# Endpoints Documentation

Usefule endpoint facts:

* Each endpoint accepts an `options` object that contains all inputs as properties.
* Each endpoint returns a promise.
* To call a endpoint, use: `category.funcName(...)`. The subcategory does not affect how you call the endpoint.
* In addition to defined inputs, you can always include any of the following options:
  * `ignoreCache` - If true, endpoint won't return the cached version if it exists.
  * `dontCache` - If true, endpoint response won't be cached.
