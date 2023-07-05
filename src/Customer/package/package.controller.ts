import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { PackageDto } from './dto/package.dto';
import { PackageService } from './package.service';

@Controller('/package')
export class PackageController{
    constructor(private PackageService:PackageService){}

    @Post('/insert')
    @UsePipes(new ValidationPipe())
    async insertCustomerHistory(@Body() PackageDto: PackageDto) : Promise<any>
    {
        try{
            return this.PackageService.insertPackage(PackageDto);
        }
        catch(error){
            console.log(error);
        }
    }

    @Get('/:id')
	getPackage(@Param('id',ParseIntPipe) id:number):any
	{
        try{
            return this.PackageService.getPackage(id);
            }catch(error){
                console.log(error);
            }
	}

    @Delete('/delete/:id')
	deletePackage(@Param('id',ParseIntPipe)id:number):any
	{
        try{
            return this.PackageService.deletePackage(id);
            }catch(error){
                console.log(error);
            }
	}

    @Get('')
	showAllPackage():any
	{
        try{
            return this.PackageService.showAllPackages();
            }catch(error){
                console.log(error);
            }
	}

    @Put('/updatePackage/:id')
	updatePackage(@Param('id',ParseIntPipe)
		id:number,@Body('Name') name:string):any
	{
      return this.PackageService.updatePackage(id,name);
	}
}