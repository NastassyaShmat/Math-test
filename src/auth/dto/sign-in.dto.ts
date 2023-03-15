import { PartialType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';

export class SignInDto extends PartialType(SignUpDto) {}
