import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { User } from "src/Shared/entities/user.entity";
import { AdminService } from "./admin.service";
import { AuthModule } from "src/shared/auth/auth.module";
import { AuthService } from "src/Shared/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
@Module({
	imports: [TypeOrmModule.forFeature([User]), AuthModule],
	controllers: [AdminController],
	providers: [AdminService, AuthService, JwtService],
})
export class AdminModule {}
