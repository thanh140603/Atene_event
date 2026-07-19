import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tokupack } from './tokupack.entity';

/** A participating K-Beauty brand shown in the "Participating Brands" grid. */
@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column({ default: '' })
  tagline: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ default: '' })
  imageUrl: string;

  @Column({ default: 0 })
  sortOrder: number;

  @OneToMany(() => Tokupack, (tokupack) => tokupack.brand, {
    cascade: true,
    eager: true,
  })
  tokupacks: Tokupack[];
}
