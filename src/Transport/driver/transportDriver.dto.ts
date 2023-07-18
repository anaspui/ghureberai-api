import {IsNotEmpty, IsString, IsEmail} from "class-validator"

export class transportDriverdto {
    @IsNotEmpty()
    @IsString()
    DriverName: string;

    @IsNotEmpty()
    @IsEmail()
    DriverEmail: string;

    @IsNotEmpty()
    DriverPhone: string;

    @IsNotEmpty()
    DriverSalary: string;

}

