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
import { CurrentSession } from "../../Shared/auth/auth.controller";
import { Request } from "express";
import { StuffDto } from '../dto/stuff.dto';
import {StuffService } from "../stuff/stuff.service";

@Controller("stuff")
export class StuffController {
	constructor(private stuffService: StuffService) {}

	auth(@Req() request: Request & { session: CurrentSession }) {
		if (!request.session.user) return "You are not logged in";
		const { Role } = request.session.user;
		if (Role === "hotelManager") {
			return true;
		} else {
			return "Access Denied! You are not an admin";
		}
	}

    @Get("viewStuff")
	viewStuffs(@Req() request: Request & { session: CurrentSession }) {
		if (this.auth(request) == true) {
			return this.stuffService.viewStuff();
		} else {
			return this.auth(request);
		}
	}

    @Post("addstuff")
	addhotel(
		@Body() stuffDto: StuffDto,
		@Req() request: Request & { session: CurrentSession },
	) {
		if (this.auth(request) == true) {
			return this.stuffService.addStuff(stuffDto);
		} else {
			return this.auth(request);
		}
	}

    @Put("updateStuff/:Id")
	updateStuff(
		@Param("Id", ParseIntPipe) Id: number,
		@Body("Name") Name: string,
		@Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) == true) {
			return this.stuffService.updateStuff(Id, Name);
		} else {
			return this.auth(request);
		}
	}

    @Post("deleteStuff/:Id")
	deleteStuff(
		@Param("Id", ParseIntPipe) Id: number,
		@Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) == true) {
			return this.stuffService.deleteStuff(Id);
		} else {
			return this.auth(request);
		}
	}


}
