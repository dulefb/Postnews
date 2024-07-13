export class DBResponse{
    valid:boolean;
    message:string;
    data:any;
    
    constructor(){
        this.valid=false;
        this.message="";
        this.data=null;
    }
}