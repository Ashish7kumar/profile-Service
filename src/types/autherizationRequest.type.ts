import { Request } from "express";
export default interface AuthorizationRequest extends Request{
    user?:string,
    role?:string 
}