import { IsNotEmpty, IsString, IsEnum, IsIn, IsEmail } from "class-validator";

import { Role, Validity } from "../../../Shared/entities/user.entity";
export class EmployeeDto {
	@IsNotEmpty()
	@IsString()
	Username: string;

	@IsNotEmpty()
	@IsString()
	Password: string;

	Role?: Role | Role.EMPLOYEE;

	@IsNotEmpty()
	@IsEmail()
	Email: string;

	@IsEnum(Validity)
	Validity: Validity = Validity.TRUE;
}
