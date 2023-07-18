import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Driver } from "./transportDriver.entity";

export enum VehicleType {
	SUV = "suv",
	SEDUN = "sedan",
	MINIVAN = "minivan",
}

@Entity()
export class Vehicle {
	@PrimaryGeneratedColumn()
	VehicleID: number;

	@Column({
		type: "enum",
		enum: VehicleType,
		default: VehicleType.SUV,
	})
	VehicleType: string;

	@ManyToMany(() => Driver, driver => driver.DriverID)
	@JoinColumn({ name: "DriverID" })
	Driver: Driver[];
}
