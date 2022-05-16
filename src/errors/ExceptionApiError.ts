import { ApiError } from "./ApiError";

export class ExceptionApiError extends ApiError {
    error:Error

    constructor (error:Error) {
        super('Internal Server Error', error.message, 500)
        this.error = error
    }

    toJson() {
        return {...super.toJson(), exception: this.error}
    }
}