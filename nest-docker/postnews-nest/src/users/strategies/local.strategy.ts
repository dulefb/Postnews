import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { UsersService } from "../users.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private userService: UsersService){
        super();
    }

    validate(username:string,password:string){
        const user = this.userService.getUserByEmailAndPassword(username,password);
        if(!user) throw new UnauthorizedException();
        
        return user;
    }
}