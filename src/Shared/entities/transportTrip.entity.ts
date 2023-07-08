import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class trip {
    @PrimaryGeneratedColumn()
    TripID: number;

    @Column()
    TripDate: Date;

    @Column()
    TripLoc: string;

    @Column

}