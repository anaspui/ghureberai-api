import { Controller, Delete, Get, Param, ParseIntPipe, Req } from "@nestjs/common";
import { Request } from "express";
import { CurrentSession } from "../Shared/auth/auth.controller";
import { CustomerService } from "./customer.service";

@Controller('customer')
export class CustomerController{
    constructor(private CustomerService: CustomerService) { }

    //auth(@Req() request: Request & { session: CurrentSession }) {
	//	if (!request.session.user) return "You are not logged in";
	//	const { Role } = request.session.user;
	//	if (Role === "customer") {
	//		return true;
    //    } else {
	//		return "Access Denied!";
	//	}
	//}

    @Delete('/delete/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number,
    @Req() request: Request & { session: CurrentSession }): any
    {
        return this.CustomerService.deleteUser(id);
        
        
    }

    @Get('/:username')
    getUserData(@Param('username') username: string,
    @Req() request: Request & { session: CurrentSession }): any
    {
        return this.CustomerService.getUserData(username);
        
        
    }
    
    @Get('/:username')
    GetUser(@Param('username') username: string,
    @Req() request: Request & { session: CurrentSession }): any
    {
        return this.CustomerService.getUserData(username);
    }
}