import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Objava } from 'src/schemas/objave.schema';
import { CreateObjavaDto } from './dto/create-objava.dto';
import { GetObjavaDto } from './dto/get-user.dto';
import { UpdateObjavaDto } from './dto/update-objava.dto';
import e from 'express';

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
        }).sort({_id:-1}).populate('author');

        const objaveWithoutTags = await this.objavaModel.find({
            tags:{
                $nin:tags
            }
        }).sort({_id:-1}).populate('author');

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

    async updateObjava(updatedObjava:UpdateObjavaDto){

        if(!mongoose.Types.ObjectId.isValid(updatedObjava._id))
            throw new HttpException('Invalid id.',HttpStatus.BAD_REQUEST);

        const isUpdated = await this.objavaModel.findByIdAndUpdate(updatedObjava._id,updatedObjava);
        if(!isUpdated)
            throw new HttpException("Objava not updated",HttpStatus.SERVICE_UNAVAILABLE);

        return isUpdated;
    }

    async likeObjava(email:string,objavaId:string){
        if(!mongoose.Types.ObjectId.isValid(objavaId))
            throw new HttpException('Invalid id.',HttpStatus.BAD_REQUEST);
        
        const validUser = await this.userModel.findOne({
            email:email
        });

        if(!validUser)
            throw new HttpException('User not found.',HttpStatus.NOT_FOUND);

        const objavaFound = await this.objavaModel.findById(objavaId);

        if(!objavaFound)
            throw new HttpException('Objava not found',HttpStatus.NOT_FOUND);

        const likedObjava = objavaFound.likes.includes(email);

        if(likedObjava)
            throw new HttpException('Objava already liked',HttpStatus.BAD_REQUEST);

        await objavaFound.likes.push(email);
        validUser.tags = await validUser.tags.concat(objavaFound.tags);
        validUser.save();

        return objavaFound.save();
    }

    async dislikeObjava(email:string,objavaId:string){
        if(!mongoose.Types.ObjectId.isValid(objavaId))
            throw new HttpException('Invalid id.',HttpStatus.BAD_REQUEST);
        
        const validUser = await this.userModel.findOne({
            email:email
        });

        if(!validUser)
            throw new HttpException('User not found.',HttpStatus.NOT_FOUND);

        const objavaFound = await this.objavaModel.findById(objavaId);

        if(!objavaFound)
            throw new HttpException('Objava not found',HttpStatus.NOT_FOUND);

        if(!objavaFound.likes.includes(email))
            throw new HttpException('Invalid request',HttpStatus.BAD_REQUEST);

        objavaFound.likes = await objavaFound.likes.filter(x=>x!==email);
        objavaFound.save();
        validUser.tags = await validUser.tags.filter(x=>!objavaFound.tags.includes(x));
        validUser.save();

        return objavaFound;
    }
}
