import { User } from "./User";

export class Objava{
    public id:string;
    public name:string;
    public text:string;
    public picture:string;
    public tags:string[];
    public likes:string[];
    public author:User;

    constructor(){
        this.name=null;
        this.text=null;
        this.picture=null;
        this.tags=null;
        this.likes=null;
        this.author=null;
    }
}