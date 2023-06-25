import {
	IsNotEmpty,
	IsString,
	IsEnum,
	IsOptional,
	IsEmail,
} from "class-validator";
import { Role, Gender, Validity } from "../../entities/user.entity";

export class RegistrationDto {
	@IsNotEmpty()
	@IsString()
	Username: string;

	@IsNotEmpty()
	@IsString()
	Password: string;

	@IsEnum(Role, { message: "Invalid role value" })
	@IsOptional()
	Role: Role;

	@IsNotEmpty()
	@IsString()
	FirstName: string;

	@IsNotEmpty()
	@IsString()
	LastName: string;

	@IsEnum(Gender)
	Gender: Gender;

	@IsNotEmpty()
	Dob: Date;

	@IsNotEmpty()
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
	Validity: Validity;
}
