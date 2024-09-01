import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Objava } from 'src/schemas/objave.schema';

export class CreateUser{

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    lastname:string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password:string;

    @IsOptional()
    tags:string[];

    @IsOptional()
    objava:Objava[];

    constructor(){
        this.name='';
        this.lastname='';
        this.email='';
        this.password='';
    }
}