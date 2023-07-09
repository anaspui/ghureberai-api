import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsString
} from "class-validator";
import { Priority } from "src/Shared/entities/wishlist.entity";

export class WishlistDto {

	@IsNumber()
	CustomerId: number;

	@IsNumber()
	PackageId: number;

    @IsString()
    Note: string;

	@IsEnum(Priority)
	Priority: Priority.FALSE;
}
