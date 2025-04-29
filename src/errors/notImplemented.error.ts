import BaseError from "./base.error";
export default class NotImplementedError extends BaseError {
    constructor(message: string, details: string | null = null) {
        super("Not Implemented", message, 501, details);
    }
}