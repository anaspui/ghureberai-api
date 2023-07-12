import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hotelDto } from './dto/hotel.dto'; // This is the DTO file
import { Hotel } from 'src/Shared/entities/Hotel.entity'; // This is the entity file
import { Role } from "../Shared/entities/user.entity";

@Injectable()
export class HotelService {
    constructor(
		@InjectRepository(Hotel)    //Hotel(Hotel.entity)
		private hotelRepo: Repository<Hotel>, //Hotel(Hotel.entity)
	) {}

    addHotel(hotelDto: hotelDto): object {
		const addHotel = this.hotelRepo.create(hotelDto);
		return this.hotelRepo.save(addHotel);
	}

	async viewHotels() {
		return this.hotelRepo.find();
	}

	async updateHotel(UserId: number, Name: string): Promise<string> {
		const updateHotel = await this.hotelRepo.update(UserId, { Name });
		if (updateHotel.affected > 0) {
			return "Updated Successfully";
		} else {
			return "Updated Failed";
		}
	}

	async deleteHotel(UserId: number): Promise<string> {
		const result = await this.hotelRepo.delete(UserId);

		if (result.affected > 0) {
			return "Employee deleted successfully";
		} else {
			return "Error deleting Hotel";
		}
	}

}
