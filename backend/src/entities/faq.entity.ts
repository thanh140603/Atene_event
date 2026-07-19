import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** A question/answer pair in the FAQs section. */
@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ default: 0 })
  sortOrder: number;
}
