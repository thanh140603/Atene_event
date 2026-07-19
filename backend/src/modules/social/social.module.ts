import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SocialLink } from '../../entities/social-link.entity';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';

@Module({
  imports: [TypeOrmModule.forFeature([SocialLink])],
  controllers: [SocialController],
  providers: [SocialService],
})
export class SocialModule {}
