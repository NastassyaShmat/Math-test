import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relationLoadStrategy: 'join',
      relations: ['userAttempts'],
      select: {
        firstName: true,
        lastName: true,
        userAttempts: { id: true, score: true, createdDate: true },
      },
      order: {
        userAttempts: {
          createdDate: 'ASC',
        },
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: {
        userAttempts: true,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userAttempts: { score: true, createdDate: true },
      },
      order: {
        userAttempts: {
          createdDate: 'ASC',
        },
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
