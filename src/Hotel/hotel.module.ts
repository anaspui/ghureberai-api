import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hotel } from 'src/Shared/entities/Hotel.entity';
import { hotelController } from './hotel.controller';
import { HotelService } from './hotel.service';


@Module({
    imports: [TypeOrmModule.forFeature([Hotel])],
	controllers: [hotelController],
	providers: [HotelService],
})
export class HotelModule {}
