import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Objava } from './objave.schema';

@Schema()
export class User{

    @Prop({required:true})
    name:string;

    @Prop({required:true})
    lastname:string;

    @Prop({required:true,unique:true})
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({required:false})
    tags:string[];

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Objava'}]})
    objave:Objava[];
}

export const UsersSchema = SchemaFactory.createForClass(User);