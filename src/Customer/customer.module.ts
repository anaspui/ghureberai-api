import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '../Shared/entities/history';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';
import { PackageModule } from './package/package.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { Hotel } from 'src/Shared/entities/hotel.entity';
import { Room } from 'src/Shared/entities/room.entity';
import { Booking } from 'src/Shared/entities/booking.entity';
import { Trip } from 'src/Shared/entities/trip.entity';
import { Stuff } from 'src/Shared/entities/stuff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History, Hotel, Room, Booking, Trip, Stuff]), PackageModule, WishlistModule],
  controllers: [CustomerController, HistoryController],
  providers: [CustomerService, HistoryService],
})
export class CustomerModule {}
