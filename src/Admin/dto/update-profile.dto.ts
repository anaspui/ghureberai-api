import { IsOptional, IsString, IsDate, IsEmail } from "class-validator";
import { Gender } from "src/Shared/entities/user.entity";

export class UpdateProfileDto {
	@IsOptional()
	@IsString()
	Username: string;

	@IsOptional()
	@IsString()
	FirstName: string;

	@IsOptional()
	@IsString()
	LastName: string;

	@IsOptional()
	@IsString()
	Gender: Gender;

	@IsOptional()
	@IsDate()
	Dob: Date;

	@IsOptional()
	@IsString()
	Address: string;

	@IsOptional()
	@IsEmail()
	Email: string;

	@IsOptional()
	@IsString()
	Phone: string;
}
