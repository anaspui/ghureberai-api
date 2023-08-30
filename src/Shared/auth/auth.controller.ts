import {
	Controller,
	Get,
	Post,
	Req,
	Res,
	Injectable,
	Body,
	UnauthorizedException,
	NotFoundException,
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
@Controller()
export class AuthController {
	constructor(
		private authService: AuthService,
		private jwtService: JwtService,
	) {}

	@Post("auth/login")
	async login(
		@Body() loginCredentials: any,
		@Req() request: Request & { session: CurrentSession },
		@Res({ passthrough: true }) response: Response,
	) {
		console.log("Login Attempted:", loginCredentials);

		if (!loginCredentials.Username || !loginCredentials.Password) {
			return "Please provide valid credentials";
		}

		try {
			const user = await this.authService.auth(loginCredentials.Username);

			if (!user) {
				response
					.status(401)
					.json({ message: "Can't find any account with the username" });
				return;
			}

			const isPasswordMatched = await this.authService.decryptPassword(
				loginCredentials.Password,
				user.Password,
			);
			if (!isPasswordMatched) {
				response.status(401).json({ message: "Invalid username or password" });
				return;
			}

			if (isPasswordMatched) {
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

			console.log("Received loginCredentials:", loginCredentials);
		} catch (error) {
			// Handle other errors here, if needed
			console.error("Error during login:", error);
			response.status(500).json({ error: "Internal server error" });
		}
	}

	@Post("auth/logout")
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie("token");
		return {
			message: "Logged out",
		};
	}

	@Get("sessiondump")
	dump(@Req() request: Request & { session: CurrentSession }) {
		return request.session.user;
	}

	@Get("user")
	async user(@Req() request: Request, @Res() res: Response) {
		console.log("Request headers:", request.headers);
		console.log("Request cookies:", request.cookies);

		try {
			const cookie = request.cookies["_hjSessionUser_3570765"];
			console.log("Extracted Cookie:", cookie);

			const data = await this.jwtService.verifyAsync(cookie, {
				secret: "key",
			});

			// if (!data) {
			// 	throw new UnauthorizedException();
			// }

			const user = await this.authService.getUser(data.id);

			const { Password, Validity, UserId, ...result } = user;
			res.status(200).json(result);
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
}
