import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventInfo } from '../../entities/event-info.entity';
import { Stat } from '../../entities/stat.entity';
import { HowItWorksStep } from '../../entities/how-it-works-step.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventInfo, Stat, HowItWorksStep])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
