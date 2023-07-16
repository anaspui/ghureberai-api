import {IsNotEmpty, IsString, IsEmail,IsNumber,IsEnum} from "class-validator"
import { Gender, Validity } from "src/Shared/entities/user.entity";
import {Position, Stuff} from "src/Shared/entities/stuff.entity";
export class StuffDto {

    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsNotEmpty()
    Password: string;
    
    @IsEnum(Position)
    Position: Position;

    @IsEnum(Gender)
    Gender: Gender;

    
    @IsEmail()
    Email: string;

    @IsEnum(Validity)
    Validity: Validity;

    

}