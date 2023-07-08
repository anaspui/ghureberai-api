import { Injectable } from "@nestjs/common";
import { EmployeeDto } from "./dto/employee.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../Shared/entities/user.entity";
import { Role } from "../Shared/entities/user.entity";
@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(User)
		private regRepo: Repository<User>,
	) {}

	addEmployee(empData: EmployeeDto): Object {
		const addEmp = this.regRepo.create(empData);
		return this.regRepo.save(addEmp);
	}

	async viewEmployees() {
		return this.regRepo.find({ where: { Role: Role.EMPLOYEE } });
	}

	async updateEmployee(id: number, Username: string): Promise<string> {
		const updateEmp = await this.regRepo.update(id, { Username });
		if (updateEmp.affected > 0) {
			return "Updated Successfully";
		} else {
			return "Updated Failed";
		}
	}

	async deleteEmployee(id: number): Promise<string> {
		const result = await this.regRepo.delete(id);

		if (result.affected > 0) {
			return "Employee deleted successfully";
		} else {
			return "Error deleting employee";
		}
	}
}
