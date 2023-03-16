import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: 'GET, POST, PUT, PATCH, DELETE',
  });
  app.useGlobalPipes(new ValidationPipe());

  app.use(passport.initialize());

  app.use(cookieParser('secret'));

  const config = new DocumentBuilder()
    .setTitle('Math Test App Server')
    .setDescription('Math Test App Server API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Questions')
    .addTag('Answers')
    .addTag('Attemts')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
