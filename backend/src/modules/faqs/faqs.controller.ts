import { Controller, Get, Query } from '@nestjs/common';
import { FaqsService } from './faqs.service';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  findAll(@Query('lang') lang?: string) {
    return this.faqsService.findAll(lang);
  }
}
