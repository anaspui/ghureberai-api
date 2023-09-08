import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "../../Shared/entities/booking.entity";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { AuthService } from "../../Shared/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../Shared/entities/user.entity";
import { History } from "../../Shared/entities/history.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Booking, User, History])],
	controllers: [BookingController],
	providers: [BookingService, AuthService, JwtService],
})
export class BookingModule {}
