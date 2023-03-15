import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}
  login(signInDto: SignInDto) {
    return 'This action adds a new auth';
  }

  async register(signUpDto: SignUpDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: signUpDto.email },
    });

    if (!existingUser) {
      throw new BadRequestException(
        `User with ${signUpDto.email} already exist`,
      );
    }
    return this.usersService.create(signUpDto);
  }
}
