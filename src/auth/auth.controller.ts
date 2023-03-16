import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { TokenInterceptor } from './interceptors/token-interceptor';

import { AuthService } from './auth.service';

import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(TokenInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Req() req: Request, @Body() signIn: SignInDto) {
    return req['user'];
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() signUp: SignUpDto): Promise<{ status: string }> {
    await this.authService.register(signUp);
    return { status: 'Success' };
  }
}
