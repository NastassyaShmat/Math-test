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

  async validateUser(email: string, password: string): Promise<any> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (existingUser && existingUser.password === password) {
      const { password, ...result } = existingUser;
      return result;
    }

    return null;
  }

  login(signInDto: SignInDto) {
    return 'This action adds a new auth';
  }

  async register(signUpDto: SignUpDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: signUpDto.email },
    });

    console.log(existingUser);

    if (existingUser) {
      throw new BadRequestException(
        `User with ${signUpDto.email} already exist`,
      );
    }
    return this.usersService.create(signUpDto);
  }
}
