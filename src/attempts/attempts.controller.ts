import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AttemptsService } from './attempts.service';

import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';

@ApiTags('Attempts')
@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Post()
  create(@Body() createAttemptDto: CreateAttemptDto) {
    return this.attemptsService.create(createAttemptDto);
  }

  @Get()
  findAll() {
    return this.attemptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.attemptsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateAttemptDto: UpdateAttemptDto,
  ) {
    return this.attemptsService.update(+id, updateAttemptDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.attemptsService.remove(+id);
  }
}
