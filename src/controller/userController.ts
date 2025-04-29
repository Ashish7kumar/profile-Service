import { Request, Response } from "express";
import NotFoundError from "../errors/notFound.error";
import BadRequestError from "../errors/BadRequest.error";
import registrationSchema from "../zod/registrationSchema.zod";
import  UserService  from "../service/userSerive";
const userService=new UserService();
export async function registerController(req:Request, res:Response) {
   
    const result=registrationSchema.safeParse(req.body);
    if(!result.success)
    {
        throw new BadRequestError("Error occured will Registring user",JSON.stringify(req.body))
    }
    const {user,token}=await userService.registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user,token});
    
   
}
export async function getUserProfilesController(req:Request, res:Response) {
  
        const users = await userService.getAllUsers();
        res.status(200).json(users);
        return;
    
}



export async function getUserProfileByIdController(req: Request, res: Response) :Promise<void>{
    const userName = req.params.userName; 
    const user = await userService.getUserById(userName);
    
    if (!user) {
         res.status(404).json({ message: "User not found" });
         return;
    }
    
    res.status(200).json(user);
}
export async function updateUserProfileController(req:Request, res:Response) {
    
        const userName = req.params.id;
       
        const updatedUser = await userService.updateUser(userName,req.body);
        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
   
}
export async function deleteUserProfileController(req:Request,res:Response) {
    const userName=req.params.id;
    const deletedUser=await userService.deleteUser(userName);
    res.status(200).json({
        message:"User Deleted successfully",deletedUser
    })
    
}