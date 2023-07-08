import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gender, User } from "./user.entity";
import { Validity } from "./user.entity";
import { Package } from "./package.entity";

@Entity()
export class Trip {
	@PrimaryGeneratedColumn({name : "trip_ID"})
	ID: number;

    @ManyToMany(() => User, (user) => user.UserId)
	@JoinColumn({name : "customer_ID"})
	CustomerID: string;

	@Column({name : "trip_date"})
    Date: Date;
    
	@Column()
	Location: string;

    @OneToOne(() => User, (user) => user.UserId)
    @Column({ nullable: true })
    @JoinColumn()
    LocalTransportID?: string | null;
    
    @OneToOne(() => Package, (pac) => pac.PackageId)
    @JoinColumn()
	PackageID: string;
}
