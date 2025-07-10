const jwt = require('jsonwebtoken');
import { Request,Response,NextFunction } from "express";
import AuthorizationRequest from "../types/autherizationRequest.type";
import UnautherizedError from "../errors/Unautherized.error";
import { addIssueToContext } from "zod";
const authorizeUser = (req:AuthorizationRequest, res:Response, next:NextFunction)=> {
try{
    
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
       res.status(401).json({ message: 'Authorization header missing' });
       return ;
    }

    
    const token = authHeader.split(' ')[1];
    if (!token) {
       res.status(401).json({ message: 'Token missing in header' });
       return;
    }

    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);
    
   
    req.user = decoded.user;
    req.role=decoded.role;
    console.log(req.user);
    console.log(req.role);
if(!req.role)
{
    req.role='NON_ADMIN';
}
   
    next();
}
catch(e)
{
    console.log("Error:"+e);
    throw  new UnautherizedError('User Not Autherized',);
}
};
export default authorizeUser;