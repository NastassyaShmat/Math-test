import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Question } from './entities/question.entity';

import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}
  create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = new Question();
    question.body = createQuestionDto.body;

    return this.questionsRepository.save(question);
  }

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOne({ where: { id } });
  }

  update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<UpdateResult> {
    return this.questionsRepository.update(id, updateQuestionDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.questionsRepository.delete(id);
  }
}
