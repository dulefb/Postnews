export class GetUser{
    _id:string;
    name:string;
    lastname:string;
    email:string;
    password:string;
    tags:string[];

    constructor(){
        this._id='';
        this.name='';
        this.lastname='';
        this.email='';
        this.password='';
        this.tags=[];
    }
}