import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
