import  express,{ErrorRequestHandler,Request,Response,NextFunction} from "express";
import BaseError from "../errors/base.error";
export default function errorHandlerMiddleware(err:unknown,req:Request,res:Response,next:NextFunction):void{
   if(err instanceof BaseError){
      console.log('here');
       res.status(err.statusCode).json({
         message:err.message,
         details:err.details
         
      })
      console.log('Error:'+err);
      return;
   }
   else{
         res.status(500).json({
             message:"Internal Server Error",
             
           
        })
      
        console.log('Error:'+err);
        return;
   }
}