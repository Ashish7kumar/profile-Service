
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { RegisterUserType } from "../zod/registrationSchema.zod";
import { LoginUserType } from '../zod/loginUser.schema';
import {Prisma,PrismaClient}  from "@prisma/client";
import { JWT_SECRET } from '../config/server.config';
import UnautherizedError from '../errors/Unautherized.error';
import NotFoundError from '../errors/notFound.error';
const userModel=new PrismaClient();
export default class UserService {
    async registerUser({ email, password, userName }: RegisterUserType) {
        const hasedPassword=await bcrypt.hash(password,10)
        const user = await userModel.user.create({
            data: {
                email,
                password:hasedPassword,  
                name: userName,
            }
        });
        
        const token=jwt.sign({user:user.name,userId:user.role},JWT_SECRET as string ,{ expiresIn: "1d" })
        return {user,token};
    }
    async loginUser({email,password}:LoginUserType){
        const foundUser=await userModel.user.findFirst({
            where:{
                email
            }
        });
        if(!foundUser)
        {
            return new NotFoundError('No such user is present')
        }
       const isCorrectPassword=await bcrypt.compare(foundUser.password,password);
        if(!isCorrectPassword)
        {
            throw new UnautherizedError('password is wrong');
        }
        return foundUser;
    }
async getAllUsers()
{
    const foundUsers=await userModel.user.findMany({});
    return foundUsers;
}
async getUserById(userName: string) {
    const foundUser = await userModel.user.findFirst({
        where: {
            name: userName,
        },
    });
    return foundUser;
}
    async updateUser(userName: string, updates: Partial<{ email: string, password: string, name: string }>) {
        const user = await userModel.user.findFirst({
            where: {
                name: userName
            }
        });

        if (!user) {
            throw new NotFoundError('No such User found');
        }

        const updatedUser = await userModel.user.update({
            where: {
                name: userName, 
            },
            data: updates
        });

        return updatedUser;
    }
  async deleteUser(userName:string)
  {
    const user=await userModel.user.findFirst({where: {
        name:userName 
    }});
    if(!user)
    {
        throw  new NotFoundError('No such user Exist to delete');
    }
    await userModel.user.delete({
        where: {
            name:userName 
        }
    })
    return user;
  }
}
