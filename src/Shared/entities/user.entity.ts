import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
//   @PrimaryColumn()
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column()
  Username: string;

  @Column()
  Password: string;

  @Column()
  Role: string; 

  @Column()
  FirstName: string; 
  
  @Column()
  LastName: string; 

  @Column()
  Gender: string; 

  @Column()
  Dob: Date; 

  @Column()
  Email: string;  

  @Column()
  Phone: string; 

  @Column()
  Address: string; 

  @Column()
  Picture: string; 
}