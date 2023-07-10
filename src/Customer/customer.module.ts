import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '../Shared/entities/history.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';
import { WishlistModule } from './wishlist/wishlist.module';
import { Hotel } from 'src/Shared/entities/hotel.entity';
import { Trip } from 'src/Shared/entities/trip.entity';
import { Stuff } from 'src/Shared/entities/stuff.entity';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [TypeOrmModule.forFeature([History, Hotel, Trip, Stuff]), WishlistModule, BookingModule],
  controllers: [CustomerController, HistoryController],
  providers: [CustomerService, HistoryService],
})
export class CustomerModule {}
