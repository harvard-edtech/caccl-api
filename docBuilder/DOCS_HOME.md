# The Canvas API, but simpler and more powerful

This project is designed _by_ educators _for_ educators. Each endpoint is a black box that just works. We don't have full API coverage, but we add functions as they are requested.

<h1 style="display: flex; align-items: center;">
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-right: 10px;">
  </div>
  <div>
    Quickstart
  </div>
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-left: 10px;">
  </div>
</h1>

## 1. Get an `api` instance

In your CACCL project, you should have access to an `api` instance (via `getAPI`, for example). Read through the [CACCL docs](http://bit.ly/caccl) to learn more.

## 2. Call an endpoint function

All endpoint functions are asynchronous, so we recommend using async/await syntax:

```ts
const submissions = await api.course.listStudents();
```

<h1 style="display: flex; align-items: center;">
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-right: 10px;">
  </div>
  <div>
    API Config
  </div>
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-left: 10px;">
  </div>
</h1>

Every endpoint function can take a second argument that overwrites default settings:

Argument | Type | Description
:--- | :--- | :---
onNewPage | function | this function is called when each page is received from Canvas
maxPages | number | maximum number of pages to fetch
itemsPerPage | number | number of items to request in each page
numRetries | number | number of times to retry failed network requests
canvasHost | string | hostname for Canvas
accessToken | string | access token to use for authentication
authenticityToken | string | Canvas authenticity token (we recommend that you use accessToken instead)

In most cases, you will not need to include any of these parameters because the defaults will suffice.

<h1 style="display: flex; align-items: center;">
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-right: 10px;">
  </div>
  <div>
    Tips and Tricks
  </div>
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-left: 10px;">
  </div>
</h1>

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

Use `api.other.endpoint(...)` to hit any endpoint in Canvas.

If you find that you're using other endpoints frequently, please request that those endpoints be added to CACCL API as an official function.
