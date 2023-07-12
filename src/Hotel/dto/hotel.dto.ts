import {IsNotEmpty, IsString, IsEmail,IsEmpty,IsNumber,IsEnum} from "class-validator"

export class HotelDto {   
    
    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsNotEmpty()
    Location: string;

    @IsEmail()
    Email: string;

    @IsNumber()
    Phone: number;

    @IsNotEmpty()
    Address: string;
}