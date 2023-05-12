import { PartialType } from '@nestjs/swagger';
import { FileUploadDto } from './create-file.dto';

export class UpdateFileDto extends PartialType(FileUploadDto) {}
