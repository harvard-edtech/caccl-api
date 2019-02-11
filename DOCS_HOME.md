# caccl-api
A class that defines a set of Canvas endpoints that can be easily accessed. Each endpoint is equipped with the appropriate pre- and post-processing steps to make the Canvas endpoints "behave". For instance, _getSubmissions()_ fetches student submissions and removes the test student's submission in post-processing.

## List of Endpoint Functions

See the "Endpoints" button at the top of the screen

## Getting Started

Important: `caccl-api` is a sub-component of `caccl`, itself. If you're using `caccl-api` separately, see "manual initialization" below. If you're using `caccl`, see instructions by code type:

### ...in a script

When initializing `caccl` as a script, you get the api object automatically:

```js
const initCACCL = require('caccl/script');

const api = initCACCL({
  ...
});
```

In an asynchronous function, just use:

```js
const students = await api.course.listStudents({ courseId: 52618 });
```

### ...on the server

In all routes covered by `autoRefreshRoutes` (defaults to all routes), `req.api` is added automatically.

```js
app.get('/listmystudents', async (req, res) => {
  const students = await req.api.course.listStudents({ courseId: 52618 });
  ...
});
```

### ...on the client

When initializing `caccl` on the client, you'll get the api object automatically:

```js
import initCACCL from 'caccl/client/cached';

const { api } = initCACCL();
```

In an asynchronous function, just use:

```js
const students = await api.course.listStudents({ courseId: 52618 });
```

## Manual Initialization

Import `caccl-api` and call its constructor:

```js
const API = require('caccl-api');

const api = new CanvasAPI({
  canvasHost: 'canvas.myschool.edu',
  accessToken: '5368~059382...3e57293hga3',
});
```

### Configuration Options:

When initializing `caccl-api`, you can pass in many different configuration options to customize its behavior or turn on/off certain functionality.

**Note:** all configuration options are optional.

Config Option | Type | Description | Default
:--- | :--- | :--- | :---
canvasHost | string | a default Canvas host to use for requests | canvas.instructure.com
accessToken | string | a default access token to apply to all requests | none
sendRequest | [SendRequest](https://github.com/harvard-edtech/caccl-send-request) | a function that sends an http request | [caccl-send-request](https://github.com/harvard-edtech/caccl-send-request)
defaultNumRetries | number | the number of times to retry failed requests | 3
defaultItemsPerPage | number | the number of items to request on a get request | 100
cacheType | string | if 'memory', cache is stored in memory. If 'session', cache is stored in the express session. To include a custom cache, include it using the "cache" config option | none
cache | [Cache](https://github.com/harvard-edtech/caccl-api/blob/master/docs/Cache.md) | a custom cache instance (Not required if using 'memory' or 'session' cacheType: those caches are built-in) | none

**Warning:** if accessToken is excluded, every request must contain an `accessToken` option.

## Part of the CACCL library
**C**anvas  
**A**pp  
**C**omplete  
**C**onnection  
**L**ibrary  
