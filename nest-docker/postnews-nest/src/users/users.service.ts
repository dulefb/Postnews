import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUser } from './dto/create-user.dto'
import { DBResponse } from 'src/models/DBResponse';
import { GetUser } from './dto/get-user.dto';

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
                const userSaved = await newUser.save();
                return new DBResponse(true,"User created successfully",userSaved);
            }
    }

    async getAllUsers(){
        return (await this.userModel.find().populate('objave'));
    }

    async getUserByEmailAndPassword(email:string,password:string){
        const user = await this.userModel.findOne({email:email,password:password}).populate('objave');
        if(!user)
            throw new HttpException("Incorrect credentials",400);

        return new DBResponse(true,"User found.",<User>user);
    }

    async getUserByEmail(email:string){
        const userFound = await this.userModel.findOne({
            email
        }).populate("objave");

        if(!userFound)
            throw new HttpException('User not found',HttpStatus.NOT_FOUND);

        return new DBResponse(true,"User found.",<User>userFound);
    }

    async deleteUser(email:string){
        const existingUser = await this.userModel.findOne<User>({email:email});
        if(!existingUser){
            throw new HttpException("User with this email not found",HttpStatus.BAD_REQUEST);
        }
        else{
            const deletedUser = await this.userModel.findOneAndDelete(existingUser);
            if(!deletedUser)
                throw new HttpException("User wnot deleted",HttpStatus.BAD_REQUEST);

            return new DBResponse(true,"User delete successfully.",<User>deletedUser);
        }
    }
}
