import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Attempt } from './entities/attempt.entity';

import { AttemptsService } from './attempts.service';

import { AttemptsController } from './attempts.controller';
import { Answer } from 'src/answers/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt, Answer])],
  controllers: [AttemptsController],
  providers: [AttemptsService],
})
export class AttemptsModule {}
