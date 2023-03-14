import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Attempt } from './entities/attempt.entity';

import { AttemptsService } from './attempts.service';

import { AttemptsController } from './attempts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt])],
  controllers: [AttemptsController],
  providers: [AttemptsService],
})
export class AttemptsModule {}
