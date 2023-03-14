import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  value: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isCorrect: boolean;
}
