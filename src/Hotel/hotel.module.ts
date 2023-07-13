import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { Hotel } from 'src/Shared/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
