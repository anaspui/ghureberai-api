import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModule } from "./Customer/customer.module";
import { RegistrationModule } from "./shared/registration/registration.module";
import { TransportModule } from "./Transport/transport.module";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./shared/auth/auth.module";
import { PackageModule } from "./Shared/package/package.module";
import { HotelModule } from "./Hotel/hotel.module";
import { JwtService } from "@nestjs/jwt/dist";
import { JwtModule } from "@nestjs/jwt/dist";
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
