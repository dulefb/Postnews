import { ArrayMinSize, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateObjavaDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    _id:string;
    
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
}