import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { staffDto } from "../dto/staff.dto";
import { staff } from "../../Shared/entities/staff.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class staffService {
	constructor(
		@InjectRepository(staff)
		private staffRepo: Repository<staff>,
		private mailerService: MailerService,
	) {}

	async addstaff(staffDto: staffDto): Promise<any> {
		this.staffRepo.save(staffDto);
		const registration: staff = this.staffRepo.create(staffDto);
		await this.staffRepo.save(registration);
		await this.mailerService.sendMail({
			to: staffDto.Email,
			subject: "Welcome to Ghureberai",
			text: `Dear ${staffDto.Name},

We are impressed with your skill and will be happy to hire you for work with us.If you
are interested please contact us.

Best regards,
The Ghureberai Team`,
		});
		return "Registration Successful";
	}

	async viewstaff() {
		return this.staffRepo.find();
	}

	async updatestaff(
		Id: number,
		Name: string,
		Password: string,
		Email: string,
	): Promise<string> {
		const updatestaff = await this.staffRepo.update(Id, {
			Name,
			Password,
			Email,
		});
		if (updatestaff.affected > 0) {
			return "";
		} else {
			return "";
		}
	}

	async deletestaff(Id: number): Promise<string> {
		const result = await this.staffRepo.delete(Id);

		if (result.affected > 0) {
			return "";
		} else {
			return "";
		}
	}
}
