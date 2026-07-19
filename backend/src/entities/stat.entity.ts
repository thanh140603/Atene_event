import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** A single figure in the "Creator Sourcing Day" stats block (e.g. "10+"). */
@Entity('stats')
export class Stat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  label: string;

  @Column({ default: 0 })
  sortOrder: number;
}
