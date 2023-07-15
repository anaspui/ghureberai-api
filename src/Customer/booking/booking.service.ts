import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/Shared/entities/booking.entity';
import { Repository } from 'typeorm';
import { BookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
   constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>
  ) {}

    // Insert Booking
    addBooking(bookingDto: BookingDto) {
      return this.bookingRepo.save(bookingDto);
    }
    
    // Get Filtered Booking
    getBooking(name): any {
      return this.bookingRepo.find({ where: { Name : name } });
    }

    // Get All Bookings
    showAllBookings(): any {
      return this.bookingRepo.find();
    }
}