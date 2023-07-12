import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '../Shared/entities/history.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';
import { WishlistModule } from './wishlist/wishlist.module';
import { Trip } from 'src/Shared/entities/trip.entity';
import { Stuff } from 'src/Shared/entities/stuff.entity';
import { BookingModule } from './booking/booking.module';
import { Localtransport } from 'src/Shared/entities/localtransport.entity';
import { Driver } from 'src/Shared/entities/transportDriver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History, Trip, Stuff, Localtransport, Driver]), WishlistModule, BookingModule],
  controllers: [CustomerController, HistoryController],
  providers: [CustomerService, HistoryService],
})
export class CustomerModule {}
