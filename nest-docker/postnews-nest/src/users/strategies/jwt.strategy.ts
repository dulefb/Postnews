import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/schemas/user.schema";
import { GetUser } from "../dto/get-user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'secret123'
        })
    }

    validate(payload:GetUser){
        console.log("JWT strategy hit...");
        return payload;
    }
}