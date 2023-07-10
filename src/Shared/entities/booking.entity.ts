import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Hotel } from "./hotel.entity";

@Entity()
export class Booking {
	@PrimaryGeneratedColumn({name : "booking_ID"})
	BookingId: number;

	@Column({name : "hotel_name"})
    Name: string;
    
    @Column()
    CustomerID: number;
    
    @Column()
	CheckInDate: Date;

    @Column()
    CheckOutDate: Date;
    
	@OneToOne(() => Hotel, (hotel) => hotel.HotelId)
    @JoinColumn({name : "hotel_ID"})
	HotelId: Hotel;
}
