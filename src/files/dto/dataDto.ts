import { ApiProperty } from '@nestjs/swagger';

export class DataDto {
  @ApiProperty()
  Text1: string;

  @ApiProperty()
  Text2: string;

  @ApiProperty()
  Text3: string;
}
