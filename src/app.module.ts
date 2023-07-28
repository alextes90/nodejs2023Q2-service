import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TraksModule } from './traks/traks.module';

@Module({
  imports: [UsersModule, TraksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
