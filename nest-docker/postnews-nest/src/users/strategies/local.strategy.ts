import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { UsersService } from "../users.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private userService: UsersService){
        super();
    }

    async validate(username:string,password:string){
        const user = await this.userService.validateUser(username,password);
        console.log(user);
        if(!user.data.user) throw new UnauthorizedException();
        
        return user;
    }
}