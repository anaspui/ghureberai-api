import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Localtransport } from "./localtransport.entity";

@Entity()
export class Driver {
	@PrimaryGeneratedColumn()
	DriverID: number;

	@Column()
	DriverName: string;

	@Column()
	DriverEmail: string;

	@Column()
	DriverPhone: string;

	@Column()
	DriverSalary: string;

	@ManyToOne(() => Localtransport, localTransport => localTransport.Drivers, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "LocaltransportID" })
	localTransport: Localtransport;
}
