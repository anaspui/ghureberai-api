import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegistrationController } from "./registration.controller";
import { User } from "../entities/user.entity";
import { RegistrationService } from "./registration.service";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [RegistrationController],
	providers: [RegistrationService],
})
export class RegistrationModule {}
