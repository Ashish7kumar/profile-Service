import {Router} from "express";
import { registerController,getUserProfilesController,updateUserProfileController,getUserProfileByIdController,deleteUserProfileController } from "../controller/userController";
const userProfileRouter = Router();
userProfileRouter.get('/user', getUserProfilesController);
userProfileRouter.post('/user', registerController);
userProfileRouter.put('/user/:userName', updateUserProfileController);    
userProfileRouter.delete('/user', deleteUserProfileController);
userProfileRouter.get('/user/:userName', getUserProfileByIdController);
// userProfileRouter.post('login', loginController);
export default userProfileRouter