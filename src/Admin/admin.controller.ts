import {
	Controller,
	Get,
	Put,
	Req,
	Post,
	ValidationPipe,
	ParseIntPipe,
	UsePipes,
	Body,
	Param,
} from "@nestjs/common";
import { Request, Response } from "express";
import { EmployeeDto } from "./dto/employee.dto";
import { AdminService } from "./admin.service";
import { Role } from "src/Shared/entities/user.entity";
import session from "express-session";
import { CurrentSesstion } from "src/shared/auth/auth.controller";
@Controller("admin")
export class AdminController {
	constructor(private adminService: AdminService) {}
	@Get("viewEmployees")
	viewEmployees() {
		return this.adminService.viewEmployees();
	}
	@Post("addEmployee")
	addEmployee(@Body() empData: EmployeeDto) {
		empData.Role = Role.EMPLOYEE;
		return this.adminService.addEmployee(empData);
		// return empData;
	}
	@Put("updateEmployee/:id")
	updateEmployee(
		@Param("id", ParseIntPipe) id: number,
		@Body("Username") username: string,
	): any {
		return this.adminService.updateEmployee(id, username);
	}
	@Post("deleteEmployee/:id")
	deleteEmployee(@Param("id", ParseIntPipe) id: number): any {
		return this.adminService.deleteEmployee(id);
	}
}
