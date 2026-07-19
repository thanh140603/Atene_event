import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async findOne(slug: string) {
    const brand = await this.brandRepo.findOne({ where: { slug } });
    if (!brand) {
      throw new NotFoundException(`Brand "${slug}" not found`);
    }
    return brand;
  }
}
