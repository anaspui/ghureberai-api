import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Driver } from "./transportDriver.entity";

@Entity()
export class Localtransport {
    @PrimaryGeneratedColumn({ name: "Local_transport_ID"})
    ID: number;

    @Column({ name: "Local_transport_name"})
    Name: string;

    @Column({ name: "Location"})
    Location: string;
}