import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from 'src/schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Objava, ObjavaSchema } from 'src/schemas/objave.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:User.name,
                schema:UsersSchema
            }
        ]),
        JwtModule.register({
            secret:'secret123',
            signOptions:{
              expiresIn:600
            }
        }),
        PassportModule
    ],
    controllers:[UsersController],
    providers:[UsersService,LocalStrategy,JwtStrategy],
    
})
export class UsersModule {}
