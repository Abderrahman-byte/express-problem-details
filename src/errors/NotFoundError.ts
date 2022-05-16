import { ApiError } from './ApiError'

export class NotFoundError extends ApiError {
    constructor (detail?:string) {
        super('Not Found', detail || 'The requested resource does not exist', 404)
    }
}