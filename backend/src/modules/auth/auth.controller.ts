import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  /** Lets the dashboard validate a stored token on load. */
  @Get('me')
  me(@Headers('authorization') header?: string) {
    const token = header?.startsWith('Bearer ') ? header.slice(7) : '';
    const { email, role } = this.authService.verifyToken(token);
    return { email, role };
  }
}
