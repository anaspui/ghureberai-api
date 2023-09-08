import { User } from "./../entities/user.entity";
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
	Put,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Session } from "express-session";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
// import { CurrentSession, sessionConfig } from "./session.config";
export interface CurrentSession extends Session {
	users?: User[];
	user?: User;
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
				if (!request.session.users) {
					request.session.users = [];
				}
				if (!request.session.users.some(u => u.UserId === user.UserId)) {
					request.session.users.push(user);
				}
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
		} catch (error) {
			console.error("Error during login:", error);
			response.status(500).json({ error: "Internal server error" });
		}
	}
	@Post("auth/logout")
	async logout(
		@Req() request: Request & { session: CurrentSession },
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const token = request.cookies.token;

			if (!token) {
				return response.status(400).json({ Result: "No Token on request" });
			}

			const verifiedData = await this.jwtService.verifyAsync(token, {
				secret: "key",
			});

			if (!verifiedData) {
				return response.status(401).json({ Result: "Invalid token" });
			}
			const userIndex = request.session.users.findIndex(
				user => user.UserId === verifiedData.id,
			);

			if (userIndex !== -1) {
				request.session.users.splice(userIndex, 1);
			}

			return response.status(200).json({ Result: "Logged Out" });
		} catch (error) {
			console.error("Error during logout:", error);
			return response.status(500).json({ error: "Internal server error" });
		}
	}
	//Previous log out (currently is used with nextjs)
	// @Post("auth/logout")
	// async logout(@Res({ passthrough: true }) response: Response) {
	// 	response.clearCookie("token");
	// 	return {
	// 		message: "Logged out",
	// 	};
	// }

	//Updated for auth
	// @Post("auth/logout")
	// logout(@Req() req: Request, @Res() res: Response) {
	// 	try {
	// 		req.session.destroy(err => {
	// 			if (err) {
	// 				console.error("Error destroying session:", err);
	// 				return res.status(500).json({ message: "Logout failed" });
	// 			}

	// 			res.clearCookie("token"); // Clear the session cookie
	// 			return res.status(200).json({ message: "Logged out" });
	// 		});
	// 	} catch (error) {
	// 		console.error("Logout failed:", error);
	// 		return res.status(500).json({ message: "Logout failed" });
	// 	}
	// }
	//Updated for auth

	@Post("auth-check")
	async checkAuthenticationByToken(
		@Req() request: Request & { session: CurrentSession },
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const cookie = request.cookies.token;
			if (!request.cookies.token) {
				return response.status(402).json({ Result: "No Token on request" });
			}
			const verifiedData = await this.jwtService.verifyAsync(cookie, {
				secret: "key",
			});

			if (verifiedData) {
				if (
					request.session.users &&
					request.session.users.some(user => user.UserId === verifiedData.id)
				) {
					return response.status(200).json({ isAuthenticated: true });
				} else {
					return response.status(201).json({ isAuthenticated: false });
				}
			} else {
				return response.status(401).json({ isAuthenticated: false });
			}
		} catch (error) {
			console.error("Error during auth-check:", error);
			return response.status(500).json({ error: "Internal server error" });
		}
	}

	@Get("sessiondump")
	dump(@Req() request: Request & { session: CurrentSession }) {
		return request.session;
	}

	@Get("user")
	async user(@Req() request: Request, @Res() res: Response) {
		// console.log("Request cookies:");
		// console.log(request.cookies.token);
		try {
			const cookie = request.cookies.token;

			const data = await this.jwtService.verifyAsync(cookie, {
				secret: "key",
			});

			if (!data) {
				throw new UnauthorizedException();
			}

			const user = await this.authService.getUser(data.id);

			const { Password, Validity, UserId, ...result } = user;
			res.status(200).json(result);
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
	@Put("/auth/update-password")
	async updatePassword(
		@Body() updateData: { CurrentPassword: string; NewPassword: string },
		@Req() request: Request,
		@Res() res: Response,
	) {
		try {
			const { CurrentPassword, NewPassword } = updateData;
			console.log("Current Password:", CurrentPassword);
			console.log("New Password:", NewPassword);

			const cookie = request.cookies.token;
			console.log("Cookie:", cookie);

			const data = await this.jwtService.verifyAsync(cookie, {
				secret: "key",
			});
			console.log("Token Verification Result:", data);

			if (!data) {
				console.log("Unauthorized: Token not verified.");
				throw new UnauthorizedException();
			}

			const user = await this.authService.getUser(data.id);
			console.log("User:", user);

			const isPasswordMatch = await bcrypt.compare(
				CurrentPassword,
				user.Password,
			);
			console.log("isMatch:", isPasswordMatch);

			if (!isPasswordMatch) {
				console.log("Password mismatch.");
				return res.status(402).json({ message: "Invalid Current Password" });
			}

			const update = await this.authService.updatePassword(
				user.UserId,
				NewPassword,
			);
			console.log("Update Result:", update);

			if (update) {
				console.log("Password updated successfully.");
				return res
					.status(200)
					.json({ message: "Password Updated Successfully" });
			} else {
				console.log("Password update failed.");
				return res
					.status(202)
					.json({ message: "Password not Updated Successfully" });
			}
		} catch (error) {
			console.error("Error updating password:", error.message);
			return res.status(500).json({ message: "An error occurred" });
		}
	}
}
