import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Driver } from "src/Shared/entities/transportDriver.entity";
import { TransportController } from "./transport.controller";
import { TransportService } from "./transport.service";
import { Localtransport } from "src/Shared/entities/localtransport.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Localtransport, Driver])],
	controllers: [TransportController],
	providers: [TransportService],
})
export class TransportModule {}
