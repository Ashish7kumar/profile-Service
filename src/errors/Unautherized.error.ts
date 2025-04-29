import BaseError from "./base.error";

export default class UnautherizedError extends BaseError{
    constructor(message:string,details:string |null=null )
    {
        super('Unautherized Error',message,401,details);
    }
}