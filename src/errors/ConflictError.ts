import { ApiError } from "./ApiError";

export class ConflictError extends ApiError {
    constructor (detail?:string) {
        super('Conflict', detail || 'Conflict', 409)
    }
}