import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { AttemptsModule } from './attempts/attempts.module';

@Module({
  imports: [UsersModule, QuestionsModule, AnswersModule, AttemptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
