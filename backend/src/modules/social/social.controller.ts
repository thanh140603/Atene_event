import { Controller, Get } from '@nestjs/common';
import { SocialService } from './social.service';

@Controller('social-links')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get()
  findAll() {
    return this.socialService.findAll();
  }
}
