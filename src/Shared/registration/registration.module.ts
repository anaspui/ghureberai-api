import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegistrationController } from "./registration.controller";
import { Users } from "../entities/user.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Users])],
	controllers: [RegistrationController],
	providers: [],
})
export class RegistrationModule {}
