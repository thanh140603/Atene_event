import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from './auth.service';

/** Allows only requests carrying a valid admin bearer token. */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const header = req.headers.authorization ?? '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) throw new UnauthorizedException('Missing bearer token');
    const payload = this.authService.verifyToken(token);
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('Admin role required');
    }
    return true;
  }
}
