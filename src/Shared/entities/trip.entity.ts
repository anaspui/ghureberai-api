import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Package } from "./package.entity";

@Entity()
export class Trip {
	@PrimaryGeneratedColumn({name : "Trip_ID"})
	ID: number;

    @ManyToMany(() => User, (user) => user.UserId)
	@JoinColumn({name : "Customer_ID"})
	CustomerID: number;

	@Column({name : "Trip_date"})
    Date: Date;
    
	@Column({name : "Trip_Location"})
	Location: string;

    @OneToOne(() => User, (user) => user.UserId)
    @Column({ nullable: true })
    @JoinColumn({name : "Local_Transport_ID"})
    Local_Transport_ID?: number | null;
    
    @OneToOne(() => Package, (pac) => pac.PackageId)
    @JoinColumn({name : "Package_ID"})
	PackageID: number;
}
