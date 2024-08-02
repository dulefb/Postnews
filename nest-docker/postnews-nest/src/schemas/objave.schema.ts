import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

export class Objava{
    @Prop({required:true})
    public name:string;

    @Prop({required:true})
    public text:string;

    @Prop({required:true})
    public picture:string;

    @Prop({required:true})
    public tags:string[];

    @Prop({required:false})
    public likes:string[];

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User',required:false})
    public author:User;
}

export const ObjavaSchema = SchemaFactory.createForClass(Objava);