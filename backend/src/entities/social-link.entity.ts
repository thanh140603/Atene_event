import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** A card in the "Follow us" section. */
@Entity('social_links')
export class SocialLink {
  @PrimaryGeneratedColumn()
  id: number;

  // e.g. "instagram" | "tiktok"
  @Column()
  platform: string;

  @Column()
  label: string;

  @Column()
  handle: string;

  @Column({ default: '#' })
  url: string;

  @Column({ default: 0 })
  sortOrder: number;
}
