import {
	Controller,
	Get,
	Put,
	Req,
	Post,
	ParseIntPipe,
	Body,
	Param,
} from "@nestjs/common";
import { CurrentSession } from "../Shared/auth/auth.controller";
import { Request } from "express";
import { hotelDto } from './dto/hotel.dto';
import { HotelService } from "../Hotel/hotel.service";
import { Role, Validity } from "src/Shared/entities/user.entity";

@Controller("hotelManager")
export class hotelController {
	constructor(private hotelService: HotelService) {}

	auth(@Req() request: Request & { session: CurrentSession }) {
		if (!request.session.user) return "You are not logged in";
		const { Role } = request.session.user;
		if (Role === "hotelManager") {
			return true;
		} else {
			return "Access Denied! You are not an admin";
		}
	}

    @Get("viewHotels")
	viewEmployees(@Req() request: Request & { session: CurrentSession }) {
		if (this.auth(request) == true) {
			return this.hotelService.viewHotels();
		} else {
			return this.auth(request);
		}
	}

    @Post("addhotel")
	addhotel(
		@Body() hotelData: hotelDto,
		@Req() request: Request & { session: CurrentSession },
	) {
		if (this.auth(request) == true) {
			return this.hotelService.addHotel(hotelData);
		} else {
			return this.auth(request);
		}
	}

    @Put("updateHotel/:HotelId")
	updateHotel(
		@Param("HotelId", ParseIntPipe) HotelId: number,
		@Body("Name") Name: string,
		@Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) == true) {
			return this.hotelService.updateHotel(HotelId, Name);
		} else {
			return this.auth(request);
		}
	}

    @Post("deleteHotel/:HotelId")
	deleteHotel(
		@Param("HotelId", ParseIntPipe) HotelId: number,
		@Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) == true) {
			return this.hotelService.deleteHotel(HotelId);
		} else {
			return this.auth(request);
		}
	}


}
// import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
// import { HotelService } from './hotel.service';
// import { hotelDto } from './dto/hotel.dto'; 

// @Controller('hotel')
// export class HotelController {
 
//     constructor(private transService: HotelService)
//     {}

//     @Post("addHotel") @UsePipes (new ValidationPipe())
//     addHotel(@Body(new ValidationPipe()) hotelData: hotelDto): object{
//         return this.transService.addHotel(hotelData);
//     }

// }
