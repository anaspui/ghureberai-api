import { Injectable, NotFoundException } from "@nestjs/common";
import { EmployeeDto } from "./dto/employee.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User, Validity } from "../Shared/entities/user.entity";
import { Role } from "../Shared/entities/user.entity";
import { Package, PackageType } from "./../Shared/entities/package.entity";
import * as bcrypt from "bcryptjs";
import { Hotel } from "src/Shared/entities/hotel.entity";
import { Localtransport } from "src/Shared/entities/localtransport.entity";
import { Booking } from "src/Shared/entities/booking.entity";
@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>,
		@InjectRepository(Package)
		private PackageRepo: Repository<Package>,
		@InjectRepository(Hotel)
		private HotelRepo: Repository<Hotel>,
		@InjectRepository(Hotel)
		private TransportManagerRepo: Repository<Localtransport>,
		@InjectRepository(Hotel)
		private Booking: Repository<Booking>,
	) {}

	async addEmployee(empData: EmployeeDto) {
		const addEmp = this.userRepo.create(empData);
		return await this.userRepo.save(addEmp);
	}
	async addHotelManager(hmData: EmployeeDto) {
		const addhm = this.userRepo.create(hmData);
		return await this.userRepo.save(hmData);
	}

	async viewEmployees() {
		return this.userRepo.find({ where: { Role: Role.EMPLOYEE } });
	}

	async updateEmployee(
		id: number,
		username: string,
		password: string,
		email: string,
		phone: string,
		validity: Validity,
	) {
		//role check
		const userData = await this.userRepo.findOne({ where: { UserId: id } });
		if (userData) {
			if (userData.Role === Role.EMPLOYEE) {
				//password hashing
				try {
					const hashedPassword = await bcrypt.hash(password, 10);
					password = hashedPassword;
				} catch (error) {
					console.log(error);
				}
				const updateEmp = await this.userRepo.update(id, {
					Username: username,
					Password: password,
					Email: email,
					Phone: phone,
					Validity: validity,
				});
				if (updateEmp.affected > 0) {
					return this.userRepo.findOne({ where: { UserId: id } });
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
	async updateHotelManager(
		id: number,
		username: string,
		password: string,
		email: string,
		phone: string,
		validity: Validity,
	) {
		// Role check
		const userData = await this.userRepo.findOne({ where: { UserId: id } });

		if (userData) {
			if (userData.Role === Role.HOTEL_MANAGER) {
				// Password hashing
				try {
					const hashedPassword = await bcrypt.hash(password, 10);
					password = hashedPassword;
				} catch (error) {
					console.log(error);
				}

				// Update employee
				const updateEmp = await this.userRepo.update(id, {
					Username: username,
					Password: password,
					Email: email,
					Phone: phone,
					Validity: validity,
				});

				if (updateEmp.affected > 0) {
					return this.userRepo.findOne({ where: { UserId: id } });
				} else {
					return "Failed";
				}
			} else {
				return "You don't have permission to update employees.";
			}
		} else {
			throw new Error("Employee not found");
		}
	}

	async deleteEmployee(id: number): Promise<string> {
		const userData = await this.userRepo.findOne({ where: { UserId: id } });
		if (userData) {
			if (
				userData.Role === Role.EMPLOYEE ||
				userData.Role === Role.HOTEL_MANAGER
			) {
				const result = await this.userRepo.delete(id);

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
		const userData = await this.userRepo.findOne({ where: { UserId: id } });
		if (userData) {
			if (userData.Role === Role.HOTEL_MANAGER) {
				const result = await this.userRepo.update(id, {
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
	async showAllPackages() {
		return await this.PackageRepo.find();
	}
	async showAllHotel() {
		return await this.HotelRepo.find();
	}
	async showAllHotelManager() {
		const data = await this.userRepo.find({
			where: { Role: Role.HOTEL_MANAGER },
		});
		const returndata = data.map(user => {
			const { Password, ...result } = user;
			return result;
		});
		return returndata;
	}
	async showAllTpManager() {
		const data = await this.userRepo.find({ where: { Role: Role.TP_MANAGER } });
		const returndata = data.map(user => {
			const { Password, ...result } = user;
			return result;
		});
		return returndata;
	}
	async showAllBooking() {}
	async allUsers() {
		const data = await this.userRepo.find();
		const returndata = data.map(user => {
			const { Password, ...result } = user;
			return result;
		});
		return returndata;
	}
	async deleteUser(id: number): Promise<void> {
		const user = await this.userRepo.findOne({ where: { UserId: id } });
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		await this.userRepo.remove(user);
	}
}
