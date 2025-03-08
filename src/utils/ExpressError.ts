export interface ErrorTypes {
    message : String,
    statusCode : number,
    error? : any
    
}
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