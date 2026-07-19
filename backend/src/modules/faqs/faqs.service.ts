import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Faq } from '../../entities/faq.entity';
import { localizeFaq, normalizeLang } from '../../i18n/content';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepo: Repository<Faq>,
  ) {}

  async findAll(lang?: string) {
    const l = normalizeLang(lang);
    const faqs = await this.faqRepo.find({ order: { sortOrder: 'ASC' } });
    return faqs.map((f) => localizeFaq(f, l));
  }
}
