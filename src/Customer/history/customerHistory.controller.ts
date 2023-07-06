import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CustomerHistoryService } from "./customerHistory.service";
import { CustomerHistoryDto } from "./dto/customerHistory.dto";

@Controller('/customer/history')
export class CustomerHistoryController{
    constructor(private CustomerHistoryService:CustomerHistoryService){}

    @Post('/insertCustomerHistory')
    @UsePipes(new ValidationPipe())
    async insertCustomerHistory(@Body() CustomerHistoryDto: CustomerHistoryDto) : Promise<any>
    {
        try{
            return this.CustomerHistoryService.insertCustomerHistory(CustomerHistoryDto);
        }
        catch(error){
            console.log(error);
        }
    }

    @Get('/getUserHistory/:id')
	getAdmin(@Param('id',ParseIntPipe) id:number):any
	{
      return this.CustomerHistoryService.getCustomerHistory(id);
	}
}