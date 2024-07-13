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
        this.id=""
        this.name='';
        this.text='';
        this.picture='';
        this.tags=[];
        this.likes=[];
        this.author=new User();
    }
}