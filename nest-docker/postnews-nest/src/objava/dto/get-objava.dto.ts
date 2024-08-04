import { User } from "src/schemas/user.schema";

export class GetObjavaDto{
    id:string;
    
    name:string;

    text:string;

    picture:string;

    tags:string[];

    likes:string[];

    author:User;
}