import {
	Controller,
	Get,
	Put,
	Req,
	Post,
	ParseIntPipe,
	Body,
	Param,
	UsePipes, //Adeed
} from "@nestjs/common";
import { CurrentSession } from "../../Shared/auth/auth.controller";
import { Request } from "express";
import { staffDto } from '../dto/staff.dto';
import {staffService } from "./staff.service";
import * as bcrypt from "bcryptjs";
import { Role, Validity } from "../../Shared/entities/user.entity";
import { ValidationPipe } from "@nestjs/common"; //Added

@Controller("staff")
export class staffController {
	constructor(private staffService: staffService) {}

	auth(@Req() request: Request & { session: CurrentSession }) {
		if (!request.session.user) return "You are not logged in";
		const { Role } = request.session.user;
		if (Role === "hotelManager") {
			return true;
		} else {
			return "Access Denied! You are not an admin";
		}
	}
	

    @Get("viewstaff")
	viewstaffs(@Req() request: Request & { session: CurrentSession }) {
		if (this.auth(request) == true) {
			return this.staffService.viewstaff();
		} else {
			return this.auth(request);
		}
	}

    @Post("addstaff")
	async addhotel(    //await will work for async functions only
		@Body() staffDto: staffDto,
		@Req() request: Request & { session: CurrentSession },
	) {
		if (this.auth(request) == true) {
			const hashedPassword = await bcrypt.hash(staffDto.Password, 10);//added
			// Set the hashed password in the staffDto
			staffDto.Password = hashedPassword; //added
			return this.staffService.addstaff(staffDto);
		} else {
			return this.auth(request);
			
		}
	}

    @Put("updatestaff/:Id")
	updatestaff(
		@Param("Id", ParseIntPipe) Id: number,
		@Body("Name") Name: string,
		@Body("Password") Password: string,
		@Body("Email") Email: string,
        @Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) == true) {
			return this.staffService.updatestaff(Id, Name,Password,Email);
		} else {
			return this.auth(request);
		}
	}

    @Post("deletestaff/:Id")
	deletestaff(
		@Param("Id", ParseIntPipe) Id: number,
		@Req() request: Request & { session: CurrentSession },
	): any {
		if (this.auth(request) == true) {
			return this.staffService.deletestaff(Id);
		} else {
			return this.auth(request);
		}
	}

	//--------------------------------------------
	

	
	//--------------------------------------------


}
