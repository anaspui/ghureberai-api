import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Req } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { HistoryDto } from "./dto/history.dto";
import { CurrentSession } from "src/Shared/auth/auth.controller";

@Controller('/customer/history')
export class HistoryController{
    constructor(private HistoryService: HistoryService) { }
    
    auth(@Req() request: Request & { session: CurrentSession }) {
		if (!request.session.user) return "You are not logged in";
		const { Role, UserId } = request.session.user;
		if (Role === "customer") {
			return true;
		} else {
			return "Access Denied!";
		}
	}

    @Post('/insertHistory')
    @UsePipes(new ValidationPipe())
    async insertHistory(@Body() HistoryDto: HistoryDto,
        @Req() request: Request & { session: CurrentSession }): Promise<any>
    {
        if (this.auth(request) == true) {
			try{
                return this.HistoryService.insertHistory(HistoryDto);
            } catch(error) {
                console.log(error);
            }
		} else {
			return this.auth(request);
		}
        
    }

    @Get('')
    getAdmin(UserId: number, @Req() request: Request & { session: CurrentSession }): any
    {
        if (this.auth(request) == true) {
			try {
                return this.HistoryService.getHistory(UserId);
            } catch (error) {
                console.log(error);
            }
		} else {
			return this.auth(request);
		}
      
	}
}