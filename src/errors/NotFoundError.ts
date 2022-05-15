import { ApiError } from './ApiError'

export class NotFoundError extends ApiError {
    constructor () {
        super('not_found', 'The requested resource does not exist', 404)
    }
}