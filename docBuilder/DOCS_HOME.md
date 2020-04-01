# The Canvas API, but simpler and more powerful

This project is designed _by_ educators _for_ educators. Each endpoint is a black box that just works. For instance, _createFileSubmission()_ uploads the file, activates it, creates a new submission, and attaches the file to it. Instead of doing that 4-step process to submit a file, you just use our endpoint function.

<h1 style="display: flex; align-items: center;">
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-right: 10px;">
  </div>
  <div>
    Quickstart
  </div>
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-left: 10px;">
  </div>
</h1>

## 1. Find the `api` instance

In your CACCL project, you should already have an instance. Read through the [CACCL docs](http://bit.ly/caccl) to figure out where to find it.

## 2. Call an endpoint function

All endpoint functions are asynchronous, so we recommend using async/await syntax:

```js
const submissions = await api.course.assignment.listSubmissions({
  courseId: 51048,
  assignmentId: 12589,
});
```

<h1 style="display: flex; align-items: center;">
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-right: 10px;">
  </div>
  <div>
    Global Arguments
  </div>
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-left: 10px;">
  </div>
</h1>

Every endpoint function has these arguments in addition to the ones listed in their docs:

Argument | Type | Description | Default
:--- | :--- | :--- | :---
dontCache | boolean | if true, the returned value will not be cached if a cache is in use | false
ignoreCache | boolean | if true, even if there is a cached value available, we request new data from Canvas | false
onNewPage | function | this function is called when each page is received from Canvas | null
startPage | number | number of the first page to fetch | 1
maxPages | number | maximum number of pages to fetch | all pages
itemsPerPage | number | number of items to request in each page | 100
numRetries | number | number of times to retry failed network requests | 3
canvasHost | string | hostname for Canvas | auto-determined default value
accessToken | string | access token to use for authentication | current user's token

<h1 style="display: flex; align-items: center;">
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-right: 10px;">
  </div>
  <div>
    Tips and Tricks
  </div>
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-left: 10px;">
  </div>
</h1>

**Just download a preview if that's all you need:**

Do you only need the first few items in a giant list? Maybe, you just need to give the user a preview. Set `maxPages` to `1` and you'll only get the first batch of data.

```js
const firstFewCourses = await api.account.listCourses({
  accountId: 29,
  maxPages: 1,
});
```

**For giant requests, process data as it arrives:**

Instead of waiting until the endpoint function returns with all the pages of data, process it page by page using `onNewPage`.

```js
const allCourses = await api.account.listCourses({
  accountId: 29,
  onNewPage: (batchOfCourses) => {
    // Increment the number of courses that have been downloaded
    this.incrementNumberOfCourses(batchOfCourses.length);

    // Add the new batch of courses to the table shown to the user
    this.addCoursesToTable(batchOfCourses);
  },
});
```

**Hit _any_ endpoint, even ones that aren't listed in our docs:**

Use `api.other.endpoint()` to hit any endpoint in Canvas.

Caveat: all cached values will be deleted. Our cache is intelligently managed (create an assignment, list of assignments is uncached). Since we don't know how your other endpoint will affect cached data, we have to uncache everything.

Also, consider contributing to this open-source project! Let's the endpoint to the list.

**Think data has changed? Ignore the cache just this once:**

If you think the data in Canvas changed but you don't want to turn of caching altogether, you can disable it for a single request using `dontCache`:

```js
// Run this code every minute to update the assignment list
// (maybe the user created another assignment)
const assignments = await api.course.assignment.list({
  courseId: 48925,
  dontCache: true,
});
```

<h1 style="display: flex; align-items: center;">
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-right: 10px;">
  </div>
  <div>
    Advanced Stuff
  </div>
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-left: 10px;">
  </div>
</h1>

## How to create an `api` instance manually:

**1. Initialize caccl-api:**

```js
const API = require('caccl-api');

const api = new API({
  canvasHost: 'canvas.myschool.edu',
  accessToken: '5368~059382...3e57293hga3',
});
```

**2. Further configure caccl-api:**

When initializing `caccl-api`, you can pass in many different configuration options to customize its behavior or turn on/off certain functionality. In the example above, we only included the `canvasHost` and `accessToken` configuration options.

**Note:** all configuration options are optional.

Config Option | Type | Description | Default
:--- | :--- | :--- | :---
canvasHost | string | a default Canvas host to use for requests | canvas.instructure.com
accessToken | string | a default access token to apply to all requests. If excluded, every function call must contain an `accessToken` parameter | none
sendRequest | [SendRequest](https://github.com/harvard-edtech/caccl-send-request) | a function that sends an http request | [caccl-send-request](https://github.com/harvard-edtech/caccl-send-request)
defaultNumRetries | number | the number of times to retry failed requests | 3
defaultItemsPerPage | number | the number of items to request on a get request | 100
cacheType | string | if 'memory', cache is stored in memory. If 'session', cache is stored in the express session. To include a custom cache, include it using the "cache" config option | none
cache | [Cache](https://github.com/harvard-edtech/caccl-api/blob/master/contributor-docs/Cache.md) | a custom cache instance (Not required if using 'memory' or 'session' cacheType: those caches are built-in) | none