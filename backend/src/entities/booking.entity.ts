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

  // ISO date strings, e.g. ["2026-07-29", "2026-08-30"]
  @Column({ type: 'jsonb' })
  dates: string[];

  // Time ranges, e.g. [{ date: "2026-07-29", start: "13:00", end: "15:00" }]
  @Column({ type: 'jsonb' })
  slots: { date: string; start: string; end: string }[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
