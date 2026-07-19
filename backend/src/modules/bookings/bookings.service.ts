import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from '../../entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  create(dto: CreateBookingDto) {
    const booking = this.bookingRepo.create({
      creatorName: dto.creatorName ?? '',
      email: dto.email ?? '',
      dates: dto.dates,
      slots: dto.slots,
    });
    return this.bookingRepo.save(booking);
  }

  findAll() {
    return this.bookingRepo.find({ order: { createdAt: 'DESC' } });
  }
}
