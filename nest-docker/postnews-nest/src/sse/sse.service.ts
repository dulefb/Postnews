import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Objava } from 'src/schemas/objave.schema';
import { DBResponse } from 'src/models/DBResponse';

@Injectable()
export class SseService {
    constructor(@InjectModel(Objava.name) private objavaModel:Model<Objava>,@InjectModel(User.name) private userModel:Model<User>){
        
    }

    async getObjaveByTags(tags:string[]){
        const objaveByTags = await this.objavaModel.find({
            tags:{
                $in:tags
            }
        }).sort({_id:-1}).populate('author');

        const objaveWithoutTags = await this.objavaModel.find({
            tags:{
                $nin:tags
            }
        }).sort({_id:-1}).populate('author');

        const obj = await objaveByTags.concat(objaveWithoutTags);
        
        return new DBResponse(true,"Feed objave received...",obj);
    }
}
