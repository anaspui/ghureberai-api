import { Injectable } from "@nestjs/common";
import { EmployeeDto } from "./dto/employee.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User, Validity } from "../Shared/entities/user.entity";
import { Role } from "../Shared/entities/user.entity";
import * as bcrypt from "bcryptjs";
@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(User)
		private regRepo: Repository<User>,
	) {}

	async addEmployee(empData: EmployeeDto) {
		const addEmp = this.regRepo.create(empData);
		return await this.regRepo.save(addEmp);
	}

	async viewEmployees() {
		return this.regRepo.find({ where: { Role: Role.EMPLOYEE } });
	}

	async updateEmployee(
		id: number,
		Username: string,
		Password: string,
	): Promise<string> {
		//role check
		const userData = await this.regRepo.findOne({ where: { UserId: id } });
		if (userData) {
			if (userData.Role === Role.EMPLOYEE) {
				//password hashing
				try {
					const hashedPassword = await bcrypt.hash(Password, 10);
					Password = hashedPassword;
				} catch (error) {
					console.log(error);
				}
				const updateEmp = await this.regRepo.update(id, { Username, Password });
				if (updateEmp.affected > 0) {
					return "Updated Successfully";
				} else {
					return "Failed";
				}
			} else {
				return "Please provide a valid employee Id";
			}
		} else {
			throw new Error("Employee not found");
		}
	}

	async deleteEmployee(id: number): Promise<string> {
		const userData = await this.regRepo.findOne({ where: { UserId: id } });
		if (userData) {
			if (userData.Role === Role.EMPLOYEE) {
				const result = await this.regRepo.delete(id);

				if (result.affected > 0) {
					return "Employee deleted successfully";
				} else {
					return "Error deleting employee";
				}
			} else {
				return "Please provide a valid employee Id";
			}
		} else {
			throw new Error("Employee not found");
		}
	}

	async approveHotelManager(id: number): Promise<boolean> {
		const userData = await this.regRepo.findOne({ where: { UserId: id } });
		if (userData) {
			if (userData.Role === Role.HOTEL_MANAGER) {
				const result = await this.regRepo.update(id, {
					Validity: Validity.TRUE,
				});
				if (result.affected > 0) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			throw new Error("Hotel Manager not found");
		}
	}
}
