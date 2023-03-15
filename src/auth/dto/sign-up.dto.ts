import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Min(4)
  @Max(16)
  password: string;
}
