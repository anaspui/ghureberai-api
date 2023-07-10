import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hotel {
	@PrimaryGeneratedColumn({ name: "hotel_ID" })
	HotelId: number;

	@Column({name : "hotel_name"})
	Name: string;

	@Column()
    Location: string;
    
	@Column()
	Email: string;

    @Column()
    Phone: string;

	@Column()
	Address: string;
}
