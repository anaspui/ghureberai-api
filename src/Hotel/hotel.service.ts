import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HotelDto } from './dto/hotel.dto'; 
import { Hotel } from 'src/Shared/entities/Hotel.entity';
import { PackageDto } from '../Shared/package/dto/package.dto';
import { MailerService } from "@nestjs-modules/mailer/dist";
@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private hotelRepo: Repository<Hotel>,
        private mailerService: MailerService,
    ) {}
    

    async addHotel(HotelDto: HotelDto): Promise<any> {
        return this.hotelRepo.save(HotelDto);
    }

    async viewHotels() {
        return this.hotelRepo.find();
    }

    async updateHotel(HotelId: number, Name: string): Promise<string> {
        const updateHotel = await this.hotelRepo.update(HotelId, { Name });
        if (updateHotel.affected > 0) {
            return "Updated Successfully";
        } else {
            return "Updated Failed";
        }
    }

    async deleteHotel(HotelId: number): Promise<string> {
        const result = await this.hotelRepo.delete(HotelId);

        if (result.affected > 0) {
            return " deleted successfully";
        } else {
            return "Error deleting Hotel";
        }
    }

}
