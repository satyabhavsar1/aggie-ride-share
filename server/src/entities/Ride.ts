import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { City } from "./City";
import { RideRequest } from "./RideRequest";

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.rides, { eager: true }) 
  user!: User;

  @Column()
  user_id!: string;

  @Column({ type: "date" })
  date!: string;

  @Column({ type: "time" })
  time!: string;

  @Column() 
  pickup!: string;

  @Column()
  drop!: string;

  @Column("decimal")
  cost!: number;

  @Column("int")
  num_seats!: number;

  @ManyToOne(() => City, { eager: true }) 
  city_from!: City;

  @ManyToOne(() => City, { eager: true }) 
  city_to!: City;

  @Column("bigint")
  contactNumber!: number;

  @OneToMany(() => RideRequest, (request) => request.ride)
  requests!: RideRequest[];

}
