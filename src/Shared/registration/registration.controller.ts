import { Controller, Post, Body, Get, UsePipes } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { RegistrationDto } from "./dto/registration.dto";
import { Role, Validity } from "../entities/user.entity";
import * as bcrypt from "bcryptjs";
import { MailerModule } from "@nestjs-modules/mailer";

@Controller("registration")
export class RegistrationController {
	constructor(private regService: RegistrationService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	async registration(@Body(new ValidationPipe()) regData: RegistrationDto) {
		//Username & Email Validation
		const isUnique = await this.regService.isUniqueUsernameAndEmail(regData);
		if (isUnique && isUnique !== true) {
			return isUnique;
		}
		//Role Assignment
		const [, domain] = regData.Email.split("@");
		if (domain === "hotel.ghureberai.com") {
			regData.Role = Role.HOTEL_MANAGER;
			regData.Validity = Validity.FALSE;
		} else if (domain === "transport.ghureberai.com") {
			regData.Role = Role.TP_MANAGER;
			regData.Validity = Validity.FALSE;
		} else {
			regData.Role = Role.CUSTOMER;
		}
		// console.log(regData);
		// console.log(domain);
		if (isUnique === true) {
			//password hashing
			try {
				const hashedPassword = await bcrypt.hash(regData.Password, 10);
				regData.Password = hashedPassword;
			} catch (error) {
				console.log(error);
			}
			return this.regService.registration(regData);
		}
	}

	@Get("view")
	viewRegistration(): any {
		return this.regService.viewRegistration();
	}
}
