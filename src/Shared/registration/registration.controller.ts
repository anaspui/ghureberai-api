import { Controller, Post, Body, Get, UsePipes } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { RegistrationDto } from "./dto/registration.dto";

@Controller("registration")
export class RegistrationController {
	constructor(private regService: RegistrationService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	registration(@Body(new ValidationPipe()) regData: RegistrationDto): object {
		return this.regService.registration(regData);
	}

	@Get("view")
	viewRegistration(): any {
		return this.regService.viewRegistration();
	}
}
