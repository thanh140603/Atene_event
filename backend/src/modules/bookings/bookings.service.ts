import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from '../../entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { MailService } from '../mail/mail.service';

interface Identity {
  email: string;
  name: string;
  googleId: string;
}

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateBookingDto) {
    const identity = await this.resolveIdentity(dto);
    const booking = this.bookingRepo.create({
      creatorName: identity.name || dto.creatorName || '',
      email: identity.email || dto.email || '',
      googleId: identity.googleId || dto.googleId || '',
      dates: dto.dates,
      slots: dto.slots,
    });
    const saved = await this.bookingRepo.save(booking);

    // Fire-and-forget: a failed email must not fail the booking.
    void this.mailService.sendBookingConfirmation(saved);

    return saved;
  }

  findAll() {
    return this.bookingRepo.find({ order: { createdAt: 'DESC' } });
  }

  /**
   * Resolve the booker's Gmail identity from the Google Sign-In credential.
   * If GOOGLE_CLIENT_ID is set, the ID token is cryptographically verified.
   * Otherwise (e.g. local dev) the token payload is decoded without verifying.
   */
  private async resolveIdentity(dto: CreateBookingDto): Promise<Identity> {
    const empty: Identity = { email: '', name: '', googleId: '' };
    if (!dto.credential) return empty;

    // Custom login sends an OAuth access token (opaque), not an ID token (JWT).
    // Only ID tokens (three dot-separated segments) can be verified/decoded here.
    const isJwt = dto.credential.split('.').length === 3;
    if (!isJwt) return empty;

    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (clientId) {
      try {
        // Imported lazily so the app still boots if the package is absent.
        const { OAuth2Client } = await import('google-auth-library');
        const client = new OAuth2Client(clientId);
        const ticket = await client.verifyIdToken({
          idToken: dto.credential,
          audience: clientId,
        });
        const p = ticket.getPayload();
        if (p?.email) {
          return { email: p.email, name: p.name ?? '', googleId: p.sub ?? '' };
        }
      } catch (err) {
        this.logger.warn(
          `Google token verification failed: ${(err as Error).message}`,
        );
      }
    }

    const decoded = this.decodeJwt(dto.credential);
    if (decoded?.email) {
      return {
        email: String(decoded.email),
        name: decoded.name ? String(decoded.name) : '',
        googleId: decoded.sub ? String(decoded.sub) : '',
      };
    }
    return empty;
  }

  private decodeJwt(token: string): Record<string, unknown> | null {
    try {
      const payload = token.split('.')[1];
      if (!payload) return null;
      const json = Buffer.from(payload, 'base64url').toString('utf8');
      return JSON.parse(json);
    } catch {
      return null;
    }
  }
}
