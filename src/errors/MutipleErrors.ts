import { ApiError } from "./ApiError";

export class MultipleErrors extends ApiError {
    #suberrors: ApiError[]

    constructor(status: number, suberrors?: ApiError[]) {
        super('mutlipe_errors', 'Multiple has occurred.', status)
        this.#suberrors = suberrors ? [...suberrors] : []
    }

    addSubError(error: ApiError) {
        this.#suberrors.push(error)
    }

    toJson() {
        const obj = super.toJson()

        obj.subErrors = this.#suberrors.map(subError => {
            const subObj = subError.toJson()
            delete subObj.status
            return subObj
        })

        return obj
    }
}