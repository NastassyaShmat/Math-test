import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { AttemptsModule } from './attempts/attempts.module';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { Question } from './questions/entities/question.entity';
import { Answer } from './answers/entities/answer.entity';
import { Attempt } from './attempts/entities/attempt.entity';
import { User } from './users/entities/user.entity';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        name: configService.get<string>('DATABASE_NAME') || 'math-test',
        host: configService.get<string>('DATABASE_HOST') || 'localhost',
        username: configService.get<string>('DATABASE_USER') || 'postgres',
        password: configService.get<string>('DATABASE_PASS') || '123456789',
        database: configService.get<string>('DATABASE_DB') || 'postgres',
        port: +configService.get<number>('DATABASE_PORT') || 5432,
        entities: [User, Question, Answer, Attempt],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    QuestionsModule,
    AnswersModule,
    AttemptsModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
