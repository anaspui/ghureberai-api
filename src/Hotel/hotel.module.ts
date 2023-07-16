import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { Hotel } from 'src/Shared/entities/hotel.entity';
import { StuffModule } from './stuff/stuff.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), StuffModule],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
