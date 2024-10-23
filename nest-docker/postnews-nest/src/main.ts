import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:[
      'http://localhost:4200',
      'http://localhost:8080',
      'http://localhost:80',
      'http://192.168.1.4:4200',
      'http://192.168.1.4:8080',
      'http://192.168.0.23:4200',
      'http://192.168.0.23:8080',
      'http://192.168.0.23:80',
    ]
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.listen(3000);
}
bootstrap();
