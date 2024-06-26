import { Gender, User } from "./user.entity";
import { Validity } from "./user.entity";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Package } from "./package.entity";

@Entity()
export class Trip {
	@PrimaryGeneratedColumn({ name: "trip_ID" })
	ID: number;

	@ManyToMany(() => User, user => user.UserId)
	@JoinColumn({ name: "customer_ID" })
	CustomerID: number;

	@Column({ name: "trip_date" })
	Date: Date;

	@Column()
	Location: string;

	@Column()
	LocFrom: string;

	@Column()
	LocTo: string;

	@Column()
	DriverID: number;

	@OneToOne(() => User, user => user.UserId)
	@Column({ nullable: true })
	@JoinColumn()
	TransportID?: string | null;

	@OneToOne(() => Package, pac => pac.PackageId)
	@JoinColumn()
	PackageID: number;
}
