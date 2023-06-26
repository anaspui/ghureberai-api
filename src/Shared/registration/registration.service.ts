import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegistrationDto } from "./dto/registration.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class RegistrationService {
	constructor(
		@InjectRepository(User)
		private regRepo: Repository<User>,
	) {}

	registration(regData: RegistrationDto): object {
		const registration = this.regRepo.create(regData);
		return this.regRepo.save(registration);
	}

	viewRegistration() {
		return this.regRepo.find();
	}
}
