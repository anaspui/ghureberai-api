import {
	IsDate,
	IsEmail,
	IsEmpty,
	IsNotEmpty,
	IsString,
	isString,
} from "class-validator";

export class transportManagerDto {
	@IsNotEmpty()
	@IsString()
	Username: string;

	@IsEmpty()
	@IsString()
	Password: string;

	Role: string;

	// @IsEmpty()
	// @IsString()
	// FirstName: string;

	// @IsEmpty()
	// @IsString()
	// LastName: string;

	// @IsEmpty()
	// @IsString()
	// Gender: string;

	// @IsEmpty()
	// @IsDate()
	// Dob: Date;

	// @IsEmpty()
	// @IsEmail()
	// Email: string;

	// @IsEmpty()
	// @IsString()
	// Phone: string;

	// @IsEmpty()
	// @IsString()
	// Address: string;

	// @IsEmpty()
	// @IsString()
	// Picture: string | null;
}
