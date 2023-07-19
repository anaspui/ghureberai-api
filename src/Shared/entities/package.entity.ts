import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Validity } from "./user.entity";

export enum PackageType {
	Hotel = "hotel",
	Transport = "tranport",
	Package = "package",
}

@Entity()
export class Package {
	@PrimaryGeneratedColumn()
	PackageId: number;

	@Column()
	Name: string;

	@Column()
	ValidFrom?: Date;

	@Column()
	ValidTill?: Date;

	@Column({
		type: "enum",
		enum: PackageType,
	})
	PackageType: PackageType;

	@Column({
		type: "enum",
		enum: Validity,
	})
	TransportFacility: Validity.FALSE;
}
