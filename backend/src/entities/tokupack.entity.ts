import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './brand.entity';

/** A curated product set ("TokuPack") offered by a brand. */
@Entity('tokupacks')
export class Tokupack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'int', default: 0 })
  price: number;

  @ManyToOne(() => Brand, (brand) => brand.tokupacks, { onDelete: 'CASCADE' })
  brand: Brand;
}
