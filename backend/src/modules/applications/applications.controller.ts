import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { AdminGuard } from '../auth/admin.guard';

@Controller('tokupack-applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(dto);
  }

  // Admin dashboard only — the public site never lists applications.
  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.applicationsService.findAll();
  }
}
