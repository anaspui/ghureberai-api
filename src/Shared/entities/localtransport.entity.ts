import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { driver } from "./transportDriver.entity";

@Entity()
export class localtransport {
	@PrimaryGeneratedColumn()
	LocaltransportID: number;

	@Column()
	LocaltransportName: string;

	@Column()
    LocaltransportLoc: string;
    
    @Column()
    

}
