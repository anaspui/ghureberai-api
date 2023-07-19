import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { PackageType } from './package.entity';

@Entity()
export class History {
	@PrimaryGeneratedColumn({name: "history_Id"})
	HistoryId: number;

	@Column()
	Date?: Date;

	@Column({
		type: "enum",
		enum: PackageType,
	})
	PackageType: PackageType;

    @Column()
    UserId?: number;
}
