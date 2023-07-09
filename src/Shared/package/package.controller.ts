import { Body, Controller, Req, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { PackageDto } from './dto/package.dto';
import { PackageService } from './package.service';
import { CurrentSession } from "../../Shared/auth/auth.controller";
import { Request } from "express";
import { PackageType } from "src/Shared/entities/package.entity";
import { Validity } from "src/Shared/entities/user.entity";

@Controller('package')
export class PackageController{
    constructor(private PackageService: PackageService) { }
    

    // User Authentication
    auth(@Req() request: Request & { session: CurrentSession }) {
		if (!request.session.user) return "You are not logged in";
		const { Role } = request.session.user;
		if (Role === "admin") {
			return "admin";
        } else if (Role === "customer") { 
            return "customer";
        } else if (Role === "tpmanager") {
            return "tpmanager";
        } else {
			return "Access Denied!";
		}
	}

    // Admin and TP Manager Package Crud Operations
    // Insert Package
    @Post('insert')
    @UsePipes(new ValidationPipe())
    async insertPackage(@Body() PackageDto: PackageDto,
        @Req() request: Request & { session: CurrentSession }): Promise<any>
    {
        if (this.auth(request) === "admin" || this.auth(request) === "tpmanager") {
            try{
                return this.PackageService.insertPackage(PackageDto);
            }   catch(error){
                console.log(error);
            }
		} else {
			return this.auth(request);
		}
        
    }

    // Delete Package
    @Delete('/delete/:id')
    deletePackage(@Param('id', ParseIntPipe) id: number,
    @Req() request: Request & { session: CurrentSession }): any
    {
        if (this.auth(request) === "admin" || this.auth(request) === "tpmanager") {
            try{
                return this.PackageService.deletePackage(id);
            } catch(error){
                console.log(error);
            }
		} else {
			return this.auth(request);
		}
        
    }

    // Update Package
    @Put('/update/:id')
	updatePackage(@Param('id',ParseIntPipe)
    id: number, @Body('Name') Name: string, @Body('ValidFrom') ValidFrom: Date, @Body('ValidTill') ValidTill: Date,
        @Body('PackageType') PackageType: PackageType, @Body('TransportFacility') TransportFacility: Validity,
    @Req() request: Request & { session: CurrentSession }): any
    {
        if (this.auth(request) === "admin" || this.auth(request) === "tpmanager") {
            try{
                return this.PackageService.updatePackage(id,Name, ValidFrom, ValidTill, PackageType, TransportFacility);
            } catch(error){
                console.log(error);
            }
		} else {
			return this.auth(request);
		}
	}

    // Admin, TP Manager and Customer Package View Operations
    // Filter Packages
    @Get('/:id')
    getPackage(@Param('id', ParseIntPipe) id: number,
    @Req() request: Request & { session: CurrentSession }): any
    {
        if (this.auth(request) === "admin" || this.auth(request) === "tpmanager" || this.auth(request) === "customer") {
            try{
                return this.PackageService.getPackage(id);
            } catch(error){
                console.log(error);
            }
         }
	}

    // Show All Packages
    @Get('')
	showAllPackage(@Req() request: Request & { session: CurrentSession }):any
    {
        if (this.auth(request) === "admin" || this.auth(request) === "tpmanager" || this.auth(request) === "customer") {
            try{
                try{
                return this.PackageService.showAllPackages();
            } catch(error){
                console.log(error);
            }
            }catch(error){
                console.log(error);
            }
         }
        
	}

    
}