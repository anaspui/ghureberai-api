import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
} from "class-validator";
import { Gender, Role, Validity } from "../../entities/user.entity";

export class RegistrationDto {
	@Length(4, 20)
	@IsNotEmpty()
	@IsString()
	Username: string;

	@Length(4, 20)
	@IsNotEmpty()
	@IsString()
	Password: string;

	@IsEnum(Role, { message: "Invalid role value" })
	@IsOptional()
	Role: Role = Role.CUSTOMER;

	@Length(4, 20)
	@IsNotEmpty()
	@IsString()
	FirstName: string;

	@Length(4, 20)
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
