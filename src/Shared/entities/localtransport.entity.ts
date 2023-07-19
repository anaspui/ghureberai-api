import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
} from "typeorm";
import { Driver } from "./transportDriver.entity";

@Entity()
export class Localtransport {
	@PrimaryGeneratedColumn()
	LocaltransportID: number;

	@Column()
	LocaltransportName: string;

	@Column()
	LocaltransportLoc: string;

	@OneToMany(() => Driver, driver => driver.localTransport)
	@JoinColumn({ name: "DriverID" })
	Drivers: Driver[];
}
