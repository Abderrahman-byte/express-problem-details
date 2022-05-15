import { Request } from 'express'
import { ApiError } from './ApiError'

export class NotFoundError extends ApiError {
    constructor (request?:Request) {
        super('not_found', 'The requested resource does not exist', 404)
    }
}