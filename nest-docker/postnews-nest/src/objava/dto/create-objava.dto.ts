import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/schemas/user.schema";

export class CreateObjavaDto{
    @IsString()
    name:string;

    @IsString()
    text:string;

    @IsNotEmpty()
    picture:string;

    @IsNotEmpty()
    tags:string[];

    @IsOptional()
    likes:string[];

    @IsOptional()
    author:User;
}