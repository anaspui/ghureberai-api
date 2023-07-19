import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { TransportLTService } from "./transportLT.service";
import { LTDto } from "./transportLT.dto";

@Controller("Transport/LT")
export class TransportLTController {
	constructor(private LTservice: TransportLTService) {}

	// @Get("showlocaltransport")
	// showLocalTransport(@Req() request) {}

	@Post("addLocalTransport")
	@UsePipes(new ValidationPipe())
	addLocalTransport(@Body(new ValidationPipe()) LTData: LTDto): object {
		return this.LTservice.addLocalTransport(LTData);
	}
}
