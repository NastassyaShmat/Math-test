import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenInterceptor } from './interceptors/token-interceptor';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  login(@Req() req, @Body() signIn: SignInDto) {
    return req['user'];
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() signUp: SignUpDto): Promise<{ status: string }> {
    await this.authService.register(signUp);
    return { status: 'Success' };
  }
}
