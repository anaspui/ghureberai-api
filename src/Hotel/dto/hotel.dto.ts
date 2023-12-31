import {IsNotEmpty, IsString, IsEmail,IsNumber,IsEnum} from "class-validator"

export class HotelDto {
    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsNotEmpty()
    Location: string;

    @IsEmail()
    Email: string;

    @IsString()
    Phone: string;

    @IsNotEmpty()
    Address: string;
}