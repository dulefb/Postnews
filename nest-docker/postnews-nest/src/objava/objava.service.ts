import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Objava } from 'src/schemas/objave.schema';
import { CreateObjavaDto } from './dto/create-objava.dto';
import { GetObjavaDto } from './dto/get-user.dto';

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


        const newObjava = await new this.objavaModel({
            ...createObjava,
            author:validUser._id
        });
        const savedObjava = await newObjava.save();

        const updateUser = await validUser.updateOne({
            $push:{
                objave:savedObjava._id
            }
        });

        return savedObjava;
    }

    async getObjavaById(objavaId:string){
        const isValidId = mongoose.Types.ObjectId.isValid(objavaId);
        if(!isValidId)
            throw new HttpException('Invalid id',HttpStatus.BAD_REQUEST);

        const foundObjava = await this.objavaModel.findById(objavaId);
        if(!foundObjava)
            throw new HttpException('Objava not found',HttpStatus.NOT_FOUND);

        return foundObjava.populate('author');
    }

    async getAllObjave(){
        return this.objavaModel.find<GetObjavaDto>().populate('author');
    }

    async getAllObjaveByUser(email:string){
        const userFound = await this.userModel.findOne({email:email});
        if(!userFound)
            throw new HttpException('User not found',HttpStatus.NOT_FOUND);

        const objaveFound = await this.objavaModel.find({
            author:userFound._id
        }).populate('author');

        return objaveFound;
    }

    async getObjaveBySearch(search:string){
        const foundObjave = await this.objavaModel.find({
            name:{
                $regex:search,
                $options:'i'
            }
        }).sort({_id:-1}).populate('author');

        return foundObjave;
    }

    async getObjaveByTags(tags:string[]){
        const objaveByTags = await this.objavaModel.find({
            tags:{
                $in:tags
            }
        }).sort({_id:-1});

        const objaveWithoutTags = await this.objavaModel.find({
            tags:{
                $nin:tags
            }
        }).sort({_id:-1});

        return objaveByTags.concat(objaveWithoutTags);
    }

    async deleteObjavaById(objavaId:string){
        const isValidId = mongoose.Types.ObjectId.isValid(objavaId);
        if(!isValidId)
            throw new HttpException("Invalid id...",HttpStatus.BAD_REQUEST);

        const objavaFound = await this.objavaModel.findByIdAndDelete(objavaId);
        if(!objavaFound)
            throw new HttpException("Objava not found",HttpStatus.NOT_FOUND);

        return objavaFound;
    }
}
