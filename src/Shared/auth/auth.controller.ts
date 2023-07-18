import {
	Controller,
	Get,
	Post,
	Req,
	Res,
	Injectable,
	Body,
	UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { Session } from "express-session";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";

export interface CurrentSession extends Session {
	isAuthenticated: boolean;
	user: User;
}

@Injectable()
@Controller("auth")
export class AuthController {
	constructor(
		private authService: AuthService,
		private jwtService: JwtService,
	) {}

	@Post("login")
	async login(
		@Body() loginCredentials: any,
		@Req() request: Request & { session: CurrentSession },
		@Res({ passthrough: true }) response: Response,
	) {
		// get user from db
		const user = await this.authService.auth(loginCredentials.Username);
		if (!user) {
			response.sendStatus(404);
			throw new Error("User not found");
		}
		// decrypt password
		const isPasswordMatched = await this.authService.decryptPassword(
			loginCredentials.Password,
			user.Password,
		);
		if (isPasswordMatched === true) {
			(request.session as CurrentSession).isAuthenticated = true;
			user.Password = undefined;
			(request.session as CurrentSession).user = user;
			const token = await this.jwtService.signAsync(
				{
					id: user.UserId,
					username: user.Username,
				},
				{
					secret: "key",
				},
			);
			response.cookie("token", token, { httpOnly: true });
			response
				.status(200)
				.json({ status: "Logged In", role: user.Role, AccessToken: token });
		} else {
			response.sendStatus(401);
		}
	}

	@Post("logout")
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie("token");

		return {
			message: "success",
		};
	}

	@Get("sessiondump")
	dump(@Req() request: Request & { session: CurrentSession }) {
		return request.session.user;
	}

	@Get("user")
	async user(@Req() request: Request) {
		try {
			const cookie = request.cookies["token"];

			const data = await this.jwtService.verifyAsync(cookie, {
				secret: "key",
			});

			if (!data) {
				throw new UnauthorizedException();
			}

			const user = await this.authService.getUser(data.id);

			const { Password, Validity, UserId, ...result } = user;
			return result;
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
}
