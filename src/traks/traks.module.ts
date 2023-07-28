import { Module } from '@nestjs/common';
import { TraksService } from './traks.service';
import { TraksController } from './traks.controller';

@Module({
  controllers: [TraksController],
  providers: [TraksService],
})
export class TraksModule {}
