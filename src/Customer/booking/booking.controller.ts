import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	ParseIntPipe,
	UnauthorizedException,
} from "@nestjs/common";
import { CurrentSession } from "../../Shared/auth/auth.controller";
import { BookingDto } from "./dto/booking.dto";
import { BookingService } from "./booking.service";
import { AuthService } from "../../Shared/auth/auth.service";
import { Role } from "../../Shared/entities/user.entity";
import { HistoryDto } from "../history/dto/history.dto";

@Controller("")
export class BookingController {
	constructor(
		private bookingService: BookingService,
		private authService: AuthService,
	) {}

	// User Authentication
	async auth(@Req() request: Request & { session: CurrentSession }) {
		//****************************************************************//
		//if (!request.session.user) return "You are not logged in";
		//const { Role } = request.session.user;
		//if (Role === "customer") {
		//	return true;
		//} else {
		//	return "Access Denied!";
		//}
		//****************************************************************//
		const role = await this.authService.getRole(request);
		if (!role) throw new UnauthorizedException();
		if (role === Role.CUSTOMER) {
			return true;
		} else if (role === Role.ADMIN) {
			return "admin";
		} else {
			return "Access Denied!";
		}
	}

	// Show Customer All Bookings
	@Get("customer/booking")
	async viewBooking(
		@Req() request: Request & { session: CurrentSession },
	): Promise<any> {
		if ((await this.auth(request)) == true) {
			return this.bookingService.showAllBookings(request.session.user.UserId);
		} else {
			return this.auth(request);
		}
	}

	// Show Customer Filtered Bookings
	@Get("admin/allBookings")
	async viewFilterBooking(
		@Req() request: Request & { session: CurrentSession },
	): Promise<any> {
		if ((await this.auth(request)) === "admin") {
			return this.bookingService.getAllBooking();
		} else {
			return this.auth(request);
		}
	}

	// Customer Booking
	@Post("insert")
	async addBooking(
		@Body() bookingDto: BookingDto,
		@Req() request: Request & { session: CurrentSession },
	): Promise<any> {
		if ((await this.auth(request)) == true) {
			let user = request.session.user.Username;
			let email = request.session.user.Email;
			let id = request.session.user.UserId;
			return this.bookingService.addBooking(bookingDto, user, email, id);
		} else {
			return this.auth(request);
		}
	}
}
