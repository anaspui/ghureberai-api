import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";
import { Gender, Role, Validity } from "../../entities/user.entity";

export class RegistrationDto {
	@IsNotEmpty()
	@IsString()
	Username: string;

	@IsNotEmpty()
	@IsString()
	Password: string;

	@IsEnum(Role, { message: "Invalid role value" })
	@IsOptional()
	Role: Role = Role.CUSTOMER;

	@IsNotEmpty()
	@IsString()
	FirstName: string;

	@IsNotEmpty()
	@IsString()
	LastName: string;

	@IsEnum(Gender)
	Gender: Gender = Gender.OTHER;

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

	@IsString()
	Picture: string;

	@IsEnum(Validity)
	Validity?: Validity = Validity.FALSE;
}
