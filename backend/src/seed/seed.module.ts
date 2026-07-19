import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventInfo } from '../entities/event-info.entity';
import { Stat } from '../entities/stat.entity';
import { HowItWorksStep } from '../entities/how-it-works-step.entity';
import { Brand } from '../entities/brand.entity';
import { Tokupack } from '../entities/tokupack.entity';
import { Faq } from '../entities/faq.entity';
import { SocialLink } from '../entities/social-link.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventInfo,
      Stat,
      HowItWorksStep,
      Brand,
      Tokupack,
      Faq,
      SocialLink,
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
