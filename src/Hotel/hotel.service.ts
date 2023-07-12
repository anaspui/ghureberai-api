import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HotelDto } from './dto/hotel.dto'; // This is the DTO file
import { Hotel } from 'src/Shared/entities/Hotel.entity'; // This is the entity file
import { PackageDto } from '../Shared/package/dto/package.dto'; // This is the entity file

@Injectable()
export class HotelService {
    constructor(
		@InjectRepository(Hotel)    //Hotel(Hotel.entity)
		private hotelRepo: Repository<Hotel>, //Hotel(Hotel.entity)
	) {}

    // async addHotel(HotelDto: HotelDto): Promise<any> {
	// 	return this.hotelRepo.save(HotelDto);
	//   }

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
			return "Employee deleted successfully";
		} else {
			return "Error deleting Hotel";
		}
	}

}
