import { Column, Double, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "./hotel.entity";

export enum Type {
	SINGLE = "single",
	DOUBLE = "double",
    TRIPLE = "triple",
    QUAD = "quad" 
}

@Entity()
export class Room {
	@PrimaryGeneratedColumn({name : "room_ID"})
	ID: number;

    @ManyToMany(() => Hotel, (hotel) => hotel.ID)
    @JoinColumn({name : "hotel_ID"})
	HotelId: Hotel;

	@Column({
		type: "enum",
		enum: Type,
        nullable: true,
        name: "room_type"
	})
	Type?: Type | null;

	@Column()
	Price: number;
}
