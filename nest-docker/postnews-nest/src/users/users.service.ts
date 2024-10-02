import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUser } from './dto/create-user.dto'
import { DBResponse } from 'src/models/DBResponse';
import { GetUser } from './dto/get-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel:Model<User>,private jwtService:JwtService){
    }

    async createUser(user:CreateUser){
            const existingUser = await this.userModel.findOne({
                email:user.email
            });
            if(existingUser){
                throw new HttpException("User with this email already exists",400);
            }
            else{
                const newUser = await new this.userModel(user);
                const userSaved = await newUser.save();
                const jwtoken = this.jwtService.sign({
                    id:userSaved.id,
                    email:userSaved.email,
                    password:userSaved.password,
                    tags:userSaved.tags,
                    objave:userSaved.objave
                });
                return new DBResponse(true,"User created successfully",{jwtoken,userSaved});
            }
    }

    async getAllUsers(){
        return (await this.userModel.find().populate('objave'));
    }

    async getUserByEmailAndPassword(email:string,password:string){
        const user = await this.userModel.findOne({email:email,password:password});
        if(!user)
            throw new HttpException("Incorrect credentials",400);

        // console.log(user);
        const jwtoken = this.jwtService.sign({
            id:user.id,
            email:user.email,
            password:user.password,
            tags:user.tags,
            objave:user.objave
        });
        return new DBResponse(true,"User found.",{jwtoken,user});
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
