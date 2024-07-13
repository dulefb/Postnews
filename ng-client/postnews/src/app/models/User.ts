import { Objava } from "./Objava";

export class User{
    name:string;
    lastname:string;
    email:string;
    password:string;
    content:Objava[];
    tags:string[];
    
    constructor(){
        this.name="";
        this.lastname="";
        this.email="";
        this.password="";
        this.content=[];
        this.tags=[];
    }
}