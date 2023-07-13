import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { transportDriverdto } from "./transportDriver.dto";
import { Driver } from "src/Shared/entities/transportDriver.entity";

@Injectable()
export class TransportService {
	constructor(
		@InjectRepository(Driver)
		private driverRepo: Repository<Driver>,
	) {}

	addDriver(driverData: transportDriverdto): object {
		const addDriver = this.driverRepo.create(driverData);
		return this.driverRepo.save(addDriver);
	}
}
