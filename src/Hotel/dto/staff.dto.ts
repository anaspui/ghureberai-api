import {
	IsNotEmpty,
	IsString,
	IsEmail,
	IsNumber,
	IsEnum,
} from "class-validator";
import { Gender, Validity } from "../../Shared/entities/user.entity";
import { Position, staff } from "../../Shared/entities/staff.entity";
export class staffDto {
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
