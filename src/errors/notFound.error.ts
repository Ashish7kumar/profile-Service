import BaseError from "./base.error"
export default class NotFoundError extends BaseError {
    constructor(message:string,details:string |null= null)
    {
        super("Not Found",message,404,details);
    }
}