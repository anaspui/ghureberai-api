import {
	IsEnum,
	IsNotEmpty,
	IsString
} from "class-validator";
import { Validity } from "src/Shared/entities/user.entity";
import { PackageType } from "../../../Shared/entities/package.entity";

export class PackageDto {


	@IsString()
	Name: string;

    @IsNotEmpty()
    ValidFrom: Date;

    @IsNotEmpty()
    ValidTill: Date;

	@IsEnum(PackageType)
	PackageType: PackageType;

	@IsEnum(Validity)
	TransportFacility: Validity.FALSE;
}
