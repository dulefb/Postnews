import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const UsersSchema = SchemaFactory.createForClass(User);