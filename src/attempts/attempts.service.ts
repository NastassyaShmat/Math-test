import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';

import { Request } from 'express';

import { Attempt } from './entities/attempt.entity';
import { Answer } from 'src/answers/entities/answer.entity';

import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';

import { AttemptResponse } from './interfaces/attempt-response.interface';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectRepository(Attempt) private attemptsRepository: Repository<Attempt>,
    @InjectRepository(Answer) private answersRepository: Repository<Answer>,
  ) {}
  async create(
    req: Request,
    createAttemptDto: CreateAttemptDto | CreateAttemptDto[],
  ): Promise<AttemptResponse> {
    const createAnswers: CreateAttemptDto[] = [];

    if (!Array.isArray(createAttemptDto)) {
      createAnswers.push(createAttemptDto);
    } else {
      createAnswers.push(...createAttemptDto);
    }
    const questionIds = createAnswers.map((item) => item.questionId);

    const answers = await this.answersRepository.find({
      where: { questionId: In(questionIds) },
      select: { id: true, isCorrect: true },
    });

    const answersMap = {};
    answers.forEach((answ) => {
      answersMap[answ.id] = answ.isCorrect;
    });

    const rigthAnswers = createAnswers.filter(
      (item) => answersMap[item.answerId],
    );

    const score = (rigthAnswers.length / createAnswers.length).toFixed(2);

    const numberAttempts = await this.getNumberAttempts(req['user']['id']);

    if (numberAttempts?.length > 3) {
      throw new BadRequestException('Number of attempts exceeds 3');
    }

    const attempt = new Attempt();
    attempt.score = score;
    attempt.number = numberAttempts?.length + 1;
    attempt.userId = req['user']['id'];

    await this.attemptsRepository.save(attempt);

    return { score };
  }

  getNumberAttempts(id: number) {
    return this.attemptsRepository.find({ where: { userId: id } });
  }

  findAll(): Promise<Attempt[]> {
    return this.attemptsRepository.find({ relations: { user: true } });
  }

  findOne(id: number): Promise<Attempt> {
    return this.attemptsRepository.findOne({ where: { id } });
  }

  update(
    id: number,
    updateAttemptDto: UpdateAttemptDto,
  ): Promise<UpdateResult> {
    return; //this.attemptsRepository.update(id, updateAttemptDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.attemptsRepository.delete(id);
  }
}
