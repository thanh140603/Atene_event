import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from 'crypto';

import { AdminUser } from '../../entities/admin-user.entity';

export interface TokenPayload {
  email: string;
  role: string;
  /** Unix seconds. */
  exp: number;
}

const TOKEN_TTL_SECONDS = 12 * 60 * 60; // 12h

/**
 * Password + token auth for the admin dashboard, implemented with node
 * crypto only (no extra deps): scrypt password hashes and HMAC-signed
 * compact tokens ("<base64url payload>.<base64url hmac>").
 */
@Injectable()
export class AuthService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(AdminUser)
    private readonly adminRepo: Repository<AdminUser>,
  ) {}

  /** Signing secret — set ADMIN_TOKEN_SECRET in production. */
  private get secret(): string {
    return (
      process.env.ADMIN_TOKEN_SECRET ||
      process.env.POSTGRES_PASSWORD ||
      'atene-admin-dev-secret'
    );
  }

  /** Seed the default admin account if it doesn't exist yet. */
  async onApplicationBootstrap() {
    const email = process.env.ADMIN_EMAIL || 'admin@atene.kr';
    const existing = await this.adminRepo.findOne({ where: { email } });
    if (existing) return;
    const password = process.env.ADMIN_PASSWORD || 'admin1234';
    await this.adminRepo.save(
      this.adminRepo.create({
        email,
        passwordHash: this.hashPassword(password),
        role: 'admin',
      }),
    );
    this.logger.log(`Seeded admin user ${email}`);
  }

  async login(email: string, password: string) {
    const user = await this.adminRepo.findOne({ where: { email } });
    if (!user || !this.verifyPassword(password, user.passwordHash)) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload: TokenPayload = {
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
    };
    return { token: this.signToken(payload), email: user.email, role: user.role };
  }

  /** Verify a bearer token; returns its payload or throws 401. */
  verifyToken(token: string): TokenPayload {
    const [body, sig] = token.split('.');
    if (!body || !sig) throw new UnauthorizedException('Malformed token');
    const expected = createHmac('sha256', this.secret)
      .update(body)
      .digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new UnauthorizedException('Invalid token signature');
    }
    let payload: TokenPayload;
    try {
      payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    } catch {
      throw new UnauthorizedException('Malformed token payload');
    }
    if (!payload.exp || payload.exp * 1000 < Date.now()) {
      throw new UnauthorizedException('Token expired');
    }
    return payload;
  }

  private signToken(payload: TokenPayload): string {
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const sig = createHmac('sha256', this.secret)
      .update(body)
      .digest('base64url');
    return `${body}.${sig}`;
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 32).toString('hex');
    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, stored: string): boolean {
    const [salt, hash] = stored.split(':');
    if (!salt || !hash) return false;
    const candidate = scryptSync(password, salt, 32);
    const expected = Buffer.from(hash, 'hex');
    return (
      candidate.length === expected.length &&
      timingSafeEqual(candidate, expected)
    );
  }
}
