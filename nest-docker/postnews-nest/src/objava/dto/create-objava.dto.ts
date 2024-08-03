import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/schemas/user.schema";

export class CreateObjavaDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    text:string;

    @IsNotEmpty()
    picture:string;

    @ArrayMinSize(1)
    tags:string[];

    @IsOptional()
    likes:string[];

    @IsOptional()
    author:User;
}