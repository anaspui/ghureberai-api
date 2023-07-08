import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { TransportService } from "./transport.service";
import { transportDriverdto } from "./transportDriver.dto";

@Controller("Transport")
export class TransportController {
    constructor(private transService: TransportService)
    {}

    @Post("addDriver") @UsePipes (new ValidationPipe())
    addDriver(@Body(new ValidationPipe()) driverData: transportDriverdto): object{
        return this.transService.addDriver(driverData);
    }

}