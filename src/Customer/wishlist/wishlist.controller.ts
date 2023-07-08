import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { WishlistDto } from './dto/wishlist.dto';
import { WishlistService } from './wishlist.service';

@Controller('customer/wishlist')
export class WishlistController{
    constructor(private WishlistService:WishlistService){}

    @Post('/insert')
    @UsePipes(new ValidationPipe())
    insertWishlist(@Body() WishlistDto: WishlistDto, @Body("PackageId") PackageId:number, @Body("CustomerId") CustomerId:number)
    {
        try{
            const exist = this.WishlistService.getWishlist({ where: { PackageId: PackageId, CustomerId: CustomerId } });
            if(exist){
                return "Package already added to wishlist";
            }else{
                const result =  this.WishlistService.insertWishlist(WishlistDto);
                if(result){
                    return "Package added to wishlist";
                }else{
                    return "Faild to add package in wish list"
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }

    @Get('/:id')
	getPackage(@Param('id',ParseIntPipe) id:number):any
	{
        try{
            return this.WishlistService.getWishlist(id);
            }catch(error){
                console.log(error);
            }
	}

    @Delete('/delete/:id')
	deletePackage(@Param('id',ParseIntPipe)id:number):any
	{
        try{
            return this.WishlistService.deleteWishlist(id);
            }catch(error){
                console.log(error);
            }
	}

    @Get('')
	showAllPackage():any
	{
        try{
            return this.WishlistService.showWishlist();
            }catch(error){
                console.log(error);
            }
	}
}