import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
	ADMIN = "admin",
	EMPLOYEE = "employee",
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
export class User {
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
		nullable: true,
	})
	Role?: Role | null;

	@Column({ nullable: true })
	FirstName?: string | null;

	@Column({ nullable: true })
	LastName?: string | null;

	@Column({
		type: "enum",
		enum: Gender,
		default: Gender.OTHER,
	})
	Gender: Gender;

	@Column({ nullable: true })
	Dob?: Date | null;

	@Column()
	Email: string;

	@Column({ nullable: true })
	Phone?: string | null;

	@Column({ nullable: true })
	Address?: string | null;

	@Column({ nullable: true })
	Picture?: string | null;

	@Column({
		type: "enum",
		enum: Validity,
		default: Validity.FALSE,
	})
	Validity: Validity;
}
