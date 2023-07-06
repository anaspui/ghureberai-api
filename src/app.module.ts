import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModule } from "./Customer/customer.module";
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
<<<<<<< HEAD
		AdminModule,
=======
		CustomerModule
>>>>>>> 5f31ac0d1583b4b8ab667e882d9f354fef1e16c3
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
