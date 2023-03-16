import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class CreateAttemptDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  answerId: number;
}
