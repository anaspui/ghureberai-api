import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Driver } from "src/Shared/entities/driver.entity";
import { Transport } from "src/Shared/entities/transport.entity";
import { TransportDriverController } from "./driver/transportDriver.controller";
import { TransportDriverService } from "./driver/transportDriver.service";
import { User } from "../Shared/entities/user.entity";
import { TransportLTController } from "./LocalTransport/transportLT.controller";
import { TransportLTService } from "./LocalTransport/transportLT.service";
import { TransportDriverModule } from "./driver/transportDriver.module";

@Module({
	imports: [TypeOrmModule.forFeature([Transport, Transport, User]),TransportDriverModule],
	controllers: [TransportLTController],
	providers: [TransportLTService],
})
export class TransportModule {}
