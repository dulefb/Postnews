
export class Comment{
    _id:string;
    userEmail:string;
    text:string;
    
    constructor(email:string,text:string){
        this._id='';
        this.userEmail=email;
        this.text=text;
    }
}