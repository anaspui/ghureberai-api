import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
	ADMIN = "admin",
	"EMPLOYEE" = "employee",
	HOTEL_MANAGER = "hotelManager",
	TP_MANAGER = "tpmanager",
	CUSTOMER = "customer",
}

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
export class Users {
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
