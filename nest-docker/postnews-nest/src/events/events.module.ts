import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ObjavaService } from 'src/objava/objava.service';
import { ObjavaModule } from 'src/objava/objava.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from 'src/schemas/user.schema';
import { Objava, ObjavaSchema } from 'src/schemas/objave.schema';

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
    ]),
    ObjavaModule
  ],
  providers: [EventsGateway,ObjavaService]
})
export class EventsModule {}
