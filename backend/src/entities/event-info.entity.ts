import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Singleton row holding the top-level event copy shown across the hero,
 * countdown, "About" and "Book Livestream" sections.
 */
@Entity('event_info')
export class EventInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'K-BEAUTY POPUP EVENT 2026' })
  heroKicker: string;

  @Column({ default: 'CREATOR SOURCING DAY' })
  heroTitle: string;

  @Column({ default: 'Powered by ATENE' })
  poweredBy: string;

  @Column({ type: 'text', default: 'Meet Top K-Beauty Brands. Get Exclusive TokuPack Access.' })
  heroTagline: string;

  @Column({ default: 'Start Your Livestream Journey' })
  heroTaglineEmphasis: string;

  // Countdown target + venue
  @Column({ type: 'timestamptz' })
  eventDate: Date;

  @Column({ default: 'THE STRINGS BY INTERCONTINENTAL SHINAGAWA, TOKYO' })
  venue: string;

  // Livestream campaign window (used by the reservation calendar)
  @Column({ type: 'date' })
  campaignStart: string;

  @Column({ type: 'date' })
  campaignEnd: string;

  // "About The Event" block
  @Column({ type: 'text', default: 'K-BeautyブランドとTikTokクリエイターをつなぐ' })
  aboutSubtitle: string;

  @Column({ type: 'text' })
  aboutBody: string;
}
