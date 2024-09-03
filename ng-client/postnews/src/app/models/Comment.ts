export class Comment{
    _id:string;
    userEmail:string;
    textContent:string;
    
    constructor(email:string,textContent:string){
        this._id='';
        this.userEmail=email;
        this.textContent=textContent;
    }
}