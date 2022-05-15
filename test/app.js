const express = require('express')
const { ProblemDetails, ApiError, NotFoundError } = require('../dist')

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    response.json({ data: 'hello there!'})
})

app.get('/1', (request, response) => {
    throw new ApiError('some_error', 'This page generates error', 503, request.url)
})

app.get('*', (request, response) => {
    throw new NotFoundError()
})

app.use(ProblemDetails)

module.exports = app