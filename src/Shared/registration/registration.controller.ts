import { Controller, Post, Body, Get, UsePipes } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { RegistrationService } from "./registration.service";

@Controller("registration")
export class RegistrationController {
	constructor(private regService: RegistrationService) {}

	@Post()
	@UsePipes(ValidationPipe)
	registration(@Body() regData: User): any {
		return this.regService.registration(regData);
	}

	@Get("view")
	viewRegistration(): any {
		return this.regService.viewRegistration();
	}
}
