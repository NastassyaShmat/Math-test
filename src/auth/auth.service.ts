import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
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

  private async verifyPassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  async getAuthUser(email: string, password: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: email },
    });

    try {
      await this.verifyPassword(password, existingUser.password);
      existingUser.password = undefined;
      return existingUser;
    } catch {
      throw new BadRequestException('Something went wrong');
    }
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let existingUser: User;

    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: payload.sub },
      });
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }

    existingUser.password = undefined;

    return existingUser;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }

  async register(signUpDto: SignUpDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: signUpDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        `User with ${signUpDto.email} already exist `,
      );
    }

    try {
      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
      const user = await this.usersService.create({
        ...signUpDto,
        password: hashedPassword,
      });

      user.password = undefined;
      return user;
    } catch {
      throw new BadRequestException('Something went wrong');
    }
  }
}
