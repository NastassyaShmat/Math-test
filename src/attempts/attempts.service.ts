import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';

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

    const attempt = new Attempt();
    attempt.score = score;
    attempt.number = 1;
    attempt.userId = 1;

    await this.attemptsRepository.save(attempt);

    return { score };
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
    return;
  }

  remove(id: number): Promise<DeleteResult> {
    return this.attemptsRepository.delete(id);
  }
}
