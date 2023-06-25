import { Controller, Post, Body, ValidationPipe, Get } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration.dto";

@Controller("registration")
export class RegistrationController {
	reg: RegistrationDto;

	@Post()
	registerUser(@Body(new ValidationPipe()) registrationDto: RegistrationDto) {
		this.reg = registrationDto;
		return "done";
	}

	@Get("view")
	viewRegistration() {
		return this.reg;
	}
}
