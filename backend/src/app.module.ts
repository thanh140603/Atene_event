import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventInfo } from './entities/event-info.entity';
import { Stat } from './entities/stat.entity';
import { HowItWorksStep } from './entities/how-it-works-step.entity';
import { Brand } from './entities/brand.entity';
import { Tokupack } from './entities/tokupack.entity';
import { Faq } from './entities/faq.entity';
import { SocialLink } from './entities/social-link.entity';
import { Booking } from './entities/booking.entity';
import { TokupackApplication } from './entities/tokupack-application.entity';

import { EventModule } from './modules/event/event.module';
import { BrandsModule } from './modules/brands/brands.module';
import { FaqsModule } from './modules/faqs/faqs.module';
import { SocialModule } from './modules/social/social.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'atene',
      password: process.env.POSTGRES_PASSWORD || 'atene_secret',
      database: process.env.POSTGRES_DB || 'atene_event',
      entities: [
        EventInfo,
        Stat,
        HowItWorksStep,
        Brand,
        Tokupack,
        Faq,
        SocialLink,
        Booking,
        TokupackApplication,
      ],
      synchronize: true, // dev convenience — auto-creates schema
      retryAttempts: 15,
      retryDelay: 3000,
    }),
    EventModule,
    BrandsModule,
    FaqsModule,
    SocialModule,
    BookingsModule,
    ApplicationsModule,
    SeedModule,
  ],
})
export class AppModule {}
