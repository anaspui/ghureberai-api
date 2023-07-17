import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegistrationDto } from "./dto/registration.dto";
import { User } from "../entities/user.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class RegistrationService {
	constructor(
		@InjectRepository(User)
		private regRepo: Repository<User>,
		private mailerService: MailerService,
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
	async registration(regData: RegistrationDto) {
		const registration: User = this.regRepo.create(regData);
		await this.regRepo.save(registration);
		await this.mailerService.sendMail({
			to: regData.Email,
			subject: "Welcome to Ghureberai",
			text: `Dear ${regData.Username},

Thank you for registering with Ghureberai! We're excited to have you on board.

You can now start exploring our platform and make the most out of your travel experiences.

If you have any questions or need assistance, feel free to reach out to our support team.

Best regards,
The Ghureberai Team`,
		});
		return "Registration Successful";
	}

	async viewRegistration(): Promise<User[]> {
		return this.regRepo.find();
	}
}
