import {
	Controller,
	Get,
	Post,
	Req,
	Res,
	Injectable,
	Body,
} from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { Session } from "express-session";
import { AuthService } from "./auth.service";
export interface CurrentSesstion extends Session {
	isAuthenticated: boolean;
	user: User;
}

@Injectable()
@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	async login(
		@Body() loginCredentials: any,
		@Req() request: Request & { session: CurrentSesstion },
		@Res() response: Response,
	) {
		// const { Username, Password } = data;
		const user = await this.authService.auth(loginCredentials.Username);

		if (user && user.Password === loginCredentials.Password) {
			(request.session as CurrentSesstion).isAuthenticated = true;
			(request.session as CurrentSesstion).user = user;
			response.sendStatus(200);
		} else {
			response.sendStatus(401);
		}
	}
	@Get("logout")
	logout(@Req() request: Request, @Res() response: Response) {
		request.session.destroy(err => {
			if (err) {
				response.sendStatus(400);
			}
			response.sendStatus(200);
		});
	}
	@Get("sessiondump")
	dump(@Req() request: Request & { session: CurrentSesstion }) {
		// console.log(request.session.isAuthenticated);
		// console.log(request.session.user);
		return request.session.user;
	}
}
