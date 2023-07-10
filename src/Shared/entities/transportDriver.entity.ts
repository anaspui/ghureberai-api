import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
} from "typeorm";
import { Localtransport } from "./localtransport.entity";

@Entity()
export class Driver {
    @PrimaryGeneratedColumn()
    DriverID: number;

    @Column({name : "Driver_Name"})
    Name: string;

    @Column({name : "Driver_Email"})
    Email: string;

    @Column({name : "Driver_Phone"})
    Phone: string;

    @Column({name : "Driver_Salary"})
    Salary: string;

    @ManyToMany(() => Localtransport, (Localtransport) => Localtransport.ID)
    @JoinColumn({ name: "Local_transport_ID"})
    Localtransport: Localtransport[];
}