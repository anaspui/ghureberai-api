import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { DatabaseModule } from "./Shared/database/database.module";
import { RegistrationModule } from "./shared/registration/registration.module";

@Module({
	imports: [DatabaseModule, RegistrationModule],
	controllers: [],
	providers: [AppService],
})
export class AppModule {}
