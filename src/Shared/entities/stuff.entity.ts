import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./user.entity";
import { Validity } from "./user.entity";

export enum Position {
	HOTELMANAGER = "hotelmanager",
	STUFF = "stuff",
}

@Entity()
export class Stuff {
	@PrimaryGeneratedColumn({name : "stuff_ID"})
	ID: number;

	@Column()
	Name: string;

	@Column()
	Password: string;

	@Column({
		type: "enum",
		enum: Position,
		default: Position.STUFF,
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
