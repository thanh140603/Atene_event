import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventInfo } from '../entities/event-info.entity';
import { Stat } from '../entities/stat.entity';
import { HowItWorksStep } from '../entities/how-it-works-step.entity';
import { Brand } from '../entities/brand.entity';
import { Faq } from '../entities/faq.entity';
import { SocialLink } from '../entities/social-link.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(EventInfo)
    private readonly eventRepo: Repository<EventInfo>,
    @InjectRepository(Stat)
    private readonly statRepo: Repository<Stat>,
    @InjectRepository(HowItWorksStep)
    private readonly stepRepo: Repository<HowItWorksStep>,
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
    @InjectRepository(Faq)
    private readonly faqRepo: Repository<Faq>,
    @InjectRepository(SocialLink)
    private readonly socialRepo: Repository<SocialLink>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedEventInfo();
    await this.seedStats();
    await this.seedSteps();
    await this.seedBrands();
    await this.seedFaqs();
    await this.seedSocial();
  }

  private async seedEventInfo() {
    if ((await this.eventRepo.count()) > 0) return;
    await this.eventRepo.save(
      this.eventRepo.create({
        heroKicker: 'K-BEAUTY POPUP EVENT 2026',
        heroTitle: 'CREATOR SOURCING DAY',
        poweredBy: 'Powered by ATENE',
        heroTagline: 'Meet Top K-Beauty Brands. Get Exclusive TokuPack Access.',
        heroTaglineEmphasis: 'Start Your Livestream Journey',
        eventDate: new Date('2026-07-23T13:00:00+09:00'),
        venue: 'THE STRINGS BY INTERCONTINENTAL SHINAGAWA, TOKYO',
        campaignStart: '2026-07-27',
        campaignEnd: '2026-08-26',
        aboutSubtitle: 'K-BeautyブランドとTikTokクリエイターをつなぐ',
        aboutBody:
          'TokuPackとは、ATENE主催の「Creator Sourcing Day」イベント限定で提供される、各ブランドが厳選した特別な限定セットです。',
      }),
    );
    this.logger.log('Seeded event info');
  }

  private async seedStats() {
    if ((await this.statRepo.count()) > 0) return;
    await this.statRepo.save([
      { value: '10+', label: '人気K-Beautyブランド', sortOrder: 1 },
      { value: '20+', label: '限定セット・トクパック', sortOrder: 2 },
      { value: '最強セット', label: '各ブランド厳選の特別構成', sortOrder: 3 },
      { value: '限定販売', label: 'TikTok限定・数量限定', sortOrder: 4 },
    ]);
    this.logger.log('Seeded stats');
  }

  private async seedSteps() {
    if ((await this.stepRepo.count()) > 0) return;
    await this.stepRepo.save([
      { stepNumber: 1, title: 'Offline Event', subtitle: 'July 23th', sortOrder: 1 },
      { stepNumber: 2, title: 'Receive Tokupack', subtitle: 'At The Event', sortOrder: 2 },
      { stepNumber: 3, title: 'Try Product', subtitle: 'At Home', sortOrder: 3 },
      { stepNumber: 4, title: 'Book Livestream', subtitle: 'Jul 27 - Aug 26', sortOrder: 4 },
      { stepNumber: 5, title: 'Go Live', subtitle: 'Scheduled Slot', sortOrder: 5 },
      { stepNumber: 6, title: 'Reward', subtitle: 'Per Sale', sortOrder: 6 },
    ]);
    this.logger.log('Seeded how-it-works steps');
  }

  private async seedBrands() {
    if ((await this.brandRepo.count()) > 0) return;

    const data: Array<{
      slug: string;
      name: string;
      tagline: string;
      sets: number;
    }> = [
      { slug: 'purito-seoul', name: 'Purito Seoul', tagline: 'From Soil to Seoul', sets: 3 },
      { slug: 'vt-cosmetics', name: 'VT Cosmetics', tagline: 'In - Vogue and Timeless', sets: 3 },
      { slug: 'celonia', name: 'Celonia', tagline: 'Premium Anti-Aging Solution', sets: 3 },
      { slug: 'beplain', name: 'Beplain', tagline: 'Enjoy plain skin, beplain', sets: 1 },
      { slug: 'dr-deep', name: 'Dr.Deep', tagline: "Designing today's depth for the skin's tomorrow", sets: 1 },
      { slug: 'lubylab', name: 'LUBYLAB', tagline: 'The Home-Surgical Approach', sets: 1 },
      { slug: 'dailyweekly', name: 'DAILYWEEKLY', tagline: 'Daily Delight, Weekly Wonders', sets: 1 },
      { slug: 'torhop', name: 'Torhop', tagline: 'Sauna-Inspired Warming Care', sets: 1 },
      { slug: 'babaco', name: 'Babaco', tagline: 'Beauty begins with real care.', sets: 1 },
    ];

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const tokupacks = Array.from({ length: d.sets }).map((_, k) => ({
        name: `${d.name} TokuPack ${k + 1}`,
        description: `Curated ${d.name} set — Creator Sourcing Day exclusive.`,
        price: 0,
      }));
      await this.brandRepo.save(
        this.brandRepo.create({
          slug: d.slug,
          name: d.name,
          tagline: d.tagline,
          description: `${d.name} — ${d.tagline}`,
          imageUrl: '',
          sortOrder: i + 1,
          tokupacks,
        }),
      );
    }
    this.logger.log('Seeded brands + tokupacks');
  }

  private async seedFaqs() {
    if ((await this.faqRepo.count()) > 0) return;
    const answer =
      'A 2-3 line sentence about answering the question ect ect ect filler text goes here ect ect……';
    await this.faqRepo.save([
      { question: 'How do I receive my TokuPack?', answer, sortOrder: 1 },
      { question: 'Who can join Creator Sourcing Day?', answer, sortOrder: 2 },
      { question: 'When is the livestream campaign period?', answer, sortOrder: 3 },
      { question: 'How do I book a livestream slot?', answer, sortOrder: 4 },
      { question: 'What rewards can creators earn?', answer, sortOrder: 5 },
      { question: 'Where is the offline event held?', answer, sortOrder: 6 },
    ]);
    this.logger.log('Seeded FAQs');
  }

  private async seedSocial() {
    if ((await this.socialRepo.count()) > 0) return;
    await this.socialRepo.save([
      {
        platform: 'instagram',
        label: 'ATENE',
        handle: '@atene_cosmetics.jp',
        url: 'https://instagram.com/atene_cosmetics.jp',
        sortOrder: 1,
      },
      {
        platform: 'instagram',
        label: 'TokuPack',
        handle: '@tokupack.official',
        url: 'https://instagram.com/tokupack.official',
        sortOrder: 2,
      },
      {
        platform: 'tiktok',
        label: 'ATENE',
        handle: '@atene_cosmetics.jp',
        url: 'https://tiktok.com/@atene_cosmetics.jp',
        sortOrder: 3,
      },
    ]);
    this.logger.log('Seeded social links');
  }
}
