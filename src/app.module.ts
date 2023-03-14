import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { AttemptsModule } from './attempts/attempts.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        name: 'main',
        host: configService.get<string>('DATABASE_HOST') || 'localhost',
        username: configService.get<string>('DATABASE_USER') || 'postgres',
        password: configService.get<string>('DATABASE_PASS') || '123456789',
        database: configService.get<string>('DATABASE_DB') || 'postgres',
        port: +configService.get<number>('DATABASE_PORT') || 5432,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),      
    UsersModule, QuestionsModule, AnswersModule, AttemptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
