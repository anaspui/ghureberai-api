import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { transportDriverdto } from "./transportDriver.dto";
import { Driver } from "src/Shared/entities/transportDriver.entity";

@Injectable()
export class TransportDriverService {
	constructor(
		@InjectRepository(Driver)
		private driverRepo: Repository<Driver>,
	) {}

	showdriver(id) {
		return this.driverRepo.find({ where: { DriverID: id } });
	}

	addDriver(driverData: transportDriverdto): object {
		const addDriver = this.driverRepo.create(driverData);
		return this.driverRepo.save(addDriver);
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
