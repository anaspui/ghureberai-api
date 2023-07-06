import {
	Controller,
	Get,
	Put,
	Post,
	ValidationPipe,
	ParseIntPipe,
	UsePipes,
	Body,
	Param,
} from "@nestjs/common";
import { EmployeeDto } from "./dto/employee.dto";
import { AdminService } from "./admin.service";
@Controller("admin")
export class AdminController {
	constructor(private adminService: AdminService) {}
	@Get("viewEmployees")
	viewEmployees() {
		return this.adminService.viewEmployees();
	}
	@Post("addEmployee")
	addEmployee(@Body() empData: EmployeeDto) {
		return this.adminService.addEmployee(empData);
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
