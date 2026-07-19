import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Faq } from '../../entities/faq.entity';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepo: Repository<Faq>,
  ) {}

  findAll() {
    return this.faqRepo.find({ order: { sortOrder: 'ASC' } });
  }
}
