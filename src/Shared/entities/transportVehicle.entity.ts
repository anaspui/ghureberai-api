import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class vehicle {
	@PrimaryGeneratedColumn()
	VehicleID: number;

	@Column()
	VehicleType: string;
}
