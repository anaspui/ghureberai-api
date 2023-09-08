import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	ManyToMany,
} from "typeorm";

import { Transport } from "./transport.entity";

@Entity()
export class Driver {
	@PrimaryGeneratedColumn()
	DriverID: number;

	@Column()
	Name: string;

	@Column()
	Email: string;

	@Column()
	Phone: string;
}
