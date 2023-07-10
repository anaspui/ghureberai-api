import {
	Controller,
	Get,
	Put,
	Req,
	Post,
	ParseIntPipe,
	Body,
	Param,
} from "@nestjs/common";
import { CurrentSession } from "../Shared/auth/auth.controller";
import { Request } from "express";
import { EmployeeDto } from "./dto/employee.dto";
import { AdminService } from "./admin.service";
import { Role, Validity } from "src/Shared/entities/user.entity";
@Controller("admin")
export class AdminController {
	constructor(private adminService: AdminService) {}

	auth(@Req() request: Request & { session: CurrentSession }) {
		if (!request.session.user) return "You are not logged in";
		const { Role } = request.session.user;
		if (Role === "admin") {
			return true;
		} else {
			return "Access Denied! You are not an admin";
		}
	}

	@Get("viewEmployees")
	viewEmployees(@Req() request: Request & { session: CurrentSession }) {
		if (this.auth(request) == true) {
			return this.adminService.viewEmployees();
		} else {
			return this.auth(request);
		}
	}
	@Post("addEmployee")
	addEmployee(
		@Body() empData: EmployeeDto,
		@Req() request: Request & { session: CurrentSession },
	) {
		if (this.auth(request) == true) {
			empData.Role = Role.EMPLOYEE;
			empData.Validity = Validity.TRUE;
			return this.adminService.addEmployee(empData);
		} else {
			return this.auth(request);
		}
	}

	@Put("updateEmployee/:id")
	updateEmployee(
		@Param("id", ParseIntPipe) id: number,
		@Body("Username") username: string,
		@Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) == true) {
			return this.adminService.updateEmployee(id, username);
		} else {
			return this.auth(request);
		}
	}

	@Post("deleteEmployee/:id")
	deleteEmployee(
		@Param("id", ParseIntPipe) id: number,
		@Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) == true) {
			return this.adminService.deleteEmployee(id);
		} else {
			return this.auth(request);
		}
	}
}
