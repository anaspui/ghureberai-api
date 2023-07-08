import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from "@nestjs/typeorm";
import { driver } from "src/Shared/entities/transportDriver.entity";
import { TransportController } from "./transport.controller";
import { TransportService } from "./transport.service";


@Module({
    imports: [TypeOrmModule.forFeature([driver])],
    controllers: [TransportController],
    providers: [TransportService],
}
)
export class TransportModule {}