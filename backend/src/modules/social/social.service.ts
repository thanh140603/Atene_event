import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SocialLink } from '../../entities/social-link.entity';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(SocialLink)
    private readonly socialRepo: Repository<SocialLink>,
  ) {}

  findAll() {
    return this.socialRepo.find({ order: { sortOrder: 'ASC' } });
  }
}
