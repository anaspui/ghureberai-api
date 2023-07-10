import {
	IsEnum,
	IsNotEmpty,
	IsNumber
} from "class-validator";
import { PackageType } from "../../../Shared/entities/package.entity";

export class HistoryDto {

    @IsNotEmpty()
    Date: Date;

	@IsEnum(PackageType)
	PackageType: PackageType;

	@IsNumber()
	UserId: number;
}
