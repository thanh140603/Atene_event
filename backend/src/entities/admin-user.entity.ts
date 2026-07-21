import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/** A dashboard user. Only role "admin" exists for now. */
@Entity('admin_users')
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  // scrypt hash, stored as "<salt-hex>:<hash-hex>"
  @Column()
  passwordHash: string;

  @Column({ default: 'admin' })
  role: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
