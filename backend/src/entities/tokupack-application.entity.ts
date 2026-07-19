import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * A creator's TokuPack request submitted from the "TokuPack" page form
 * (fields mirror the ATENE Google Form).
 */
@Entity('tokupack_applications')
export class TokupackApplication {
  @PrimaryGeneratedColumn()
  id: number;

  // あなたのお名前 — name as shown on the participation ticket
  @Column()
  name: string;

  // メールアドレス — email used at pre-registration
  @Column()
  email: string;

  // イベント当日に一番受け取りたいブランドの Tokupack (single choice)
  @Column({ default: '' })
  preferredBrand: string;

  // Free text when preferredBrand === "その他"
  @Column({ default: '' })
  preferredBrandOther: string;

  // 今後ライブコマースをしてみたいブランド (multiple choice)
  @Column({ type: 'jsonb', default: () => "'[]'" })
  liveCommerceBrands: string[];

  // ご質問・ご要望（任意）
  @Column({ type: 'text', default: '' })
  comment: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
