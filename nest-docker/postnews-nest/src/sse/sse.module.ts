import { Module } from '@nestjs/common';
import { SseController } from './sse.controller';
import { SseService } from './sse.service';
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
    ])
  ],
  controllers: [SseController],
  providers: [SseService]})
export class SseModule {}
