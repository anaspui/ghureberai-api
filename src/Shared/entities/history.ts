import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { PackageType } from './package.entity';

@Entity()
export class History {
	@PrimaryGeneratedColumn()
	HistoryId: number;

	@Column()
	TransactionCode: string;

	@Column()
	Date: Date;

	@Column({
		type: "enum",
		enum: PackageType,
	})
	PackageType: PackageType;

    @Column()
    UserId: number;
}
