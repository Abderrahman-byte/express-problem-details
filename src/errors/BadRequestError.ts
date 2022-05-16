import { ApiError } from "./ApiError";

export class BadRequestError extends ApiError {
    constructor (detail?:string) {
        super('Bad Request', detail || 'Bad request. Bad!', 400)
    }
}