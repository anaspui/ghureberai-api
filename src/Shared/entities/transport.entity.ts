import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

import { Driver } from "./driver.entity";

export enum TransportType {
	SUV = "suv",
	SEDAN = "sedan",
	MINIVAN = "minivan",
}

@Entity()
export class Transport {
	@PrimaryGeneratedColumn()
	TransportID: number;

	@Column()
	RegistrationNo: string;

	@Column({
		type: "enum",
		enum: TransportType,
		default: TransportType.SUV,
	})
	TransportType: string;
}
