export default class BaseError extends Error{
    public statusCode: number;
    public details: string | null;
    constructor(name:string,message: string, statusCode: number, details: string | null = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = this.name; 
       Error.captureStackTrace(this);
    }
}