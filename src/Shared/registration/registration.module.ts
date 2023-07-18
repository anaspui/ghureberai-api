import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegistrationController } from "./registration.controller";
import { User } from "../entities/user.entity";
import { RegistrationService } from "./registration.service";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		MailerModule.forRoot({
			transport: {
				host: "smtp.gmail.com",
				port: 465,
				ignoreTLS: true,
				secure: true,
				auth: {
					user: "omarmohammad.anas@gmail.com",
					pass: "doruxfrlcixtwomr",
				},
			},
		}),
	],
	controllers: [RegistrationController],
	providers: [RegistrationService],
})
export class RegistrationModule {}
