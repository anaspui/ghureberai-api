import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type UserRoleType = 'admin' | 'customer' | 'manager';

@Entity()
export class Users {
  //   @PrimaryColumn()
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column()
  Username: string;

  @Column()
  Password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'customer', 'manager'],
    default: 'customer',
  })
  Role: UserRoleType;

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
