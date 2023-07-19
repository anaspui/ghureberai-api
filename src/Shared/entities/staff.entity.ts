import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./user.entity";
import { Validity } from "./user.entity";

export enum Position {
	HOTELMANAGER = "hotelmanager",
	staff = "staff",
}

@Entity()
export class staff {
	@PrimaryGeneratedColumn({name : "staff_ID"})
	ID: number;

	@Column()
	Name: string;

	@Column()
	Password: string;

	@Column({
		type: "enum",
		enum: Position,
		default: Position.staff,
		nullable: true,
	})
	Position?: Position | null;

	

	@Column({
		type: "enum",
		enum: Gender,
		default: Gender.OTHER,
	})
	Gender: Gender;

	@Column()
	Email: string;

	@Column({
		type: "enum",
		enum: Validity,
		default: Validity.FALSE,
	})
	Validity: Validity;
}
