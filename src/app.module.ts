import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModule } from "./Customer/customer.module";
import { RegistrationModule } from "./shared/registration/registration.module";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./shared/auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "localhost",
			port: 5432,
			username: "postgres",
			password: "1234",
			database: "ghureberai",
			autoLoadEntities: true,
			synchronize: true,
		}),
		RegistrationModule,
		AdminModule,
		CustomerModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
