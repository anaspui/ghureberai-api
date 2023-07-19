import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString
} from "class-validator";
import { Validity } from "src/Shared/entities/user.entity";
import { PackageType } from "../../../Shared/entities/package.entity";
import { Type } from "class-transformer";

export class PackageDto {


	@IsString()
	Name: string;

	@IsOptional()
    ValidFrom: Date;

    @IsOptional()
    ValidTill: Date;

	@IsEnum(PackageType)
	PackageType: PackageType;

	@IsEnum(Validity)
	TransportFacility: Validity.FALSE;
}
