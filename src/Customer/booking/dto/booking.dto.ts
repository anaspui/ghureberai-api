import {
    IsDate,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString
} from "class-validator";
import { PackageType } from "src/Shared/entities/package.entity";

export class BookingDto {

	@IsOptional()
	hotel_name: string;

	@IsNumber()
	CustomerID: number;

    @IsOptional()
    CheckInDate: Date;

    @IsOptional()
    CheckOutDate: Date;

	@IsNumber()
	hotel_ID: number;

	@IsEnum(PackageType)
	PackageType: PackageType;
}
