import { IsNotEmpty, IsString } from "class-validator";

export class LTDto {
	@IsNotEmpty()
	@IsString()
	LocaltransportName: string;

	@IsNotEmpty()
	@IsString()
	LocaltransportLoc: string;
}
