import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  body: string;
}
