import {
	IsEnum,
	IsNotEmpty,
	IsOptional
} from "class-validator";
import { PackageType } from "../../../Shared/entities/package.entity";

export class HistoryDto {

    @IsOptional()
    Date: Date;

	@IsEnum(PackageType)
	PackageType: PackageType;

	@IsOptional()
	UserId: number;
}
