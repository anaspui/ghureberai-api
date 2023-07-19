import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "./hotel.entity";
import { PackageType } from "./package.entity";

@Entity()
export class Booking {
	@PrimaryGeneratedColumn()
	BookingId: number;

	@Column()
    Name: string;
    
    @Column()
    CustomerID: number;
    
    @Column()
	CheckInDate: Date;

    @Column()
    CheckOutDate: Date;

    @Column({
		type: "enum",
		enum: PackageType,
	})
	PackageType: PackageType;
    
	@OneToOne(() => Hotel, (hotel) => hotel.HotelId)
	HotelId: Hotel;
}
