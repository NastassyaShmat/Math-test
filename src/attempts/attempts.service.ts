import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Attempt } from './entities/attempt.entity';

import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectRepository(Attempt) private attemptsRepository: Repository<Attempt>,
  ) {}
  create(
    createAttemptDto: CreateAttemptDto | CreateAttemptDto[],
  ): Promise<Attempt[]> {
    return;
  }

  findAll(): Promise<Attempt[]> {
    return this.attemptsRepository.find();
  }

  findOne(id: number): Promise<Attempt> {
    return this.attemptsRepository.findOne({ where: { id } });
  }

  update(
    id: number,
    updateAttemptDto: UpdateAttemptDto,
  ): Promise<UpdateResult> {
    return;
  }

  remove(id: number): Promise<DeleteResult> {
    return this.attemptsRepository.delete(id);
  }
}
