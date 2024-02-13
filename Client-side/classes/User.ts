import { Objava } from "./Objava";

export class User{
    name:string;
    lastname:string;
    email:string;
    password:string;
    content:Objava[];
    tags:string[];
    
    constructor(){
        this.name=null;
        this.lastname=null;
        this.email=null;
        this.password=null;
        this.content=[];
        this.tags=[];
    }
}