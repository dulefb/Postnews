import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './app.config';
import { UsersModule } from './users/users.module';
import { ObjavaModule } from './objava/objava.module';
import { SseService } from './sse/sse.service';
import { SseController } from './sse/sse.controller';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${config.username}:${config.password}@${config.host}:${config.port}/`,
      {
        authSource:'admin',
        directConnection:true,
        dbName:'postnews'
      }
    ),
    UsersModule,
    ObjavaModule,
    SseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
