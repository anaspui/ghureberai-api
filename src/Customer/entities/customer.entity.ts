import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role { CUSTOMER = "customer" }

export enum Gender {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
}
export enum Validity {
	TRUE = "true",
	FALSE = "false",
}

@Entity()
export class Customer {
	@PrimaryGeneratedColumn()
	UserId: number;

	@Column()
	Username: string;

	@Column()
	Password: string;

	@Column({
		type: "enum",
		enum: Role,
		default: Role.CUSTOMER,
	})
	Role: Role;

	@Column()
	FirstName: string;

	@Column()
	LastName: string;

	@Column({
		type: "enum",
		enum: Gender,
		default: Gender.OTHER,
	})
	Gender: Gender;

	@Column()
	Dob: Date;

	@Column()
	Email: string;

	@Column()
	Phone: string;

	@Column()
	Address: string;

	@Column()
	Picture: string;

	@Column({
		type: "enum",
		enum: Validity,
		default: Validity.FALSE,
	})
	Validity: Validity;
}
