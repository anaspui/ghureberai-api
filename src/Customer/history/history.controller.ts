import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { HistoryDto } from "./dto/history.dto";

@Controller('/customer/history')
export class HistoryController{
    constructor(private HistoryService:HistoryService){}

    @Post('/insertHistory')
    @UsePipes(new ValidationPipe())
    async insertHistory(@Body() HistoryDto: HistoryDto) : Promise<any>
    {
        try{
            return this.HistoryService.insertHistory(HistoryDto);
        }
        catch(error){
            console.log(error);
        }
    }

    @Get('/getUserHistory/:id')
	getAdmin(@Param('id',ParseIntPipe) id:number):any
	{
      return this.HistoryService.getHistory(id);
	}
}