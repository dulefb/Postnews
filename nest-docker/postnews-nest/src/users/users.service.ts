import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUser } from './dto/create-user.dto'

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel:Model<User>){
    }

    async createUser(user:CreateUser){
            const existingUser = await this.userModel.exists(user);
            if(existingUser){
                throw new HttpException("User with this email already exists",400);
            }
            else{
                const newUser = await new this.userModel(user);
                return newUser.save();
            }
    }

    async getAllUsers(){
        return (await this.userModel.find().populate('objave'));
    }

    async getUserByEmailAndPassword(email:string,password:string){
        const user = await this.userModel.findOne({email:email,password:password});
        if(!user)
            throw new HttpException("Incorrect credentials",400);

        return user.populate('objave');
    }

    async getUserByEmail(email:string){
        const userFound = await this.userModel.findOne({
            email
        }).populate("objave");

        if(!userFound)
            throw new HttpException('User not found',HttpStatus.NOT_FOUND);

        return userFound;
    }

    async deleteUser(email:string){
        const existingUser = await this.userModel.findOne<User>({email:email});
        if(!existingUser){
            throw new HttpException("User with this email not found",400);
        }
        else{
            return await this.userModel.findOneAndDelete(existingUser);
        }
    }
}
