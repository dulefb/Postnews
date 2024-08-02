import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Objava } from 'src/schemas/objave.schema';
import { CreateObjavaDto } from './dto/create-objava.dto';

@Injectable()
export class ObjavaService {

    constructor(@InjectModel(Objava.name) private objavaModel:Model<Objava>,@InjectModel(User.name) private userModel:Model<User>){
        
    }

    async createObjava(createObjava:CreateObjavaDto,userId:string){

        const isValidId = mongoose.Types.ObjectId.isValid(userId);
        if(!isValidId)
            throw new HttpException('Not valid ID...',HttpStatus.BAD_REQUEST);

        const validUser = await this.userModel.findById(userId);
        if(!validUser)
            throw new HttpException('User not found',HttpStatus.NOT_FOUND);


        const newObjava = await new this.objavaModel(createObjava);
        newObjava.updateOne({
            author:validUser._id
        });
        const savedObjava = await newObjava.save();

        const updateUser = await validUser.updateOne({
            $push:{
                objave:savedObjava._id
            }
        });

        return {
            newObjava,
            savedObjava,
            updateUser
        };
    }

    async getObjavaById(objavaId:string){

    }

    async getAllObjave(){
        return this.objavaModel.find();
    }
}
