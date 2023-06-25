import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { DatabaseModule } from "./shared/database/database.module";
import { RegistrationModule } from "./shared/registration/registration.module";

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
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
