import {
	Controller,
	Get,
	Put,
	Req,
	Post,
	ParseIntPipe,
	Body,
	Param,
	HttpException,
	HttpStatus,
	UnauthorizedException,
} from "@nestjs/common";
import { CurrentSession } from "../Shared/auth/auth.controller";
import { Request } from "express";
import { EmployeeDto } from "./dto/employee.dto";
import { AdminService } from "./admin.service";
import { Role, Validity } from "src/Shared/entities/user.entity";
import * as bcrypt from "bcryptjs";
import { AuthService } from "src/Shared/auth/auth.service";
@Controller("admin")
export class AdminController {
	constructor(
		private adminService: AdminService,
		private authService: AuthService,
	) {}
	//isAdmin
	async auth(@Req() request: Request & { session: CurrentSession }) {
		//------------OLD CODE (SESSION WAY OF VALIDATING)----------
		// if (!request.session.user) return "You are not logged in";
		// const { Role } = request.session.user;
		// if (Role === "admin") {
		// 	return true;
		// } else {
		// 	return "Access Denied! You are not an admin";
		// }
		//-----------------------------------------------------------
		const role = await this.authService.getRole(request);
		if (!role) throw new UnauthorizedException();
		if (role === Role.ADMIN) {
			return true;
		} else {
			return false;
		}
	}
	//isEmployee
	async authEmp(@Req() request: Request & { session: CurrentSession }) {
		const role = await this.authService.getRole(request);
		if (!role) throw new UnauthorizedException();
		if (role === Role.EMPLOYEE) {
			return true;
		} else {
			return false;
		}
	}
	//only admin
	@Get("viewEmployees")
	async viewEmployees(@Req() request: Request & { session: CurrentSession }) {
		if ((await this.auth(request)) == true) {
			return this.adminService.viewEmployees();
		} else {
			throw new UnauthorizedException();
		}
	}
	@Post("addEmployee")
	async addEmployee(
		@Body() empData: EmployeeDto,
		@Req() request: Request & { session: CurrentSession },
	) {
		if ((await this.auth(request)) == true) {
			empData.Role = Role.EMPLOYEE;
			empData.Validity = Validity.TRUE;
			//password hashing
			try {
				const hashedPassword = await bcrypt.hash(empData.Password, 10);
				empData.Password = hashedPassword;
			} catch (error) {
				console.log(error);
			}
			return this.adminService.addEmployee(empData);
		} else {
			throw new UnauthorizedException();
		}
	}

	@Put("updateEmployee/:id")
	async updateEmployee(
		@Param("id", ParseIntPipe) id: number,
		@Body("Username") username: string,
		@Body("Password") password: string,
		@Req() request: Request & { session: CurrentSession },
	) {
		if ((await this.auth(request)) == true) {
			try {
				return await this.adminService.updateEmployee(id, username, password);
			} catch (error) {
				throw new HttpException(
					{
						status: HttpStatus.FORBIDDEN,
						error: "Employee not found",
					},
					HttpStatus.FORBIDDEN,
					{
						cause: error,
					},
				);
			}
		} else {
			throw new UnauthorizedException();
		}
	}

	@Post("deleteEmployee/:id")
	async deleteEmployee(
		@Param("id", ParseIntPipe) id: number,
		@Req() request: Request & { session: CurrentSession },
	) {
		if ((await this.auth(request)) == true) {
			try {
				return await this.adminService.deleteEmployee(id);
			} catch (error) {
				throw new HttpException(
					{
						status: HttpStatus.FORBIDDEN,
						error: "Employee not found",
					},
					HttpStatus.FORBIDDEN,
					{
						cause: error,
					},
				);
			}
		} else {
			throw new UnauthorizedException();
		}
	}
	//admin & employee
	@Put("approveHotelManager/:id")
	async approveHotelManager(
		@Param("id", ParseIntPipe) id: number,
		@Req() request: Request & { session: CurrentSession },
	) {
		const isAuthEmp = await this.authEmp(request);
		const isAuth = await this.auth(request);

		if (isAuthEmp || isAuth) {
			try {
				const result = await this.adminService.approveHotelManager(id);
				if (result === true) {
					return "Hotel Manager Approved";
				} else {
					throw new Error("Hotel Manager not found");
				}
			} catch (error) {
				throw new HttpException(
					{
						status: HttpStatus.FORBIDDEN,
						error: "Hotel Manager not found",
					},
					HttpStatus.FORBIDDEN,
					{
						cause: error,
					},
				);
			}
		} else {
			return await this.auth(request);
		}
	}
}
