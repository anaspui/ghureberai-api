import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { User } from "src/Shared/entities/user.entity";
import { AdminService } from "./admin.service";
import { AuthModule } from "../Shared/auth/auth.module";
import { AuthService } from "../Shared/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { Package } from "src/Shared/entities/package.entity";
import { Hotel } from "src/Shared/entities/hotel.entity";
import { Booking } from "src/Shared/entities/booking.entity";
@Module({
	imports: [
		TypeOrmModule.forFeature([User, Package, Hotel, Booking]),
		AuthModule,
	],
	controllers: [AdminController],
	providers: [AdminService, AuthService, JwtService],
})
export class AdminModule {}
