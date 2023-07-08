import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class driver {
    @PrimaryGeneratedColumn()
    DriverID: number;

    @Column()
    DriverName: string;

    @Column()
    DriverEmail: string;

    @Column()
    DriverPhone: string;

    @Column()
    DriverSalary: string;    
}