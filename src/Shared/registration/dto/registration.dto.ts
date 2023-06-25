import {
	IsEnum,
	IsDate,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";
import { Role, Gender, Validity } from "../../entities/user.entity";

export class RegistrationDto {
	@IsNotEmpty()
	@IsString()
	Username: string;

	@IsNotEmpty()
	@IsString()
	Password: string;

	@IsEnum(Role)
	@IsOptional()
	Role?: Role;

	@IsNotEmpty()
	@IsString()
	FirstName: string;

	@IsNotEmpty()
	@IsString()
	LastName: string;

	@IsEnum(Gender)
	@IsOptional()
	Gender?: Gender;

	@IsDate()
	Dob: Date;

	@IsEmail()
	Email: string;

	@IsNotEmpty()
	@IsString()
	Phone: string;

	@IsNotEmpty()
	@IsString()
	Address: string;

	@IsNotEmpty()
	@IsString()
	Picture: string;

	@IsEnum(Validity)
	@IsOptional()
	Validity?: Validity;
}
