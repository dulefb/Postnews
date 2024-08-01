import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
    
    password:string;

    constructor(){
        this.name='';
        this.lastname='';
        this.email='';
        this.password='';
    }
}