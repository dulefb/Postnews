import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/schemas/user.schema";
import { GetUser } from "../dto/get-user.dto";
import { UsersService } from "../users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private userService: UsersService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'secret123'
        })
    }

    async validate(payload:GetUser){
        const user = await this.userService.validateUser(payload.email,payload.password);
        if(!user) throw new UnauthorizedException();
        return user;
    }
}