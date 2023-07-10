import {
    IsDate,
	IsNotEmpty,
	IsNumber,
	IsString
} from "class-validator";

export class BookingDto {

    @IsNotEmpty()
	@IsString()
	Name: string;

	@IsNumber()
	CustomerID: number;

    @IsDate()
    CheckInDate: Date;

    @IsDate()
    CheckOutDate: Date;

	@IsNumber()
	HotelId: number;
}
