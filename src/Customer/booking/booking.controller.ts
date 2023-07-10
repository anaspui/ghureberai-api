import { Body, Controller, Get, Param , Post, Req, ParseIntPipe} from '@nestjs/common';
import { CurrentSession } from 'src/Shared/auth/auth.controller';
import { BookingDto } from './dto/booking.dto';

@Controller('customer/booking')
export class BookingController {

    // User Authentication
    auth(@Req() request: Request & { session: CurrentSession }) {
		if (!request.session.user) return "You are not logged in";
		const { Role } = request.session.user;
		if (Role === "customer") {
			return true;
		} else {
			return "Access Denied!";
		}
    }
    
    // Show Customer All Bookings
    @Get("")
	viewBooking(@Req() request: Request & { session: CurrentSession }) {
		if (this.auth(request) == true) {
			return this.BookingService.showAllBookings();
		} else {
			return this.auth(request);
		}
    }

    // Show Customer Filtered Bookings
    @Get("/:name")
	viewFilterBooking(@Param('name', ParseIntPipe) name: number, @Req() request: Request & { session: CurrentSession }) {
		if (this.auth(request) == true) {
			return this.BookingService.getBooking(name);
		} else {
			return this.auth(request);
		}
    }
    
    // Customer Booking
    @Post("insert")
	addBooking(
		@Body() BookingDto: BookingDto,
		@Req() request: Request & { session: CurrentSession },
	) {
		if (this.auth(request) == true) {
			return this.BookingService.addBooking(BookingDto);
		} else {
			return this.auth(request);
		}
	}
  
  
}