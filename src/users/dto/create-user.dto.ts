import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
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

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Min(4)
  @Max(16)
  password: string;
}
