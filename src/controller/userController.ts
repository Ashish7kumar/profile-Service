import { Request, Response } from "express";
import NotFoundError from "../errors/notFound.error";
import BadRequestError from "../errors/BadRequest.error";
import registrationSchema from "../zod/registrationSchema.zod";
import  UserService  from "../service/userSerive";
const userService=new UserService();
import AuthorizationRequest from "../types/autherizationRequest.type";
import UnautherizedError from "../errors/Unautherized.error";
import loginUserSchema from "../zod/loginUser.schema";
export async function registerController(req:Request, res:Response) {
    
    
    const result=registrationSchema.safeParse(req.body);
    if(!result.success)
    {   
       
        result.error.format();
       
        const all_errors=result.error.errors.map(err=>err.message).join(",");
    throw new BadRequestError(all_errors,all_errors);
    }
    const {user,token}=await userService.registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user,token});
    
   
}
export async function getUserProfilesController(req:Request | AuthorizationRequest, res:Response) {
  
        const users = await userService.getAllUsers();
        res.status(200).json(users);
        return;
    
}

export async function loginController(req:Request,res:Response):Promise<void>{
    const zodResult=loginUserSchema.safeParse(req.body)
    if(!zodResult.success){
        zodResult.error.format();
        const message = zodResult.error.errors.map(err => err.message).join(", ");
        throw new BadRequestError('Request body of user login is wrong',message);
    }
    if(!req.body.email && ! req.body.password)
    {
        throw new BadRequestError('Email and password are required');
    }
    const result=await userService.loginUser(req.body);
    if (!result || !result.user || !result.token) {
        throw new Error('cant login User because output from login service is wrong');
      }
      res.status(200).json({
        user:result.user,
        token:result.token
      })
    
}

export async function getUserProfileByIdController(req:AuthorizationRequest, res: Response) :Promise<void>{
    const userName = req.params.userName; 
    if(!req.user)
    {
        throw new BadRequestError('No user Name');
    }
    const user = await userService.getUserById(req.user);
    
    if (!user) {
         res.status(404).json({ message: "User not found" });
         return;
    }
    
    res.status(200).json(user);
}
export async function updateUserProfileController(req:AuthorizationRequest, res:Response) {
    
        const userName = req.params.id;
        if(!req.user)
            {
                throw new BadRequestError('No user Name');
            }
        const updatedUser = await userService.updateUser(req.user,req.body);
        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
   
}
export async function deleteUserProfileController(req:AuthorizationRequest,res:Response) {

    if(!req.user)
        {
            throw new BadRequestError('No user Name');
        }
    const deletedUser=await userService.deleteUser(req.user);
    res.status(200).json({
        message:"User Deleted successfully",deletedUser
    })
    
}