import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AdminGuard } from '../auth/admin.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  // Admin dashboard only — the public site never lists bookings.
  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.bookingsService.findAll();
  }
}
