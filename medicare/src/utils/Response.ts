
class ApiResponse<T = unknown> {

    private statusCode: number
    private message: string
    private response: T
    private status: boolean

    constructor(statusCode: number, message: string, response: T, status: boolean) {
        this.statusCode = statusCode
        this.message = message
        this.response = response
        this.status = status
    }
}

export {
    ApiResponse
}