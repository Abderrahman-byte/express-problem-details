import { ApiError } from "./ApiError";

export class Unauthorized extends ApiError {
    constructor (detail?:string) {
        super('Unauthorized', detail || 'You are not authenticated for this action.', 401)
    }
}