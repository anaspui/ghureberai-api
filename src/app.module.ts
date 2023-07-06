import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegistrationModule } from "./shared/registration/registration.module";
import { AdminModule } from './admin/admin/admin.module';

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
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
