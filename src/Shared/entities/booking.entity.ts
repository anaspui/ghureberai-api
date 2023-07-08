import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Hotel } from "./hotel.entity";

@Entity()
export class Booking {
	@PrimaryGeneratedColumn({name : "booking_ID"})
	BookingId: number;

	@Column()
    Username: string;
    
    @Column({ nullable: true })
    Address?: string | null;
    
    @OneToMany(() => User, (user) => user.UserId)
	@JoinColumn({name : "customer_ID"})
    CustomerID: string;
    
    @Column()
	CheckInDate: Date;

    @Column()
    CheckOutDate: Date;
    
	@OneToOne(() => Hotel, (hotel) => hotel.ID)
    @JoinColumn({name : "hotel_ID"})
	HotelId: Hotel;
}
