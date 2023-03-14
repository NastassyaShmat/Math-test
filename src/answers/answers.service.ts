import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Answer } from './entities/answer.entity';

import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
  ) {}
  create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answerRepository.save(createAnswerDto);
  }

  findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }

  findOne(id: number): Promise<Answer> {
    return this.answerRepository.findOne({ where: { id } });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<UpdateResult> {
    return this.answerRepository.update(id, updateAnswerDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.answerRepository.delete(id);
  }
}
