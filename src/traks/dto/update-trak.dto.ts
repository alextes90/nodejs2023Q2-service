import { PartialType } from '@nestjs/mapped-types';
import { CreateTrakDto } from './create-trak.dto';

export class UpdateTrakDto extends PartialType(CreateTrakDto) {}
