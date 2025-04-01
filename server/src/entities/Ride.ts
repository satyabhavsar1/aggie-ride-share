import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./User";

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

  @Column("text")
  city_from!: string;

  @Column("text")
  city_to!: string;

  @Column("bigint")
  contact_number!: number;

  @Column("bigint")
  whatsapp_number!: number;

}
