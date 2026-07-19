import { Controller, Get, Param, Query } from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll(@Query('lang') lang?: string) {
    return this.brandsService.findAll(lang);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string, @Query('lang') lang?: string) {
    return this.brandsService.findOne(slug, lang);
  }
}
