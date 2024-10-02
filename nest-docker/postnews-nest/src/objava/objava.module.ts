import { Module } from '@nestjs/common';
import { ObjavaController } from './objava.controller';
import { ObjavaService } from './objava.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from 'src/schemas/user.schema';
import { Objava, ObjavaSchema } from 'src/schemas/objave.schema';
import { LocalStrategy } from 'src/users/strategies/local.strategy';
import { JwtStrategy } from 'src/users/strategies/jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:Objava.name,
        schema:ObjavaSchema
      },
      {
          name:User.name,
          schema:UsersSchema
      },
    ])
  ],
  controllers: [ObjavaController],
  providers: [ObjavaService]
})
export class ObjavaModule {}
