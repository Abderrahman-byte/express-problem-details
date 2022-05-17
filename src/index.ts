import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express'

import { ApiError } from './errors'
import { ExceptionApiError } from './errors/ExceptionApiError';

const defaultProblem = new ApiError('Internal Server Error', 'Something went wrong please try again another time.', 500)

interface ProblemDetailsConfig {
    catchAll?: boolean
    debug?: boolean
}

class ErrorResponseBody {
    error: ApiError;

    constructor (error:ApiError) {
        this.error = error
    }

    toJson () : Object {
        return { success: false, error: this.error.toJson() }
    }
}

const basicHandler = (err: any, request: Request, response: Response, next: NextFunction) : void => {
    if (!(err instanceof ApiError)) next(err)

    const problem: ApiError = err as ApiError

    problem.instance = request.path

    response.status(problem.status).json(new ErrorResponseBody(problem).toJson())
}

export const ProblemDetails = (config:ProblemDetailsConfig) : ErrorRequestHandler => {
    const conf = { catchAll: false, debug: true, ...config }

    if (!conf.catchAll) return basicHandler

    return (err: any, request: Request, response: Response, next: NextFunction) : void => {
        let problem : ApiError

        if (err instanceof ApiError) problem = err as ApiError
        else if (conf.debug) problem = new ExceptionApiError(err as Error)
        else problem = defaultProblem
    
        problem.instance = request.path
    
        response.status(problem.status).json(new ErrorResponseBody(problem).toJson())
    }
}

export * from './errors'