import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { transportDriverdto } from "./transportDriver.dto";
import { Driver } from "src/Shared/entities/driver.entity";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class TransportDriverService {
	constructor(
		@InjectRepository(Driver)
		private driverRepo: Repository<Driver>,
		private mailerService: MailerService,
	) {}

	showdriver(id) {
		return this.driverRepo.find({ where: { DriverID: id } });
	}

	async addDriver(driverData: transportDriverdto) {
		const addDriver = this.driverRepo.create(driverData);
		this.driverRepo.save(addDriver);

		await this.mailerService.sendMail({
			to: driverData.DriverEmail,
			subject: "Welcome to Ghureberai",
			text: `Dear ${driverData.DriverName},

We are glad to inform you that you are registered with Ghureberai! as Driver.

We will notify you through mail when your duty calls.

If you have any questions or need assistance, feel free to reach out to our support team.

Best regards,
The Ghureberai Team`,
		});

		return "Driver added successfully";
	}

	showAllDriver(): any {
		return this.driverRepo.find();
	}

	deleteDriver(id): any {
		return this.driverRepo.delete(id);
	}
	async updateDriver(
		DriverID: number,
		DriverName: string,
		DriverEmail: string,
		DriverPhone: string,
		DriverSalary: string,
	): Promise<string> {
		const result = await this.driverRepo.update(DriverID, {
			DriverName,
			DriverEmail,
			DriverPhone,
			DriverSalary,
		});
		if (result.affected > 0) {
			return "Driver Updated";
		} else {
			return "Unable To Update";
		}
	}
}
