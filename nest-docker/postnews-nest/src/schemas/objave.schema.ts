import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

    // @Prop({required:true})
    // public author:User;
}