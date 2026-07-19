import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../../entities/brand.entity';
import { localizeBrand, normalizeLang } from '../../i18n/content';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  async findAll(lang?: string) {
    const l = normalizeLang(lang);
    const brands = await this.brandRepo.find({ order: { sortOrder: 'ASC' } });
    return brands.map((b) => localizeBrand(b, l));
  }

  async findOne(slug: string, lang?: string) {
    const brand = await this.brandRepo.findOne({ where: { slug } });
    if (!brand) {
      throw new NotFoundException(`Brand "${slug}" not found`);
    }
    return localizeBrand(brand, normalizeLang(lang));
  }
}
