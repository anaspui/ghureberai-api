import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Driver } from "src/Shared/entities/transportDriver.entity";
import { Localtransport } from "src/Shared/entities/localtransport.entity";
import { Vehicle } from "src/Shared/entities/transportVehicle.entity";
import { TransportDriverController } from "./driver/transportDriver.controller";
import { TransportDriverService } from "./driver/transportDriver.service";
import { User } from "src/Shared/entities/user.entity";
import { TransportLTController } from "./LocalTransport/transportLT.controller";
import { TransportLTService } from "./LocalTransport/transportLT.service";
import { TransportDriverModule } from "./driver/transportDriver.module";

@Module({
	imports: [TypeOrmModule.forFeature([Localtransport, Vehicle, User]),TransportDriverModule],
	controllers: [TransportLTController],
	providers: [TransportLTService],
})
export class TransportModule {}
