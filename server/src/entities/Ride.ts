import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { City } from "./City";

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

  @Column("text", { array: true }) 
  pickups!: string[];

  @Column("text", { array: true })
  drops!: string[];

  @Column("decimal")
  cost!: number;

  @Column({ type: "date" })
  drop_date!: string;

  @Column({ type: "time" })
  drop_time!: string;

  @Column("int")
  num_seats!: number;

  @ManyToOne(() => City, { eager: true }) 
  city_from!: City;

  @ManyToOne(() => City, { eager: true }) 
  city_to!: City;

  @Column("bigint")
  contact_number!: number;

  @Column("bigint")
  whatsapp_number!: number;
}
