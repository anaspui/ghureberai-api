import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { User } from "src/Shared/entities/user.entity";
import { AdminService } from "./admin.service";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [AdminController],
	providers: [AdminService],
})
export class AdminModule {}
