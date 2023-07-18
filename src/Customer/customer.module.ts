import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '../Shared/entities/history.entity';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';
import { WishlistModule } from './wishlist/wishlist.module';
import { Trip } from 'src/Shared/entities/trip.entity';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [TypeOrmModule.forFeature([History, Trip]), WishlistModule, BookingModule],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class CustomerModule {}
