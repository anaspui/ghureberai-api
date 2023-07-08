import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>,
	) {}

	auth(Username: string) {
		const user = this.userRepo.findOne({ where: { Username } });
		if (user) {
			return user;
		}
	}
}
