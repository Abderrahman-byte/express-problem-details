const express = require('express')
const { ProblemDetails, ApiError, NotFoundError, MultipleErrors } = require('../dist')

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    response.json({ data: 'hello there!'})
})

app.get('/1', (request, response) => {
    throw new ApiError('some_error', 'This page generates error', 503, request.url)
})

app.get('/2', (request, response) => {
    const error = new MultipleErrors(400, [new ApiError('error_1', 'This is error 1')])
    error.addSubError(new ApiError('error_2', 'This is error 2'))
    error.addSubError(new ApiError('error_3', 'This is error 3'))

    throw error
})

app.get('*', (request, response) => {
    throw new NotFoundError()
})

app.use(ProblemDetails)

module.exports = app