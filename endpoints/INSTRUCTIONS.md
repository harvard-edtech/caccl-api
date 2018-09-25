## Defining an endpoint
Follow this structure:

```js
{
	name: 'getStudentRoster',
	action: 'get the student roster from a course',
	run: (courseID) => {
		// ...
	},
}
```

### `name` should be the name of the function

### `action` should be a present-tense action sentence

The action should fit in the following sentences:

- Due to a network error, we could not ___. 
- While we were attempting to ___, we encountered an unknown error.

### `run(...)` should return a promise that resolves to:

If uncaching anything: 

```js
{
	response: /* Returned to caller of getStudentRoster(...) */,
	uncache: /* Tags to uncache (string or list of strings) */,
}
```

If not uncaching anything, just return the response.


In this function, you should call `visitEndpoint` to send requests to Canvas:

```js
visitEndpoint({
	path: '/api/v1/courses/' + courseID + '/enrollments',
	method: 'GET',
	params: {
		// ...
	},
}).then((response) => {
	// ...
}).catch((err) => {
	// ...
});
```