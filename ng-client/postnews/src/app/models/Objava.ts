import { Comment } from "./Comment";
import { User } from "./User";

export class Objava{
    public _id:string;
    public name:string;
    public text:string;
    public picture:string;
    public tags:string[];
    public likes:string[];
    public comments:Comment[];
    public author:User;

    constructor(){
        this._id=""
        this.name='';
        this.text='';
        this.picture='';
        this.tags=[];
        this.likes=[];
        this.comments=[];
        this.author=new User();
    }
}