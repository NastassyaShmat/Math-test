import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  value: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isCorrect: boolean;
}
