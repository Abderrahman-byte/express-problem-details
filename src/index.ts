import { NextFunction, Request, Response } from 'express'

import { ApiError } from './errors'

class ErrorResponseBody {
    error: ApiError;

    constructor (error:ApiError) {
        this.error = error
    }

    toJson () : string {
        return JSON.stringify({ success: false, error: this.error.toJson() })
    }
}

export const ProblemDetails = (err: any, request: Request, response: Response, next: NextFunction) : void => {
    if (!(err instanceof ApiError)) next(err)

    const problem: ApiError = err as ApiError

    problem.instance = request.path

    response.status(problem.status).json(new ErrorResponseBody(problem).toJson())
}

export * from './errors'