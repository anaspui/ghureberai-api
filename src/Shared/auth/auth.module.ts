import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [AuthService, JwtService],
	controllers: [AuthController],
})
export class AuthModule {}
