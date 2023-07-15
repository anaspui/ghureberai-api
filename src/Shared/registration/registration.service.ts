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

	async isUniqueUsernameAndEmail(regData: RegistrationDto) {
		const { Username, Email } = regData;

		const existingUsername = await this.regRepo.findOne({
			where: { Username },
		});
		const existingEmail = await this.regRepo.findOne({ where: { Email } });

		if (existingUsername && existingEmail) {
			return "Email and Username already exists";
		}
		if (existingUsername) {
			return "Username already exists";
		}
		if (existingEmail) {
			return "Email already exists";
		}

		return true;
	}
	async registration(regData: RegistrationDto): Promise<User> {
		const registration: User = this.regRepo.create(regData);
		return await this.regRepo.save(registration);
	}

	async viewRegistration(): Promise<User[]> {
		return this.regRepo.find();
	}
}
