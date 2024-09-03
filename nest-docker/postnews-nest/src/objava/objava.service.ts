import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Objava } from 'src/schemas/objave.schema';
import { CreateObjavaDto } from './dto/create-objava.dto';
import { GetObjavaDto } from './dto/get-objava.dto';
import { UpdateObjavaDto } from './dto/update-objava.dto';
import e from 'express';
import { DBResponse } from 'src/models/DBResponse';
import { Comment } from 'src/models/Comment';

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

        return new DBResponse(true,"Objava created successfully",<GetObjavaDto>savedObjava);
    }

    async getObjavaById(objavaId:string){
        const isValidId = mongoose.Types.ObjectId.isValid(objavaId);
        if(!isValidId)
            throw new HttpException('Invalid id',HttpStatus.BAD_REQUEST);

        const foundObjava = (await this.objavaModel.findById(objavaId)).populate('author');
        if(!foundObjava)
            throw new HttpException('Objava not found',HttpStatus.NOT_FOUND);

        return new DBResponse(true,"Objava received...",foundObjava);
    }

    async getAllObjave(){
        const objava$ = await this.objavaModel.find<GetObjavaDto>().populate('author');
        return new DBResponse(true,"Objave received...",objava$);
    }

    async getAllObjaveByUser(email:string){
        const userFound = await this.userModel.findOne({email:email});
        if(!userFound)
            throw new HttpException('User not found',HttpStatus.NOT_FOUND);

        const objaveFound = await this.objavaModel.find({
            author:userFound._id
        }).populate('author');

        return new DBResponse(true,"Objava from user...",objaveFound);
    }

    async getObjaveBySearch(search:string){
        const foundObjave = await this.objavaModel.find({
            name:{
                $regex:search,
                $options:'i'
            }
        }).sort({_id:-1}).populate('author');

        return new DBResponse(true,"Query search objave...",foundObjave);;
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

        return new DBResponse(true,"Feed objave received...",objaveByTags.concat(objaveWithoutTags));
    }

    async deleteObjavaById(objavaId:string){
        const isValidId = mongoose.Types.ObjectId.isValid(objavaId);
        if(!isValidId)
            throw new HttpException("Invalid id...",HttpStatus.BAD_REQUEST);

        const objavaFound = await this.objavaModel.findByIdAndDelete(objavaId);
        if(!objavaFound)
            throw new HttpException("Objava not found",HttpStatus.NOT_FOUND);

        return new DBResponse(true,"Objava deleted...",objavaFound);;
    }

    async updateObjava(updatedObjava:UpdateObjavaDto){
        if(!mongoose.Types.ObjectId.isValid(updatedObjava._id))
            throw new HttpException('Invalid id.',HttpStatus.BAD_REQUEST);

        const isUpdated = await this.objavaModel.findByIdAndUpdate(updatedObjava._id,updatedObjava);
        if(!isUpdated)
            throw new HttpException("Objava not updated",HttpStatus.SERVICE_UNAVAILABLE);
        const obj = await this.objavaModel.findById(updatedObjava._id);
        return new DBResponse(true,"Objava updated...",obj);;
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
        const obj = await objavaFound.save();

        return new DBResponse(true,"Objava liked...",obj);
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
            throw new HttpException('Objava already liked',HttpStatus.BAD_REQUEST);

        objavaFound.likes = await objavaFound.likes.filter(x=>x!==email);
        validUser.tags = await validUser.tags.filter(x=>!objavaFound.tags.includes(x));
        validUser.save();
        const obj = await objavaFound.save();

        return new DBResponse(true,"Objava disliked...",obj);
    }

    async postCommentOnObjava(objavaId:string,comment:Comment){
        if(!mongoose.Types.ObjectId.isValid(objavaId))
            throw new HttpException('Invalid id.',HttpStatus.BAD_REQUEST);
        
        const validUser = await this.userModel.findOne({
            email:comment.userEmail
        });

        if(!validUser)
            throw new HttpException('User not found.',HttpStatus.NOT_FOUND);

        const objavaFound = await this.objavaModel.findById(objavaId);

        if(!objavaFound)
            throw new HttpException('Objava not found',HttpStatus.NOT_FOUND);

        comment._id = new mongoose.Types.ObjectId().toString();
        await objavaFound.comments.push(comment);
        const obj = await objavaFound.save();

        return new DBResponse(true,"Comment added successfully",obj);
    }

    async deleteCommentOnObjava(objavaId:string,commentId:string){
        if(!mongoose.Types.ObjectId.isValid(objavaId))
            throw new HttpException('Invalid id.',HttpStatus.BAD_REQUEST);

        if(!mongoose.Types.ObjectId.isValid(commentId))
            throw new HttpException('Invalid id.',HttpStatus.BAD_REQUEST);

        const objavaFound = await this.objavaModel.findById(objavaId);

        if(!objavaFound)
            throw new HttpException('Objava not found',HttpStatus.NOT_FOUND);

        objavaFound.comments = await objavaFound.comments.filter(x=>x._id===commentId);
        await objavaFound.save();

        return new DBResponse(true,"Comment deleted",objavaFound);
    }
}
