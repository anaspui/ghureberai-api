import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>,
		private jwtService: JwtService,
	) {}

	async auth(Username: string): Promise<User | null> {
		try {
			const user = await this.userRepo.findOne({ where: { Username } });
			return user || null;
		} catch (error) {
			throw new Error("Error fetching user: " + error.message);
		}
	}

	async decryptPassword(password: string, hashed: string): Promise<boolean> {
		try {
			if (!password || !hashed) {
				throw new Error("Invalid password or hashed password");
			}

			console.log("Entered password:", password);
			console.log("Hashed password:", hashed);

			const isPasswordMatch = await bcrypt.compare(password, hashed);
			return isPasswordMatch;
		} catch (error) {
			throw new Error("Error comparing passwords: " + error.message);
		}
	}

	// async signIn(username, password) {
	// 	const user = this.auth(username);
	// 	if (!this.decryptPassword(password, (await user).Password)) {
	// 		throw new UnauthorizedException();
	// 	}
	// 	const payload = {
	// 		sub: (await user).UserId,
	// 		username: (await user).Username,
	// 	};
	// 	return {
	// 		access_token: await this.jwtService.signAsync(payload),
	// 	};
	// }
	async getUser(UserId: number) {
		try {
			return this.userRepo.findOne({ where: { UserId } });
		} catch (error) {
			throw new Error("Error fetching user: " + error.message);
		}
	}

	async getRole(request) {
		try {
			const cookie = request.cookies["token"];

			const data = await this.jwtService.verifyAsync(cookie, {
				secret: "key",
			});

			if (!data) {
				throw new UnauthorizedException();
			}

			const user = await this.getUser(data.id);

			const { Password, ...result } = user;
			return result.Role;
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
}
