import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TokupackApplication } from '../../entities/tokupack-application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(TokupackApplication)
    private readonly appRepo: Repository<TokupackApplication>,
  ) {}

  create(dto: CreateApplicationDto) {
    const application = this.appRepo.create({
      name: dto.name,
      email: dto.email,
      preferredBrand: dto.preferredBrand,
      preferredBrandOther: dto.preferredBrandOther ?? '',
      liveCommerceBrands: dto.liveCommerceBrands,
      comment: dto.comment ?? '',
    });
    return this.appRepo.save(application);
  }

  findAll() {
    return this.appRepo.find({ order: { createdAt: 'DESC' } });
  }
}
