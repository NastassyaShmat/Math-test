import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
