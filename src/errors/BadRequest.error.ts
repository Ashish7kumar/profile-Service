import BaseError from "./base.error";
export default class BadRequestError extends BaseError {
    constructor(message: string, details: string | null = null) {
        super("BadRequestError", message, 400, details);
    }
    
}