import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventInfo } from '../../entities/event-info.entity';
import { Stat } from '../../entities/stat.entity';
import { HowItWorksStep } from '../../entities/how-it-works-step.entity';
import { localizeEvent, normalizeLang } from '../../i18n/content';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventInfo)
    private readonly eventRepo: Repository<EventInfo>,
    @InjectRepository(Stat)
    private readonly statRepo: Repository<Stat>,
    @InjectRepository(HowItWorksStep)
    private readonly stepRepo: Repository<HowItWorksStep>,
  ) {}

  /** Aggregated payload powering the hero, countdown, about, stats and timeline. */
  async getEventInfo(lang?: string) {
    const [info, stats, steps] = await Promise.all([
      this.eventRepo.find({ order: { id: 'ASC' }, take: 1 }),
      this.statRepo.find({ order: { sortOrder: 'ASC' } }),
      this.stepRepo.find({ order: { sortOrder: 'ASC' } }),
    ]);

    const payload = {
      ...(info[0] ?? {}),
      stats,
      steps,
    };
    return localizeEvent(payload, normalizeLang(lang));
  }
}
