export interface ErrorTypes {
    message : String,
    statusCode : number,
    error? : any
}

/* Extended express error class so that on every error server does not shut down but rather creates a new instance to this class and log the details only */
export class ExpressError extends Error {
    statusCode: number;
    error?: any;

    constructor(message: string, statusCode: number, error: any = null) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        Object.setPrototypeOf(this, ExpressError.prototype);
    }
}