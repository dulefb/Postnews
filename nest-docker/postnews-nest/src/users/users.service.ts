import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUser } from './dto/create-user.dto'

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel:Model<User>){
    }

    createUser(user:CreateUser){
        try{
            const newUser = new this.userModel(user);
            return newUser.save();
        }
        catch(err){
            throw new HttpException(err,HttpStatus.BAD_REQUEST);
        }
    }

    getAllUsers(){
        return this.userModel.find();
    }
}
