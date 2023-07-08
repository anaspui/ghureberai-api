import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Priority {
	TRUE = "true",
	FALSE = "false",
}

@Entity()
export class WishList {
	@PrimaryGeneratedColumn()
	WishListId: number;

	@Column()
	PackageId: number;

	@Column()
	CustomerId: number;

	@Column()
    Note: string;

    @Column({
		type: "enum",
		enum: Priority,
		default: Priority.FALSE,
	})
	Priority: Priority;
}
