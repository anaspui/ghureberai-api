import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '../Shared/entities/history.entity';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';
import { WishlistModule } from './wishlist/wishlist.module';
import { Trip } from 'src/Shared/entities/trip.entity';
import { BookingModule } from './booking/booking.module';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { User } from 'src/Shared/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History, Trip, User]), WishlistModule, BookingModule],
  controllers: [HistoryController, CustomerController],
  providers: [HistoryService, CustomerService],
})
export class CustomerModule {}
