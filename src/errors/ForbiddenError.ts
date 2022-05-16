import { ApiError } from "./ApiError";

export class ForbiddenError extends ApiError {
    constructor(detail?: string) {
        super('Forbidden', detail || 'This action is forbidden', 403)
    }
}