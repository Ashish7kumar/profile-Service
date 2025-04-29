import {Router} from "express";
import { registerController,getUserProfilesController,updateUserProfileController,getUserProfileByIdController,deleteUserProfileController } from "../controller/userController";
const userProfileRouter = Router();
import authorizeUser from "../middleware/autherization";
userProfileRouter.get('/user',authorizeUser,getUserProfilesController);
userProfileRouter.post('/user',registerController);
userProfileRouter.put('/user/:userName',authorizeUser, updateUserProfileController);    
userProfileRouter.delete('/user',authorizeUser,deleteUserProfileController);
userProfileRouter.get('/user/:userName', authorizeUser,getUserProfileByIdController);
// userProfileRouter.post('login', loginController);
export default userProfileRouter