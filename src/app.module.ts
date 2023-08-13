import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModule } from "./Customer/customer.module";
import { RegistrationModule } from "./Shared/registration/registration.module";
import { TransportModule } from "./Transport/transport.module";
import { AdminModule } from "./Admin/admin.module";
import { AuthModule } from "./Shared/auth/auth.module";
import { PackageModule } from "./Shared/package/package.module";
import { HotelModule } from "./Hotel/hotel.module";
import { JwtService } from "@nestjs/jwt/dist";
import { JwtModule } from "@nestjs/jwt/dist";
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "dpg-cjc2li7db61s73cccsq0-a.singapore-postgres.render.com",
			port: 5432,
			username: "anas",
			password: "6eByi3L5Xiuk2FKfIMkuCA986CMwsOXa",
			database: "ghureberai",
			autoLoadEntities: true,
			synchronize: true,
			ssl: true,
		}),
		JwtModule.register({
			secret: "key",
		}),
		RegistrationModule,
		TransportModule,
		AdminModule,
		CustomerModule,
		AuthModule,
		PackageModule,
		HotelModule,
	],
	controllers: [],
	providers: [JwtService],
})
export class AppModule {}
