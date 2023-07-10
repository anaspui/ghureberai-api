import {
    IsDate,
	IsNotEmpty,
	IsNumber,
	IsString
} from "class-validator";

export class BookingDto {

    @IsNotEmpty()
	@IsString()
	hotel_name: string;

	@IsNumber()
	CustomerID: number;

    @IsDate()
    CheckInDate: Date;

    @IsDate()
    CheckOutDate: Date;

	@IsNumber()
	hotel_ID: number;
}
