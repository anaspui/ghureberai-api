import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>,
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
}
