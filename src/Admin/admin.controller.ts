import { JwtService } from "@nestjs/jwt";
import {
	Controller,
	Get,
	Put,
	Req,
	Res,
	Post,
	ParseIntPipe,
	Body,
	Param,
	HttpException,
	HttpStatus,
	UnauthorizedException,
	Delete,
	NotFoundException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CurrentSession } from "../Shared/auth/auth.controller";
import { EmployeeDto } from "./dto/employee.dto";
import { AdminService } from "./admin.service";
import { Role, Validity } from "src/Shared/entities/user.entity";
import * as bcrypt from "bcryptjs";
import { AuthService } from "../Shared/auth/auth.service";
@Controller("admin")
export class AdminController {
	constructor(
		private adminService: AdminService,
		private authService: AuthService,
		private jwtService: JwtService,
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
	@Get("viewAdmins")
	async viewAdmins(@Req() request: Request & { session: CurrentSession }) {
		if ((await this.auth(request)) == true) {
			return this.adminService.viewAdmins();
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
	@Post("addHotelManager")
	async addHotelManager(
		@Body() empData: EmployeeDto,
		@Req() request: Request & { session: CurrentSession },
	) {
		if ((await this.auth(request)) == true) {
			empData.Role = Role.HOTEL_MANAGER;
			try {
				const hashedPassword = await bcrypt.hash(empData.Password, 10);
				empData.Password = hashedPassword;
			} catch (error) {
				console.log(error);
			}
			return this.adminService.addHotelManager(empData);
		} else {
			throw new UnauthorizedException();
		}
	}
	@Post("addAdmin")
	async addAdmin(
		@Body() empData: EmployeeDto,
		@Req() request: Request & { session: CurrentSession },
	) {
		if ((await this.auth(request)) == true) {
			empData.Role = Role.ADMIN;
			try {
				const hashedPassword = await bcrypt.hash(empData.Password, 10);
				empData.Password = hashedPassword;
			} catch (error) {
				console.log(error);
			}
			return this.adminService.addAdmin(empData);
		} else {
			throw new UnauthorizedException();
		}
	}

	@Put("updateEmployee/:id")
	async updateEmployee(
		@Param("id", ParseIntPipe) id: number,
		@Body()
		updateData: {
			Username: string;
			Password: string;
			Phone: string;
			Email: string;
			Validity: Validity;
		},
		@Req() request: Request & { session: CurrentSession },
	) {
		if (await this.auth(request)) {
			try {
				return await this.adminService.updateEmployee(
					id,
					updateData.Username,
					updateData.Password,
					updateData.Email,
					updateData.Phone,
					updateData.Validity,
				);
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
	@Put("updateAdmin/:id")
	async updateAdmin(
		@Param("id", ParseIntPipe) id: number,
		@Body()
		updateData: {
			Username: string;
			Password: string;
			Phone: string;
			Email: string;
			Validity: Validity;
		},
		@Req() request: Request & { session: CurrentSession },
	) {
		if (await this.auth(request)) {
			try {
				return await this.adminService.updateAdmin(
					id,
					updateData.Username,
					updateData.Password,
					updateData.Email,
					updateData.Phone,
					updateData.Validity,
				);
			} catch (error) {
				throw new HttpException(
					{
						status: HttpStatus.FORBIDDEN,
						error: "Admin not found",
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
	@Put("updateHotelManager/:id")
	async updateHotelManager(
		@Param("id", ParseIntPipe) id: number,
		@Body()
		updateData: {
			Username: string;
			Password: string;
			Phone: string;
			Email: string;
			Validity: Validity;
		},
		@Req() request: Request & { session: CurrentSession },
	) {
		if (await this.auth(request)) {
			try {
				return await this.adminService.updateHotelManager(
					id,
					updateData.Username,
					updateData.Password,
					updateData.Email,
					updateData.Phone,
					updateData.Validity,
				);
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
	@Post("deleteAdmin/:id")
	async deleteAdmin(
		@Param("id", ParseIntPipe) id: number,
		@Req() request: Request & { session: CurrentSession },
	) {
		if ((await this.auth(request)) == true) {
			try {
				return await this.adminService.deleteAdmin(id);
			} catch (error) {
				throw new HttpException(
					{
						status: HttpStatus.FORBIDDEN,
						error: "Admin not found",
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

	@Get("showallpackages")
	async showAllPackages(@Req() request: Request & { session: CurrentSession }) {
		const isAuthEmp = await this.authEmp(request);
		const isAuth = await this.auth(request);

		if (isAuthEmp || isAuth) {
			try {
				const result = await this.adminService.showAllPackages();
				return result;
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

	@Get("showallhotel")
	async showAllHotel(@Req() request: Request & { session: CurrentSession }) {
		try {
			const result = await this.adminService.showAllHotel();
			return result;
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
	}

	@Get("showallhotelmanager")
	async showAllHotelManager(
		@Req() request: Request & { session: CurrentSession },
	) {
		const isAuthEmp = await this.authEmp(request);
		const isAuth = await this.auth(request);

		if (isAuthEmp || isAuth) {
			try {
				const result = await this.adminService.showAllHotelManager();
				return result;
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

	@Get("showalltpmanager")
	async showAllTpManager(
		@Req() request: Request & { session: CurrentSession },
	) {
		const isAuthEmp = await this.authEmp(request);
		const isAuth = await this.auth(request);

		if (isAuthEmp || isAuth) {
			try {
				const result = await this.adminService.showAllTpManager();
				return result;
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
	@Get("showallbookings")
	async showAllBookings(@Req() request: Request & { session: CurrentSession }) {
		const isAuthEmp = await this.authEmp(request);
		const isAuth = await this.auth(request);

		if (isAuthEmp || isAuth) {
			try {
				const result = await this.adminService.showAllBooking();
				return result;
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
	@Get("allusers")
	async allusers(@Req() request: Request & { session: CurrentSession }) {
		const result = await this.adminService.allUsers();
		return result;
	}

	@Post("cyadmin")
	async aaddAdmin(
		@Body() empData: EmployeeDto,
		@Req() request: Request & { session: CurrentSession },
	) {
		//password hashing
		try {
			empData.Role = Role.ADMIN;
			empData.Validity = Validity.TRUE;
			const hashedPassword = await bcrypt.hash(empData.Password, 10);
			empData.Password = hashedPassword;
		} catch (error) {
			console.log(error);
		}
		const result = await this.adminService.addEmployee(empData);
		return "Admin Added";
	}
	@Delete("/delete/:id")
	async deleteUser(@Param("id") id: number): Promise<void> {
		try {
			await this.adminService.deleteUser(id);
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message);
			}
			throw error;
		}
	}
	@Post("update-profile")
	async updateProfile(
		@Body() bodyData: any,
		@Req() request: Request & { session: CurrentSession },
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const cookie = request.cookies.token;

			const data = await this.jwtService.verifyAsync(cookie, {
				secret: "key",
			});

			if (!data) {
				throw new UnauthorizedException();
			}

			const user = await this.authService.getUser(data.id);
			const result = await this.adminService.updateProfile(
				user.UserId,
				bodyData,
			);

			console.log("result: ", result);
			console.log("bodyData : ", bodyData);
			if (result.affected > 0) {
				return response
					.status(200)
					.json({ message: "Profile Updated Successfully" });
			} else {
				return response.status(400).json({ message: "Profile Update Failed" });
			}
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
	@Get("user-count")
	async getUserRoleCounts(): Promise<{ [role: string]: number }> {
		try {
			const result = this.adminService.countUsersByRoles();
			if (result) {
				return result;
			} else {
				throw new Error("Error in counting users by role");
			}
		} catch (error) {
			return error;
		}
	}
}
