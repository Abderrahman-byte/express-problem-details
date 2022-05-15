interface DetailedError {
    toJson(): string;
}

export class ApiError implements DetailedError {
    title: string;
    detail: string;
    status: number;
    instance?: string;

    constructor(title: string, detail: string, status?: number, instance?: string) {
        this.title = title
        this.detail = detail
        this.status = status !== undefined ? status : 500
        this.instance = instance
    }

    toJson(): any {
        const obj : any = { title: this.title, detail: this.detail, status: this.status }

        if (this.instance !== undefined) obj.instance = this.instance

        return obj
    }
}