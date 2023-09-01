import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Req,
	UsePipes,
	ValidationPipe,
	UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { PackageType } from "../../Shared/entities/package.entity";
import { Role, Validity } from "../../Shared/entities/user.entity";
import { CurrentSession } from "../../Shared/auth/auth.controller";
import { PackageDto } from "./dto/package.dto";
import { PackageService } from "./package.service";
import { AuthService } from "../auth/auth.service";

@Controller("package")
export class PackageController {
	constructor(
		private PackageService: PackageService,
		private authService: AuthService,
	) {}

	// User Authentication
	async auth(@Req() request: Request & { session: CurrentSession }) {
		//****************************************************************//
		//if (!request.session.user) return "You are not logged in";
		//const { Role } = request.session.user;
		//if (Role === "admin") {
		//	return "admin";
		//} else if (Role === "customer") {
		//	return "customer";
		//} else if (Role === "hotelmanager") {
		//	return "hotelmanager";
		//} else {
		//	return "Access Denied!";
		//}
		//****************************************************************//
		const role = await this.authService.getRole(request);
		if (!role) throw new UnauthorizedException();
		if (role === Role.ADMIN) {
			return "admin";
		} else if (role === Role.CUSTOMER) {
			return "customer";
		} else if (role === Role.HOTEL_MANAGER) {
			return "hotelmanager";
		} else {
			return "Access Denied!";
		}
	}

	// Admin and TP Manager Package Crud Operations
	// Insert Package
	@Post("insert")
	@UsePipes(new ValidationPipe())
	async insertPackage(
		@Body() PackageDto: PackageDto,
		@Req() request: Request & { session: CurrentSession },
	): Promise<any> {
		if (
			(await this.auth(request)) === "admin" ||
			(await this.auth(request)) === "hotelmanager"
		) {
			try {
				return this.PackageService.insertPackage(PackageDto);
			} catch (error) {
				console.log(error);
			}
		} else {
			return this.auth(request);
		}
	}

	// Delete Package
	@Delete("/delete/:id")
	async deletePackage(
		@Param("id", ParseIntPipe) id: number,
		@Req() request: Request & { session: CurrentSession },
	): Promise<any> {
		// if (
		// 	(await this.auth(request)) === "admin" ||
		// 	(await this.auth(request)) === "hotelmanager"
		// )
		try {
			return this.PackageService.deletePackage(id);
		} catch (error) {
			console.log(error);
		}
	}

	// Update Package
	@Put("/update/:id")
	async updatePackage(
		@Param("id", ParseIntPipe)
		id: number,
		@Body("Name") Name: string,
		@Body("ValidTill") ValidTill: Date,
		@Body("PackageType") PackageType: PackageType,
		@Body("TransportFacility") TransportFacility: Validity,
		@Req() request: Request & { session: CurrentSession },
	): Promise<any> {
		if (
			(await this.auth(request)) === "admin" ||
			(await this.auth(request)) === "hotelmanager"
		) {
			try {
				return this.PackageService.updatePackage(
					id,
					Name,
					ValidTill,
					PackageType,
					TransportFacility,
				);
			} catch (error) {
				console.log(error);
			}
		} else {
			return this.auth(request);
		}
	}

	// Admin, TP Manager and Customer Package View Operations
	// Filter Packages
	@Get("/:id")
	async getPackage(
		@Param("id", ParseIntPipe) id: number,
		@Req() request: Request & { session: CurrentSession },
	): Promise<any> {
		if (
			(await this.auth(request)) === "admin" ||
			(await this.auth(request)) === "hotelmanager" ||
			(await this.auth(request)) === "customer"
		) {
			try {
				return this.PackageService.getPackage(id);
			} catch (error) {
				console.log(error);
			}
		}
	}

	// Show All Packages
	@Get("")
	async showAllPackage(
		@Req() request: Request & { session: CurrentSession },
	): Promise<any> {
		if (
			(await this.auth(request)) === "admin" ||
			(await this.auth(request)) === "hotelmanager" ||
			(await this.auth(request)) === "customer"
		) {
			try {
				try {
					return this.PackageService.showAllPackages();
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
			}
		}
	}
}
