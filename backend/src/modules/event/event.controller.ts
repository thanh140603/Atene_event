import { Controller, Get, Query } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getEvent(@Query('lang') lang?: string) {
    return this.eventService.getEventInfo(lang);
  }
}
