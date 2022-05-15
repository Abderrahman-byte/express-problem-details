# Express Problem Details

Simple middleware that implements [RFC-7807](https://datatracker.ietf.org/doc/html/rfc7807 "rfc7807") for ExpressJS

## usage 

```shell
npm i express-problem-details
```

```js
const { ProblemDetails, ApiError, NotFoundError } = require('../dist')

// Response body : {"success":false,"error":{"title":"some_error","detail":"This page generates error","status":503,"instance":"/"}} 
app.get('/1', (request, response) => {
    throw new ApiError('some_error', 'This page generates error', 503, request.url)
})

app.get('/2', (request, response) => {
    const error = new MultipleErrors(400, [new ApiError('error_1', 'This is error 1')])
    error.addSubError(new ApiError('error_2', 'This is error 2'))
    error.addSubError(new ApiError('error_3', 'This is error 3'))

    throw error
})

// Response body : {"success":false,"error":{"title":"not_found","detail":"This resource does not exist","status":404}}
app.get('*', (request, response) => {
    throw new NotFoundError()
})

app.use(ProblemDetails)
```