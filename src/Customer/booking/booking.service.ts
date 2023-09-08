import { Injectable, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../../Shared/entities/booking.entity";
import { Repository } from "typeorm";
import { BookingDto } from "./dto/booking.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class BookingService {
	constructor(
		@InjectRepository(Booking)
		private bookingRepo: Repository<Booking>,
		public mailerService: MailerService,
	) {}

	// Insert Booking
	async addBooking(
		bookingDto: BookingDto,
		username: string,
		email: string,
		id: any,
	): Promise<any> {
		bookingDto.CustomerID = id;
		this.bookingRepo.save(bookingDto);

		await this.mailerService.sendMail({
			to: email,
			subject: "Booking confirmation",
			text: `Dear ${username},
			
			Thank you for using Ghureberai!

      Your booking has been confirmed. Please check your booking history for more details.
			
			Best regards,
			The Ghureberai Team`,
		});
	}

	// Get Filtered Booking
	getAllBooking(): any {
		return this.bookingRepo.find();
	}

	// Get All Bookings
	showAllBookings(id): any {
		return this.bookingRepo.find({ where: { CustomerID: id } });
	}
}
