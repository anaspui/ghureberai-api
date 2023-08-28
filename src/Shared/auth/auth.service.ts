import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>,
		private jwtService: JwtService,
	) {}

	async auth(Username: string) {
		const user = await this.userRepo.findOne({ where: { Username } });
		if (user) {
			return user;
		}
	}

	async decryptPassword(password: string, hashed: string): Promise<boolean> {
		try {
			return await bcrypt.compare(password, hashed);
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
		return this.userRepo.findOne({ where: { UserId } });
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
