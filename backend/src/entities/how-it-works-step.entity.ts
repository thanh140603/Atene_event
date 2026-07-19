import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** One node in the 6-step "How It Works" timeline. */
@Entity('how_it_works_steps')
export class HowItWorksStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stepNumber: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column({ default: 0 })
  sortOrder: number;
}
