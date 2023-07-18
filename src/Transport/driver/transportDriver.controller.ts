import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UsePipes,
	ValidationPipe,
	Param,
	ParseIntPipe,
	Delete,
	Put,
} from "@nestjs/common";
import { transportDriverdto } from "./transportDriver.dto";
import { TransportDriverService } from "./transportDriver.service";
import { CurrentSession } from "src/Shared/auth/auth.controller";
import { get } from "http";

@Controller("Transport")
export class TransportDriverController {
	constructor(private transService: TransportDriverService) {}

	auth(@Req() request: Request & { session: CurrentSession }) {
		if (!request.session.user) return "You are not logged in";
		const { Role } = request.session.user;
		if (Role === "tpmanager") {
			return true;
		} else {
			return "Access Denied! You are not an admin";
		}
	}

	@Post("addDriver")
	@UsePipes(new ValidationPipe())
	async addDriver(
		@Body() transportDriverdto: transportDriverdto,
		@Req() request: Request & { session: CurrentSession },
	): Promise<any> {
		if (this.auth(request) === true) {
			try {
				return this.transService.addDriver(transportDriverdto);
			} catch (error) {
				console.log(error);
			}
		} else {
			return this.auth(request);
		}
	}

	@Delete("/delete/:id")
	deleteDriver(
		@Param("id", ParseIntPipe) id: number,
		@Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) === true) {
			try {
				return this.transService.deleteDriver(id);
			} catch (error) {
				console.log(error);
			}
		} else {
			return this.auth(request);
		}
	}

	@Put("/update/:id")
	updateDriver(
		@Param("id", ParseIntPipe)
		id: number,
		@Body("DriverName") DriverName: string,
		@Body("DriverEmail") DriverEmail: string,
		@Body("DriverPhone") DriverPhone: string,
		@Body("DriverSalary") DriverSalary: string,
		@Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) === true) {
			try {
				return this.transService.updateDriver(
					id,
					DriverName,
					DriverEmail,
					DriverPhone,
					DriverSalary,
				);
			} catch (error) {
				console.log(error);
			}
		} else {
			return this.auth(request);
		}
	}

	@Get("/:id")
	getDriver(
		@Param("id", ParseIntPipe) id: number,
		@Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) === true) {
			try {
				return this.transService.showdriver(id);
			} catch (error) {
				console.log(error);
			}
		}
	}

	@Get("")
	showAllDriver(@Req() request: Request & { session: CurrentSession }): any {
		if (this.auth(request) === true) {
			try {
				try {
					return this.transService.showAllDriver();
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
			}
		}
	}
}
