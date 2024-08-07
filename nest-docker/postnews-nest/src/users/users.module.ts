import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from 'src/schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Objava, ObjavaSchema } from 'src/schemas/objave.schema';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:User.name,
                schema:UsersSchema
            }
        ])
    ],
    controllers:[UsersController],
    providers:[UsersService],
    
})
export class UsersModule {}
