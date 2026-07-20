import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/** A livestream slot reservation submitted from the "Reserve Your Livestream" panel. */
@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  creatorName: string;

  @Column({ default: '' })
  email: string;

  // Google account subject id (stable per Gmail account), when signed in with Google.
  @Column({ default: '' })
  googleId: string;

  // ISO date strings, e.g. ["2026-07-29", "2026-08-30"]
  @Column({ type: 'jsonb' })
  dates: string[];

  // One-hour livestream slots, each tied to a brand, e.g.
  // [{ date: "2026-07-29", brand: "Purito Seoul", start: "13:00", end: "14:00" }]
  @Column({ type: 'jsonb' })
  slots: { date: string; brand: string; start: string; end: string }[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
